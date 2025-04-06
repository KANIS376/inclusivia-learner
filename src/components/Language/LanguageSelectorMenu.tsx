
import React from "react";
import { Check, X } from "lucide-react";
import { supportedLanguages } from "@/lib/translationService";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/types/language";

interface LanguageSelectorMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageSelectorMenu: React.FC<LanguageSelectorMenuProps> = ({ isOpen, onClose }) => {
  const { currentLanguage, changeLanguage, translateUI, setTranslateUI } = useLanguage();
  
  if (!isOpen) return null;
  
  const handleSelectLanguage = (language: Language) => {
    if (language.code === currentLanguage) {
      onClose();
      return;
    }
    
    changeLanguage(language.code);
    onClose();
  };
  
  return (
    <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg glass z-50 animate-fade-in bg-background/95 backdrop-blur-sm">
      <div className="py-1" role="menu" aria-orientation="vertical">
        <div className="px-4 py-2 text-sm font-medium border-b border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span>Language Settings</span>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
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
  );
};

export default LanguageSelectorMenu;
