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
        <div className="max-w-[90%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-blue-600 px-5 py-4 text-sm leading-6 text-white shadow-sm sm:max-w-[80%]">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div
        className={`w-full max-w-2xl rounded-2xl border bg-white p-5 shadow-sm shadow-blue-100/40 sm:p-6 ${
          message.escalated
            ? "border-amber-300 border-l-4 border-l-amber-500"
            : "border-slate-200 border-l-4 border-l-blue-600"
        }`}
      >
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          PolicyPal
        </div>

        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
          {message.content}
        </p>

        {message.section && (
          <div className="mt-4 border-t border-dashed border-slate-200 pt-3">
            <p className="break-words text-xs font-medium leading-5 text-blue-700">
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