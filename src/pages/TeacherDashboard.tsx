
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Users,
  GraduationCap,
  Calendar,
  MessageSquare,
  Award,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import StudentsList from "@/components/Dashboard/StudentsList";

const TeacherDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader className="flex items-center px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">IL</span>
                </div>
                <span className="font-semibold text-lg">Inclusivia</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard" isActive={true}>
                      <BarChart className="w-4 h-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Students">
                      <Users className="w-4 h-4" />
                      <span>Students</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Courses">
                      <GraduationCap className="w-4 h-4" />
                      <span>Courses</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Assignments">
                      <Calendar className="w-4 h-4" />
                      <span>Assignments</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Messages">
                      <MessageSquare className="w-4 h-4" />
                      <span>Messages</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Leaderboard">
                      <Award className="w-4 h-4" />
                      <span>Leaderboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Logout" 
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    {user?.email?.charAt(0).toUpperCase() || 'T'}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{user?.email?.split('@')[0] || 'Teacher'}</p>
                    <p className="text-xs text-muted-foreground">Teacher</p>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          
          <main className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="grading">AI Grading</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <DashboardOverview />
              </TabsContent>
              
              <TabsContent value="students">
                <StudentsList />
              </TabsContent>
              
              <TabsContent value="assignments">
                <div className="rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium">Assignments Management</h3>
                  <p className="text-muted-foreground mt-2">Coming soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="grading">
                <div className="rounded-lg border p-8 text-center">
                  <h3 className="text-lg font-medium">AI-Powered Grading</h3>
                  <p className="text-muted-foreground mt-2">Coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default TeacherDashboard;
