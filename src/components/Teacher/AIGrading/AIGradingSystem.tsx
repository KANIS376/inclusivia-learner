
import React, { useState } from 'react';
import { 
  Upload, CheckCircle, Clock, FileText, 
  FileImage, RotateCcw, Search, X, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

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
  const [activeTab, setActiveTab] = useState('essay');
  const [essayContent, setEssayContent] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Sample graded submissions data
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
          
          // Add a new graded submission
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
            score: Math.floor(Math.random() * 20) + 80, // Random score between 80-99
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
          Use AI to automatically grade essays, code, and handwritten submissions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit for Grading</CardTitle>
              <CardDescription>
                Upload student work for AI evaluation and feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="essay" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-3 w-full lg:w-96">
                  <TabsTrigger value="essay" disabled={isProcessing}>
                    <FileText className="h-4 w-4 mr-2" />
                    Essay
                  </TabsTrigger>
                  <TabsTrigger value="code" disabled={isProcessing}>
                    <FileText className="h-4 w-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="image" disabled={isProcessing}>
                    <FileImage className="h-4 w-4 mr-2" />
                    Image
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="essay" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter essay text or paste student submission
                    </label>
                    <Textarea 
                      placeholder="Paste essay content here..." 
                      className="min-h-[200px]"
                      value={essayContent}
                      onChange={(e) => setEssayContent(e.target.value)}
                      disabled={isProcessing}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="code" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter code or paste student submission
                    </label>
                    <Textarea 
                      placeholder="Paste code content here..." 
                      className="min-h-[200px] font-mono"
                      value={codeContent}
                      onChange={(e) => setCodeContent(e.target.value)}
                      disabled={isProcessing}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="image" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {!uploadedImage ? (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop an image file, or click to upload
                        </p>
                        <Input 
                          type="file" 
                          accept="image/*"
                          className="hidden"
                          id="image-upload" 
                          onChange={handleUploadImage}
                          disabled={isProcessing}
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('image-upload')?.click()}
                          disabled={isProcessing}
                        >
                          Select File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <img 
                          src={URL.createObjectURL(uploadedImage)} 
                          alt="Uploaded" 
                          className="max-h-64 mx-auto rounded"
                        />
                        <div className="flex items-center justify-center space-x-2">
                          <p className="text-sm">
                            {uploadedImage.name} ({Math.round(uploadedImage.size / 1024)} KB)
                          </p>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleRemoveImage}
                            disabled={isProcessing}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Processing...</p>
                      <p className="text-sm text-muted-foreground">{progress}%</p>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isProcessing}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit for Grading
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">1. Upload Content</h3>
                <p className="text-sm text-muted-foreground">
                  Submit essays, code, or handwritten images for evaluation.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="font-medium">2. AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  The system uses advanced AI to assess structure, content, and quality.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="font-medium">3. Feedback Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed feedback and scoring based on rubrics.
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <h3 className="font-medium">4. Review & Finalize</h3>
                <p className="text-sm text-muted-foreground">
                  Teachers can review AI-generated grades and modify as needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
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
