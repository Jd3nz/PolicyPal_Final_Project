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
export async function resetActivePolicy(): Promise<PolicySummary> {
  const id = readPolicyId();
  // Read default metadata first, so a failed lookup cannot leave a partial reset.
  const defaultResponse = await fetch("/api/policy", { cache: "no-store" });
  if (!defaultResponse.ok) throw new Error("Could not restore the default policy. Please try again.");
  const defaultPolicy: PolicySummary = await defaultResponse.json();
  if (id) {
    const response = await fetch(`/api/policy?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Could not clear the uploaded policy. Please try again.");
  }
  sessionStorage.removeItem(POLICY_STORAGE_KEY);
  return defaultPolicy;
}