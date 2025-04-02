
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResourceItem {
  title: string;
  type: string;
  size: string;
  url: string;
  source: "app" | "youtube";
  youtubeId?: string;
}

const CourseResources: React.FC = () => {
  const { toast } = useToast();
  
  const resources: ResourceItem[] = [
    { 
      title: "Course Workbook", 
      type: "PDF", 
      size: "2.3 MB", 
      url: "#workbook", 
      source: "app" 
    },
    { 
      title: "Practice Exercises", 
      type: "ZIP", 
      size: "4.1 MB", 
      url: "#exercises", 
      source: "app" 
    },
    { 
      title: "Reference Guide", 
      type: "PDF", 
      size: "1.7 MB", 
      url: "#guide", 
      source: "app" 
    },
    { 
      title: "Video Tutorial: Practical Applications", 
      type: "YouTube", 
      size: "10:15", 
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      source: "youtube",
      youtubeId: "dQw4w9WgXcQ"
    },
    { 
      title: "Supplementary Reading", 
      type: "PDF", 
      size: "3.5 MB", 
      url: "#reading", 
      source: "app" 
    },
    { 
      title: "Expert Deep Dive: Key Concepts", 
      type: "YouTube", 
      size: "15:42", 
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      source: "youtube",
      youtubeId: "dQw4w9WgXcQ"
    },
  ];
  
  const handleDownload = (resource: ResourceItem) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title} (${resource.size})`,
    });
  };
  
  const openYoutubeVideo = (resource: ResourceItem) => {
    if (resource.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${resource.youtubeId}`, '_blank');
      
      toast({
        title: "Opening YouTube video",
        description: `Opening "${resource.title}" in a new tab`,
      });
    }
  };
  
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
      <p className="mb-6">
        Access these additional resources to enhance your learning experience. Includes both downloadable files and recommended videos.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{resource.title}</h3>
              <div className="text-sm text-muted-foreground flex items-center">
                {resource.source === "youtube" ? (
                  <>
                    <Youtube className="h-3.5 w-3.5 mr-1" />
                    <span>{resource.type} • {resource.size}</span>
                  </>
                ) : (
                  <span>{resource.type} • {resource.size}</span>
                )}
              </div>
            </div>
            
            {resource.source === "youtube" ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openYoutubeVideo(resource)}
                className="flex items-center"
              >
                <Youtube className="h-4 w-4 mr-1" />
                Watch
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDownload(resource)}
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-lg border border-primary/20 bg-primary/5">
        <h3 className="font-medium mb-2">Learning Recommendation Engine</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Our AI-powered system analyzes your progress and recommends additional resources that match your learning style and pace.
        </p>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center"
          onClick={() => {
            toast({
              title: "Personalized Recommendations",
              description: "Analyzing your learning progress and generating recommendations...",
            });
          }}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Get Personalized Recommendations
        </Button>
      </div>
    </>
  );
};

export default CourseResources;
