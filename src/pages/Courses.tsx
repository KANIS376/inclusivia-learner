
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { enrollInCourse } from "@/services/courseService";
import { useCourses } from "@/hooks/useCourses";

// Component imports
import CourseSearch from "@/components/Courses/CourseSearch";
import CourseFilters from "@/components/Courses/CourseFilters";
import CourseCard from "@/components/Courses/CourseCard";
import CourseSkeletons from "@/components/Courses/CourseSkeletons";
import EmptyCourseState from "@/components/Courses/EmptyCourseState";

const Courses: React.FC = () => {
  const { 
    filteredCourses, 
    isLoading, 
    searchQuery, 
    setSearchQuery, 
    activeFilter, 
    setActiveFilter 
  } = useCourses();
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to course detail
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in courses",
        variant: "default",
      });
      navigate("/login");
      return;
    }

    try {
      await enrollInCourse(user.id, courseId);
      toast({
        title: "Success!",
        description: "You have successfully enrolled in this course",
        variant: "default",
      });
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in this course. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-accent/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Courses</h1>
              <p className="text-muted-foreground">Find the perfect course for your learning journey</p>
            </div>
            <CourseSearch 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
            />
          </div>
          
          <CourseFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>
      </section>
      
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <CourseSkeletons count={6} />
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onEnroll={handleEnroll} 
                />
              ))}
            </div>
          ) : (
            <EmptyCourseState />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
