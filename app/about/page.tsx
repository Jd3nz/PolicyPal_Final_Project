import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer, SectionCard } from "@/components/PageLayout";
import PolicyIcon from "@/components/PolicyIcon";

export const metadata: Metadata = {
  title: "About PolicyPal",
  description: "Learn how PolicyPal helps employees understand workplace policies with clear answers and source references.",
};

const features = [
  {
    title: "Ask naturally",
    description: "Enter a question about leave, flexible work, expenses or another workplace policy without needing to know the correct section number.",
    icon: "sparkles" as const,
  },
  {
    title: "Use a relevant policy",
    description: "Explore the built-in demonstration handbook or upload a company policy in PDF or DOCX format.",
    icon: "document" as const,
  },
  {
    title: "See the basis of the answer",
    description: "Responses include a handbook section or uploaded-excerpt reference to support checking against the policy document.",
    icon: "book" as const,
  },
  {
    title: "Know when to seek help",
    description: "For unsupported questions and matters requiring personal or professional advice, PolicyPal guides users towards People & Culture or their manager.",
    icon: "shield" as const,
  },
];

export default function AboutPage() {
  return (
    <PageContainer currentPage="about" className="gap-5 pb-14 sm:gap-6 sm:pb-20">
      <header className="mx-auto mb-3 max-w-3xl text-center sm:mb-6 sm:pt-3">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-blue-100 text-blue-600 shadow-lg shadow-blue-100/50">
          <PolicyIcon name="book" className="h-7 w-7" />
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">About PolicyPal</h1>
<<<<<<< HEAD
        <p className="mt-3 text-lg font-semibold text-blue-700 sm:text-xl">Workplace policies, easier to understand.</p>
=======
        <p className="mt-3 text-lg font-extrabold text-blue-700 sm:text-xl">Workplace policies, easier to understand.</p>
>>>>>>> 1619a4c (Update PolicyPal premium UI)
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          PolicyPal is an AI-powered HR policy assistant that helps employees find clear answers to everyday workplace questions. It brings relevant information from an employee handbook or uploaded company policy into a simple conversation, with references that show where the answer comes from.
        </p>
      </header>

      <SectionCard title="The problem we are addressing" icon="info">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          <p>Understanding a workplace policy is not always straightforward. An employee may need to check how annual leave works, what the working-from-home policy allows, or how to raise a workplace concern. Finding that information can mean searching a lengthy handbook, interpreting unfamiliar language and working out which section applies.</p>
          <p>When answers are difficult to find, employees can feel uncertain about their next step. HR teams may also receive the same routine questions repeatedly, adding to their workload and reducing the time available for matters that need individual attention.</p>
          <p>We created PolicyPal to make this everyday experience simpler.</p>
        </div>
      </SectionCard>

      <SectionCard title="How PolicyPal helps" icon="sparkles">
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          PolicyPal lets users ask questions in their own words. It retrieves relevant content from the selected policy and uses AI to explain that information in a concise, accessible way.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
<<<<<<< HEAD
            <li key={feature.title} className="rounded-xl border border-blue-100/80 bg-gradient-to-b from-blue-50/70 to-white p-5 shadow-sm shadow-blue-100/40">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-blue-100">
=======
            <li key={feature.title} className="rounded-2xl border border-blue-100 bg-[linear-gradient(180deg,#f7fbff,#ffffff)] p-5 shadow-[0_16px_38px_-28px_rgba(37,99,235,0.55)] transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.48)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(145deg,#ffffff,#dceeff)] text-blue-700 shadow-sm ring-1 ring-blue-100">
>>>>>>> 1619a4c (Update PolicyPal premium UI)
                <PolicyIcon name={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-slate-800">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Supporting employees and HR teams" icon="health">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          <p>For employees, PolicyPal offers a practical starting point for understanding workplace policies and preparing informed questions. For HR teams, it is designed to reduce repetitive enquiries by making routine policy information easier to access.</p>
          <p>Our aim is to help people spend less time searching and more time understanding what the policy means for their next step.</p>
        </div>
      </SectionCard>

      <SectionCard title="Keeping people involved" icon="shield" className="border-blue-200/90 bg-blue-50/85 ring-blue-100">
        <p className="max-w-3xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          PolicyPal supports access to information; employment decisions and individual concerns still require human judgement. It does not access personal employee records or automatically contact HR. Users should confirm important information against the policy document and seek guidance from the appropriate person when needed.
        </p>
      </SectionCard>

      <SectionCard title="About the project" icon="book">
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          PolicyPal was developed as an academic prototype for the COIT13232 Business Analysis Project. The project explores how AI can make workplace policy information more accessible while keeping answers connected to their source and recognising when human support is needed.
        </p>
      </SectionCard>

<<<<<<< HEAD
      <section className="rounded-2xl border border-blue-100 bg-white/85 px-5 py-8 text-center shadow-sm shadow-blue-100/50 sm:px-8 sm:py-10">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Have a workplace policy question?</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">Start a conversation with PolicyPal.</p>
        <Link href="/" className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
=======
      <section className="overflow-hidden rounded-[1.7rem] border border-blue-200 bg-[linear-gradient(135deg,#0b2e78,#155eef)] px-5 py-9 text-center text-white shadow-[0_24px_60px_-30px_rgba(30,64,175,0.7)] sm:px-8 sm:py-11">
        <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">Have a workplace policy question?</h2>
        <p className="mt-2 text-sm font-medium leading-7 text-blue-100 sm:text-base">Start a conversation with PolicyPal.</p>
        <Link href="/" className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
>>>>>>> 1619a4c (Update PolicyPal premium UI)
          Start a conversation
        </Link>
      </section>
    </PageContainer>
  );
}
