import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;

if (!apiKey) {
  console.warn("[geminiClient] VITE_GOOGLE_API_KEY not set. AI interpretation will use mock fallback.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const geminiFlash = genAI
  ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  : null;

export async function generateText(
  systemPrompt: string,
  userPrompt: string,
): Promise<string> {
  if (!geminiFlash) throw new Error("Gemini client not initialized");

  const result = await geminiFlash.generateContent({
    systemInstruction: systemPrompt,
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.85,
      maxOutputTokens: 2048,
    },
  });

  return result.response.text();
}
