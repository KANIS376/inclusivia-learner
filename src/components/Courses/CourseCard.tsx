
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ChevronRight, Info } from "lucide-react";
import type { CourseItem } from '@/types/course';

interface CourseCardProps {
  course: CourseItem;
  onEnroll: (courseId: string, e: React.MouseEvent) => Promise<void>;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const navigate = useNavigate();

  const handleViewCourseDetails = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <Card 
      key={course.id} 
      className="hover-lift overflow-hidden h-full flex flex-col cursor-pointer transition-all hover:shadow-md"
      onClick={handleViewCourseDetails}
    >
      <div className="aspect-video w-full overflow-hidden bg-accent">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary/40" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {course.level || 'All Levels'}
          </Badge>
          {course.duration && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration} weeks</span>
            </div>
          )}
        </div>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex gap-2">
        <Button 
          className="flex-1" 
          onClick={(e) => onEnroll(course.id, e)}
        >
          Enroll Now
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleViewCourseDetails();
          }}
        >
          <Info className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
