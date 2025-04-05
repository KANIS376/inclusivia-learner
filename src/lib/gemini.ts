
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

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
    console.log(`Calling Gemini AI (${type}) with prompt length: ${prompt.length}`);
    
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: { prompt, type, context },
    });

    if (error) {
      console.error('Error calling Gemini AI:', error);
      toast({
        title: "AI Error",
        description: `Failed to call Gemini AI: ${error.message}`,
        variant: "destructive"
      });
      throw new Error(`Failed to call Gemini AI: ${error.message}`);
    }

    if (!data) {
      const errorMessage = 'No data received from Gemini AI';
      console.error(errorMessage);
      toast({
        title: "AI Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw new Error(errorMessage);
    }

    if (data.error) {
      console.error('Error in Gemini AI response:', data.error);
      toast({
        title: "AI Error",
        description: data.error,
        variant: "destructive"
      });
      throw new Error(data.error);
    }

    console.log(`Successfully received response from Gemini AI (${type})`);
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
  console.log('Grading submission, length:', submission.length);
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
  
  console.log('Getting career guidance for:', studentInfo.name);
  return queryGemini(
    prompt,
    'career-guidance',
    { studentInfo }
  );
}

// New function for AI tutoring responses
export async function getTutorResponse(question: string, subject?: string) {
  const prompt = `
    ${subject ? `Subject: ${subject}` : ''}
    Student Question: ${question}
    
    Provide a helpful, educational response to this question.
  `;
  
  console.log('Getting AI tutor response');
  return queryGemini(prompt, 'general');
}
