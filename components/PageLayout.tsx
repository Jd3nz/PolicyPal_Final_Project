import type { ReactNode } from "react";
import PolicyHeader from "@/components/PolicyHeader";
import AppBackground from "@/components/AppBackground";
import PolicyIcon from "@/components/PolicyIcon";
import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<typeof PolicyHeader>;
type IconName = ComponentProps<typeof PolicyIcon>["name"];

export function PageContainer({ children, className = "", ...headerProps }: HeaderProps & { children: ReactNode; className?: string }) {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-[#eff5ff] via-[#f7faff] to-white text-slate-900">
      <AppBackground />
      <PolicyHeader {...headerProps} />
      <main className={`relative z-10 mx-auto flex min-h-[calc(100vh-94px)] w-full max-w-6xl flex-col px-5 py-7 sm:px-8 sm:py-10 ${className}`}>
        {children}
      </main>
    </div>
  );
}

export function PageTitle({ eyebrow, title, children, icon }: { eyebrow: string; title: string; children: ReactNode; icon: IconName }) {
  return (
    <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12 sm:pt-3">
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-blue-100 text-blue-600 shadow-lg shadow-blue-100/50"><PolicyIcon name={icon} className="h-7 w-7" /></span>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">{children}</p>
    </div>
  );
}

export function SectionCard({ title, icon, children, className = "" }: { title: string; icon: IconName; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/90 bg-white/85 p-5 shadow-[0_8px_32px_-16px_rgba(30,64,175,0.18)] ring-1 ring-slate-200/60 backdrop-blur-sm sm:p-7 ${className}`}>
      <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-800">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><PolicyIcon name={icon} className="h-5 w-5" /></span>
        {title}
      </h2>
      {children}
    </section>
  );
}
