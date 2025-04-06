
import React, { useState, useEffect, createContext, useContext } from "react";
import { Globe, Check, ChevronDown, Volume2, Mic, X } from "lucide-react";
import { supportedLanguages, setCurrentLanguage, getCurrentLanguage, translateText } from "@/lib/translationService";
import speechService from "@/lib/speechService";
import { useToast } from "@/hooks/use-toast";

// Create a context to provide language throughout the app
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (code: string) => void;
  speakText: (text: string) => void;
  listenForSpeech: (callback: (text: string) => void) => Promise<void>;
  translateUI: boolean;
  setTranslateUI: (translate: boolean) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  changeLanguage: () => {},
  speakText: () => {},
  listenForSpeech: async () => {},
  translateUI: true,
  setTranslateUI: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

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
    setLanguage(code);
    setCurrentLanguage(code);
    
    // Show toast notification to confirm language change
    toast({
      title: "Language changed",
      description: `UI language set to ${supportedLanguages.find(lang => lang.code === code)?.name || code}`,
    });
    
    // Force a page reload to apply translations
    window.location.reload();
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

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, translateUI, setTranslateUI } = useLanguage();
  const { toast } = useToast();
  
  const selectedLanguage = supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  
  const handleSelectLanguage = (language: Language) => {
    if (language.code === currentLanguage) {
      setIsOpen(false);
      return;
    }
    
    toast({
      title: "Changing language...",
      description: `Switching to ${language.name}`,
    });
    
    changeLanguage(language.code);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg glass z-50 animate-fade-in bg-background/95 backdrop-blur-sm">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-sm font-medium border-b border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span>Language Settings</span>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-xs">
                <input 
                  type="checkbox"
                  id="translate-ui"
                  checked={translateUI}
                  onChange={(e) => setTranslateUI(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="translate-ui">Translate interface</label>
              </div>
            </div>
            
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-accent/50 transition-colors flex items-center justify-between ${
                  currentLanguage === language.code ? 'bg-accent/30' : ''
                }`}
                role="menuitem"
                onClick={() => handleSelectLanguage(language)}
              >
                <div className="flex items-center">
                  <span className="mr-1.5 text-xs opacity-70">{language.code.toUpperCase()}</span>
                  <span>{language.name}</span>
                  <span className="ml-1.5 text-xs text-muted-foreground">({language.nativeName})</span>
                </div>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
