import type { Metadata } from "next";
import Link from "next/link";
import PolicyHeader from "@/components/PolicyHeader";

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <PolicyHeader currentPage="about" />

      <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 sm:space-y-12 sm:py-14">
        <section aria-labelledby="about-title" className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-blue-700">
            Workplace policies, made accessible
          </p>
          <h1 id="about-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            About PolicyPal
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            PolicyPal is an AI-powered HR policy assistant that helps employees
            ask workplace policy questions. Its answers are grounded in the
            approved employee handbook, making policy information easier to find
            and understand.
          </p>
        </section>

        <section aria-labelledby="capabilities-title">
          <h2 id="capabilities-title" className="text-xl font-semibold tracking-tight">
            What PolicyPal Does
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <li key={capability.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="font-semibold">{capability.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {capability.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="workflow-title" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 id="workflow-title" className="text-xl font-semibold tracking-tight">
            How It Works
          </h2>
          <ol className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-slate-600">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="privacy-title" className="rounded-xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
          <h2 id="privacy-title" className="text-xl font-semibold tracking-tight text-blue-900">
            Privacy and Limitations
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-blue-900">
            <li>PolicyPal does not access personal employee records.</li>
            <li>
              It should not answer questions about personal leave balances,
              salary, tax, grievance outcomes, or performance records.
            </li>
            <li>It does not provide legal or medical advice.</li>
            <li>
              These questions should be referred to People &amp; Culture or the
              employee&apos;s manager.
            </li>
          </ul>
        </section>

        <section aria-labelledby="technology-title">
          <h2 id="technology-title" className="text-xl font-semibold tracking-tight">
            Technology
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="purpose-title" className="border-t border-slate-200 pt-8">
          <h2 id="purpose-title" className="text-xl font-semibold tracking-tight">
            Project Purpose
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            PolicyPal is an academic prototype for the COIT13232 Business
            Analysis Project. It explores how AI can improve access to workplace
            policy information while maintaining privacy and escalation controls.
          </p>
          <Link href="/" className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
            Back to chat
          </Link>
        </section>
      </main>
    </div>
  );
}
