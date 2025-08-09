import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Generate content using Gemini AI
 */
export async function generateContent(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking for speed/cost
      },
    },
  });
  return response.text;
}

export { generateContent as generateGeminiContent };
