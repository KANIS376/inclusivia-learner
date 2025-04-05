
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { prompt, type, context = {} } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let systemPrompt = '';
    
    // Prepare different system prompts based on the request type
    switch (type) {
      case 'grade-submission':
        systemPrompt = `You are an expert educator and grader. Grade the following submission based on these criteria:
        ${context.rubric || 'Accuracy, completeness, clarity, and depth of understanding'}. 
        Provide a score out of ${context.maxScore || 100}, detailed feedback, and suggestions for improvement.
        Format your response as a JSON with the following structure:
        {
          "score": number,
          "feedback": "detailed explanation",
          "suggestions": ["suggestion1", "suggestion2"],
          "strengths": ["strength1", "strength2"],
          "weaknesses": ["weakness1", "weakness2"]
        }`;
        break;
      
      case 'career-guidance':
        systemPrompt = `You are a career counselor with expertise in education and job markets.
        Based on the student's interests, strengths, and academic performance, suggest 3 suitable career paths.
        For each career, provide a brief description, required skills, education path, and job prospects.
        Format your response as a JSON with the following structure:
        {
          "careers": [
            {
              "title": "Career Title",
              "description": "Brief description",
              "requiredSkills": ["skill1", "skill2"],
              "educationPath": "Education requirements",
              "jobProspects": "Job market outlook"
            }
          ]
        }`;
        break;
      
      default:
        systemPrompt = `You are an AI assistant helping with educational content. Provide a helpful, concise, and educational response.`;
    }

    console.log(`Processing ${type} request with prompt: ${prompt.substring(0, 100)}...`);

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
    }

    // Extract the text from Gemini response
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    console.log(`Gemini response received (${result.length} chars)`);

    // Try to parse JSON if that's what we're expecting
    let formattedResponse = result;
    if (type === 'grade-submission' || type === 'career-guidance') {
      try {
        const startJson = result.indexOf('{');
        const endJson = result.lastIndexOf('}') + 1;
        if (startJson >= 0 && endJson > startJson) {
          const jsonStr = result.substring(startJson, endJson);
          formattedResponse = JSON.parse(jsonStr);
        } else {
          console.warn('Could not extract JSON from response');
        }
      } catch (error) {
        console.error('Error parsing JSON from Gemini response:', error);
        console.log('Raw response:', result);
      }
    }

    return new Response(
      JSON.stringify({ result: formattedResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in gemini-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
