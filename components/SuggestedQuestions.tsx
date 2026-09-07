type Props = {
  questions: string[];
  onSelect: (question: string) => void;
};

export default function SuggestedQuestions({
  questions,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center py-10">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="mb-5 text-5xl">📘</div>

        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          How can I help?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          Ask a question about leave, working arrangements,
          benefits, workplace conduct or other company HR policies.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {questions.map((question) => (
            <button
              key={question}
              onClick={() => onSelect(question)}
              className="rounded-xl border border-slate-200 bg-white p-4 text-left text-sm text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}