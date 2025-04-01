
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import CourseOverview from "./CourseOverview";
import CourseCurriculum from "./CourseCurriculum";
import CourseReviews from "./CourseReviews";
import CourseResources from "./CourseResources";
import type { CourseItem } from "@/types/course";

interface CourseContentProps {
  course: CourseItem;
}

const CourseContent: React.FC<CourseContentProps> = ({ course }) => {
  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="w-full flex justify-start space-x-2 bg-transparent p-0 overflow-x-auto">
            <TabsTrigger value="overview" className="px-6 py-3 rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="px-6 py-3 rounded-lg">
              Curriculum
            </TabsTrigger>
            <TabsTrigger value="reviews" className="px-6 py-3 rounded-lg">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-6 py-3 rounded-lg">
              Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <CourseOverview course={course} />
          </TabsContent>
          
          <TabsContent value="curriculum" className="mt-6">
            <CourseCurriculum />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <CourseReviews />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-6">
            <CourseResources />
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Ready to start learning?</h3>
              <p className="text-muted-foreground">
                Join thousands of students already enrolled in this course
              </p>
            </div>
            <ul className="flex flex-wrap gap-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span>Self-paced learning</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span>Certificate of completion</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span>Lifetime access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
