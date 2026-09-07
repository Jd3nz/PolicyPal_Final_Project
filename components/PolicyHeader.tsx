type Props = {
  hasMessages: boolean;
  onClear: () => void;
};

export default function PolicyHeader({
  hasMessages,
  onClear,
}: Props) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            PolicyPal
          </h1>

          <p className="text-sm text-slate-500">
            HR Policy Q&A Assistant
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasMessages && (
            <button
              onClick={onClear}
              className="text-sm text-slate-500 transition hover:text-slate-900"
            >
              New chat
            </button>
          )}

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            AI Assistant
          </span>
        </div>
      </div>
    </header>
  );
}