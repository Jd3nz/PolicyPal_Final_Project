import { randomUUID } from "node:crypto";
import { handbookSections, type HandbookSection } from "@/data/handbook";
import { DEFAULT_POLICY_NAME, type PolicySummary } from "@/lib/policy-shared";

type Policy = PolicySummary & { sections: HandbookSection[]; expiresAt: number };
const sessionGlobal = globalThis as typeof globalThis & {
  policyPalUploads?: Map<string, Policy>;
};
// Survives module reloads in one development process, never written to disk.
const uploads = sessionGlobal.policyPalUploads ??= new Map<string, Policy>();
const LIFETIME = 8 * 60 * 60 * 1000;

function prune() {
  for (const [id, policy] of uploads) {
    if (policy.expiresAt <= Date.now()) uploads.delete(id);
  }
}

export function getPolicy(id?: string | null): Policy | undefined {
  prune();
  if (id) return uploads.get(id);
  return {
    id: null,
    name: DEFAULT_POLICY_NAME,
    sectionCount: handbookSections.length,
    sections: handbookSections,
    expiresAt: Infinity,
  };
}

export function savePolicy(name: string, sections: HandbookSection[]): PolicySummary {
  prune();
  if (uploads.size >= 20) throw new Error("The temporary policy store is full. Switch an existing upload back to the default handbook or restart the development server.");
  const id = randomUUID();
  const summary = { id, name, sectionCount: sections.length };
  uploads.set(id, { ...summary, sections, expiresAt: Date.now() + LIFETIME });
  return summary;
}

export function deletePolicy(id: string) {
  uploads.delete(id);
}