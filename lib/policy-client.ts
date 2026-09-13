import { POLICY_STORAGE_KEY, type PolicySummary } from "@/lib/policy-shared";

export function readPolicyId(): string | null {
  return sessionStorage.getItem(POLICY_STORAGE_KEY);
}

export async function fetchActivePolicy(): Promise<PolicySummary> {
  const id = readPolicyId();
  const response = await fetch(`/api/policy${id ? `?id=${encodeURIComponent(id)}` : ""}`, { cache: "no-store" });
  if (response.status === 404) {
    sessionStorage.removeItem(POLICY_STORAGE_KEY);
    throw new Error("Your uploaded policy has expired. The default handbook will be used for your next question, or you can upload your policy again.");
  }
  if (!response.ok) throw new Error("Could not check the active policy. Please try again.");
  return response.json();
}