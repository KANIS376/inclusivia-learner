
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users } from "lucide-react";
import type { CourseItem } from "@/types/course";

interface CourseHeaderProps {
  course: CourseItem;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  return (
    <div className="lg:w-2/3">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {course.level}
        </Badge>
        {course.duration && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration} weeks</span>
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>1,234 students</span>
        </div>
      </div>
      
      <div className="aspect-video rounded-lg overflow-hidden bg-accent mb-6">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-primary/40" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHeader;
