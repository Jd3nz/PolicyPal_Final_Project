import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import type { HandbookSection } from "@/data/handbook";
import { validatePolicyFile } from "@/lib/policy-shared";

export function chunkPolicyText(text: string): HandbookSection[] {
  const normalized = text.replace(/\r\n?/g, "\n").replace(/\u0000/g, "").trim();
  if (normalized.length < 30 || !/\p{L}{3}/u.test(normalized)) {
    throw new Error("No readable policy text was found. Scanned PDFs need OCR first; upload a document with selectable text.");
  }
  if (normalized.length > 500_000) throw new Error("The document contains too much text. Upload a shorter policy (up to 500,000 characters).");

  const words = normalized.split(/\s+/);
  const sections: HandbookSection[] = [];
  // 350-word chunks with 50-word overlap preserve context across boundaries.
  for (let start = 0; start < words.length; start += 300) {
    const number = sections.length + 1;
    sections.push({
      section: `U${number}`,
      title: `Uploaded policy - excerpt ${number}`,
      content: words.slice(start, start + 350).join(" "),
      keywords: [],
    });
    if (start + 350 >= words.length) break;
  }
  return sections;
}

export async function extractPolicy(file: File): Promise<HandbookSection[]> {
  const validation = validatePolicyFile(file);
  if (validation) throw new Error(validation);
  const buffer = Buffer.from(await file.arrayBuffer());
  let text: string;

  if (/\.pdf$/i.test(file.name)) {
    if (!buffer.subarray(0, 1024).includes(Buffer.from("%PDF-"))) {
      throw new Error("This file is not a valid PDF document.");
    }
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    try {
      const result = await parser.getText({ pageJoiner: "\n\n" });
      text = result.text;
    } catch {
      throw new Error("Could not read this PDF. Check that it is not damaged or password-protected.");
    } finally {
      await parser.destroy();
    }
  } else {
    if (buffer.length < 4 || buffer.readUInt32LE(0) !== 0x04034b50) throw new Error("This file is not a valid DOCX document.");
    try {
      // Raw text only: no HTML rendering, images, or external resource access.
      text = (await mammoth.extractRawText({ buffer })).value;
    } catch {
      throw new Error("Could not read this DOCX. Check that it is a valid, unencrypted Word document.");
    }
  }
  return chunkPolicyText(text);
}