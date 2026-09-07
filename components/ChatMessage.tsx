export type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  section?: string;
  escalated?: boolean;
};

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-slate-900 px-4 py-3 text-sm leading-6 text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        className={`w-full max-w-2xl rounded-xl border bg-white p-5 shadow-sm ${
          message.escalated
            ? "border-amber-300 border-l-4 border-l-amber-500"
            : "border-slate-200 border-l-4 border-l-blue-600"
        }`}
      >
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          PolicyPal
        </div>

        <p className="text-sm leading-7 text-slate-700">
          {message.content}
        </p>

        {message.section && (
          <div className="mt-4 border-t border-dashed border-slate-200 pt-3">
            <p className="text-xs font-medium text-blue-700">
              § {message.section}
            </p>
          </div>
        )}

        {message.escalated && (
          <div className="mt-4 border-t border-dashed border-amber-200 pt-3">
            <p className="text-xs font-medium text-amber-700">
              → Referred to People & Culture
            </p>
          </div>
        )}
      </div>
    </div>
  );
}