
import React from "react";

const CourseCurriculum: React.FC = () => {
  // Sample curriculum data (would come from the API in a real implementation)
  const curriculum = [
    { id: 1, title: "Introduction to the Course", duration: "15 min" },
    { id: 2, title: "Core Concepts", duration: "45 min" },
    { id: 3, title: "Practical Application", duration: "60 min" },
    { id: 4, title: "Advanced Techniques", duration: "90 min" },
    { id: 5, title: "Final Project", duration: "120 min" },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
      <p className="text-muted-foreground mb-6">
        {curriculum.length} lessons • Approximately 5.5 hours of content
      </p>
      
      <div className="space-y-4">
        {curriculum.map((item) => (
          <div 
            key={item.id} 
            className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center">
                  {item.id}
                </div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <div className="text-sm text-muted-foreground">{item.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseCurriculum;
