"use client";

import { useEffect, useState } from "react";
import { fetchActivePolicy, resetActivePolicy } from "@/lib/policy-client";
import type { PolicySummary } from "@/lib/policy-shared";

import PolicyHeader from "@/components/PolicyHeader";
import AiDisclosure from "@/components/AiDisclosure";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import ChatMessage, {
  Message,
} from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

const suggestedQuestions = [
  "How many annual leave days do I get?",
  "Can I work from home?",
  "What happens if I am sick?",
  "How do I report workplace bullying?",
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicySummary | null>(null);
  const [policyError, setPolicyError] = useState("");
  const [resettingPolicy, setResettingPolicy] = useState(false);
  const [policyStatus, setPolicyStatus] = useState("");

  useEffect(() => {
    fetchActivePolicy().then(setActivePolicy).catch((error: Error) => setPolicyError(error.message));
  }, []);

  async function askQuestion(text?: string) {
    const submittedQuestion = (
      text ?? question
    ).trim();

    if (!submittedQuestion || loading || resettingPolicy) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: submittedQuestion,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    let policyConfirmed = false;
    try {
      const policy = await fetchActivePolicy();
      policyConfirmed = true;
      setActivePolicy(policy);
      setPolicyError("");
      // Temporary delay to simulate the AI response.
      // Later this will be replaced with the Claude API.
      await new Promise((resolve) =>
        setTimeout(resolve, 900),
      );

          const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: submittedQuestion,
        policyId: policy.id,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.answer || "Unable to get PolicyPal response.");
    }

      const assistantMessage: Message = {
    id: Date.now() + 1,
    role: "assistant",
    content: result.answer,
    section: result.section
      ? `${result.section} — ${result.sectionTitle ?? ""}`
      : undefined,
    escalated: result.escalated,
  };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      if (!policyConfirmed) setActivePolicy(null);
      setPolicyError(error instanceof Error ? error.message : "Could not confirm the active policy.");
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "PolicyPal is currently unavailable. Please try again later or contact People & Culture.",
        escalated: true,
      };

      setMessages((current) => [
        ...current,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function useDefaultPolicy() {
    if (loading || resettingPolicy || !activePolicy?.id) return;
    setResettingPolicy(true);
    setPolicyError("");
    setPolicyStatus("");
    try {
      setActivePolicy(await resetActivePolicy());
      setPolicyStatus("Default policy restored");
    } catch (error) {
      setPolicyError(error instanceof Error ? error.message : "Could not reset the policy. Please try again.");
    } finally {
      setResettingPolicy(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setQuestion("");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PolicyHeader
        hasMessages={messages.length > 0}
        onClear={clearChat}
      />

      <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-4xl flex-col px-5 py-8">
        <div className="mb-4 text-sm text-slate-600" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="min-w-0 break-words font-medium">Active Policy: {activePolicy ? activePolicy.id ? activePolicy.name : "Default Employee Handbook (NovaTech)" : "Not yet confirmed"}</p>
            {activePolicy?.id && (
              <button type="button" onClick={useDefaultPolicy} disabled={loading || resettingPolicy} className="rounded text-sm font-medium text-blue-700 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
                {resettingPolicy ? "Restoring default policy..." : "Use Default Policy"}
              </button>
            )}
          </div>
          {policyStatus && <p role="status" className="mt-2 text-emerald-700">{policyStatus}</p>}
          {policyError && <p role="alert" className="mt-2 text-red-700">{policyError}</p>}
        </div>
        <AiDisclosure uploaded={Boolean(activePolicy?.id)} />

        {/* First Visit */}
        {messages.length === 0 && (
          <SuggestedQuestions
            questions={suggestedQuestions}
            onSelect={askQuestion}
          />
        )}

        {/* Conversation */}
        {messages.length > 0 && (
          <div
            className="flex-1 space-y-6 pb-8"
            aria-live="polite"
            aria-busy={loading}
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm text-slate-500">
                    PolicyPal is checking the
                    handbook...
                  </p>

                  <div className="mt-3 flex gap-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <ChatInput
          question={question}
          loading={loading || resettingPolicy}
          onQuestionChange={setQuestion}
          onSubmit={() => askQuestion()}
        />
      </section>
    </main>
  );
}