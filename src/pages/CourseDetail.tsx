
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getCourseById, enrollInCourse } from "@/services/courseService";
import type { CourseItem } from "@/types/course"; // Fixed import path for CourseItem

// Component imports
import CourseHeader from "@/components/CourseDetail/CourseHeader";
import EnrollmentCard from "@/components/CourseDetail/EnrollmentCard";
import CourseContent from "@/components/CourseDetail/CourseContent";

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        if (courseId) {
          const courseData = await getCourseById(courseId);
          setCourse(courseData);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast({
          title: "Error",
          description: "Failed to fetch course details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, toast]);

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in this course",
        variant: "default",
      });
      navigate("/login");
      return;
    }

    try {
      setIsEnrolling(true);
      if (courseId) {
        await enrollInCourse(user.id, courseId);
        toast({
          title: "Success!",
          description: "You have successfully enrolled in this course",
          variant: "default",
        });
        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-accent rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-accent rounded mb-8"></div>
            <div className="h-6 bg-accent rounded w-1/2 mb-4"></div>
            <div className="h-32 bg-accent rounded mb-4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 md:py-12 bg-accent/30">
        <div className="container max-w-6xl mx-auto px-4">
          <Button 
            variant="outline" 
            className="mb-6" 
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <CourseHeader course={course} />
            <EnrollmentCard handleEnroll={handleEnroll} isEnrolling={isEnrolling} />
          </div>
        </div>
      </div>
      
      <CourseContent course={course} />
    </Layout>
  );
};

export default CourseDetail;
