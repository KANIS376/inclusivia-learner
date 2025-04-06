
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentLanguage, setCurrentLanguage, translateText } from "@/lib/translationService";
import speechService from "@/lib/speechService";
import { useToast } from "@/hooks/use-toast";

// Define the context type
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (code: string) => void;
  speakText: (text: string) => void;
  listenForSpeech: (callback: (text: string) => void) => Promise<void>;
  translateUI: boolean;
  setTranslateUI: (translate: boolean) => void;
}

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  changeLanguage: () => {},
  speakText: () => {},
  listenForSpeech: async () => {},
  translateUI: true,
  setTranslateUI: () => {},
});

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentLanguage, setLanguage] = useState<string>(getCurrentLanguage());
  const [translateUI, setTranslateUI] = useState<boolean>(
    localStorage.getItem('translateUI') !== 'false'
  );
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem('translateUI', translateUI.toString());
  }, [translateUI]);
  
  const changeLanguage = (code: string) => {
    if (code === currentLanguage) return;
    
    setLanguage(code);
    setCurrentLanguage(code);
    
    // Show toast notification to confirm language change
    toast({
      title: "Language changed",
      description: `UI language set to ${code}`,
      duration: 3000,
    });
    
    // Force a page reload to apply translations
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  
  const speakText = (text: string) => {
    if (!speechService.isSpeechSynthesisSupported()) {
      toast({
        title: "Speech not supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    speechService.speak(text, currentLanguage);
  };
  
  const listenForSpeech = async (callback: (text: string) => void) => {
    if (!speechService.isSpeechRecognitionSupported()) {
      toast({
        title: "Speech recognition not supported",
        description: "Speech-to-text is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await speechService.listen(callback, currentLanguage);
    } catch (error) {
      console.error("Speech recognition error:", error);
      toast({
        title: "Speech recognition error",
        description: error instanceof Error ? error.message : "Failed to recognize speech",
        variant: "destructive",
      });
    }
  };
  
  const contextValue = {
    currentLanguage,
    changeLanguage,
    speakText,
    listenForSpeech,
    translateUI,
    setTranslateUI,
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
