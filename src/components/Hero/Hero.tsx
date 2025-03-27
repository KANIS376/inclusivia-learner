
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current?.querySelectorAll(".page-transition-item");
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 z-0" />
      
      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="page-transition-item mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Equal Learning Opportunities For All
            </span>
          </div>
          
          <h1 className="page-transition-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              AI-Powered Learning
            </span>{" "}
            for Every Student
          </h1>
          
          <p className="page-transition-item text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A personalized learning experience that adapts to your needs, breaks language barriers, and makes education accessible for all students.
          </p>
          
          <div className="page-transition-item flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/learn"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-input bg-background hover:bg-accent/50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Floating illustration */}
        <div className="page-transition-item mt-16 md:mt-24 relative max-w-4xl mx-auto">
          <div className="glass rounded-2xl shadow-xl overflow-hidden border border-white/20 animate-float">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/5 to-secondary/10">
              {/* Mock UI elements */}
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl mx-auto bg-background rounded-lg shadow-lg p-4 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">AI</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">AI Assistant</p>
                      <p className="text-sm text-muted-foreground">
                        How can I help simplify Newton's Second Law of Motion for you?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full max-w-2xl mx-auto bg-accent rounded-lg shadow-sm p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-1 rounded-full bg-primary/20"></div>
                    <div className="w-24 h-1 rounded-full bg-primary/50"></div>
                    <div className="w-12 h-1 rounded-full bg-primary/20"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-24 rounded-md bg-muted"></div>
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary/10 animate-pulse-soft"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-primary/20 animate-pulse-soft" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
