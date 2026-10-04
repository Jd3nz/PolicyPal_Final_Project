import PolicyIcon from "@/components/PolicyIcon";

type Props = { questions: string[]; onSelect: (question: string) => void; };

const topics = [
  { title: "Annual Leave", icon: "calendar", box: "from-blue-50 to-blue-100/75 border-blue-200", iconBox: "bg-blue-100 text-blue-700", glow: "hover:shadow-blue-200/70" },
  { title: "Working from Home", icon: "home", box: "from-emerald-50 to-emerald-100/55 border-emerald-200", iconBox: "bg-emerald-100 text-emerald-700", glow: "hover:shadow-emerald-200/60" },
  { title: "Sick Leave", icon: "health", box: "from-rose-50 to-rose-100/55 border-rose-200", iconBox: "bg-rose-100 text-rose-600", glow: "hover:shadow-rose-200/60" },
  { title: "Workplace Conduct", icon: "shield", box: "from-violet-50 to-violet-100/55 border-violet-200", iconBox: "bg-violet-100 text-violet-700", glow: "hover:shadow-violet-200/60" },
] as const;

export default function SuggestedQuestions({ questions, onSelect }: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center pb-8 pt-10 sm:pb-10 sm:pt-11">
      <div className="mx-auto w-full max-w-4xl text-center">
        <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-cyan-200/80 bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#dff5ff_48%,#badcff_100%)] text-blue-700 shadow-[0_0_70px_rgba(56,189,248,0.42)] ring-[10px] ring-white/35">
          <span className="absolute inset-4 rounded-full border border-blue-300/40" />
          <PolicyIcon name="bot" className="relative h-14 w-14 drop-shadow-[0_8px_14px_rgba(37,99,235,0.28)]" />
          <span className="absolute -right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg"><PolicyIcon name="sparkles" className="h-3.5 w-3.5" /></span>
        </div>
        <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#081330] sm:text-5xl lg:text-[3.55rem]">
          What can I help you with <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">today?</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-lg">
          Ask questions about leave, benefits, flexible work, workplace conduct, and other company HR policies.
        </p>
      </div>

      <div className="mx-auto mt-9 grid w-full max-w-5xl gap-4 sm:mt-10 sm:grid-cols-2">
        {questions.map((question, index) => {
          const topic = topics[index] ?? topics[0];
          return (
            <button key={question} type="button" onClick={() => onSelect(question)} className={`group flex items-center gap-4 rounded-2xl border bg-gradient-to-r ${topic.box} p-4 text-left shadow-[0_14px_35px_-22px_rgba(30,64,175,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-xl ${topic.glow} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:p-5`}>
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${topic.iconBox} shadow-inner ring-1 ring-white/80`}><PolicyIcon name={topic.icon} className="h-7 w-7" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-extrabold text-[#0a1742] sm:text-lg">{topic.title}</span>
                <span className="mt-1 block text-sm font-medium leading-6 text-slate-600 sm:text-[15px]">{question}</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#15377f] shadow-sm transition group-hover:translate-x-0.5 group-hover:bg-white"><PolicyIcon name="arrow" className="h-4 w-4" /></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
