"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PolicyIcon from "@/components/PolicyIcon";
import { fetchActivePolicy, resetActivePolicy } from "@/lib/policy-client";
import type { PolicySummary } from "@/lib/policy-shared";

import { PageContainer } from "@/components/PageLayout";

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
    <PageContainer hasMessages={messages.length > 0} onClear={clearChat}>
        <div className="rounded-2xl border border-white/90 bg-white/90 p-5 shadow-[0_8px_32px_-16px_rgba(30,64,175,0.18)] ring-1 ring-slate-200/60 backdrop-blur-sm sm:p-6" aria-live="polite">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600"><PolicyIcon name="document" className="h-6 w-6" /></span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">Active Policy</p>
                <p className="mt-1 break-words text-base font-semibold text-slate-800 sm:text-lg">{activePolicy ? activePolicy.id ? activePolicy.name : "Default Employee Handbook" : "Not yet confirmed"}</p>
                {activePolicy && <p className="mt-1 text-xs text-slate-500 sm:text-sm">{activePolicy.id ? "Your uploaded company policy" : "NovaTech · Built-in handbook"}</p>}
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {activePolicy && <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span>}
              <Link href="/upload" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Change policy</Link>
              {activePolicy?.id && (
                <button type="button" onClick={useDefaultPolicy} disabled={loading || resettingPolicy} className="rounded-lg px-2 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
                  {resettingPolicy ? "Restoring default policy..." : "Use Default Policy"}
                </button>
              )}
            </div>
          </div>
          {policyStatus && <p role="status" className="mt-3 text-sm text-emerald-700">{policyStatus}</p>}
          {policyError && <p role="alert" className="mt-3 text-sm text-red-700">{policyError}</p>}
        </div>
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
            className="mx-auto w-full max-w-4xl flex-1 space-y-6 py-8"
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
                <div className="rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
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

        <div className="mx-auto w-full max-w-4xl">
          <ChatInput
            question={question}
            loading={loading || resettingPolicy}
            onQuestionChange={setQuestion}
            onSubmit={() => askQuestion()}
          />
          <AiDisclosure />
          <p className="mt-6 border-t border-slate-200/70 pt-5 text-center text-xs leading-6 text-slate-400">
            For personal or sensitive employment matters, contact People &amp; Culture.
          </p>
        </div>
    </PageContainer>
  );
}