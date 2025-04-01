
import React from "react";
import { Card } from "@/components/ui/card";

interface CourseSkeletonsProps {
  count?: number;
}

const CourseSkeletons: React.FC<CourseSkeletonsProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="hover-lift">
          <div className="aspect-video w-full bg-accent animate-pulse"></div>
          <div className="p-6">
            <div className="h-6 mb-2 bg-accent/60 rounded animate-pulse"></div>
            <div className="h-20 bg-accent/40 rounded animate-pulse"></div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CourseSkeletons;
