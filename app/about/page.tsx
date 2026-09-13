import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer, PageTitle, SectionCard } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "About PolicyPal",
  description:
    "Learn how PolicyPal uses AI and the approved employee handbook to answer workplace policy questions with privacy and escalation controls.",
};

const capabilities = [
  {
    title: "Find relevant policies",
    description: "Finds the handbook sections relevant to an employee's workplace policy question.",
  },
  {
    title: "Give concise answers",
    description: "Uses Claude AI to generate a concise answer grounded in the approved employee handbook.",
  },
  {
    title: "Show the source",
    description: "Displays the relevant policy section citation so employees can refer to the source.",
  },
  {
    title: "Refer questions to people",
    description: "Escalates unsupported or sensitive questions to People & Culture.",
  },
];

const steps = [
  "You ask a workplace policy question.",
  "The system retrieves relevant handbook sections.",
  "The relevant content is sent to Claude.",
  "Claude returns a grounded answer.",
  "PolicyPal displays the answer and policy section citation.",
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Anthropic Claude API",
];

export default function AboutPage() {
  return (
    <PageContainer currentPage="about">
      <PageTitle eyebrow="Workplace policies, made accessible" title="About PolicyPal" icon="book">
        An AI-powered HR policy assistant that helps employees find clear answers
        in their approved handbook or active company policy, with sources they can check.
      </PageTitle>
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <SectionCard title="What PolicyPal Does" icon="sparkles" className="lg:col-span-2">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <li key={capability.title} className="rounded-xl border border-blue-100/60 bg-gradient-to-b from-blue-50/70 to-white p-5">
                <span className="text-xs font-semibold tracking-widest text-blue-500">0{index + 1}</span>
                <h3 className="mt-3 text-sm font-semibold text-slate-800">{capability.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{capability.description}</p>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="How It Works" icon="bot">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xs font-semibold text-blue-600">{index + 1}</span>
                <p className="text-sm leading-7 text-slate-600">{step}</p>
              </li>
            ))}
          </ol>
        </SectionCard>
        <SectionCard title="Privacy & Limitations" icon="shield">
          <p className="mb-4 text-sm leading-7 text-slate-600">Helpful policy guidance, with clear boundaries.</p>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-slate-600 marker:text-blue-400">
            <li>PolicyPal does not access personal employee records.</li>
            <li>Personal leave balances, salary, tax, grievance outcomes, and performance records are outside its scope.</li>
            <li>It does not provide legal or medical advice.</li>
            <li>These questions should go to People &amp; Culture or the employee&apos;s manager.</li>
          </ul>
        </SectionCard>
        <SectionCard title="Technology" icon="sparkles">
          <p className="mb-5 text-sm leading-7 text-slate-600">A modern web application with AI-assisted answers and document-based retrieval.</p>
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => <li key={technology} className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-medium text-blue-800">{technology}</li>)}
          </ul>
        </SectionCard>
        <SectionCard title="Project Purpose" icon="book">
          <p className="text-sm leading-7 text-slate-600">An academic prototype for the COIT13232 Business Analysis Project, exploring how AI can improve access to workplace policy information while maintaining privacy and escalation controls.</p>
          <Link href="/" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Back to chat</Link>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
