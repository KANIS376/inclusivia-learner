
import React, { useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";
import { Brain, Globe, Gamepad2, Wifi, User, Award, FileText, Users } from "lucide-react";

const FeatureGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    const elements = gridRef.current?.querySelectorAll(".page-transition-item");
    elements?.forEach((el) => observer.observe(el));
    
    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning Assistance",
      description: "Get step-by-step explanations for difficult concepts with our conversational AI Tutor.",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Access content in multiple languages with instant translation for better accessibility.",
    },
    {
      icon: User,
      title: "Personalized Learning Path",
      description: "Adaptive learning that adjusts based on your skill level and learning style.",
    },
    {
      icon: Gamepad2,
      title: "Gamified Experience",
      description: "Earn points, badges, and compete on leaderboards to make learning more engaging.",
    },
    {
      icon: Wifi,
      title: "Offline Learning",
      description: "Download content and access it without internet connectivity for uninterrupted learning.",
    },
    {
      icon: Award,
      title: "AI Career Guidance",
      description: "Get personalized career recommendations based on your interests and performance.",
    },
    {
      icon: FileText,
      title: "Study Material Generator",
      description: "Generate customized notes, flashcards, and mind maps for better revision.",
    },
    {
      icon: Users,
      title: "Peer Learning Platform",
      description: "Connect with students from different regions to discuss and collaborate.",
    },
  ];
  
  return (
    <div ref={gridRef} className="py-16 md:py-24 bg-accent/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="page-transition-item text-3xl md:text-4xl font-bold mb-4">
            Features That Make a Difference
          </h2>
          <p className="page-transition-item text-lg text-muted-foreground">
            Our platform combines cutting-edge AI with inclusive design to provide a learning experience that works for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="page-transition-item stagger-item"
            >
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
