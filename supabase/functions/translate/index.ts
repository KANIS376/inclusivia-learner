
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
    const GOOGLE_TRANSLATE_API_KEY = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    if (!GOOGLE_TRANSLATE_API_KEY) {
      console.error('GOOGLE_TRANSLATE_API_KEY is not set in environment variables');
      return new Response(
        JSON.stringify({ error: 'API key configuration error. Please contact administrator.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { text, targetLang, sourceLang = 'auto' } = await req.json();

    if (!text || !targetLang) {
      return new Response(
        JSON.stringify({ error: 'Text and target language are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Translating text of length ${text.length} from ${sourceLang} to ${targetLang}`);

    const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLang,
        source: sourceLang !== 'auto' ? sourceLang : undefined,
        format: 'text',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Translate API error:', JSON.stringify(errorData));
      return new Response(
        JSON.stringify({ error: `Translation error: ${JSON.stringify(errorData)}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || '';
    
    console.log(`Successfully translated text to ${targetLang}`);

    return new Response(
      JSON.stringify({ translatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in translate function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
