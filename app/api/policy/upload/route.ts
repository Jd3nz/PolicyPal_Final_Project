import { NextResponse } from "next/server";
import { extractPolicy } from "@/lib/policy-extract";
import { savePolicy } from "@/lib/policy-store";
import { MAX_POLICY_BYTES } from "@/lib/policy-shared";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) {
      return NextResponse.json({ error: "Upload a PDF or DOCX using the file field." }, { status: 400 });
    }
    // Bound the entire multipart request, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: "No document was uploaded." }, { status: 400 });
    const parts: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_POLICY_BYTES + 64 * 1024) {
        await reader.cancel();
        return NextResponse.json({ error: "The document must be 5 MB or smaller." }, { status: 413 });
      }
      parts.push(value);
    }
    const form = await new Response(Buffer.concat(parts), {
      headers: { "Content-Type": request.headers.get("content-type")! },
    }).formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a policy document first." }, { status: 400 });
    const sections = await extractPolicy(file);
    const name = file.name.split(/[\\/]/).pop()!.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 180);
    return NextResponse.json(savePolicy(name, sections), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "The upload failed. Please try again." }, { status: 400 });
  }
}