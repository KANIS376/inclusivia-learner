
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout/Layout";
import AIAssistant from "../components/AI/AIAssistant";
import { 
  BookOpen, Clock, Star, Award, BarChart3, Calendar, 
  BookMarked, Trophy, Users, ChevronRight, Download, LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getEnrolledCourses, 
  getUserAchievements, 
  getUpcomingLessons, 
  getUserStats,
} from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfilePage from "@/components/Profile/ProfilePage";

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const userId = user?.id || '';

  // Fetch enrolled courses
  const { data: enrolledCourses = [] } = useQuery({
    queryKey: ['enrolledCourses', userId],
    queryFn: () => getEnrolledCourses(userId),
    enabled: !!userId,
  });

  // Fetch user achievements
  const { data: achievements = [] } = useQuery({
    queryKey: ['achievements', userId],
    queryFn: () => getUserAchievements(userId),
    enabled: !!userId,
  });

  // Fetch upcoming lessons
  const { data: upcomingLessons = [] } = useQuery({
    queryKey: ['upcomingLessons', userId],
    queryFn: () => getUpcomingLessons(userId),
    enabled: !!userId,
  });

  // Fetch user stats
  const { data: userStats } = useQuery({
    queryKey: ['userStats', userId],
    queryFn: () => getUserStats(userId),
    enabled: !!userId,
  });

  // Safely get user initials
  const getUserInitials = () => {
    const firstName = user?.user_metadata?.first_name || '';
    const lastName = user?.user_metadata?.last_name || '';
    
    if (!firstName && !lastName) return 'U';
    
    return (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();
  };

  // Get courses to display (use mock data if no real data available)
  const coursesToDisplay = enrolledCourses.length > 0 ? enrolledCourses : [
    {
      id: "1",
      title: "Algebra Fundamentals",
      description: "Learn the basics of algebra",
      image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      progress: 68,
      last_accessed: "2 days ago",
    },
    {
      id: "2",
      title: "Introduction to Coding",
      description: "Start your coding journey",
      image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      progress: 42,
      last_accessed: "Yesterday",
    },
    {
      id: "3",
      title: "English Literature",
      description: "Explore classic literature",
      image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      progress: 89,
      last_accessed: "Today",
    },
  ];

  // Get achievements to display
  const achievementsToDisplay = achievements.length > 0 ? achievements : [
    {
      id: "1",
      name: "Fast Learner",
      description: "Completed 5 lessons in one day",
      icon: "award",
      date_earned: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Perfect Score",
      description: "Got 100% in a quiz",
      icon: "star",
      date_earned: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Consistent",
      description: "Studied for 7 days in a row",
      icon: "trophy",
      date_earned: new Date().toISOString(),
    },
  ];

  // Get lessons to display
  const lessonsToDisplay = upcomingLessons.length > 0 ? upcomingLessons : [
    {
      id: "1",
      title: "Quadratic Equations",
      subject: "Mathematics",
      scheduled_time: "Today, 3:00 PM",
      progress: 0,
    },
    {
      id: "2",
      title: "Forces and Motion",
      subject: "Physics",
      scheduled_time: "Tomorrow, 10:00 AM",
      progress: 0,
    },
    {
      id: "3",
      title: "Cell Structure",
      subject: "Biology",
      scheduled_time: "Wed, 2:00 PM",
      progress: 0,
    },
  ];

  // Get user stats with safe defaults
  const stats = userStats || {
    courses_enrolled: 0,
    lessons_completed: 0,
    hours_spent: 0,
    average_score: 0,
  };

  // Render the icon based on the icon name string
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="h-5 w-5" />;
      case 'star':
        return <Star className="h-5 w-5" />;
      case 'trophy':
        return <Trophy className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  const userInitials = getUserInitials();

  return (
    <Layout>
      {/* Dashboard Header */}
      <div className="bg-accent/30 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url || ''} 
                  alt={user?.user_metadata?.first_name || 'User'} 
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Hello, {user?.user_metadata?.first_name || 'Student'}
                </h1>
                <p className="text-muted-foreground">Welcome to your learning dashboard</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 rounded-full border border-input hover:bg-accent/50 transition-colors inline-flex items-center text-sm font-medium">
                <Calendar className="mr-2 h-4 w-4" />
                This Week
              </button>
              <button className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors inline-flex items-center text-sm font-medium">
                <Download className="mr-2 h-4 w-4" />
                Download Progress
              </button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={handleLogout}
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          {/* Profile Section */}
          <div className="mb-12">
            <ProfilePage />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Stats Cards */}
            {[
              {
                title: "Courses Enrolled",
                value: stats?.courses_enrolled?.toString() || "0",
                icon: <BookMarked className="h-5 w-5 text-emerald-500" />,
                trend: "+2 this month",
                trendUp: true,
              },
              {
                title: "Lessons Completed",
                value: stats?.lessons_completed?.toString() || "0",
                icon: <BookOpen className="h-5 w-5 text-blue-500" />,
                trend: "+12 this month",
                trendUp: true,
              },
              {
                title: "Hours Spent",
                value: stats?.hours_spent?.toString() || "0",
                icon: <Clock className="h-5 w-5 text-purple-500" />,
                trend: "+5 this week",
                trendUp: true,
              },
              {
                title: "Average Score",
                value: `${stats?.average_score || 0}%`,
                icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
                trend: "+3% this month",
                trendUp: true,
              },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/60 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <span className={`inline-flex items-center text-xs ${
                    stat.trendUp ? "text-emerald-500" : "text-red-500"
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            ))}
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* In Progress Courses */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">In Progress</h2>
                <Link
                  to="/learn"
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center text-sm font-medium"
                >
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {coursesToDisplay.map((course) => (
                  <Link 
                    key={course.id} 
                    to={`/learn/${course.id}`}
                    className="glass rounded-xl overflow-hidden hover-lift"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 aspect-video sm:aspect-square">
                        <img
                          src={course.image_url || '/placeholder.svg'}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="p-6 sm:w-2/3">
                        <h3 className="font-semibold mb-2">{course.title}</h3>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-accent/80 rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2"
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Last accessed {course.last_accessed || 'N/A'}
                          </span>
                          <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Lessons */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Upcoming Lessons</h2>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    View all
                  </button>
                </div>
                
                <div className="space-y-4">
                  {lessonsToDisplay.map((lesson) => (
                    <div key={lesson.id} className="p-3 rounded-lg hover:bg-accent/40 transition-colors">
                      <h3 className="font-medium mb-1">{lesson.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {lesson.subject}
                        </span>
                        <span className="text-xs font-medium">
                          {lesson.scheduled_time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Achievements */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Achievements</h2>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    View all
                  </button>
                </div>
                
                <div className="space-y-4">
                  {achievementsToDisplay.map((achievement) => (
                    <div key={achievement.id} className="p-3 rounded-lg hover:bg-accent/40 transition-colors flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {renderIcon(achievement.icon || 'award')}
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Study Buddies */}
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Study Buddies</h2>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Find more
                  </button>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                      >
                        {["A", "B", "C", "D"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    4 online now
                  </span>
                </div>
                
                <button className="w-full py-2 rounded-lg border border-input hover:bg-accent/50 transition-colors text-sm font-medium inline-flex items-center justify-center">
                  <Users className="mr-2 h-4 w-4" />
                  Start Group Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AIAssistant />
    </Layout>
  );
};

export default Dashboard;
