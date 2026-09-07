export default function AiDisclosure() {
  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <p className="text-sm leading-6 text-blue-900">
        <strong>PolicyPal is an AI assistant.</strong>{" "}
        It answers questions using the approved employee handbook.
        It cannot access personal HR records such as salary,
        leave balances or performance history.
      </p>
    </div>
  );
}