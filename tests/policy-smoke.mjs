import assert from "node:assert/strict";
import { pdfFixture, docxFixture } from "./policy-fixtures.mjs";

const base = process.env.POLICY_TEST_URL || "http://127.0.0.1:3100";
for (const path of ["/", "/about", "/upload"]) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  assert.match(await response.text(), /Upload Policy/);
}
const defaultPolicy = await (await fetch(`${base}/api/policy`)).json();
assert.equal(defaultPolicy.name, "NovaTech Employee Handbook");
for (const [name, buffer] of [["Acme.pdf", pdfFixture()], ["Acme.docx", docxFixture()]]) {
  const form = new FormData(); form.append("file", new File([buffer], name));
  const uploaded = await fetch(`${base}/api/policy/upload`, { method: "POST", body: form });
  const policy = await uploaded.json();
  assert.equal(uploaded.status, 201, JSON.stringify(policy));
  try {
    const lookup = await fetch(`${base}/api/policy?id=${policy.id}`);
    assert.equal(lookup.status, 200);
    assert.equal((await lookup.json()).name, name);
    const response = await fetch(`${base}/api/chat`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "my salary", policyId: policy.id }),
    });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.escalated, true); assert.equal(result.section, null);
    assert.doesNotMatch(result.referral, /novatech/i);
  } finally {
    assert.equal((await fetch(`${base}/api/policy?id=${policy.id}`, { method: "DELETE" })).status, 204);
  }
  assert.equal((await fetch(`${base}/api/policy?id=${policy.id}`)).status, 404);
  console.log(`${name}: upload, lookup, escalation and removal passed`);
}
const fallback = await (await fetch(`${base}/api/chat`, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: "my salary" }),
})).json();
assert.equal(fallback.section, "12");
console.log("Pages, shared temporary storage and default fallback passed. No Claude requests were made.");