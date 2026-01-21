import { GoogleGenAI } from "@google/genai";

export const getProjectInsights = async (projectTitle: string, description: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a creative director. Briefly analyze why this project titled "${projectTitle}" is impressive based on this description: "${description}". Keep the answer under 60 words and professional.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate insights at this time.";
  }
};