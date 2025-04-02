
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Youtube, BookOpen, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface ResourceItem {
  title: string;
  type: string;
  size: string;
  url: string;
  source: "app" | "youtube";
  youtubeId?: string;
  completed?: boolean;
}

const CourseResources: React.FC = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<ResourceItem[]>([
    { 
      title: "Course Workbook", 
      type: "PDF", 
      size: "2.3 MB", 
      url: "#workbook", 
      source: "app",
      completed: true
    },
    { 
      title: "Practice Exercises", 
      type: "ZIP", 
      size: "4.1 MB", 
      url: "#exercises", 
      source: "app",
      completed: false
    },
    { 
      title: "Reference Guide", 
      type: "PDF", 
      size: "1.7 MB", 
      url: "#guide", 
      source: "app",
      completed: true
    },
    { 
      title: "Video Tutorial: Practical Applications", 
      type: "YouTube", 
      size: "10:15", 
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      source: "youtube",
      youtubeId: "dQw4w9WgXcQ",
      completed: false
    },
    { 
      title: "Supplementary Reading", 
      type: "PDF", 
      size: "3.5 MB", 
      url: "#reading", 
      source: "app",
      completed: false
    },
    { 
      title: "Expert Deep Dive: Key Concepts", 
      type: "YouTube", 
      size: "15:42", 
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      source: "youtube",
      youtubeId: "dQw4w9WgXcQ",
      completed: true
    },
  ]);

  // Calculate progress
  const completedResources = resources.filter(r => r.completed).length;
  const progressPercentage = (completedResources / resources.length) * 100;

  const handleDownload = (resource: ResourceItem, index: number) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title} (${resource.size})`,
    });
    
    // Mark as completed after download
    if (!resource.completed) {
      const updatedResources = [...resources];
      updatedResources[index] = { ...resource, completed: true };
      setResources(updatedResources);
    }
  };
  
  const openYoutubeVideo = (resource: ResourceItem, index: number) => {
    if (resource.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${resource.youtubeId}`, '_blank');
      
      toast({
        title: "Opening YouTube video",
        description: `Opening "${resource.title}" in a new tab`,
      });
      
      // Mark as completed after opening
      if (!resource.completed) {
        const updatedResources = [...resources];
        updatedResources[index] = { ...resource, completed: true };
        setResources(updatedResources);
      }
    }
  };

  const handleGetRecommendations = () => {
    toast({
      title: "Analyzing Your Learning Style",
      description: "Finding personalized resources based on your progress and preferences...",
    });
    
    // Simulate a delay before showing recommendations
    setTimeout(() => {
      toast({
        title: "Recommendations Ready",
        description: "We've found 5 new resources tailored to your learning style!",
      });
    }, 2000);
  };
  
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Course Resources</h2>
      
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Your progress</span>
          <span className="text-sm text-muted-foreground">{completedResources} of {resources.length} completed</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {resources.map((resource, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border hover:bg-accent/50 transition-colors flex items-center justify-between ${
              resource.completed ? "bg-accent/20 border-primary/20" : "border-border"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${resource.completed ? "bg-primary/10" : "bg-accent"}`}>
                {resource.source === "youtube" ? (
                  <Youtube className={`h-5 w-5 ${resource.completed ? "text-primary" : "text-muted-foreground"}`} />
                ) : resource.type === "PDF" ? (
                  <FileText className={`h-5 w-5 ${resource.completed ? "text-primary" : "text-muted-foreground"}`} />
                ) : (
                  <BookOpen className={`h-5 w-5 ${resource.completed ? "text-primary" : "text-muted-foreground"}`} />
                )}
              </div>
              <div>
                <h3 className="font-medium">{resource.title}</h3>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <span>{resource.type} • {resource.size}</span>
                  {resource.completed && (
                    <span className="inline-flex items-center text-xs text-primary ml-2">
                      • Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {resource.source === "youtube" ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openYoutubeVideo(resource, index)}
                className="flex items-center gap-1"
              >
                <Youtube className="h-4 w-4" />
                Watch
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(resource, index)}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 rounded-lg border border-primary/20 bg-primary/5">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Study Smarter, Not Harder</h3>
            <p className="text-sm text-muted-foreground">
              Our AI analyzes your learning patterns and interests to suggest additional materials
              that will enhance your understanding and keep you engaged.
            </p>
          </div>
          <Button 
            onClick={handleGetRecommendations}
            className="w-full md:w-auto flex items-center justify-center"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Get Smart Recommendations
          </Button>
        </div>
      </div>
    </>
  );
};

export default CourseResources;
