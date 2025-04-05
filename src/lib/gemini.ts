
import { supabase } from '@/lib/supabase';

type GeminiRequestType = 'grade-submission' | 'career-guidance' | 'general';

interface GeminiContext {
  rubric?: string;
  maxScore?: number;
  studentInfo?: {
    interests: string[];
    strengths: string[];
    performance: number;
  };
  [key: string]: any;
}

export async function queryGemini(
  prompt: string, 
  type: GeminiRequestType = 'general',
  context: GeminiContext = {}
) {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: { prompt, type, context },
    });

    if (error) {
      console.error('Error calling Gemini AI:', error);
      throw new Error(`Failed to call Gemini AI: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in queryGemini:', error);
    throw error;
  }
}

// For grading student submissions
export async function gradeSubmission(
  submission: string,
  rubric: string,
  maxScore: number = 100
) {
  return queryGemini(
    submission,
    'grade-submission',
    { rubric, maxScore }
  );
}

// For suggesting career paths
export async function getCareerGuidance(
  studentInfo: {
    name: string;
    interests: string[];
    strengths: string[];
    performance: number;
  }
) {
  const prompt = `
    Student Name: ${studentInfo.name}
    Interests: ${studentInfo.interests.join(', ')}
    Strengths: ${studentInfo.strengths.join(', ')}
    Academic Performance: ${studentInfo.performance}/100
    
    Based on this information, suggest suitable career paths.
  `;
  
  return queryGemini(
    prompt,
    'career-guidance',
    { studentInfo }
  );
}
