
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getCourses } from "@/services/courseService";
import type { CourseItem } from "@/types/course";

export const useCourses = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const coursesData = await getCourses();
      setCourses(coursesData);
      setFilteredCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Error",
        description: "Failed to fetch courses. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Filter courses based on search query and active filter
    let result = courses;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query)
      );
    }
    
    if (activeFilter) {
      result = result.filter(course => course.level === activeFilter);
    }
    
    setFilteredCourses(result);
  }, [searchQuery, activeFilter, courses]);

  return {
    courses,
    filteredCourses,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
  };
};
