
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to enhance your learning?</h3>
              <p className="text-muted-foreground">
                Track your progress, get personalized recommendations, and connect with peers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Continue Learning
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Save for Later
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { text: "Self-paced learning", icon: CheckCircle },
              { text: "Certificate of completion", icon: CheckCircle },
              { text: "Access to YouTube integrations", icon: CheckCircle },
              { text: "Personalized recommendations", icon: CheckCircle },
            ].map((item, i) => (
              <div key={i} className="flex items-start">
                <item.icon className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
