import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RecruitmentPackage } from "../types";

// Define the schema for structured output
const recruitmentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    jobDescription: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "The professional job title." },
        summary: { type: Type.STRING, description: "A compelling 2-3 sentence summary of the role and company culture." },
        responsibilities: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of key responsibilities (6-8 items)."
        },
        qualifications: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of required and preferred qualifications (6-8 items)."
        },
        benefits: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of standard or inferred benefits and perks."
        }
      },
      required: ["title", "summary", "responsibilities", "qualifications", "benefits"]
    },
    interviewGuide: {
      type: Type.ARRAY,
      description: "A list of 10 behavioral interview questions tailored to the role.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "The interview question." },
          focusArea: { type: Type.STRING, description: "The specific soft or hard skill being tested (e.g., 'Conflict Resolution', 'Python Proficiency')." },
          evaluationCriteria: { type: Type.STRING, description: "What a strong answer should include (signals of success)." }
        },
        required: ["question", "focusArea", "evaluationCriteria"]
      }
    }
  },
  required: ["jobDescription", "interviewGuide"]
};

export const generateRecruitmentAssets = async (rawNotes: string): Promise<RecruitmentPackage> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        You are an expert Technical Recruiter and Hiring Manager. 
        Based on the following raw notes, generate a polished Recruitment Package.
        
        RAW NOTES:
        ${rawNotes}
        
        REQUIREMENTS:
        1. Create a professional, engaging Job Description tailored for LinkedIn.
        2. Create an Interview Guide with exactly 10 behavioral questions that specifically target the skills and traits implied or stated in the notes.
        3. Ensure the tone is professional yet accessible.
        4. Use the "thinking" capability to deeply analyze the implied needs of the role beyond just the surface text.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: recruitmentSchema,
        // Enable Thinking Mode with high budget for complex reasoning on role requirements
        thinkingConfig: {
          thinkingBudget: 32768
        }
        // Note: maxOutputTokens is deliberately omitted to allow full thinking + generation
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated.");
    }

    const data = JSON.parse(text) as RecruitmentPackage;
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};