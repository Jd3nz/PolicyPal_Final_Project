"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import PolicyHeader from "@/components/PolicyHeader";
import { fetchActivePolicy, readPolicyId } from "@/lib/policy-client";
import { DEFAULT_POLICY_NAME, POLICY_STORAGE_KEY, validatePolicyFile, type PolicySummary } from "@/lib/policy-shared";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [active, setActive] = useState<PolicySummary | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Choose a policy document to get started.");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivePolicy().then(setActive).catch((error: Error) => setError(error.message));
  }, []);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || busy) return;
    const validation = validatePolicyFile(file);
    if (validation) { setError(validation); return; }
    setBusy(true);
    setError("");
    setStatus("Uploading and extracting policy text...");
    try {
      const previous = readPolicyId();
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/policy/upload", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The upload failed. Please try again.");
      sessionStorage.setItem(POLICY_STORAGE_KEY, result.id);
      setActive(result);
      setStatus(`Policy ready. ${result.sectionCount} searchable excerpts extracted. You can now return to chat.`);
      if (previous) void fetch(`/api/policy?id=${encodeURIComponent(previous)}`, { method: "DELETE" }).catch(() => {});
    } catch (error) {
      setStatus("Upload unsuccessful. Your active policy has not changed.");
      setError(error instanceof Error ? error.message : "The upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function useDefault() {
    setBusy(true);
    setError("");
    try {
      const previous = readPolicyId();
      sessionStorage.removeItem(POLICY_STORAGE_KEY);
      setActive({ id: null, name: DEFAULT_POLICY_NAME, sectionCount: 0 });
      setStatus("The default handbook is active.");
      if (previous) await fetch(`/api/policy?id=${encodeURIComponent(previous)}`, { method: "DELETE" });
    } catch {
      setError("Could not clear the temporary upload. Refresh to check the active policy.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PolicyHeader currentPage="upload" />
      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Upload Policy</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Use your company policy document as PolicyPal&apos;s knowledge source.
          Choose a PDF or DOCX with readable text, up to 5 MB.
        </p>
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Extracted text is kept temporarily for up to eight hours and is cleared
          when the development server restarts. The active selection applies to
          this browser tab. Relevant excerpts are sent to Claude when you ask a question.
          Scanned PDFs need OCR before uploading.
        </div>
        <form onSubmit={upload} className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-busy={busy}>
          <div>
            <label htmlFor="policy-file" className="block text-sm font-semibold text-slate-900">Company policy document</label>
            <input id="policy-file" type="file" accept=".pdf,.docx" disabled={busy}
              aria-describedby="file-help upload-error" aria-invalid={Boolean(error)}
              className="mt-3 block w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:opacity-50"
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                setFile(selected);
                setError(selected ? validatePolicyFile(selected) ?? "" : "");
                setStatus(selected ? "File selected. Click Use this policy to upload and activate it." : "Choose a policy document to get started.");
              }} />
            <p id="file-help" className="mt-2 break-all text-sm text-slate-500">{file ? `Selected file: ${file.name}` : "PDF or DOCX only. Maximum size: 5 MB."}</p>
          </div>
          <p role="status" className="text-sm leading-6 text-slate-600">{status}</p>
          <p id="upload-error" role="alert" className="text-sm text-red-700">{error}</p>
          <button type="submit" disabled={!file || busy || Boolean(file && validatePolicyFile(file))} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
            Use this policy
          </button>
        </form>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <p className="min-w-0 break-words text-sm font-medium text-slate-700">Active Policy: {active?.name ?? "Not yet confirmed"}</p>
          <button onClick={useDefault} disabled={busy} className="rounded text-sm font-medium text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:opacity-50">Use default handbook</button>
        </div>
        <Link href="/" className="mt-6 inline-block rounded py-2 text-sm font-medium text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Back to chat</Link>
      </main>
    </div>
  );
}