import React, { useState } from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import AIGradingComponent from './AIGradingComponent';
import OCRGradingComponent from './OCRGradingComponent';
import AITutorBot from '../AITutor/AITutorBot';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, CheckCircle, Clock, FileText, 
  FileImage, RotateCcw, Search, X, Download, 
  BookOpen, Brain, User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GradedSubmission {
  id: string;
  studentName: string;
  assignmentTitle: string;
  submittedDate: string;
  status: 'graded' | 'processing' | 'error';
  score?: number;
  maxScore: number;
  feedback?: string;
  type: 'essay' | 'image' | 'code';
}

const AIGradingSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text-grading');
  const [essayContent, setEssayContent] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const [gradedSubmissions, setGradedSubmissions] = useState<GradedSubmission[]>([
    {
      id: '1',
      studentName: 'Alex Johnson',
      assignmentTitle: 'Essay on AI Ethics',
      submittedDate: 'Jan 10, 2023',
      status: 'graded',
      score: 85,
      maxScore: 100,
      feedback: 'Good analysis of ethical implications. Could improve on technical aspects.',
      type: 'essay'
    },
    {
      id: '2',
      studentName: 'Sophia Williams',
      assignmentTitle: 'ML Algorithm Implementation',
      submittedDate: 'Jan 8, 2023',
      status: 'graded',
      score: 92,
      maxScore: 100,
      feedback: 'Excellent implementation of the neural network. Code is well-structured.',
      type: 'code'
    },
    {
      id: '3',
      studentName: 'Michael Lee',
      assignmentTitle: 'Hand-drawn Circuit Diagram',
      submittedDate: 'Jan 11, 2023',
      status: 'processing',
      maxScore: 100,
      type: 'image'
    }
  ]);
  
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };
  
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };
  
  const handleReset = () => {
    if (activeTab === 'essay') {
      setEssayContent('');
    } else if (activeTab === 'code') {
      setCodeContent('');
    } else if (activeTab === 'image') {
      setUploadedImage(null);
    }
  };
  
  const simulateProcessing = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          const newSubmission: GradedSubmission = {
            id: (gradedSubmissions.length + 1).toString(),
            studentName: 'Current User',
            assignmentTitle: activeTab === 'essay' 
              ? 'Essay Analysis' 
              : activeTab === 'code'
                ? 'Code Evaluation'
                : 'Image Assessment',
            submittedDate: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            status: 'graded',
            score: Math.floor(Math.random() * 20) + 80,
            maxScore: 100,
            feedback: activeTab === 'essay'
              ? 'The essay demonstrates a good understanding of the topic. Arguments are well-structured.'
              : activeTab === 'code'
                ? 'The code is efficient and well-commented. Some minor optimizations could be made.'
                : 'The image content is clear and meets the requirements.',
            type: activeTab as 'essay' | 'code' | 'image'
          };
          
          setGradedSubmissions(prev => [newSubmission, ...prev]);
          
          toast({
            title: 'Grading Complete',
            description: 'The AI has finished grading the submission.',
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };
  
  const handleSubmit = () => {
    let isValid = false;
    
    if (activeTab === 'essay' && essayContent.trim().length > 50) {
      isValid = true;
    } else if (activeTab === 'code' && codeContent.trim().length > 20) {
      isValid = true;
    } else if (activeTab === 'image' && uploadedImage) {
      isValid = true;
    }
    
    if (isValid) {
      simulateProcessing();
    } else {
      toast({
        title: 'Invalid Submission',
        description: 'Please ensure you have provided enough content to grade.',
        variant: 'destructive'
      });
    }
  };
  
  const filteredSubmissions = gradedSubmissions.filter(submission => 
    submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Grading System</h1>
        <p className="text-muted-foreground">
          Use AI to automatically grade essays, code, handwritten submissions, and provide career guidance.
        </p>
      </div>
      
      <Tabs defaultValue="text-grading" className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="text-grading">
            <FileText className="h-4 w-4 mr-2" />
            Text Grading
          </TabsTrigger>
          <TabsTrigger value="ocr-grading">
            <FileImage className="h-4 w-4 mr-2" />
            OCR Grading
          </TabsTrigger>
          <TabsTrigger value="ai-tutor">
            <BookOpen className="h-4 w-4 mr-2" />
            AI Tutor
          </TabsTrigger>
          <TabsTrigger value="career-guidance">
            <Brain className="h-4 w-4 mr-2" />
            Career Guidance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text-grading">
          <AIGradingComponent />
        </TabsContent>
        
        <TabsContent value="ocr-grading">
          <OCRGradingComponent />
        </TabsContent>
        
        <TabsContent value="ai-tutor">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AITutorBot />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 h-full">
                <h3 className="text-lg font-semibold mb-4">AI Tutor Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Personalized Explanations</p>
                      <p className="text-sm text-muted-foreground">Get customized explanations for complex topics</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Step-by-Step Guidance</p>
                      <p className="text-sm text-muted-foreground">Follow detailed explanations for problem-solving</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">24/7 Availability</p>
                      <p className="text-sm text-muted-foreground">Get help whenever you need it</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Knowledge Across Subjects</p>
                      <p className="text-sm text-muted-foreground">Get help with various academic subjects</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="career-guidance">
          <div className="flex items-center justify-center py-8">
            <div className="text-center max-w-md">
              <User className="h-16 w-16 mx-auto mb-4 text-primary/30" />
              <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
              <p className="text-muted-foreground mb-6">
                AI-powered career recommendations based on student's interests, strengths, and academic performance.
              </p>
              <button 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                onClick={() => window.location.href = "/teacher/career-guidance"}
              >
                <Brain className="mr-2 h-4 w-4" /> 
                Go to Career Guidance
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Recent Graded Submissions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Graded Submissions</h2>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="hover-lift">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{submission.assignmentTitle}</CardTitle>
                    <CardDescription>{submission.studentName}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    {submission.status === 'graded' && (
                      <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2 py-0.5 rounded flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Graded
                      </div>
                    )}
                    {submission.status === 'processing' && (
                      <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs font-medium px-2 py-0.5 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1 animate-spin" />
                        Processing
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span>{submission.submittedDate}</span>
                  </div>
                  
                  {submission.status === 'graded' && submission.score !== undefined && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Score:</span>
                        <span className="font-medium">{submission.score}/{submission.maxScore}</span>
                      </div>
                      
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(submission.score / submission.maxScore) * 100}%` }}
                        ></div>
                      </div>
                      
                      {submission.feedback && (
                        <div className="mt-2 text-sm">
                          <p className="text-muted-foreground mb-1">Feedback:</p>
                          <p className="text-sm">{submission.feedback}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {submission.status === 'processing' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span>Processing...</span>
                      </div>
                      <Progress value={45} />
                    </div>
                  )}
                  
                  <div className="pt-2 flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredSubmissions.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No graded submissions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGradingSystem;
