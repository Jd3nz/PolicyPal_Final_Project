import { FormEvent } from "react";
import PolicyIcon from "@/components/PolicyIcon";

<<<<<<< HEAD
type Props = {
  question: string;
  loading: boolean;
  onQuestionChange: (value: string) => void;
  onSubmit: () => void;
};

export default function ChatInput({ question, loading, onQuestionChange, onSubmit }: Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="sticky bottom-0 z-10 rounded-2xl bg-white/30 pb-3 pt-3 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-blue-200/80 bg-white/95 p-2.5 shadow-lg shadow-blue-100/60 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 sm:p-3">
        <div className="flex items-end gap-1 sm:gap-3">
          <span className="hidden h-12 w-10 shrink-0 items-center justify-center text-blue-500 sm:flex"><PolicyIcon name="sparkles" className="h-5 w-5" /></span>
          <label htmlFor="question" className="sr-only">Ask an HR policy question</label>
          <textarea
            id="question" rows={1} value={question}
            onChange={(event) => onQuestionChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Ask a question about HR policy..."
            className="max-h-40 min-h-12 min-w-0 flex-1 resize-none rounded-xl px-2 py-3 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 sm:px-1 sm:text-base"
          />
          <button type="submit" disabled={!question.trim() || loading} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none sm:px-6">
=======
type Props = { question: string; loading: boolean; onQuestionChange: (value: string) => void; onSubmit: () => void; };

export default function ChatInput({ question, loading, onQuestionChange, onSubmit }: Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); onSubmit(); }
  return (
    <div className="sticky bottom-0 z-10 rounded-3xl bg-white/20 pb-3 pt-3 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="rounded-[1.55rem] border border-blue-300/80 bg-white/96 p-2.5 shadow-[0_22px_60px_-28px_rgba(29,78,216,0.68),0_0_0_4px_rgba(255,255,255,0.5)] focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-200/35 sm:p-3">
        <div className="flex items-end gap-2 sm:gap-3">
          <span className="hidden h-12 w-11 shrink-0 items-center justify-center text-blue-600 sm:flex"><PolicyIcon name="sparkles" className="h-6 w-6" /></span>
          <label htmlFor="question" className="sr-only">Ask an HR policy question</label>
          <textarea id="question" rows={1} value={question} onChange={(event) => onQuestionChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); onSubmit(); } }} placeholder="Ask a question about HR policy..." className="max-h-40 min-h-12 min-w-0 flex-1 resize-none rounded-xl bg-transparent px-2 py-3 text-sm font-medium leading-6 text-[#0b1740] outline-none placeholder:text-slate-400 sm:px-1 sm:text-base" />
          <button type="submit" disabled={!question.trim() || loading} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#0b73ff,#3157f5)] px-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.34),0_0_18px_rgba(49,215,255,0.28)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-none disabled:bg-blue-300 disabled:shadow-none sm:px-7">
>>>>>>> 1619a4c (Update PolicyPal premium UI)
            <PolicyIcon name="send" className="h-4 w-4" /> Send
          </button>
        </div>
      </form>
    </div>
  );
}
