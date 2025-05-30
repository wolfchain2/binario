
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIMatchProfile } from '../types';
import { API_KEY_ERROR_MESSAGE, GEMINI_MODEL_TEXT, MOCK_AI_PROFILES_INVESTOR_SEARCHING_LOAN, MOCK_AI_PROFILES_BORROWER_SEARCHING_INVESTOR } from '../constants';

// Ensure API_KEY is accessed safely. In a real browser environment, 
// process.env.API_KEY would need to be set via build tools or a server.
// For this frontend-only example, we'll use a placeholder if not set.
const API_KEY = process.env.API_KEY || "YOUR_API_KEY_PLACEHOLDER";

let ai: GoogleGenAI | null = null;
if (API_KEY && API_KEY !== "YOUR_API_KEY_PLACEHOLDER") {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn(API_KEY_ERROR_MESSAGE);
}

/**
 * Simulates fetching AI-powered matches for investors or borrowers.
 * In a real scenario, this would involve:
 * 1. Constructing a detailed prompt based on user type and specific criteria.
 * 2. Calling the Gemini API with `ai.models.generateContent`, potentially requesting JSON output.
 * 3. Parsing the response to extract structured profile data.
 * For this frontend-only example, it returns mock data after a delay.
 */
export const getAIMatches = async (
  userType: 'investor' | 'borrower', // 'investor' means investor is looking for loans, 'borrower' means borrower is looking for investors
  // criteria: any // Placeholder for actual matching criteria
): Promise<AIMatchProfile[]> => {
  console.log(`Simulating AI match search for: ${userType}`);

  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  if (!ai && API_KEY === "YOUR_API_KEY_PLACEHOLDER") {
    // If API key is just a placeholder, return mock data without attempting a real call.
    console.warn("Using mock data for AI matches as API key is a placeholder.");
    if (userType === 'investor') { // Investor is looking for loan profiles
        return MOCK_AI_PROFILES_INVESTOR_SEARCHING_LOAN;
    } else { // Borrower is looking for investor profiles
        return MOCK_AI_PROFILES_BORROWER_SEARCHING_INVESTOR;
    }
  }
  
  if (!ai) {
    // This case means API_KEY was set, but GoogleGenAI initialization failed or API_KEY is invalid.
    // Fallback to mock data or throw specific error.
    console.error("GoogleGenAI not initialized. Falling back to mock data for AI matches.");
     if (userType === 'investor') {
        return MOCK_AI_PROFILES_INVESTOR_SEARCHING_LOAN;
    } else {
        return MOCK_AI_PROFILES_BORROWER_SEARCHING_INVESTOR;
    }
    // Alternatively, throw an error:
    // throw new Error("AI service is not available. " + API_KEY_ERROR_MESSAGE);
  }

  // --- Conceptual Real Gemini API Call (commented out for frontend simulation) ---
  /*
  const prompt = `
    You are an AI assistant for a P2P lending platform.
    A ${userType} is looking for matches. Their criteria are: [criteria details].
    Provide a list of 3 suitable ${userType === 'investor' ? 'loan requests' : 'investor profiles'} in JSON format.
    Each item should include: id, risk_level (e.g., "Low", "Medium", "High" for loans; or "Conservative", "Balanced", "Aggressive" for investors), 
    profile_summary (a short description), and relevant_details.
    Format as: [{"id": "...", "risk_level": "...", "profile_summary": "...", "relevant_details": "..."}]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT, // Or a more specialized model if available
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        // temperature: 0.7, // Adjust as needed
      }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);
    // Transform parsedData to AIMatchProfile[] format
    // return parsedData.map(item => ({ id: item.id, risk: item.risk_level, level: "N/A", detail: item.profile_summary + " " + item.relevant_details, type: userType === 'investor' ? 'borrower_loan' : 'investor' }));
    
    // For now, returning mock due to simulation
    if (userType === 'investor') return MOCK_AI_PROFILES_INVESTOR_SEARCHING_LOAN;
    return MOCK_AI_PROFILES_BORROWER_SEARCHING_INVESTOR;

  } catch (error) {
    console.error("Error calling Gemini API for AI matches:", error);
    // Fallback to mock data on error or rethrow
    if (userType === 'investor') return MOCK_AI_PROFILES_INVESTOR_SEARCHING_LOAN;
    throw error; // Or return mock data
  }
  */
  // --- End Conceptual Real Gemini API Call ---

  // Return mock data for this frontend simulation
   if (userType === 'investor') {
        return MOCK_AI_PROFILES_INVESTOR_SEARCHING_LOAN;
    } else {
        return MOCK_AI_PROFILES_BORROWER_SEARCHING_INVESTOR;
    }
};

// Example of a simple text generation function (not directly used by current UI but demonstrates API usage)
export const getSimpleChatResponse = async (message: string): Promise<string> => {
  if (!ai) {
    console.warn("GoogleGenAI not initialized. Returning placeholder response.");
    return "AI service not available at the moment.";
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: [{ role: "user", parts: [{ text: message }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for chat:", error);
    return "Sorry, I couldn't process your request.";
  }
};
