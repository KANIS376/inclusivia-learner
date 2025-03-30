
import React, { useState, useEffect } from 'react';
import { 
  Activity, User, Clock, Users, 
  MessageSquare, Hand, BarChart2, 
  Flag, CheckCircle, XCircle, Circle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isActive: boolean;
  status: 'attentive' | 'distracted' | 'away' | 'confused' | 'hand-raised';
  progress: number;
  questions: number;
  answers: number;
  lastActive: string;
}

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; count: number }[];
  totalVotes: number;
  status: 'active' | 'ended';
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
    isActive: true,
    status: 'attentive',
    progress: 85,
    questions: 2,
    answers: 5,
    lastActive: 'Now'
  },
  {
    id: '2',
    name: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
    isActive: true,
    status: 'confused',
    progress: 65,
    questions: 3,
    answers: 2,
    lastActive: 'Now'
  },
  {
    id: '3',
    name: 'Michael Lee',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    isOnline: true,
    isActive: true,
    status: 'hand-raised',
    progress: 70,
    questions: 1,
    answers: 4,
    lastActive: 'Now'
  },
  {
    id: '4',
    name: 'Emma Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    isOnline: true,
    isActive: false,
    status: 'distracted',
    progress: 45,
    questions: 0,
    answers: 1,
    lastActive: '2 min ago'
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
    isOnline: true,
    isActive: false,
    status: 'away',
    progress: 30,
    questions: 0,
    answers: 0,
    lastActive: '5 min ago'
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    isOnline: true,
    isActive: true,
    status: 'attentive',
    progress: 90,
    questions: 4,
    answers: 7,
    lastActive: 'Now'
  },
  {
    id: '7',
    name: 'Daniel Brown',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    isOnline: false,
    isActive: false,
    status: 'away',
    progress: 0,
    questions: 0,
    answers: 0,
    lastActive: 'Offline'
  },
  {
    id: '8',
    name: 'Ava Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    isOnline: true,
    isActive: true,
    status: 'attentive',
    progress: 75,
    questions: 1,
    answers: 3,
    lastActive: 'Now'
  }
];

// Mock poll data
const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'Which data structure would be most appropriate for implementing a queue?',
    options: [
      { id: 'a', text: 'Linked List', count: 12 },
      { id: 'b', text: 'Stack', count: 3 },
      { id: 'c', text: 'Binary Tree', count: 1 },
      { id: 'd', text: 'Hash Table', count: 2 }
    ],
    totalVotes: 18,
    status: 'active'
  },
  {
    id: '2',
    question: 'What is the time complexity of binary search?',
    options: [
      { id: 'a', text: 'O(1)', count: 2 },
      { id: 'b', text: 'O(log n)', count: 14 },
      { id: 'c', text: 'O(n)', count: 3 },
      { id: 'd', text: 'O(n²)', count: 1 }
    ],
    totalVotes: 20,
    status: 'ended'
  }
];

const LiveClassMonitoring: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isClassActive, setIsClassActive] = useState(true);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(polls[0]);
  const { toast } = useToast();
  
  // Update time elapsed for the class session
  useEffect(() => {
    if (isClassActive) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isClassActive]);
  
  // Format elapsed time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  
  const getStudentStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'attentive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'distracted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confused':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'hand-raised':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'away':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default:
        return '';
    }
  };
  
  const getStudentStatusText = (status: Student['status']) => {
    switch (status) {
      case 'attentive':
        return 'Attentive';
      case 'distracted':
        return 'Distracted';
      case 'confused':
        return 'Confused';
      case 'hand-raised':
        return 'Hand Raised';
      case 'away':
        return 'Away';
      default:
        return '';
    }
  };
  
  const getStudentStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'attentive':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'distracted':
        return <XCircle className="h-4 w-4 mr-1" />;
      case 'confused':
        return <Flag className="h-4 w-4 mr-1" />;
      case 'hand-raised':
        return <Hand className="h-4 w-4 mr-1" />;
      case 'away':
        return <Circle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const getClassStats = () => {
    const onlineCount = students.filter(s => s.isOnline).length;
    const activeCount = students.filter(s => s.isActive).length;
    const attentiveCount = students.filter(s => s.status === 'attentive').length;
    const confusedCount = students.filter(s => s.status === 'confused').length;
    const handRaisedCount = students.filter(s => s.status === 'hand-raised').length;
    
    return {
      onlineCount,
      activeCount,
      attentiveCount,
      confusedCount,
      handRaisedCount,
      attendanceRate: Math.round((onlineCount / students.length) * 100),
      engagementRate: onlineCount > 0 ? Math.round((activeCount / onlineCount) * 100) : 0,
      attentiveRate: activeCount > 0 ? Math.round((attentiveCount / activeCount) * 100) : 0
    };
  };
  
  const stats = getClassStats();
  
  const endClass = () => {
    setIsClassActive(false);
    toast({
      title: 'Class Ended',
      description: 'The live class session has been ended.',
    });
  };
  
  const resumeClass = () => {
    setIsClassActive(true);
    toast({
      title: 'Class Resumed',
      description: 'The live class session has been resumed.',
    });
  };
  
  const endPoll = (pollId: string) => {
    setPolls(polls.map(poll => 
      poll.id === pollId ? { ...poll, status: 'ended' } : poll
    ));
    
    if (selectedPoll?.id === pollId) {
      setSelectedPoll({ ...selectedPoll, status: 'ended' });
    }
    
    toast({
      title: 'Poll Ended',
      description: 'The poll has been closed for responses.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Live Class Monitoring</h1>
        <p className="text-muted-foreground">
          Track real-time student engagement and participation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {isClassActive ? (
                    <span className="flex items-center text-green-500">
                      <Activity className="h-5 w-5 mr-2 animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <Activity className="h-5 w-5 mr-2" />
                      Ended
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {isClassActive ? 'Current session in progress' : 'Session has ended'}
                </p>
              </div>
              
              {isClassActive ? (
                <Button variant="destructive" size="sm" onClick={endClass}>
                  End Class
                </Button>
              ) : (
                <Button size="sm" onClick={resumeClass}>
                  Resume Class
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time Elapsed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  {formatTime(elapsedTime)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Session started at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  {stats.onlineCount}/{students.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.attendanceRate}% attendance rate
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-center">
                  <div className="text-lg font-semibold">{stats.activeCount}</div>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{stats.handRaisedCount}</div>
                  <p className="text-xs text-muted-foreground">Hands</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">Student</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-center">Progress</th>
                      <th className="px-4 py-3 text-center">Questions</th>
                      <th className="px-4 py-3 text-center">Answers</th>
                      <th className="px-4 py-3 text-right">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-accent/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <img 
                                src={student.avatar} 
                                alt={student.name} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              {student.isOnline && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                              )}
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            className={`flex w-28 items-center justify-center ${getStudentStatusColor(student.status)}`} 
                            variant="outline"
                          >
                            {getStudentStatusIcon(student.status)}
                            {getStudentStatusText(student.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col items-center">
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  student.progress >= 70 ? 'bg-green-500' : 
                                  student.progress >= 40 ? 'bg-amber-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {student.questions}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {student.answers}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {student.lastActive}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Attendance Rate</span>
                  <span className="font-medium">{stats.attendanceRate}%</span>
                </div>
                <Progress value={stats.attendanceRate} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Engagement Rate</span>
                  <span className="font-medium">{stats.engagementRate}%</span>
                </div>
                <Progress value={stats.engagementRate} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Attentiveness</span>
                  <span className="font-medium">{stats.attentiveRate}%</span>
                </div>
                <Progress value={stats.attentiveRate} />
              </div>
              
              <div className="pt-2 grid grid-cols-3 text-center">
                <div>
                  <div className="text-xl font-bold">{stats.handRaisedCount}</div>
                  <p className="text-xs text-muted-foreground">Hands Raised</p>
                </div>
                <div>
                  <div className="text-xl font-bold">{stats.confusedCount}</div>
                  <p className="text-xs text-muted-foreground">Confused</p>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {students.reduce((acc, student) => acc + student.questions, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Live Polls</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={polls[0]?.id}>
                <TabsList className="w-full">
                  {polls.map((poll) => (
                    <TabsTrigger 
                      key={poll.id} 
                      value={poll.id}
                      onClick={() => setSelectedPoll(poll)}
                    >
                      Poll {poll.id}
                      {poll.status === 'active' && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {selectedPoll && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">{selectedPoll.question}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedPoll.totalVotes} responses • 
                        {selectedPoll.status === 'active' ? ' Live' : ' Closed'}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedPoll.options.map((option) => {
                        const percentage = selectedPoll.totalVotes > 0 
                          ? Math.round((option.count / selectedPoll.totalVotes) * 100) 
                          : 0;
                        
                        return (
                          <div key={option.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{option.text}</span>
                              <span className="font-medium">{percentage}%</span>
                            </div>
                            <div className="w-full h-8 bg-secondary rounded overflow-hidden">
                              <div 
                                className="h-full bg-primary flex items-center pl-2 text-primary-foreground text-xs font-medium"
                                style={{ width: `${percentage}%` }}
                              >
                                {option.count} votes
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Share Results
                      </Button>
                      
                      {selectedPoll.status === 'active' && (
                        <Button 
                          size="sm"
                          onClick={() => endPoll(selectedPoll.id)}
                        >
                          End Poll
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveClassMonitoring;
