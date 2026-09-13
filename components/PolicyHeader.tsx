import Link from "next/link";
import PolicyIcon from "@/components/PolicyIcon";

type Props = {
  hasMessages?: boolean;
  onClear?: () => void;
  currentPage?: "chat" | "about" | "upload";
};

export default function PolicyHeader({ hasMessages = false, onClear, currentPage = "chat" }: Props) {
  const navClass = "rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-[current=page]:bg-blue-50 aria-[current=page]:text-blue-700 aria-[current=page]:shadow-sm";

  return (
    <header className="relative z-20 border-b border-white/80 bg-white/80 shadow-sm shadow-blue-100/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
            <PolicyIcon name="book" className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-2xl font-bold tracking-tight text-slate-900">PolicyPal</span>
            <span className="block text-xs text-slate-500 sm:text-sm">HR Policy Q&amp;A Assistant</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 sm:gap-3">
            <Link href="/" aria-current={currentPage === "chat" ? "page" : undefined} className={navClass}>Chat</Link>
            <Link href="/about" aria-current={currentPage === "about" ? "page" : undefined} className={navClass}>About</Link>
            <Link href="/upload" aria-current={currentPage === "upload" ? "page" : undefined} className={navClass}>Upload Policy</Link>
          </nav>
          {hasMessages && <button type="button" onClick={onClear} className={navClass}>New chat</button>}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
            <PolicyIcon name="sparkles" className="h-3.5 w-3.5" /> AI Assistant
          </span>
        </div>
      </div>
    </header>
  );
}
