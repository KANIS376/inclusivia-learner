
import React, { useState, useEffect } from "react";
import { ExternalLink, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoRecommendationsProps {
  courseTitle: string;
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: string;
}

const VideoRecommendations: React.FC<VideoRecommendationsProps> = ({ courseTitle }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock function to simulate fetching video recommendations
    // In a real app, this would call an API to get YouTube video recommendations
    const fetchVideoRecommendations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on course title
        const mockVideos: VideoItem[] = [
          {
            id: "video1",
            title: `Complete ${courseTitle} Tutorial for Beginners`,
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
            channelTitle: "Learning Channel",
            viewCount: "456K"
          },
          {
            id: "video2",
            title: `Advanced ${courseTitle} Techniques`,
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
            channelTitle: "Expert Academy",
            viewCount: "234K"
          },
          {
            id: "video3",
            title: `${courseTitle} Practice Problems Explained`,
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
            channelTitle: "Tutorial Hub",
            viewCount: "789K"
          }
        ];
        
        setVideos(mockVideos);
      } catch (error) {
        console.error("Error fetching video recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoRecommendations();
  }, [courseTitle]);

  const handleWatchVideo = (videoId: string) => {
    // In a real app, this would open the YouTube video in a new tab
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="py-12 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Recommended Videos</h2>
            <p className="text-muted-foreground">
              Watch these related videos to enhance your understanding of the course material
            </p>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex items-center">
            <Youtube className="mr-2 h-4 w-4" />
            Browse All
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-video bg-accent rounded-lg mb-3"></div>
                <div className="h-4 bg-accent rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-accent rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
              >
                <div className="aspect-video bg-accent overflow-hidden relative group cursor-pointer"
                     onClick={() => handleWatchVideo(video.id)}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm" className="flex items-center">
                      <Youtube className="mr-2 h-4 w-4" />
                      Watch Now
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium line-clamp-2 mb-1">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.channelTitle}</span>
                    <span>{video.viewCount} views</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 w-full flex items-center justify-center"
                    onClick={() => handleWatchVideo(video.id)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoRecommendations;
