import {
  handbookSections,
  type HandbookSection,
} from "@/data/handbook";

const synonyms: Record<string, string[]> = {
  "annual leave": [
    "annual leave",
    "holiday",
    "vacation",
    "paid leave",
    "leave days",
  ],

  "sick leave": [
    "sick leave",
    "personal leave",
    "illness",
    "medical leave",
    "carer leave",
    "carer's leave",
  ],

  "remote work": [
    "remote work",
    "work from home",
    "working from home",
    "hybrid",
    "fully remote",
    "overseas work",
  ],

  probation: [
    "probation",
    "probation period",
    "new employee period",
  ],

  overtime: [
    "overtime",
    "extra hours",
    "additional hours",
    "time off in lieu",
    "toil",
  ],

  expense: [
    "expense",
    "expenses",
    "reimbursement",
    "claim",
    "business travel",
    "hotel",
    "meal allowance",
  ],

  bullying: [
    "bullying",
    "harassment",
    "sexual harassment",
    "discrimination",
    "victimisation",
    "workplace concern",
  ],

  grievance: [
    "grievance",
    "complaint",
    "formal complaint",
    "investigation",
    "disciplinary",
  ],

  privacy: [
    "privacy",
    "personal information",
    "confidential",
    "employee records",
    "monitoring",
  ],

  ai: [
    "ai",
    "artificial intelligence",
    "chatgpt",
    "claude",
    "generative ai",
  ],

  resignation: [
    "resign",
    "resignation",
    "quit",
    "leave company",
    "notice period",
  ],

  wellbeing: [
    "wellbeing",
    "wellbeing leave",
    "mental health day",
  ],

  training: [
    "training",
    "professional development",
    "course",
    "conference",
    "certification",
    "development budget",
  ],
};

const personalDataPatterns = [
  "my leave balance",
  "how much leave do i have",
  "how much annual leave do i have",
  "my salary",
  "my pay",
  "my pay rate",
  "my super balance",
  "my superannuation balance",
  "my tax",
  "my grievance outcome",
  "my investigation outcome",
  "my performance outcome",
  "approve my leave",
  "will my leave be approved",
];

const legalMedicalPatterns = [
  "should i sue",
  "can i sue",
  "legal advice",
  "lawyer",
  "medical advice",
  "am i fit for work",
  "fitness for work",
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsPhrase(
  text: string,
  phrase: string,
): boolean {
  return normalize(text).includes(normalize(phrase));
}

function scoreSection(
  question: string,
  section: HandbookSection,
): number {
  const normalizedQuestion = normalize(question);
  const normalizedTitle = normalize(section.title);
  const normalizedContent = normalize(section.content);

  let score = 0;

  // Strong keyword match
  for (const keyword of section.keywords) {
    if (containsPhrase(question, keyword)) {
      score += 6;
    }
  }

  // Title phrase match
  if (
    normalizedQuestion.includes(normalizedTitle) ||
    normalizedTitle.includes(normalizedQuestion)
  ) {
    score += 8;
  }

  // Individual title-word match
  for (const word of normalizedTitle.split(" ")) {
    if (
      word.length >= 4 &&
      normalizedQuestion.includes(word)
    ) {
      score += 2;
    }
  }

  // Content word matching
  const questionWords = normalizedQuestion
    .split(" ")
    .filter((word) => word.length >= 4);

  for (const word of questionWords) {
    if (normalizedContent.includes(word)) {
      score += 1;
    }
  }

  // Synonym groups
  for (const phrases of Object.values(synonyms)) {
    const questionMatchesGroup = phrases.some((phrase) =>
      containsPhrase(question, phrase),
    );

    if (!questionMatchesGroup) continue;

    const sectionMatchesGroup = phrases.some(
      (phrase) =>
        containsPhrase(section.title, phrase) ||
        containsPhrase(section.content, phrase) ||
        section.keywords.some((keyword) =>
          containsPhrase(keyword, phrase),
        ),
    );

    if (sectionMatchesGroup) {
      score += 5;
    }
  }

  return score;
}

export function shouldAlwaysEscalate(
  question: string,
): boolean {
  const normalizedQuestion = normalize(question);

  const patterns = [
    ...personalDataPatterns,
    ...legalMedicalPatterns,
  ];

  return patterns.some((pattern) =>
    normalizedQuestion.includes(normalize(pattern)),
  );
}

export function retrieveRelevantSections(
  question: string,
  limit = 5,
  source: HandbookSection[] = handbookSections,
): HandbookSection[] {
  // Force Section 12 for personal/legal/medical matters
  if (shouldAlwaysEscalate(question)) {
    const section12 = source === handbookSections ? source.find(
      (section) => section.section === "12",
    ) : undefined;

    return section12 ? [section12] : [];
  }

  const scored = source
    .map((section) => ({
      section,
      score: scoreSection(question, section),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored
    .slice(0, limit)
    .map((item) => item.section);
}