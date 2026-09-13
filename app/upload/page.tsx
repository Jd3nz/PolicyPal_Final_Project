"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { PageContainer, PageTitle, SectionCard } from "@/components/PageLayout";
import PolicyIcon from "@/components/PolicyIcon";
import { fetchActivePolicy, readPolicyId, resetActivePolicy } from "@/lib/policy-client";
import { POLICY_STORAGE_KEY, validatePolicyFile, type PolicySummary } from "@/lib/policy-shared";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [active, setActive] = useState<PolicySummary | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Choose a policy document to get started.");
  const [error, setError] = useState("" );
  const [dragging, setDragging] = useState(false);

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
    if (busy || !active?.id) return;
    setBusy(true);
    setError("");
    setStatus("Restoring default policy...");
    try {
      setActive(await resetActivePolicy());
      setStatus("Default policy restored");
    } catch (error) {
      setStatus("Reset unsuccessful. Please try again.");
      setError(error instanceof Error ? error.message : "Could not reset the policy. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function selectFile(selected: File | null) {
    if (busy) return;
    setFile(selected);
    setError(selected ? validatePolicyFile(selected) ?? "" : "");
    setStatus(selected ? "File selected. Click Use this policy to upload and activate it." : "Choose a policy document to get started.");
  }

  return (
    <PageContainer currentPage="upload">
      <PageTitle eyebrow="Your policies. Clearer answers." title="Upload Policy" icon="document">
        Give PolicyPal your company handbook to make every answer relevant to your workplace.
      </PageTitle>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <SectionCard title="Company policy document" icon="document">
          <form onSubmit={upload} className="space-y-5" aria-busy={busy}>
            <label htmlFor="policy-file"
              onDragOver={(event) => { event.preventDefault(); if (!busy) setDragging(true); }}
              onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                if (busy) return;
                if (event.dataTransfer.files.length !== 1) { setError("Choose one PDF or DOCX document at a time."); return; }
                selectFile(event.dataTransfer.files[0]);
              }}
              className={`relative flex flex-col items-center rounded-2xl border-2 border-dashed px-4 py-10 text-center transition focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-blue-600 sm:py-12 ${busy ? "cursor-wait opacity-60" : "cursor-pointer"} ${dragging ? "border-blue-500 bg-blue-100/70" : "border-blue-200 bg-gradient-to-b from-blue-50/70 to-white hover:border-blue-400"}`}>
              <input id="policy-file" type="file" accept=".pdf,.docx" disabled={busy} aria-label="Company policy document"
                aria-describedby="file-help upload-error" aria-invalid={Boolean(error)} className="sr-only"
                onChange={(event) => selectFile(event.target.files?.[0] ?? null)} />
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white text-blue-600 shadow-md shadow-blue-100/50"><PolicyIcon name="document" className="h-8 w-8" /></span>
              <span className="text-base font-semibold text-slate-800">Drop your policy document here</span>
              <span className="mt-2 text-sm text-slate-500">or <span className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-4">browse files</span> to upload</span>
              <span id="file-help" className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-500">
                <span className="rounded-md border border-slate-200 bg-white px-2 py-1">PDF</span>
                <span className="rounded-md border border-slate-200 bg-white px-2 py-1">DOCX</span>
                <span className="px-1 py-1">Up to 5 MB</span>
              </span>
            </label>
            {file && (
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600"><PolicyIcon name="document" className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="break-all text-sm font-semibold text-slate-700">{file.name}</p>
                  <p className="mt-1 text-xs text-slate-500">Selected file · {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
              <p role="status" className="text-sm leading-6 text-slate-600">{status}</p>
              <p id="upload-error" role="alert" className="text-sm leading-6 text-red-700">{error}</p>
            </div>
            <button type="submit" disabled={!file || busy || Boolean(file && validatePolicyFile(file))} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200/50 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
              <PolicyIcon name="sparkles" className="h-4 w-4" />Use this policy
            </button>
          </form>
        </SectionCard>
        <div className="space-y-6">
          <SectionCard title="Active Policy" icon="book">
            <div className="rounded-xl border border-blue-100/80 bg-blue-50/50 p-4" aria-live="polite">
              {active && <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span>}
              <p className="break-words text-base font-semibold text-slate-800">{active ? active.id ? active.name : "Default Employee Handbook (NovaTech)" : "Not yet confirmed"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{active?.id ? "Your uploaded policy is the current knowledge source." : "The built-in handbook is used when no uploaded policy is selected."}</p>
            </div>
            {active?.id && <button type="button" onClick={useDefault} disabled={busy} className="mt-4 w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:opacity-50">Use Default Policy</button>}
            <Link href="/" className="mt-4 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Back to chat <PolicyIcon name="arrow" className="h-3 w-3" /></Link>
          </SectionCard>
          <SectionCard title="Before you upload" icon="shield">
            <ul className="space-y-3 text-sm leading-6 text-slate-500">
              <li>Use a PDF or DOCX with readable text. Image-only scans need OCR before uploading.</li>
              <li>Extracted text is temporary: it expires after eight hours and is cleared when the server restarts.</li>
              <li>The active selection applies to this browser tab. Relevant excerpts are sent to Claude when you ask a question.</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}
