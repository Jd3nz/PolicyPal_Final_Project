import { NextResponse } from "next/server";
import { getPolicy } from "@/lib/policy-store";

export const runtime = "nodejs";

import { anthropic } from "@/lib/claude";

import {
  retrieveRelevantSections,
  shouldAlwaysEscalate,
} from "@/lib/retrieve";

import { buildPolicyPalPrompt } from "@/lib/prompt";

type PolicyPalResponse = {
  answer: string;
  section: string | null;
  sectionTitle: string | null;
  escalated: boolean;
  referral: string | null;
};

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Read question from frontend
    // --------------------------------------------------

    const body = await request.json();

    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    // --------------------------------------------------
    // 2. Validate question
    // --------------------------------------------------

    if (!question) {
      return NextResponse.json(
        {
          error: "Question is required.",
        },
        {
          status: 400,
        },
      );
    }

    const policyId = typeof body.policyId === "string" ? body.policyId : null;
    const policy = getPolicy(policyId);
    if (!policy) {
      return NextResponse.json({
        answer: "Your uploaded policy has expired. Upload it again or switch to the default handbook.",
        section: null, sectionTitle: null, escalated: true,
        referral: "Please contact People & Culture or your manager.",
      }, { status: 409 });
    }
    const uploaded = policy.id !== null;

    // --------------------------------------------------
    // 3. Check if question MUST be escalated
    // --------------------------------------------------

    const forcedEscalation =
      shouldAlwaysEscalate(question);

    if (forcedEscalation) {
      const escalationResponse: PolicyPalResponse = {
        answer:
          "I cannot answer this question because it depends on personal employee information, legal advice, medical advice, or another matter that the handbook requires to be handled by a person.",
        section: uploaded ? null : "12",
        sectionTitle:
          uploaded ? null : "Matters not covered by this handbook",
        escalated: true,
        referral:
          uploaded ? "Please contact People & Culture or your manager." : "Please contact People & Culture at peopleandculture@novatech.example or speak with your manager.",
      };

      return NextResponse.json(
        escalationResponse,
      );
    }

    // --------------------------------------------------
    // 4. Search handbook for relevant sections
    // --------------------------------------------------

    const sections =
      retrieveRelevantSections(question, 5, policy.sections);

    console.log(
      "Retrieved sections:",
      sections.map(
        (section) =>
          `${section.section} ${section.title}`,
      ),
    );

    // --------------------------------------------------
    // 5. If nothing relevant is found, escalate
    // --------------------------------------------------

    if (sections.length === 0) {
      const noMatchResponse: PolicyPalResponse = {
        answer:
          uploaded ? "I cannot confirm an answer to this question from the active uploaded policy." : "I cannot confirm an answer to this question from the approved NovaTech Employee Handbook.",
        section: uploaded ? null : "12",
        sectionTitle:
          uploaded ? null : "Matters not covered by this handbook",
        escalated: true,
        referral:
          uploaded ? "Please contact People & Culture or your manager." : "Please contact People & Culture at peopleandculture@novatech.example.",
      };

      return NextResponse.json(
        noMatchResponse,
      );
    }

    // --------------------------------------------------
    // 6. Build Claude prompt
    // --------------------------------------------------

    const prompt = buildPolicyPalPrompt(
      question,
      sections,
      uploaded,
    );

    // --------------------------------------------------
    // 7. Send question + handbook sections to Claude
    // --------------------------------------------------

    const message =
      await anthropic.messages.create({
        model: "claude-opus-4-6",

        max_tokens: 800,

        temperature: 0,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    // --------------------------------------------------
    // 8. Get Claude text response
    // --------------------------------------------------

    const textBlock = message.content.find(
      (block) => block.type === "text",
    );

    if (
      !textBlock ||
      textBlock.type !== "text"
    ) {
      throw new Error(
        "Claude returned no text response.",
      );
    }

    console.log(
      "Claude response:",
      textBlock.text,
    );

    // --------------------------------------------------
    // 9. Clean Markdown ```json wrapper if Claude adds it
    // --------------------------------------------------

    let cleanText = textBlock.text.trim();

    cleanText = cleanText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    // --------------------------------------------------
    // 10. Convert Claude JSON text into JavaScript object
    // --------------------------------------------------

    let parsed: PolicyPalResponse;

    try {
      parsed = JSON.parse(cleanText);
    } catch {
      console.error(
        "Invalid Claude JSON:",
        cleanText,
      );

      throw new Error(
        "Claude returned invalid JSON.",
      );
    }

    // --------------------------------------------------
    // 11. Basic response validation
    // --------------------------------------------------

    if (
      typeof parsed.answer !== "string" ||
      typeof parsed.escalated !== "boolean"
    ) {
      throw new Error(
        "Claude returned an invalid response structure.",
      );
    }

    // --------------------------------------------------
    // 12. Return result to frontend
    // --------------------------------------------------

    if (uploaded) {
      const citation = sections.find((section) => section.section === parsed.section);
      if (parsed.escalated || !citation) {
        parsed = {
          answer: parsed.escalated ? parsed.answer : "I cannot confirm a supported answer from the active uploaded policy.",
          section: null,
          sectionTitle: null,
          escalated: true,
          referral: "Please contact People & Culture or your manager.",
        };
      } else {
        parsed.sectionTitle = citation.title;
        parsed.referral = null;
      }
    }
    return NextResponse.json(parsed);
  } catch (error) {
    // --------------------------------------------------
    // Error handling
    // --------------------------------------------------

    console.error(
      "PolicyPal API error:",
      error,
    );

    const fallbackResponse: PolicyPalResponse = {
      answer:
        "PolicyPal is currently unavailable. Please try again later or contact People & Culture.",
      section: null,
      sectionTitle: null,
      escalated: true,
      referral:
        "Please contact People & Culture or your manager.",
    };

    return NextResponse.json(
      fallbackResponse,
      {
        status: 500,
      },
    );
  }
}