import Link from "next/link";
import PolicyIcon from "@/components/PolicyIcon";

type Props = {
  hasMessages?: boolean;
  onClear?: () => void;
  currentPage?: "chat" | "about" | "upload";
};

export default function PolicyHeader({ hasMessages = false, onClear, currentPage = "chat" }: Props) {
  const navClass = "rounded-xl px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 aria-[current=page]:bg-white/14 aria-[current=page]:text-white aria-[current=page]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]";

  return (
    <header className="relative z-30 overflow-hidden rounded-b-[2rem] border-b border-cyan-300/20 bg-[linear-gradient(110deg,#071a4d_0%,#0b2e78_48%,#081a4e_100%)] text-white shadow-[0_18px_55px_-24px_rgba(5,31,92,0.85)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(57,189,248,0.32),transparent_24%),radial-gradient(circle_at_82%_-10%,rgba(37,99,235,0.3),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-[linear-gradient(145deg,#4aa8ff,#4f46e5)] text-white shadow-[0_0_28px_rgba(49,215,255,0.35)] transition group-hover:scale-[1.03]">
            <PolicyIcon name="book" className="h-7 w-7" />
          </span>
          <span>
            <span className="block text-2xl font-extrabold tracking-tight text-white">PolicyPal</span>
            <span className="block text-xs font-medium text-blue-100/90 sm:text-sm">HR Policy Q&amp;A Assistant</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 sm:gap-2">
            <Link href="/" aria-current={currentPage === "chat" ? "page" : undefined} className={navClass}>Chat</Link>
            <Link href="/about" aria-current={currentPage === "about" ? "page" : undefined} className={navClass}>About</Link>
            <Link href="/upload" aria-current={currentPage === "upload" ? "page" : undefined} className={navClass}>Upload Policy</Link>
          </nav>
          {hasMessages && <button type="button" onClick={onClear} className={navClass}>New chat</button>}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/55 bg-blue-600/35 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(49,215,255,0.28)] backdrop-blur-sm">
            <PolicyIcon name="sparkles" className="h-3.5 w-3.5 text-cyan-200" /> AI Assistant
          </span>
        </div>
      </div>
    </header>
  );
}
