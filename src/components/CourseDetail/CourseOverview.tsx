
import React from "react";
import { CheckCircle } from "lucide-react";
import type { CourseItem } from "@/types/course";

interface CourseOverviewProps {
  course: CourseItem;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">About this course</h2>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">{course.description}</p>
        <p className="mb-4">
          This comprehensive course is designed to provide students with a solid foundation in 
          {course.title.toLowerCase()}. Whether you're a beginner or looking to refresh your knowledge, 
          this course offers a structured learning path with practical examples and interactive exercises.
        </p>
        
        <h3 className="text-xl font-semibold mt-8 mb-4">What you'll learn</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
            <span>Understand core theoretical concepts</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
            <span>Apply knowledge to real-world scenarios</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
            <span>Develop problem-solving skills</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
            <span>Build practical projects to showcase your skills</span>
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-8 mb-4">Prerequisites</h3>
        <p>
          No prior knowledge is required for beginners. Intermediate students should have a basic 
          understanding of the fundamental concepts in this field.
        </p>
      </div>
    </>
  );
};

export default CourseOverview;
