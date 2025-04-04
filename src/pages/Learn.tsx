import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import AIAssistant from "../components/AI/AIAssistant";
import { Search, BookOpen, Clock, Star, Filter, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Learn: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subjects = [
    { name: "Mathematics", courses: 24, icon: "📊" },
    { name: "Science", courses: 32, icon: "🧪" },
    { name: "Languages", courses: 18, icon: "🔤" },
    { name: "Computer Science", courses: 15, icon: "💻" },
    { name: "Social Studies", courses: 22, icon: "🌍" },
    { name: "Arts & Music", courses: 12, icon: "🎨" },
  ];

  const allCourses = [
    {
      title: "Introduction to Algebra",
      description: "Learn the fundamentals of algebra with interactive examples.",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.8,
      students: 2345,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isFree: false,
      hasCertificate: true,
    },
    {
      title: "Physics: Forces & Motion",
      description: "Explore Newton's laws and mechanics with virtual simulations.",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.7,
      students: 1823,
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isFree: false,
      hasCertificate: true,
    },
    {
      title: "English Literature",
      description: "Analyze classic literary works with AI-powered insights.",
      level: "All Levels",
      duration: "8 weeks",
      rating: 4.9,
      students: 3056,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isFree: true,
      hasCertificate: false,
    },
    {
      title: "Introduction to Coding",
      description: "Start your programming journey with interactive exercises.",
      level: "Beginner",
      duration: "5 weeks",
      rating: 4.6,
      students: 4127,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isFree: true,
      hasCertificate: false,
    },
    {
      title: "Chemistry Essentials",
      description: "Master the basics of chemistry with virtual lab experiments.",
      level: "Intermediate",
      duration: "7 weeks",
      rating: 4.7,
      students: 1649,
      image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isFree: false,
      hasCertificate: true,
    },
    {
      title: "World History",
      description: "Explore key historical events through interactive timelines.",
      level: "All Levels",
      duration: "6 weeks",
      rating: 4.8,
      students: 2187,
      image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      isFree: false,
      hasCertificate: true,
    },
  ];

  const courses = React.useMemo(() => {
    if (!activeFilter) return allCourses;
    
    switch (activeFilter) {
      case "Beginner":
        return allCourses.filter(course => course.level === "Beginner");
      case "Intermediate":
        return allCourses.filter(course => course.level === "Intermediate");
      case "Advanced":
        return allCourses.filter(course => course.level === "Advanced");
      case "Free":
        return allCourses.filter(course => course.isFree);
      case "Certificate":
        return allCourses.filter(course => course.hasCertificate);
      default:
        return allCourses;
    }
  }, [activeFilter, allCourses]);

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleResetFilters = () => {
    setActiveFilter(null);
  };

  return (
    <Layout>
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-accent/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Courses</h1>
              <p className="text-muted-foreground">Find the perfect course for your learning journey</p>
            </div>
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-full bg-background border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
              onClick={handleResetFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              All Filters
            </Button>
            {["Beginner", "Intermediate", "Advanced", "Free", "Certificate"].map((filter, index) => (
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
          <h2 className="text-2xl font-bold mb-8">Browse by Subject</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                to="#"
                className="hover-lift glass rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="font-medium mb-1">{subject.name}</h3>
                <p className="text-sm text-muted-foreground">{subject.courses} courses</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Link
              to="#"
              className="text-primary hover:text-primary/80 transition-colors inline-flex items-center text-sm font-medium"
            >
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Link
                key={index}
                to="#"
                className="hover-lift glass rounded-xl overflow-hidden h-full"
              >
                <div className="aspect-video w-full overflow-hidden bg-accent">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-accent/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Personalized Learning Path
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI creates a customized learning journey based on your skills, goals, and learning style.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Adaptive difficulty based on your progress",
                    "Content in your preferred language",
                    "Focus on areas where you need more practice",
                    "Regular assessments to track improvement",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-primary shrink-0 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start Your Path
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 md:p-12 flex items-center justify-center">
                <div className="max-w-md w-full">
                  <div className="glass rounded-xl overflow-hidden shadow-lg">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-medium">JS</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">John's Learning Path</h3>
                          <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { subject: "Mathematics", progress: 68 },
                          { subject: "Science", progress: 42 },
                          { subject: "English", progress: 89 },
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{item.subject}</span>
                              <span className="text-sm text-muted-foreground">{item.progress}%</span>
                            </div>
                            <div className="w-full bg-accent/80 rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-accent/40 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Recommended Next:</h4>
                        <p className="text-sm text-muted-foreground">
                          Complete "Algebra: Equations" to unlock advanced topics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <AIAssistant />
    </Layout>
  );
};

export default Learn;
