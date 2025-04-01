
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowLeft, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getCourseById, enrollInCourse } from "@/services/courseService";
import type { CourseItem } from "./Courses";

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

  // Sample curriculum data (would come from the API in a real implementation)
  const curriculum = [
    { id: 1, title: "Introduction to the Course", duration: "15 min" },
    { id: 2, title: "Core Concepts", duration: "45 min" },
    { id: 3, title: "Practical Application", duration: "60 min" },
    { id: 4, title: "Advanced Techniques", duration: "90 min" },
    { id: 5, title: "Final Project", duration: "120 min" },
  ];

  // Sample reviews (would come from the API in a real implementation)
  const reviews = [
    { id: 1, author: "John D.", rating: 5, comment: "Excellent course with clear explanations" },
    { id: 2, author: "Sarah M.", rating: 4, comment: "Very informative and well-structured" },
    { id: 3, author: "David R.", rating: 5, comment: "The practical examples were very helpful" },
  ];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-${i < rating ? "yellow-500" : "gray-300"}`}>
          ★
        </span>
      ));
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
            
            <div className="lg:w-1/3">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Enroll in this course</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-3xl font-bold">Free</span>
                    <span className="text-muted-foreground line-through">₹1999</span>
                    <Badge className="ml-2">Limited Time</Badge>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? "Enrolling..." : "Enroll Now"}
                  </Button>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Access on mobile and desktop</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
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
            </TabsContent>
            
            <TabsContent value="curriculum" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
              <p className="text-muted-foreground mb-6">
                {curriculum.length} lessons • Approximately 5.5 hours of content
              </p>
              
              <div className="space-y-4">
                {curriculum.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center">
                          {item.id}
                        </div>
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">4.7</div>
                <div className="flex text-yellow-500 text-xl mb-2">★★★★★</div>
                <div className="text-muted-foreground">Based on {reviews.length} reviews</div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border">
                    <div className="flex items-center mb-2">
                      <div className="font-medium mr-3">{review.author}</div>
                      <div className="text-yellow-500">{renderStars(review.rating)}</div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
              <p className="mb-6">
                Access these additional resources to enhance your learning experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Course Workbook", type: "PDF", size: "2.3 MB" },
                  { title: "Practice Exercises", type: "ZIP", size: "4.1 MB" },
                  { title: "Reference Guide", type: "PDF", size: "1.7 MB" },
                  { title: "Supplementary Reading", type: "PDF", size: "3.5 MB" },
                ].map((resource, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        {resource.type} • {resource.size}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
