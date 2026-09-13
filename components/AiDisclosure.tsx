import PolicyIcon from "@/components/PolicyIcon";

export default function AiDisclosure() {
  return (
    <div className="mt-2 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 shadow-sm shadow-blue-100/30 backdrop-blur-sm">
      <PolicyIcon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
      <p className="text-xs leading-6 text-slate-500 sm:text-sm">
        <span className="font-medium text-slate-700">PolicyPal answers using your active company policy.</span>{" "}
        It does not have access to personal employee records such as salary,
        leave balances or performance history.
      </p>
    </div>
  );
}
