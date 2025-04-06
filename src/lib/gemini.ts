
import { supabase } from './supabase';
import offlineStorage from './offlineStorageService';

const OFFLINE_RESPONSES_KEY = 'offline_ai_responses';

type QueryOptions = {
  role?: string;
  subject?: string;
  maxScore?: number;
  rubric?: string;
  [key: string]: any;
};

// Function to query Gemini AI
export const queryGemini = async (
  prompt: string,
  type: string = 'general',
  context: QueryOptions = {}
) => {
  try {
    // Check if we're online
    if (!navigator.onLine) {
      return getOfflineResponse(prompt, type);
    }
    
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: { prompt, type, context },
    });
    
    if (error) {
      console.error('Gemini invocation error:', error);
      return { error: error.message };
    }
    
    // Cache successful responses for offline use
    cacheResponse(prompt, type, data);
    
    return data;
  } catch (error) {
    console.error('Gemini query error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

// Function for AI tutor specifically
export const getTutorResponse = async (prompt: string) => {
  return queryGemini(prompt, 'tutor', {
    role: 'tutor',
    subject: 'general knowledge',
    style: 'helpful, educational, and concise'
  });
};

// Function to grade assignments
export const gradeSubmission = async (
  submission: string,
  rubric: string,
  maxScore: number = 100
) => {
  return queryGemini(submission, 'grade-submission', {
    rubric,
    maxScore
  });
};

// Function for career guidance
export const getCareerGuidance = async (
  interests: string,
  strengths: string,
  academics: string
) => {
  const prompt = `
    Interests: ${interests}
    Strengths: ${strengths}
    Academic Performance: ${academics}
    
    Based on the above, suggest suitable career paths.
  `;
  
  return queryGemini(prompt, 'career-guidance');
};

// Cache successful responses
const cacheResponse = (prompt: string, type: string, data: any) => {
  try {
    const cachedResponses = offlineStorage.get<Array<{
      prompt: string;
      type: string;
      response: any;
      timestamp: number;
    }>>(OFFLINE_RESPONSES_KEY) || [];
    
    // Limit cache size to 50 items
    if (cachedResponses.length >= 50) {
      cachedResponses.shift();
    }
    
    cachedResponses.push({
      prompt,
      type,
      response: data,
      timestamp: Date.now()
    });
    
    offlineStorage.save(OFFLINE_RESPONSES_KEY, cachedResponses);
  } catch (error) {
    console.error('Error caching response:', error);
  }
};

// Get offline response using simple similarity matching
const getOfflineResponse = (prompt: string, type: string) => {
  try {
    const cachedResponses = offlineStorage.get<Array<{
      prompt: string;
      type: string;
      response: any;
      timestamp: number;
    }>>(OFFLINE_RESPONSES_KEY) || [];
    
    // Filter by type
    const typeResponses = cachedResponses.filter(item => item.type === type);
    
    if (typeResponses.length === 0) {
      return { 
        result: "I'm currently working offline and don't have any cached responses for this type of question. Please try again when you're back online.",
        offline: true
      };
    }
    
    // Simple word matching to find most similar prompt
    const promptWords = prompt.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    
    let bestMatch = null;
    let highestScore = 0;
    
    for (const item of typeResponses) {
      const itemWords = item.prompt.toLowerCase().split(/\W+/).filter(w => w.length > 3);
      let matchScore = 0;
      
      for (const word of promptWords) {
        if (itemWords.includes(word)) {
          matchScore++;
        }
      }
      
      if (matchScore > highestScore) {
        highestScore = matchScore;
        bestMatch = item;
      }
    }
    
    // If we found a reasonable match (at least 2 important words match)
    if (bestMatch && highestScore >= 2) {
      return {
        ...bestMatch.response,
        offline: true
      };
    }
    
    // Fallback to most recent response of same type
    return {
      result: "I'm working offline right now and don't have a good match for your question. Here's a suggestion: try asking about something you've discussed before, or reconnect when you're back online.",
      offline: true
    };
  } catch (error) {
    console.error('Error retrieving offline response:', error);
    return { 
      result: "I'm currently in offline mode and couldn't retrieve a cached response. Please try again when you're online.",
      offline: true
    };
  }
};
