
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Search, Filter, Star, ChevronRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getCourses, enrollInCourse } from "@/services/courseService";

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  level: string;
  duration: number | null;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

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

  const handleViewCourseDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
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
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="outline"
              className={`inline-flex items-center px-4 py-2 rounded-full ${
                activeFilter === null 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              } transition-colors text-sm`}
              onClick={() => setActiveFilter(null)}
            >
              <Filter className="mr-2 h-4 w-4" />
              All Levels
            </Button>
            {["Beginner", "Intermediate", "Advanced"].map((filter, index) => (
              <Button
                key={index}
                variant="outline"
                className={`px-4 py-2 rounded-full ${
                  activeFilter === filter 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-background border border-input hover:bg-accent/50"
                } transition-colors text-sm`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover-lift">
                  <div className="aspect-video w-full bg-accent animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 mb-2 bg-accent/60 rounded animate-pulse"></div>
                    <div className="h-20 bg-accent/40 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="hover-lift overflow-hidden h-full flex flex-col cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleViewCourseDetails(course.id)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-accent">
                    {course.image_url ? (
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
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
                        {course.level}
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
                      onClick={(e) => handleEnroll(course.id, e)}
                    >
                      Enroll Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCourseDetails(course.id);
                      }}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
