
import React, { useState } from "react";
import { Send, Mic, X, Maximize2, Minimize2 } from "lucide-react";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content: "Hi there! I'm your AI learning assistant. How can I help you today?",
    },
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: "user", content: message }]);
    
    // Clear input field
    setMessage("");
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me explain that concept in a simpler way...",
        "I'm happy to help with that. Here's how you can approach this problem...",
        "Let me break this down step by step so it's easier to understand...",
        "I can definitely clarify that for you. Think of it this way...",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversation((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 z-50"
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
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-primary/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-medium text-sm">AI</span>
            </div>
            <span className="font-medium">Learning Assistant</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md hover:bg-white/20 transition-colors"
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
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Conversation area */}
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
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input area */}
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
                    className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    title="Voice input"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-1.5 rounded-full transition-colors ${
                      message.trim()
                        ? "text-primary hover:text-primary/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
