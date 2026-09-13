import PolicyIcon from "@/components/PolicyIcon";

type Props = {
  questions: string[];
  onSelect: (question: string) => void;
};

const topics = [
  { title: "Annual Leave", icon: "calendar", color: "bg-blue-50 text-blue-600" },
  { title: "Working from Home", icon: "home", color: "bg-emerald-50 text-emerald-600" },
  { title: "Sick Leave", icon: "health", color: "bg-rose-50 text-rose-500" },
  { title: "Workplace Conduct", icon: "shield", color: "bg-violet-50 text-violet-600" },
] as const;

export default function SuggestedQuestions({ questions, onSelect }: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center pb-8 pt-10 sm:pb-10 sm:pt-12">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-gradient-to-br from-white to-blue-100 text-blue-600 shadow-lg shadow-blue-100/60">
          <PolicyIcon name="bot" className="h-11 w-11" />
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#f6f9ff] bg-blue-600 text-white">
            <PolicyIcon name="sparkles" className="h-3 w-3" />
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
          What can I help you with today?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Ask questions about leave, benefits, flexible work, workplace conduct,
          and other company HR policies.
        </p>
      </div>
      <div className="mx-auto mt-8 grid w-full max-w-4xl gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
        {questions.map((question, index) => {
          const topic = topics[index] ?? { title: "Policy question", icon: "document", color: "bg-blue-50 text-blue-600" };
          return (
            <button key={question} type="button" onClick={() => onSelect(question)} className="group flex items-center gap-4 rounded-2xl border border-white/90 bg-white/90 p-5 text-left shadow-[0_8px_24px_-16px_rgba(30,64,175,0.2)] ring-1 ring-slate-200/60 backdrop-blur-sm transition hover:border-blue-300 hover:bg-blue-50/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:p-6">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${topic.color}`}><PolicyIcon name={topic.icon} className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-800 sm:text-base">{topic.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-500">{question}</span>
              </span>
              <PolicyIcon name="arrow" className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
