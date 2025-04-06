
import { supabase } from './supabase';

export type SupportedLanguage = {
  code: string;
  name: string;
  nativeName: string;
};

export const supportedLanguages: SupportedLanguage[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
];

// Store the current language
let currentLanguage: string = localStorage.getItem('preferredLanguage') || 'en';

export const getCurrentLanguage = (): string => {
  return currentLanguage;
};

export const setCurrentLanguage = (langCode: string): void => {
  currentLanguage = langCode;
  localStorage.setItem('preferredLanguage', langCode);
};

export const translateText = async (
  text: string, 
  targetLang: string = currentLanguage,
  sourceLang: string = 'auto'
): Promise<string> => {
  // If target language is English or same as source, no need to translate
  if (targetLang === 'en' || (sourceLang !== 'auto' && targetLang === sourceLang)) {
    return text;
  }

  try {
    const { data, error } = await supabase.functions.invoke('translate', {
      body: {
        text,
        targetLang,
        sourceLang,
      },
    });

    if (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }

    return data.translatedText || text;
  } catch (error) {
    console.error('Translation service error:', error);
    return text; // Return original text if translation fails
  }
};

// Translation with offline caching
const translationCache: Record<string, { text: string, timestamp: number }> = {};

export const translateWithCache = async (
  text: string,
  targetLang: string = currentLanguage,
  sourceLang: string = 'auto',
  maxCacheAge: number = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
): Promise<string> => {
  // Create a cache key from the text and languages
  const cacheKey = `${text}_${sourceLang}_${targetLang}`;
  
  // Check if we have a cached translation that's not too old
  const cached = translationCache[cacheKey];
  const now = Date.now();
  
  if (cached && (now - cached.timestamp < maxCacheAge)) {
    return cached.text;
  }
  
  // No valid cache, perform translation
  try {
    const translatedText = await translateText(text, targetLang, sourceLang);
    
    // Cache the result
    translationCache[cacheKey] = {
      text: translatedText,
      timestamp: now
    };
    
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};
