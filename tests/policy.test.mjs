import assert from "node:assert/strict";
import { test } from "node:test";
import { registerHooks } from "node:module";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { pdfFixture, docxFixture, policyText } from "./policy-fixtures.mjs";

// Use the project's TypeScript compiler without another test dependency.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) return nextResolve(new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href, context);
    if (specifier === "next/server") return nextResolve("next/server.js", context);
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts") && !url.includes("/node_modules/")) {
      return { format: "module", shortCircuit: true, source: ts.transpileModule(readFileSync(new URL(url), "utf8"), {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      }).outputText };
    }
    return nextLoad(url, context);
  },
});
const { extractPolicy, chunkPolicyText } = await import("../lib/policy-extract.ts");
const { validatePolicyFile, MAX_POLICY_BYTES } = await import("../lib/policy-shared.ts");
const { getPolicy, savePolicy, deletePolicy } = await import("../lib/policy-store.ts");
const { retrieveRelevantSections, shouldAlwaysEscalate } = await import("../lib/retrieve.ts");
const { buildPolicyPalPrompt } = await import("../lib/prompt.ts");
const { POST: upload } = await import("../app/api/policy/upload/route.ts");
process.env.ANTHROPIC_API_KEY ||= "test-only-no-network";
const { anthropic } = await import("../lib/claude.ts");
const { POST: chat } = await import("../app/api/chat/route.ts");
const sections = chunkPolicyText(policyText);
const chatRequest = (question, policyId) => new Request("http://localhost/api/chat", { method: "POST", body: JSON.stringify({ question, policyId }) });

// Fail closed if a test accidentally reaches the real Claude API.
anthropic.messages.create = async () => { throw new Error("Unexpected Claude call"); };

test("file validation rejects wrong types, empty files and oversized uploads", () => {
  assert.match(validatePolicyFile({ name: "x.txt", size: 40 }), /PDF/);
  assert.match(validatePolicyFile({ name: "x.pdf", size: 0 }), /empty/);
  assert.match(validatePolicyFile({ name: "x.docx", size: MAX_POLICY_BYTES + 1 }), /5 MB/);
  assert.equal(validatePolicyFile({ name: "Policy.PDF", size: 40 }), null);
});
test("extracts a real PDF", async () => {
  const result = await extractPolicy(new File([pdfFixture()], "acme.pdf"));
  assert.match(result[0].content, /37 days/);
});
test("extracts a real DOCX", async () => {
  const result = await extractPolicy(new File([docxFixture()], "acme.docx"));
  assert.match(result[0].content, /37 days/);
});
test("rejects renamed, corrupt and unreadable documents", async () => {
  await assert.rejects(extractPolicy(new File(["fake pdf"], "fake.pdf")), /valid PDF/);
  await assert.rejects(extractPolicy(new File(["x"], "fake.docx")), /valid DOCX/);
  await assert.rejects(extractPolicy(new File(["PK\x03\x04bad"], "bad.docx")), /Could not read/);
  await assert.rejects(extractPolicy(new File([pdfFixture("")], "empty.pdf")), /No readable/);
});
test("chunks preserve overlap and all words with stable citations", () => {
  const words = Array.from({ length: 800 }, (_, index) => `word${index}`);
  const chunks = chunkPolicyText(words.join(" "));
  assert.equal(chunks.length, 3);
  assert.equal(chunks[1].section, "U2");
  assert.deepEqual(chunks[0].content.split(" ").slice(-50), chunks[1].content.split(" ").slice(0, 50));
  assert.ok(chunks[2].content.endsWith("word799"));
});
test("default source stays intact and uploads remain isolated", () => {
  const first = savePolicy("first.pdf", sections);
  const second = savePolicy("second.docx", chunkPolicyText("Other employees receive a bicycle allowance of 200 dollars annually."));
  assert.notEqual(first.id, second.id);
  assert.equal(getPolicy(first.id).name, "first.pdf");
  assert.equal(getPolicy().name, "NovaTech Employee Handbook");
  assert.match(retrieveRelevantSections("annual leave", 5, getPolicy(first.id).sections)[0].content, /37 days/);
  assert.ok(retrieveRelevantSections("annual leave").every((section) => !section.section.startsWith("U")));
  deletePolicy(first.id); deletePolicy(second.id);
  assert.equal(getPolicy(first.id), undefined);
});
test("expiry removes uploads without replacing the default", () => {
  const saved = savePolicy("expires.pdf", sections);
  const original = Date.now;
  try {
    Date.now = () => original() + 9 * 60 * 60 * 1000;
    assert.equal(getPolicy(saved.id), undefined);
    assert.equal(getPolicy().id, null);
  } finally { Date.now = original; }
});
test("personal, legal and medical escalation patterns remain active", async () => {
  const saved = savePolicy("acme.pdf", sections);
  try {
    for (const question of ["my leave balance", "my salary", "my tax", "my grievance outcome", "legal advice", "medical advice"]) {
      assert.equal(shouldAlwaysEscalate(question), true);
      const response = await chat(chatRequest(question, saved.id));
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.equal(body.escalated, true); assert.equal(body.section, null);
      assert.doesNotMatch(body.referral, /novatech/i);
    }
    const defaultResponse = await (await chat(chatRequest("my salary"))).json();
    assert.equal(defaultResponse.section, "12");
  } finally { deletePolicy(saved.id); }
});
test("unsupported questions escalate and expired IDs do not silently use NovaTech", async () => {
  const saved = savePolicy("acme.pdf", sections);
  const response = await chat(chatRequest("xylophone", saved.id));
  assert.equal((await response.json()).escalated, true);
  deletePolicy(saved.id);
  assert.equal((await chat(chatRequest("annual leave", saved.id))).status, 409);
});
test("uploaded prompt keeps safety rules and uses null escalation citations", () => {
  const prompt = buildPolicyPalPrompt("leave?", sections, true);
  assert.match(prompt, /untrusted data/);
  assert.match(prompt, /"section": null/);
  assert.match(prompt, /37 days/);
  assert.doesNotMatch(prompt, /"section": "12"/);
});
test("chat uses the upload and preserves the five-field response contract", async () => {
  const saved = savePolicy("acme.pdf", sections);
  const original = anthropic.messages.create;
  try {
    anthropic.messages.create = async (request) => {
      assert.match(request.messages[0].content, /37 days/);
      assert.doesNotMatch(request.messages[0].content, /20 days/);
      return { content: [{ type: "text", text: JSON.stringify({ answer: "37 days annually.", section: "U1", sectionTitle: "Wrong title", escalated: false, referral: null }) }] };
    };
    const result = await (await chat(chatRequest("annual leave", saved.id))).json();
    assert.deepEqual(Object.keys(result).sort(), ["answer", "section", "sectionTitle", "escalated", "referral"].sort());
    assert.equal(result.answer, "37 days annually.");
    assert.equal(result.sectionTitle, sections[0].title);
    anthropic.messages.create = async () => ({ content: [{ type: "text", text: JSON.stringify({ answer: "Invented answer", section: "4.2", sectionTitle: "Annual leave", escalated: false, referral: null }) }] });
    const invalid = await (await chat(chatRequest("annual leave", saved.id))).json();
    assert.equal(invalid.escalated, true); assert.equal(invalid.section, null);
  } finally { anthropic.messages.create = original; deletePolicy(saved.id); }
});
test("upload route validates multipart data and stores extracted text", async () => {
  const form = new FormData(); form.append("file", new File([docxFixture()], "test.docx"));
  const response = await upload(new Request("http://localhost/api/policy/upload", { method: "POST", body: form }));
  assert.equal(response.status, 201);
  const result = await response.json();
  assert.match(getPolicy(result.id).sections[0].content, /37 days/);
  deletePolicy(result.id);
  assert.equal((await upload(new Request("http://localhost/api/policy/upload", { method: "POST", body: "invalid" }))).status, 400);
  const empty = new FormData(); empty.append("other", "x");
  assert.equal((await upload(new Request("http://localhost/api/policy/upload", { method: "POST", body: empty }))).status, 400);
});
const { GET: getPolicyRoute, DELETE: deletePolicyRoute } = await import("../app/api/policy/route.ts");
const { resetActivePolicy, readPolicyId } = await import("../lib/policy-client.ts");
const { POLICY_STORAGE_KEY } = await import("../lib/policy-shared.ts");

test("reset clears browser/server selection and the next answer uses the built-in handbook", async () => {
  const saved = savePolicy("37-day-policy.pdf", sections);
  const storage = new Map([[POLICY_STORAGE_KEY, saved.id]]);
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "sessionStorage");
  const originalFetch = globalThis.fetch;
  const originalClaude = anthropic.messages.create;
  Object.defineProperty(globalThis, "sessionStorage", { configurable: true, value: {
    getItem: (key) => storage.get(key) ?? null,
    removeItem: (key) => storage.delete(key),
  } });
  globalThis.fetch = async (url, options) => {
    const request = new Request(new URL(url, "http://localhost"), options);
    return options?.method === "DELETE" ? deletePolicyRoute(request) : getPolicyRoute(request);
  };
  try {
    let expectedDays = 37;
    let calls = 0;
    anthropic.messages.create = async (request) => {
      calls++;
      const prompt = request.messages[0].content;
      assert.match(prompt, new RegExp(`${expectedDays} days`));
      assert.doesNotMatch(prompt, new RegExp(`${expectedDays === 37 ? 20 : 37} days`));
      if (expectedDays === 20) assert.doesNotMatch(prompt, /SECTION U1/);
      return { content: [{ type: "text", text: JSON.stringify({
        answer: `${expectedDays} days annually.`, section: expectedDays === 37 ? "U1" : "4.2",
        sectionTitle: "Annual leave", escalated: false, referral: null,
      }) }] };
    };
    const before = await (await chat(chatRequest("annual leave", readPolicyId()))).json();
    assert.equal(before.answer, "37 days annually.");
    const restored = await resetActivePolicy();
    assert.equal(restored.id, null);
    assert.equal(restored.name, "NovaTech Employee Handbook");
    assert.equal(readPolicyId(), null);
    assert.equal(getPolicy(saved.id), undefined);
    expectedDays = 20;
    const afterResponse = await chat(chatRequest("annual leave", readPolicyId()));
    assert.equal(afterResponse.status, 200);
    const after = await afterResponse.json();
    assert.equal(after.answer, "20 days annually.");
    assert.equal(after.section, "4.2");
    assert.equal(after.escalated, false);
    assert.equal(calls, 2);
    assert.equal((await resetActivePolicy()).id, null);
  } finally {
    globalThis.fetch = originalFetch;
    anthropic.messages.create = originalClaude;
    if (originalStorage) Object.defineProperty(globalThis, "sessionStorage", originalStorage);
    else delete globalThis.sessionStorage;
    deletePolicy(saved.id);
  }
});

test("failed reset keeps the uploaded selection for retry", async () => {
  const saved = savePolicy("keep.pdf", sections);
  const storage = new Map([[POLICY_STORAGE_KEY, saved.id]]);
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "sessionStorage");
  const originalFetch = globalThis.fetch;
  Object.defineProperty(globalThis, "sessionStorage", { configurable: true, value: {
    getItem: (key) => storage.get(key) ?? null,
    removeItem: (key) => storage.delete(key),
  } });
  try {
    globalThis.fetch = async (url, options) => options?.method === "DELETE"
      ? new Response(null, { status: 500 })
      : getPolicyRoute(new Request(new URL(url, "http://localhost")));
    await assert.rejects(resetActivePolicy(), /Could not clear/);
    assert.equal(readPolicyId(), saved.id);
    assert.equal(getPolicy(saved.id).name, "keep.pdf");
    globalThis.fetch = async () => new Response(null, { status: 500 });
    await assert.rejects(resetActivePolicy(), /Could not restore/);
    assert.equal(readPolicyId(), saved.id);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalStorage) Object.defineProperty(globalThis, "sessionStorage", originalStorage);
    else delete globalThis.sessionStorage;
    deletePolicy(saved.id);
  }
});