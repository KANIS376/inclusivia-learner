
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import TeacherLayout from "./components/Teacher/TeacherLayout";
import TeacherDashboardOverview from "./components/Teacher/Dashboard/TeacherDashboardOverview";
import StudentsList from "./components/Teacher/Students/StudentsList";
import AssignmentManager from "./components/Teacher/Assignments/AssignmentManager";
import AIGradingSystem from "./components/Teacher/AIGrading/AIGradingSystem";
import MessagingSystem from "./components/Teacher/Messaging/MessagingSystem";
import LiveClassMonitoring from "./components/Teacher/LiveMonitoring/LiveClassMonitoring";
import LeaderboardComponent from "./components/Teacher/Leaderboard/LeaderboardComponent";
import CareerGuidanceSystem from "./components/Teacher/CareerGuidance/CareerGuidanceSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher Dashboard Routes */}
            <Route 
              path="/teacher" 
              element={
                <ProtectedRoute>
                  <TeacherLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<TeacherDashboardOverview />} />
              <Route path="students" element={<StudentsList />} />
              <Route path="assignments" element={<AssignmentManager />} />
              <Route path="grading" element={<AIGradingSystem />} />
              <Route path="messages" element={<MessagingSystem />} />
              <Route path="live-monitoring" element={<LiveClassMonitoring />} />
              <Route path="leaderboard" element={<LeaderboardComponent />} />
              <Route path="career-guidance" element={<CareerGuidanceSystem />} />
            </Route>
            
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
