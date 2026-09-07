"use client";

import { useState } from "react";

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

  async function askQuestion(text?: string) {
    const submittedQuestion = (
      text ?? question
    ).trim();

    if (!submittedQuestion || loading) {
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

    try {
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
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to get PolicyPal response.");
    }

    const result = await response.json();

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
    } catch {
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
        <AiDisclosure />

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
          loading={loading}
          onQuestionChange={setQuestion}
          onSubmit={() => askQuestion()}
        />
      </section>
    </main>
  );
}