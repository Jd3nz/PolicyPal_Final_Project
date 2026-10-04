export type Message = { id: number; role: "user" | "assistant"; content: string; section?: string; escalated?: boolean; };
type Props = { message: Message; };

export default function ChatMessage({ message }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[90%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-[linear-gradient(135deg,#155eef,#2f55f4)] px-5 py-4 text-sm font-medium leading-6 text-white shadow-[0_12px_28px_-14px_rgba(37,99,235,0.7)] sm:max-w-[80%]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className={`w-full max-w-2xl rounded-2xl border bg-white/96 p-5 shadow-[0_20px_45px_-28px_rgba(30,64,175,0.55)] sm:p-6 ${message.escalated ? "border-amber-300 border-l-4 border-l-amber-500" : "border-blue-100 border-l-4 border-l-blue-600"}`}>
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#31529a]">PolicyPal</div>
        <p className="whitespace-pre-wrap break-words text-sm font-medium leading-7 text-slate-700">{message.content}</p>
        {message.section && <div className="mt-4 border-t border-dashed border-blue-100 pt-3"><p className="break-words text-xs font-bold leading-5 text-blue-700">§ {message.section}</p></div>}
        {message.escalated && <div className="mt-4 border-t border-dashed border-amber-200 pt-3"><p className="text-xs font-bold text-amber-700">→ Referred to People &amp; Culture</p></div>}
      </div>
    </div>
  );
}
