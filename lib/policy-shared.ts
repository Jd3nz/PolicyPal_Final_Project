export const DEFAULT_POLICY_NAME = "NovaTech Employee Handbook";
export const MAX_POLICY_BYTES = 5 * 1024 * 1024;
export const POLICY_STORAGE_KEY = "policypal-active-policy";

export type PolicySummary = {
  id: string | null;
  name: string;
  sectionCount: number;
};

export function validatePolicyFile(file: { name: string; size: number }): string | null {
  if (!/\.(pdf|docx)$/i.test(file.name)) return "Choose a PDF (.pdf) or Word (.docx) document.";
  if (file.size === 0) return "The selected file is empty.";
  if (file.size > MAX_POLICY_BYTES) return "The document must be 5 MB or smaller.";
  return null;
}