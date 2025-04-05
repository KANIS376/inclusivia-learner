
import React, { useState } from 'react';
import { gradeSubmission } from '@/lib/gemini';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface GradingResult {
  score: number;
  feedback: string;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

const AIGradingComponent: React.FC = () => {
  const [studentSubmission, setStudentSubmission] = useState('');
  const [gradingRubric, setGradingRubric] = useState('');
  const [maxScore, setMaxScore] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGradeSubmission = async () => {
    if (!studentSubmission || !gradingRubric) {
      toast({
        title: "Missing information",
        description: "Please provide both student submission and grading rubric.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await gradeSubmission(studentSubmission, gradingRubric, maxScore);
      if (result.error) {
        throw new Error(result.error);
      }
      setGradingResult(result.result);
      toast({
        title: "Grading complete",
        description: `AI has graded the submission with a score of ${result.result.score}/${maxScore}`,
      });
    } catch (err) {
      console.error('Error grading submission:', err);
      setError('Failed to grade submission. Please try again later.');
      toast({
        title: "Grading failed",
        description: "There was an error processing the submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Grading</CardTitle>
          <CardDescription>
            Submit student work for AI evaluation and detailed feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="submission" className="text-sm font-medium">Student Submission</label>
            <Textarea 
              id="submission"
              placeholder="Paste the student's submission text here..."
              className="min-h-[150px]"
              value={studentSubmission}
              onChange={(e) => setStudentSubmission(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="rubric" className="text-sm font-medium">Grading Rubric</label>
            <Textarea 
              id="rubric"
              placeholder="Enter grading criteria (e.g., Accuracy, Structure, Clarity...)"
              className="min-h-[100px]"
              value={gradingRubric}
              onChange={(e) => setGradingRubric(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="maxScore" className="text-sm font-medium">Maximum Score</label>
            <Input 
              id="maxScore"
              type="number"
              min="1"
              max="1000"
              value={maxScore}
              onChange={(e) => setMaxScore(Number(e.target.value))}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGradeSubmission} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Grading...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> 
                Grade Submission
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="py-6">
            <div className="space-y-2 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p>AI is analyzing the submission...</p>
              <Progress value={70} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardContent className="py-6">
            <div className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {gradingResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Grading Results</span>
              <span className="text-xl font-bold">{gradingResult.score}/{maxScore}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Feedback</h3>
              <p className="text-sm text-muted-foreground">{gradingResult.feedback}</p>
            </div>
            
            {gradingResult.strengths.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {gradingResult.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{strength}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {gradingResult.weaknesses.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Areas for Improvement</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {gradingResult.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{weakness}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {gradingResult.suggestions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Suggestions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {gradingResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIGradingComponent;
