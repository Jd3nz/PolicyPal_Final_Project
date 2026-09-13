import Link from "next/link";

type Props = {
  hasMessages?: boolean;
  onClear?: () => void;
  currentPage?: "chat" | "about" | "upload";
};

export default function PolicyHeader({
  hasMessages = false,
  onClear,
  currentPage = "chat",
}: Props) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div>
          <Link
            href="/"
            className="rounded text-xl font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            PolicyPal
          </Link>
          <p className="text-sm text-slate-500">
            HR Policy Q&A Assistant
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <nav aria-label="Main navigation" className="flex items-center gap-3">
            {currentPage !== "chat" && (
              <Link href="/" className="rounded py-2 text-sm text-slate-600 transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
                Chat
              </Link>
            )}
            <Link
              href="/about"
              aria-current={currentPage === "about" ? "page" : undefined}
              className="rounded py-2 text-sm font-medium text-slate-600 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 aria-[current=page]:text-blue-700"
            >
              About
            </Link>
            <Link
              href="/upload"
              aria-current={currentPage === "upload" ? "page" : undefined}
              className="rounded py-2 text-sm font-medium text-slate-600 transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 aria-[current=page]:text-blue-700"
            >
              Upload Policy
            </Link>
          </nav>
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
