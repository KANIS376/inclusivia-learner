
import React, { useState } from 'react';
import { 
  Briefcase, Search, ChevronDown, ChevronUp, 
  Brain, BarChart2, LineChart, Clock,
  User, Book, FileCheck, RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  interests: string[];
  strengths: string[];
  careerMatches: {
    career: string;
    match: number;
    description: string;
    skills: string[];
    outlook: 'growing' | 'stable' | 'declining';
    education: string;
    salary: string;
  }[];
  recommendedCourses: {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
  }[];
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    grade: 'A',
    interests: ['Computer Science', 'Mathematics', 'Machine Learning'],
    strengths: ['Problem Solving', 'Critical Thinking', 'Data Analysis'],
    careerMatches: [
      {
        career: 'Data Scientist',
        match: 92,
        description: 'Analyzes complex data to help organizations make better decisions.',
        skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
        outlook: 'growing',
        education: 'Bachelor\'s or Master\'s in Computer Science, Statistics or related field',
        salary: '$100,000 - $150,000'
      },
      {
        career: 'Software Engineer',
        match: 85,
        description: 'Designs, develops, and maintains software systems and applications.',
        skills: ['Programming', 'Algorithms', 'System Design', 'Problem Solving'],
        outlook: 'growing',
        education: 'Bachelor\'s in Computer Science or Software Engineering',
        salary: '$90,000 - $140,000'
      },
      {
        career: 'Machine Learning Engineer',
        match: 80,
        description: 'Builds and deploys ML models and systems at scale.',
        skills: ['ML Algorithms', 'Deep Learning', 'Python', 'Model Deployment'],
        outlook: 'growing',
        education: 'Master\'s or PhD in Computer Science, AI, or related field',
        salary: '$110,000 - $160,000'
      }
    ],
    recommendedCourses: [
      {
        id: 'c1',
        title: 'Advanced Machine Learning',
        description: 'Deep dive into algorithms, neural networks, and model optimization.',
        level: 'Advanced',
        duration: '12 weeks'
      },
      {
        id: 'c2',
        title: 'Data Structures & Algorithms',
        description: 'Master fundamental CS concepts and problem-solving techniques.',
        level: 'Intermediate',
        duration: '10 weeks'
      },
      {
        id: 'c3',
        title: 'Python for Data Science',
        description: 'Learn to use Python libraries like Pandas, NumPy and Matplotlib for data analysis.',
        level: 'Intermediate',
        duration: '8 weeks'
      }
    ]
  },
  {
    id: '2',
    name: 'Sophia Williams',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    grade: 'A-',
    interests: ['Biology', 'Chemistry', 'Research', 'Healthcare'],
    strengths: ['Research', 'Laboratory Skills', 'Analysis', 'Attention to Detail'],
    careerMatches: [
      {
        career: 'Biomedical Researcher',
        match: 95,
        description: 'Conducts research to improve human health and medical treatments.',
        skills: ['Laboratory Techniques', 'Data Analysis', 'Scientific Writing', 'Research Design'],
        outlook: 'growing',
        education: 'PhD in Biology, Biochemistry or related field',
        salary: '$80,000 - $120,000'
      },
      {
        career: 'Pharmacologist',
        match: 88,
        description: 'Studies the effects of drugs and develops new pharmaceutical treatments.',
        skills: ['Pharmacokinetics', 'Toxicology', 'Clinical Trials', 'Drug Development'],
        outlook: 'stable',
        education: 'PharmD or PhD in Pharmacology',
        salary: '$90,000 - $130,000'
      },
      {
        career: 'Medical Scientist',
        match: 82,
        description: 'Conducts research to improve human health and understand diseases.',
        skills: ['Clinical Research', 'Medical Knowledge', 'Data Analysis', 'Lab Techniques'],
        outlook: 'growing',
        education: 'MD or PhD in Life Sciences',
        salary: '$95,000 - $140,000'
      }
    ],
    recommendedCourses: [
      {
        id: 'c4',
        title: 'Molecular Biology Techniques',
        description: 'Learn advanced lab methods for molecular research and analysis.',
        level: 'Advanced',
        duration: '10 weeks'
      },
      {
        id: 'c5',
        title: 'Biostatistics',
        description: 'Statistical methods for analyzing biological and medical data.',
        level: 'Intermediate',
        duration: '8 weeks'
      },
      {
        id: 'c6',
        title: 'Research Methods in Life Sciences',
        description: 'Learn to design, conduct, and analyze scientific research experiments.',
        level: 'Intermediate',
        duration: '12 weeks'
      }
    ]
  },
  {
    id: '3',
    name: 'Michael Lee',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    grade: 'A+',
    interests: ['Economics', 'Finance', 'Data Analysis', 'Business'],
    strengths: ['Analytical Thinking', 'Mathematics', 'Communication', 'Problem Solving'],
    careerMatches: [
      {
        career: 'Financial Analyst',
        match: 90,
        description: 'Analyzes financial data to guide business and investment decisions.',
        skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Business Knowledge'],
        outlook: 'stable',
        education: 'Bachelor\'s in Finance, Economics, or Accounting',
        salary: '$75,000 - $110,000'
      },
      {
        career: 'Quantitative Analyst',
        match: 87,
        description: 'Develops mathematical models to support financial and risk management.',
        skills: ['Advanced Mathematics', 'Statistics', 'Programming', 'Financial Markets'],
        outlook: 'growing',
        education: 'Master\'s or PhD in Math, Physics, or related field',
        salary: '$100,000 - $150,000'
      },
      {
        career: 'Economist',
        match: 82,
        description: 'Studies economic trends and provides forecasts and analysis.',
        skills: ['Economic Theory', 'Statistical Analysis', 'Research', 'Critical Thinking'],
        outlook: 'stable',
        education: 'Master\'s or PhD in Economics',
        salary: '$85,000 - $130,000'
      }
    ],
    recommendedCourses: [
      {
        id: 'c7',
        title: 'Investment Analysis and Portfolio Management',
        description: 'Learn to analyze investment opportunities and build financial portfolios.',
        level: 'Advanced',
        duration: '10 weeks'
      },
      {
        id: 'c8',
        title: 'Financial Modeling with Excel',
        description: 'Build complex financial models for business valuation and forecasting.',
        level: 'Intermediate',
        duration: '8 weeks'
      },
      {
        id: 'c9',
        title: 'Python for Financial Analysis',
        description: 'Use Python to analyze financial data and automate financial tasks.',
        level: 'Intermediate',
        duration: '10 weeks'
      }
    ]
  }
];

const CareerGuidanceSystem: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(mockStudents[0]);
  const [selectedCareer, setSelectedCareer] = useState<typeof selectedStudent.careerMatches[0] | null>(
    selectedStudent ? selectedStudent.careerMatches[0] : null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setSelectedCareer(student.careerMatches[0]);
  };
  
  const handleGenerateReport = () => {
    if (!selectedStudent) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'Report Generated',
        description: `Career guidance report for ${selectedStudent.name} has been generated.`,
      });
    }, 2000);
  };
  
  const getOutlookBadge = (outlook: 'growing' | 'stable' | 'declining') => {
    switch (outlook) {
      case 'growing':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Growing</Badge>;
      case 'stable':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Stable</Badge>;
      case 'declining':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">Declining</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Career Guidance</h1>
        <p className="text-muted-foreground">
          AI-powered career recommendations and guidance for students.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Profiles</CardTitle>
              <CardDescription>
                Select a student to view AI career recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id 
                        ? 'bg-primary/10 border-primary/20' 
                        : 'hover:bg-accent border-transparent hover:border-border'
                    }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Grade: {student.grade}</span>
                          <span className="mx-2">•</span>
                          <span>{student.interests[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredStudents.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No students match your search.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {selectedStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Top Skills & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Strengths</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="bg-secondary/30">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4 mr-2" />
                      Generate Guidance Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="md:col-span-2 space-y-6">
          {selectedStudent && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>AI Career Recommendations</CardTitle>
                  <CardDescription>
                    Personalized career paths based on student's profile, interests, and academic performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedStudent.careerMatches.map((career, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg overflow-hidden transition-colors ${
                          selectedCareer?.career === career.career 
                            ? 'border-primary' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div 
                          className={`p-4 cursor-pointer ${
                            selectedCareer?.career === career.career 
                              ? 'bg-primary/5' 
                              : 'hover:bg-accent/50'
                          }`}
                          onClick={() => setSelectedCareer(career)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{career.career}</h3>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span>{career.education}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <div className="font-semibold text-lg">{career.match}%</div>
                                <div className="text-xs text-muted-foreground">Match</div>
                              </div>
                              {selectedCareer?.career === career.career ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {selectedCareer?.career === career.career && (
                          <div className="p-4 border-t bg-muted/20">
                            <div className="space-y-4">
                              <p>{career.description}</p>
                              
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-medium">Career Match</h4>
                                  <span className="font-medium">{career.match}%</span>
                                </div>
                                <Progress value={career.match} />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Job Outlook</h4>
                                  {getOutlookBadge(career.outlook)}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Salary Range</h4>
                                  <p className="text-sm">{career.salary}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Required Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {career.skills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="outline">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Learning Path</CardTitle>
                  <CardDescription>
                    Courses and resources to help prepare for {selectedCareer?.career || 'selected career path'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="courses">
                    <TabsList className="mb-4">
                      <TabsTrigger value="courses">
                        <Book className="h-4 w-4 mr-2" />
                        Courses
                      </TabsTrigger>
                      <TabsTrigger value="skills">
                        <Brain className="h-4 w-4 mr-2" />
                        Skills Development
                      </TabsTrigger>
                      <TabsTrigger value="trends">
                        <LineChart className="h-4 w-4 mr-2" />
                        Industry Trends
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="courses" className="space-y-4">
                      {selectedStudent.recommendedCourses.map((course, index) => (
                        <Card key={index}>
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-base">{course.title}</CardTitle>
                              <Badge variant="outline">
                                {course.level}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <p className="text-sm text-muted-foreground mb-2">
                              {course.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{course.duration}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="skills">
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-semibold mb-3">Technical Skills</h3>
                              <div className="space-y-3">
                                {selectedCareer?.skills.slice(0, 3).map((skill, index) => (
                                  <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>{skill}</span>
                                      <span className="text-muted-foreground">Priority</span>
                                    </div>
                                    <Progress value={100 - index * 15} />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-semibold mb-3">Soft Skills</h3>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Communication</span>
                                    <span className="text-muted-foreground">Priority</span>
                                  </div>
                                  <Progress value={85} />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Problem Solving</span>
                                    <span className="text-muted-foreground">Priority</span>
                                  </div>
                                  <Progress value={90} />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Teamwork</span>
                                    <span className="text-muted-foreground">Priority</span>
                                  </div>
                                  <Progress value={75} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="trends">
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-semibold mb-3">Industry Growth Forecast</h3>
                              <div className="relative h-40 w-full">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <BarChart2 className="h-24 w-24 text-muted-foreground/30" />
                                  <p className="absolute text-sm text-muted-foreground">
                                    Career trend visualization would appear here
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-semibold mb-3">Key Trends for {selectedCareer?.career}</h3>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                                  <span>Increasing demand for professionals with AI and machine learning expertise</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                                  <span>Remote work opportunities expanding globally in this field</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                                  <span>Growing integration with other disciplines like healthcare and finance</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                                  <span>Specialized roles emerging as the industry matures</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          )}
          
          {!selectedStudent && (
            <div className="flex flex-col items-center justify-center h-[400px] border rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Student Selected</h2>
              <p className="text-muted-foreground text-center max-w-md">
                Select a student from the list to view AI career recommendations and personalized learning paths.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerGuidanceSystem;
