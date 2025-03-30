import React, { useState } from 'react';
import { 
  Award, Filter, Search, Trophy, 
  Medal, Bookmark, ArrowUpDown, Activity,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Student {
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  badges: number;
  streak: number;
  lastActive: string;
  rank: number;
  change: 'up' | 'down' | 'same';
  subjects: {
    [key: string]: number; // subject name to score mapping
  };
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    totalPoints: 8750,
    badges: 12,
    streak: 14,
    lastActive: '2 hours ago',
    rank: 1,
    change: 'same',
    subjects: {
      'Mathematics': 92,
      'Science': 88,
      'English': 85,
      'History': 90
    }
  },
  {
    id: '2',
    name: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    totalPoints: 8540,
    badges: 11,
    streak: 21,
    lastActive: '1 day ago',
    rank: 2,
    change: 'up',
    subjects: {
      'Mathematics': 89,
      'Science': 94,
      'English': 82,
      'History': 86
    }
  },
  {
    id: '3',
    name: 'Michael Lee',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    totalPoints: 8320,
    badges: 10,
    streak: 7,
    lastActive: '4 hours ago',
    rank: 3,
    change: 'down',
    subjects: {
      'Mathematics': 95,
      'Science': 92,
      'English': 78,
      'History': 84
    }
  },
  {
    id: '4',
    name: 'Emma Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    totalPoints: 7980,
    badges: 9,
    streak: 5,
    lastActive: '3 days ago',
    rank: 4,
    change: 'same',
    subjects: {
      'Mathematics': 85,
      'Science': 80,
      'English': 92,
      'History': 88
    }
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
    totalPoints: 7640,
    badges: 8,
    streak: 3,
    lastActive: '1 week ago',
    rank: 5,
    change: 'up',
    subjects: {
      'Mathematics': 75,
      'Science': 82,
      'English': 90,
      'History': 85
    }
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    totalPoints: 7520,
    badges: 7,
    streak: 12,
    lastActive: '2 days ago',
    rank: 6,
    change: 'down',
    subjects: {
      'Mathematics': 82,
      'Science': 86,
      'English': 94,
      'History': 78
    }
  },
  {
    id: '7',
    name: 'Daniel Brown',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    totalPoints: 7100,
    badges: 6,
    streak: 8,
    lastActive: '5 days ago',
    rank: 7,
    change: 'up',
    subjects: {
      'Mathematics': 78,
      'Science': 88,
      'English': 85,
      'History': 92
    }
  },
  {
    id: '8',
    name: 'Ava Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    totalPoints: 6950,
    badges: 5,
    streak: 4,
    lastActive: '1 day ago',
    rank: 8,
    change: 'same',
    subjects: {
      'Mathematics': 80,
      'Science': 85,
      'English': 88,
      'History': 75
    }
  },
  {
    id: '9',
    name: 'Ethan Clark',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    totalPoints: 6800,
    badges: 6,
    streak: 9,
    lastActive: '6 hours ago',
    rank: 9,
    change: 'down',
    subjects: {
      'Mathematics': 86,
      'Science': 78,
      'English': 80,
      'History': 82
    }
  },
  {
    id: '10',
    name: 'Mia Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/39.jpg',
    totalPoints: 6650,
    badges: 4,
    streak: 2,
    lastActive: '3 days ago',
    rank: 10,
    change: 'up',
    subjects: {
      'Mathematics': 72,
      'Science': 80,
      'English': 90,
      'History': 85
    }
  }
];

const LeaderboardComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [currentTab, setCurrentTab] = useState('overall');
  
  const getFilteredStudents = () => {
    let filtered = [...mockStudents];
    
    if (searchQuery) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (currentTab === 'subjects' && selectedSubject !== 'all') {
      filtered = filtered.sort((a, b) => 
        (b.subjects[selectedSubject] || 0) - (a.subjects[selectedSubject] || 0)
      );
    } else {
      filtered = filtered.sort((a, b) => b.totalPoints - a.totalPoints);
    }
    
    return filtered;
  };
  
  const filteredStudents = getFilteredStudents();
  
  const getSubjectAverage = (subject: string) => {
    const scores = mockStudents.map(student => student.subjects[subject] || 0);
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return (sum / scores.length).toFixed(1);
  };
  
  const getChangeIcon = (change: 'up' | 'down' | 'same') => {
    if (change === 'up') {
      return <div className="text-green-500 flex items-center"><ArrowUpDown className="h-4 w-4 mr-1" />+1</div>;
    } else if (change === 'down') {
      return <div className="text-red-500 flex items-center"><ArrowUpDown className="h-4 w-4 mr-1" />-1</div>;
    }
    return <div className="text-muted-foreground flex items-center"><ArrowUpDown className="h-4 w-4 mr-1" />0</div>;
  };
  
  const topThreeStudents = [...mockStudents].sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          Track top-performing students and gamification metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="hover-lift text-center md:mt-6">
          <CardContent className="pt-6">
            <div className="mb-3">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
                <img 
                  src={topThreeStudents[1]?.avatar} 
                  alt={topThreeStudents[1]?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold">{topThreeStudents[1]?.name}</h3>
                <div className="flex items-center justify-center space-x-1 text-gray-400">
                  <Medal className="h-4 w-4" />
                  <span>2nd Place</span>
                </div>
              </div>
            </div>
            <div className="text-lg font-bold">{topThreeStudents[1]?.totalPoints.toLocaleString()} pts</div>
            <div className="text-sm text-muted-foreground">{topThreeStudents[1]?.badges} badges earned</div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift text-center bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700">
          <CardContent className="pt-6">
            <div className="mb-3">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-yellow-400">
                <img 
                  src={topThreeStudents[0]?.avatar} 
                  alt={topThreeStudents[0]?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold">{topThreeStudents[0]?.name}</h3>
                <div className="flex items-center justify-center space-x-1 text-yellow-500">
                  <Trophy className="h-4 w-4" />
                  <span>1st Place</span>
                </div>
              </div>
            </div>
            <div className="text-lg font-bold">{topThreeStudents[0]?.totalPoints.toLocaleString()} pts</div>
            <div className="text-sm text-muted-foreground">{topThreeStudents[0]?.badges} badges earned</div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift text-center md:mt-12">
          <CardContent className="pt-6">
            <div className="mb-3">
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-4 border-amber-600">
                <img 
                  src={topThreeStudents[2]?.avatar} 
                  alt={topThreeStudents[2]?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold">{topThreeStudents[2]?.name}</h3>
                <div className="flex items-center justify-center space-x-1 text-amber-600">
                  <Medal className="h-4 w-4" />
                  <span>3rd Place</span>
                </div>
              </div>
            </div>
            <div className="text-lg font-bold">{topThreeStudents[2]?.totalPoints.toLocaleString()} pts</div>
            <div className="text-sm text-muted-foreground">{topThreeStudents[2]?.badges} badges earned</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Student Rankings</CardTitle>
            <CardDescription>
              Students ranked by performance across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overall" onValueChange={setCurrentTab}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4">
                <TabsList>
                  <TabsTrigger value="overall">
                    <Trophy className="h-4 w-4 mr-2" />
                    Overall Points
                  </TabsTrigger>
                  <TabsTrigger value="subjects">
                    <Bookmark className="h-4 w-4 mr-2" />
                    By Subject
                  </TabsTrigger>
                  <TabsTrigger value="streaks">
                    <Activity className="h-4 w-4 mr-2" />
                    Streaks
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search students..." 
                      className="pl-9 w-40 sm:w-60"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {currentTab === 'subjects' && (
                    <select
                      className="border rounded-md px-3 py-2 text-sm focus:outline-none"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="all">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                    </select>
                  )}
                </div>
              </div>
              
              <TabsContent value="overall" className="m-0">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Rank</th>
                        <th className="px-4 py-3 text-left">Student</th>
                        <th className="px-4 py-3 text-right">Total Points</th>
                        <th className="px-4 py-3 text-right">Badges</th>
                        <th className="px-4 py-3 text-right">Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                          <tr key={student.id} className="border-b hover:bg-accent/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">#{index + 1}</span>
                                {getChangeIcon(student.change)}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>{student.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right font-medium">
                              {student.totalPoints.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <Award className="h-4 w-4 text-amber-500" />
                                <span>{student.badges}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right text-muted-foreground">
                              {student.lastActive}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            No results found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="subjects" className="m-0">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Rank</th>
                        <th className="px-4 py-3 text-left">Student</th>
                        {selectedSubject === 'all' ? (
                          <>
                            <th className="px-4 py-3 text-right">Mathematics</th>
                            <th className="px-4 py-3 text-right">Science</th>
                            <th className="px-4 py-3 text-right">English</th>
                            <th className="px-4 py-3 text-right">History</th>
                          </>
                        ) : (
                          <th className="px-4 py-3 text-right">{selectedSubject}</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                          <tr key={student.id} className="border-b hover:bg-accent/50 transition-colors">
                            <td className="px-4 py-3 font-semibold">#{index + 1}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>{student.name}</span>
                              </div>
                            </td>
                            {selectedSubject === 'all' ? (
                              <>
                                <td className="px-4 py-3 text-right font-medium">{student.subjects.Mathematics}%</td>
                                <td className="px-4 py-3 text-right font-medium">{student.subjects.Science}%</td>
                                <td className="px-4 py-3 text-right font-medium">{student.subjects.English}%</td>
                                <td className="px-4 py-3 text-right font-medium">{student.subjects.History}%</td>
                              </>
                            ) : (
                              <td className="px-4 py-3 text-right font-medium">{student.subjects[selectedSubject] || 0}%</td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={selectedSubject === 'all' ? 6 : 3} className="px-4 py-8 text-center text-muted-foreground">
                            No results found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="streaks" className="m-0">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Rank</th>
                        <th className="px-4 py-3 text-left">Student</th>
                        <th className="px-4 py-3 text-right">Current Streak</th>
                        <th className="px-4 py-3 text-right">Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents
                        .sort((a, b) => b.streak - a.streak)
                        .map((student, index) => (
                          <tr key={student.id} className="border-b hover:bg-accent/50 transition-colors">
                            <td className="px-4 py-3 font-semibold">#{index + 1}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={student.avatar} 
                                  alt={student.name} 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>{student.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <Activity className="h-4 w-4 text-orange-500" />
                                <span className="font-medium">{student.streak} days</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right text-muted-foreground">
                              {student.lastActive}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Subject Averages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mathematics</span>
                    <span className="font-medium">{getSubjectAverage('Mathematics')}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full" 
                      style={{ width: `${getSubjectAverage('Mathematics')}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Science</span>
                    <span className="font-medium">{getSubjectAverage('Science')}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full rounded-full" 
                      style={{ width: `${getSubjectAverage('Science')}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>English</span>
                    <span className="font-medium">{getSubjectAverage('English')}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-500 h-full rounded-full" 
                      style={{ width: `${getSubjectAverage('English')}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>History</span>
                    <span className="font-medium">{getSubjectAverage('History')}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ width: `${getSubjectAverage('History')}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Rankings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardComponent;
