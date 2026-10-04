import PolicyIcon from "@/components/PolicyIcon";

export default function AiDisclosure() {
  return (
    <div className="mt-3 flex items-start gap-3 rounded-2xl border border-blue-200/90 bg-[linear-gradient(90deg,rgba(239,247,255,.98),rgba(224,242,254,.86))] px-5 py-4 shadow-[0_12px_32px_-22px_rgba(37,99,235,0.42)]">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-200"><PolicyIcon name="info" className="h-4 w-4" /></span>
      <p className="text-xs font-medium leading-6 text-slate-600 sm:text-sm">
        <span className="font-extrabold text-[#163d8f]">PolicyPal answers using your active company policy.</span>{" "}
        It does not have access to personal employee records such as salary, leave balances or performance history.
      </p>
    </div>
  );
}
