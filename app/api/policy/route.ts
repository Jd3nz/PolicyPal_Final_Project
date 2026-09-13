import { NextResponse } from "next/server";
import { deletePolicy, getPolicy } from "@/lib/policy-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const policy = getPolicy(id);
  if (!policy) return NextResponse.json({ error: "Your uploaded policy has expired. Upload it again or use the default handbook." }, { status: 404 });
  return NextResponse.json({ id: policy.id, name: policy.name, sectionCount: policy.sectionCount }, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (id) deletePolicy(id);
  return new Response(null, { status: 204 });
}