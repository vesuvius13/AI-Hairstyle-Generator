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
            text: `Give the person in the image this hairstyle: ${prompt}`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

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


export const findNearbySalons = async (latitude: number, longitude: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Find top-rated hair salons nearby.",
      config: {
        tools: [{googleMaps: {}}],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: latitude,
              longitude: longitude,
            }
          }
        }
      },
    });

    const text = response.text;
    const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    if (!text) {
      throw new Error("The AI did not return any salon information.");
    }
    
    return { text, links };

  } catch (error) {
    console.error("Gemini API call for salons failed:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while searching for salons.");
  }
};
