import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, X, Maximize2, Minimize2, Volume2 } from "lucide-react";
import { useLanguage } from "../Language/LanguageSelector";
import offlineStorage from "@/lib/offlineStorageService";
import { translateWithCache } from "@/lib/translationService";
import { useToast } from "@/hooks/use-toast";

const AI_STORAGE_KEY = "ai_conversation";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  translated?: boolean;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentLanguage, speakText, listenForSpeech } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    const savedConversation = offlineStorage.get<Message[]>(AI_STORAGE_KEY);
    if (savedConversation && savedConversation.length > 0) {
      setConversation(savedConversation);
    } else {
      const initialMessage: Message = {
        role: "assistant",
        content: "Hi there! I'm your AI learning assistant. How can I help you today?",
        timestamp: Date.now(),
      };
      setConversation([initialMessage]);
      offlineStorage.save(AI_STORAGE_KEY, [initialMessage]);
    }
  }, []);
  
  useEffect(() => {
    if (conversation.length > 0) {
      offlineStorage.save(AI_STORAGE_KEY, conversation);
    }
  }, [conversation]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: Date.now(),
    };
    
    setConversation(prev => [...prev, userMessage]);
    setMessage("");
    
    setTimeout(async () => {
      const responses = [
        "That's a great question! Let me explain that concept in a simpler way...",
        "I'm happy to help with that. Here's how you can approach this problem...",
        "Let me break this down step by step so it's easier to understand...",
        "I can definitely clarify that for you. Think of it this way...",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      let translatedContent = randomResponse;
      let translated = false;
      
      if (currentLanguage !== 'en') {
        try {
          translatedContent = await translateWithCache(randomResponse, currentLanguage, 'en');
          translated = true;
        } catch (error) {
          console.error("Translation error:", error);
        }
      }
      
      const aiMessage: Message = {
        role: "assistant",
        content: translatedContent,
        timestamp: Date.now(),
        translated,
      };
      
      setConversation(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleVoiceInput = async () => {
    if (isListening) return;
    
    setIsListening(true);
    try {
      await listenForSpeech((transcript) => {
        setMessage(transcript);
        setIsListening(false);
      });
    } catch (error) {
      console.error("Speech recognition error:", error);
      setIsListening(false);
    }
  };
  
  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      speakText("");
      setIsSpeaking(false);
    } else {
      speakText(content);
      setIsSpeaking(true);
      
      const handleSpeechEnd = () => {
        setIsSpeaking(false);
      };
      
      document.addEventListener('speechend', handleSpeechEnd, { once: true });
    }
  };
  
  const clearConversation = () => {
    const initialMessage: Message = {
      role: "assistant",
      content: "Hi there! I'm your AI learning assistant. How can I help you today?",
      timestamp: Date.now(),
    };
    setConversation([initialMessage]);
    offlineStorage.save(AI_STORAGE_KEY, [initialMessage]);
    
    toast({
      title: "Conversation cleared",
      description: "Your conversation history has been cleared.",
    });
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 z-50"
        aria-label="Open AI Assistant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="10" r="1" />
          <circle cx="8" cy="10" r="1" />
          <circle cx="16" cy="10" r="1" />
        </svg>
      </button>
    );
  }
  
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
        isMinimized
          ? "w-72 h-12"
          : "w-72 sm:w-96 h-[30rem] sm:h-[32rem]"
      }`}
    >
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/20 h-full flex flex-col">
        <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-primary/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-medium text-sm">AI</span>
            </div>
            <span className="font-medium">Learning Assistant</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={clearConversation}
              className="p-1 rounded-md hover:bg-white/20 transition-colors"
              aria-label="Clear conversation"
              title="Clear conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md hover:bg-white/20 transition-colors ml-1"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-white/20 transition-colors ml-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-2xl max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-secondary text-secondary-foreground rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.translated && (
                      <div className="text-xs mt-1 opacity-70 text-right">
                        Translated
                      </div>
                    )}
                  </div>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleSpeakMessage(msg.content)}
                      className={`p-1 rounded-full ml-1 transition-colors ${
                        isSpeaking ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label={isSpeaking ? "Stop speaking" : "Speak message"}
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 border-t border-border/50">
              <div className="flex items-center rounded-full bg-background border border-input focus-within:ring-1 focus-within:ring-primary focus-within:border-primary overflow-hidden">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="flex-1 py-2 px-4 bg-transparent border-none focus:outline-none resize-none max-h-20 text-sm"
                  rows={1}
                />
                <div className="flex pr-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`p-1.5 rounded-full transition-colors ${
                      isListening
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={isListening ? "Listening..." : "Voice input"}
                    aria-label={isListening ? "Listening..." : "Voice input"}
                    disabled={isListening}
                  >
                    <Mic className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`} />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-1.5 rounded-full transition-colors ${
                      message.trim()
                        ? "text-primary hover:text-primary/80"
                        : "text-muted-foreground"
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {isListening && (
                <div className="text-xs text-center mt-1 text-primary animate-pulse">
                  Listening... Speak now
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
