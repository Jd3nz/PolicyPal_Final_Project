import type { ReactNode } from "react";
import PolicyHeader from "@/components/PolicyHeader";
import AppBackground from "@/components/AppBackground";
import PolicyIcon from "@/components/PolicyIcon";
import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<typeof PolicyHeader>;
type IconName = ComponentProps<typeof PolicyIcon>["name"];

export function PageContainer({ children, className = "", ...headerProps }: HeaderProps & { children: ReactNode; className?: string }) {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#eef6ff] text-[#081330]">
      <AppBackground />
      <PolicyHeader {...headerProps} />
      <main className={`relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-7xl flex-col px-4 py-7 sm:px-7 sm:py-9 lg:px-10 ${className}`}>
        {children}
      </main>
    </div>
  );
}

export function PageTitle({ eyebrow, title, children, icon }: { eyebrow: string; title: string; children: ReactNode; icon: IconName }) {
  return (
    <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12 sm:pt-3">
      <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-[linear-gradient(145deg,#ffffff,#ddecff)] text-blue-600 shadow-[0_18px_40px_-20px_rgba(37,99,235,0.6)] ring-1 ring-blue-100/80"><PolicyIcon name={icon} className="h-8 w-8" /></span>
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] text-[#081330] sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">{children}</p>
    </div>
  );
}

export function SectionCard({ title, icon, children, className = "" }: { title: string; icon: IconName; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[1.65rem] border border-white/90 bg-white/92 p-5 shadow-[0_24px_65px_-34px_rgba(30,64,175,0.55)] ring-1 ring-blue-100/70 backdrop-blur-xl sm:p-7 ${className}`}>
      <h2 className="mb-5 flex items-center gap-3 text-lg font-extrabold tracking-tight text-[#0b1740]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#eff6ff,#dbeafe)] text-blue-600 shadow-sm ring-1 ring-blue-100"><PolicyIcon name={icon} className="h-5 w-5" /></span>
        {title}
      </h2>
      {children}
    </section>
  );
}
