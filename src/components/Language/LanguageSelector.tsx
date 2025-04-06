
import React, { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { supportedLanguages } from "@/lib/translationService";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelectorMenu from "./LanguageSelectorMenu";

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  
  const selectedLanguage = supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  
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
      
      <LanguageSelectorMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default LanguageSelector;
