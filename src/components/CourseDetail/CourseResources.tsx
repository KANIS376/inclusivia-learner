
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseResources: React.FC = () => {
  const { toast } = useToast();
  
  const resources = [
    { title: "Course Workbook", type: "PDF", size: "2.3 MB", url: "#workbook" },
    { title: "Practice Exercises", type: "ZIP", size: "4.1 MB", url: "#exercises" },
    { title: "Reference Guide", type: "PDF", size: "1.7 MB", url: "#guide" },
    { title: "Supplementary Reading", type: "PDF", size: "3.5 MB", url: "#reading" },
  ];
  
  const handleDownload = (resource: typeof resources[0]) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title} (${resource.size})`,
    });
  };
  
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
      <p className="mb-6">
        Access these additional resources to enhance your learning experience.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{resource.title}</h3>
              <div className="text-sm text-muted-foreground">
                {resource.type} • {resource.size}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDownload(resource)}
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseResources;
