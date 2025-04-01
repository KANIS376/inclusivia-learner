
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
          <TabsList className="w-full flex justify-start space-x-2 bg-transparent p-0">
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
      </div>
    </div>
  );
};

export default CourseContent;
