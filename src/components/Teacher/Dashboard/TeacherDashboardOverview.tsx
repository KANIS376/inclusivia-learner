
import React from 'react';
import { 
  Users, BookOpen, MessageSquare, Award, 
  CheckCircle, Clock, AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PerformanceChart from '@/components/Dashboard/Charts/PerformanceChart';
import { useQuery } from '@tanstack/react-query';

// Mock data service - this would connect to Supabase in a real implementation
const fetchDashboardStats = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    totalStudents: 128,
    activeStudents: 89,
    pendingAssignments: 12,
    completedAssignments: 34,
    averageGrade: 78.5,
    messages: 7,
    topStudents: 5,
    upcomingDeadlines: 3
  };
};

const TeacherDashboardOverview: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });
  
  const stats = data || {
    totalStudents: 0,
    activeStudents: 0,
    pendingAssignments: 0,
    completedAssignments: 0,
    averageGrade: 0,
    messages: 0,
    topStudents: 0,
    upcomingDeadlines: 0
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your class performance and activities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats.totalStudents
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (
                <div className="h-3 w-24 bg-muted animate-pulse rounded mt-1" />
              ) : (
                `${stats.activeStudents} active now`
              )}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats.pendingAssignments + stats.completedAssignments
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (
                <div className="h-3 w-24 bg-muted animate-pulse rounded mt-1" />
              ) : (
                `${stats.completedAssignments} graded, ${stats.pendingAssignments} pending`
              )}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                `${stats.averageGrade}%`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (
                <div className="h-3 w-24 bg-muted animate-pulse rounded mt-1" />
              ) : (
                `${stats.topStudents} top performers`
              )}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                stats.messages
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (
                <div className="h-3 w-24 bg-muted animate-pulse rounded mt-1" />
              ) : (
                `${stats.messages} unread messages`
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <PerformanceChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-4 border-b last:border-0 border-border">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-1 flex-1">
                        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                        <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <ActivityItem 
                    icon={<CheckCircle className="h-4 w-4 text-green-500" />}
                    title="Alex Johnson submitted Assignment #3"
                    time="10 minutes ago"
                  />
                  <ActivityItem 
                    icon={<Clock className="h-4 w-4 text-amber-500" />}
                    title="'Data Structures Quiz' is due tomorrow"
                    time="30 minutes ago"
                  />
                  <ActivityItem 
                    icon={<MessageSquare className="h-4 w-4 text-blue-500" />}
                    title="New message from Sophia Williams"
                    time="1 hour ago"
                  />
                  <ActivityItem 
                    icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                    title="4 students didn't complete yesterday's assignment"
                    time="3 hours ago"
                  />
                  <ActivityItem 
                    icon={<Award className="h-4 w-4 text-purple-500" />}
                    title="Michael Lee reached 95% in Linear Algebra"
                    time="5 hours ago"
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 border-b last:border-0 border-border">
                    <div className="space-y-1">
                      <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-1/4 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <DeadlineItem 
                    title="AI Ethics Project" 
                    date="Tomorrow, 11:59 PM"
                    submissions="12/28 submitted"
                    progress={43}
                  />
                  <DeadlineItem 
                    title="Data Visualization Quiz" 
                    date="Jan 15, 11:59 PM"
                    submissions="6/28 submitted"
                    progress={21}
                  />
                  <DeadlineItem 
                    title="Machine Learning Assignment" 
                    date="Jan 18, 11:59 PM"
                    submissions="0/28 submitted"
                    progress={0}
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  time: string;
}> = ({ icon, title, time }) => (
  <div className="p-4 border-b last:border-0 border-border flex items-start hover:bg-accent/30 transition-colors">
    <div className="mr-3 mt-0.5">{icon}</div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

const DeadlineItem: React.FC<{
  title: string;
  date: string;
  submissions: string;
  progress: number;
}> = ({ title, date, submissions, progress }) => (
  <div className="p-4 border-b last:border-0 border-border hover:bg-accent/30 transition-colors">
    <div className="flex justify-between items-start mb-1">
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
    <div className="mt-2">
      <div className="flex justify-between items-center text-xs mb-1">
        <span className="text-muted-foreground">{submissions}</span>
      </div>
      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </div>
);

export default TeacherDashboardOverview;
