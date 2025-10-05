
import { GoogleGenAI, Modality } from '@google/genai';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateHairstyleImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: `Based on the person in this image, give them a new hairstyle: ${prompt}. Only return the new image.`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // FIX: Add optional chaining to safely access response parts and prevent runtime errors if `candidates` is empty.
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return part.inlineData.data;
        }
      }
    }

    throw new Error("The AI did not return an image. Please try a different prompt.");
  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while contacting the Gemini API.");
  }
};
