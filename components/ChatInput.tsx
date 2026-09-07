import { FormEvent } from "react";

type Props = {
  question: string;
  loading: boolean;
  onQuestionChange: (value: string) => void;
  onSubmit: () => void;
};

export default function ChatInput({
  question,
  loading,
  onQuestionChange,
  onSubmit,
}: Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="sticky bottom-0 bg-slate-50 pb-4 pt-3">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="question" className="sr-only">
            Ask an HR policy question
          </label>

          <textarea
            id="question"
            rows={1}
            value={question}
            onChange={(event) =>
              onQuestionChange(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Ask a question about HR policy..."
            className="max-h-40 min-h-12 flex-1 resize-none rounded-xl px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="h-12 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Send
          </button>
        </div>
      </form>

      <p className="mt-2 text-center text-xs text-slate-400">
        For personal or sensitive employment matters,
        contact People & Culture.
      </p>
    </div>
  );
}