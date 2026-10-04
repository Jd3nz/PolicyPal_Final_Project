import type { ReactNode } from "react";
import PolicyHeader from "@/components/PolicyHeader";
import AppBackground from "@/components/AppBackground";
import PolicyIcon from "@/components/PolicyIcon";
import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<typeof PolicyHeader>;
type IconName = ComponentProps<typeof PolicyIcon>["name"];

export function PageContainer({ children, className = "", ...headerProps }: HeaderProps & { children: ReactNode; className?: string }) {
  return (
<<<<<<< HEAD
    <div className="relative isolate min-h-screen bg-gradient-to-b from-[#eff5ff] via-[#f7faff] to-white text-slate-900">
      <AppBackground />
      <PolicyHeader {...headerProps} />
      <main className={`relative z-10 mx-auto flex min-h-[calc(100vh-94px)] w-full max-w-6xl flex-col px-5 py-7 sm:px-8 sm:py-10 ${className}`}>
=======
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#eef6ff] text-[#081330]">
      <AppBackground />
      <PolicyHeader {...headerProps} />
      <main className={`relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-7xl flex-col px-4 py-7 sm:px-7 sm:py-9 lg:px-10 ${className}`}>
>>>>>>> 1619a4c (Update PolicyPal premium UI)
        {children}
      </main>
    </div>
  );
}

export function PageTitle({ eyebrow, title, children, icon }: { eyebrow: string; title: string; children: ReactNode; icon: IconName }) {
  return (
<<<<<<< HEAD
    <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12 sm:pt-3">
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-blue-100 text-blue-600 shadow-lg shadow-blue-100/50"><PolicyIcon name={icon} className="h-7 w-7" /></span>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">{children}</p>
=======
    <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12 sm:pt-3">
      <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-[linear-gradient(145deg,#ffffff,#ddecff)] text-blue-600 shadow-[0_18px_40px_-20px_rgba(37,99,235,0.6)] ring-1 ring-blue-100/80"><PolicyIcon name={icon} className="h-8 w-8" /></span>
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.035em] text-[#081330] sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">{children}</p>
>>>>>>> 1619a4c (Update PolicyPal premium UI)
    </div>
  );
}

export function SectionCard({ title, icon, children, className = "" }: { title: string; icon: IconName; children: ReactNode; className?: string }) {
  return (
<<<<<<< HEAD
    <section className={`rounded-2xl border border-white/90 bg-white/85 p-5 shadow-[0_8px_32px_-16px_rgba(30,64,175,0.18)] ring-1 ring-slate-200/60 backdrop-blur-sm sm:p-7 ${className}`}>
      <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-800">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><PolicyIcon name={icon} className="h-5 w-5" /></span>
=======
    <section className={`rounded-[1.65rem] border border-white/90 bg-white/92 p-5 shadow-[0_24px_65px_-34px_rgba(30,64,175,0.55)] ring-1 ring-blue-100/70 backdrop-blur-xl sm:p-7 ${className}`}>
      <h2 className="mb-5 flex items-center gap-3 text-lg font-extrabold tracking-tight text-[#0b1740]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#eff6ff,#dbeafe)] text-blue-600 shadow-sm ring-1 ring-blue-100"><PolicyIcon name={icon} className="h-5 w-5" /></span>
>>>>>>> 1619a4c (Update PolicyPal premium UI)
        {title}
      </h2>
      {children}
    </section>
  );
}
