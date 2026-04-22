const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export interface QA {
  question: string;
  answer: string;
}

const QUESTION_CATEGORIES = [
  'Problem: What specific pain point does this solve?',
  'User: Who is the primary user and what is their context?',
  'Scope: What is the minimum viable version of this idea?',
  'Constraint: What are the biggest technical or resource constraints?',
  'Success Metric: How will you measure if this idea succeeded?',
];

async function callGemini(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text as string;
}

export async function askNextQuestion(
  idea: string,
  previousQAs: QA[],
  questionIndex: number
): Promise<string> {
  const category = QUESTION_CATEGORIES[questionIndex] ?? QUESTION_CATEGORIES[4];

  const systemPrompt = `You are a concise engineering advisor helping refine a raw idea into a spec.
Ask ONE focused question in this category: "${category}".
Keep the question under 20 words. Do NOT give explanations or preamble — just the question.`;

  const history = previousQAs
    .map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`)
    .join('\n');

  const userMessage = `Raw idea: "${idea}"${history ? `\n\nPrevious Q&A:\n${history}` : ''}`;

  return callGemini(systemPrompt, userMessage);
}

export async function generateSpec(idea: string, qas: QA[]): Promise<string> {
  const systemPrompt = `You are a product spec writer. Based on the idea and Q&A, write a concise one-page engineering spec.
Use these exact sections:
## Problem
## Target Users
## Scope (MVP)
## Constraints
## Success Metrics
## First Feature to Build

Be concrete and direct. No fluff. Total length: ~300 words.`;

  const history = qas.map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join('\n\n');

  const userMessage = `Raw idea: "${idea}"\n\nEngineering Q&A:\n${history}`;

  return callGemini(systemPrompt, userMessage);
}
