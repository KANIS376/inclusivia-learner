
import React, { useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  
  const handleSelectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // Here you would implement the actual language change logic
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg glass z-50 animate-fade-in">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                className="w-full text-left px-4 py-2 text-sm hover:bg-accent/50 transition-colors flex items-center justify-between"
                role="menuitem"
                onClick={() => handleSelectLanguage(language)}
              >
                <div className="flex items-center">
                  <span className="mr-1.5 text-xs opacity-70">{language.code.toUpperCase()}</span>
                  <span>{language.name}</span>
                </div>
                {selectedLanguage.code === language.code && (
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
