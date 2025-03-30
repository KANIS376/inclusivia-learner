
import React from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { 
  Users, BookOpen, MessageSquare, Award, 
  BarChart2, Activity, Brain, FileText,
  LogOut, Moon, Sun, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

const TeacherLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out of your account',
      });
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  const navigationItems = [
    { 
      path: '/teacher', 
      name: 'Dashboard', 
      icon: BarChart2,
      exact: true
    },
    { 
      path: '/teacher/students', 
      name: 'Students', 
      icon: Users 
    },
    { 
      path: '/teacher/assignments', 
      name: 'Assignments', 
      icon: FileText 
    },
    {
      path: '/teacher/grading',
      name: 'AI Grading',
      icon: Brain
    },
    { 
      path: '/teacher/messages', 
      name: 'Messages', 
      icon: MessageSquare 
    },
    { 
      path: '/teacher/live-monitoring', 
      name: 'Live Monitoring', 
      icon: Activity 
    },
    { 
      path: '/teacher/leaderboard', 
      name: 'Leaderboard', 
      icon: Award 
    },
    { 
      path: '/teacher/career-guidance', 
      name: 'Career Guidance', 
      icon: BookOpen 
    },
  ];
  
  // Handle mobile view by auto-collapsing sidebar
  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={`bg-card text-card-foreground shadow transition-all duration-300 flex flex-col ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">TE</span>
              </div>
              <span className="font-semibold text-lg">TeachAI</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-semibold text-sm">TE</span>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 mx-auto"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = 
                item.exact 
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  } ${collapsed ? 'justify-center' : 'justify-start'}`}
                >
                  <item.icon className={`h-5 w-5 ${!collapsed && 'mr-3'}`} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'}`}
          >
            {darkMode ? (
              <>
                <Sun className={`h-5 w-5 ${!collapsed && 'mr-3'}`} />
                {!collapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className={`h-5 w-5 ${!collapsed && 'mr-3'}`} />
                {!collapsed && <span>Dark Mode</span>}
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'}`}
          >
            <LogOut className={`h-5 w-5 ${!collapsed && 'mr-3'}`} />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content area where child components will be rendered */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
