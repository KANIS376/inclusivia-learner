
import React, { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
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
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Image, CheckCircle, AlertCircle, X } from 'lucide-react';

interface GradingResult {
  score: number;
  feedback: string;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}

const OCRGradingComponent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [gradingRubric, setGradingRubric] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset states
      setExtractedText('');
      setGradingResult(null);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const extractTextFromImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);
    setExtractionProgress(0);
    setError(null);

    try {
      const worker = await createWorker({
        logger: progress => {
          if (progress.status === 'recognizing text') {
            setExtractionProgress(progress.progress * 100);
          }
        },
      });

      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      
      const { data } = await worker.recognize(selectedImage);
      setExtractedText(data.text);
      
      await worker.terminate();
      
      toast({
        title: "Text extraction complete",
        description: "Successfully extracted text from the image.",
      });
    } catch (err) {
      console.error('Error extracting text:', err);
      setError('Failed to extract text from the image. Please try again with a clearer image.');
      toast({
        title: "Extraction failed",
        description: "There was an error extracting text from the image.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
      setExtractionProgress(100);
    }
  };

  const handleGradeSubmission = async () => {
    if (!extractedText || !gradingRubric) {
      toast({
        title: "Missing information",
        description: "Please extract text from an image and provide a grading rubric.",
        variant: "destructive",
      });
      return;
    }

    setIsGrading(true);
    setError(null);
    
    try {
      const result = await gradeSubmission(extractedText, gradingRubric);
      if (result.error) {
        throw new Error(result.error);
      }
      setGradingResult(result.result);
      toast({
        title: "Grading complete",
        description: `AI has graded the submission with a score of ${result.result.score}/100`,
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
      setIsGrading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>OCR + AI Grading</CardTitle>
          <CardDescription>
            Extract text from handwritten answers using OCR and grade with AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {!imagePreview ? (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop an image file, or click to upload
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    variant="outline"
                    disabled={isExtracting || isGrading}
                  >
                    <Image className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isExtracting || isGrading}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative mx-auto max-w-full max-h-[300px] overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Selected" 
                    className="max-h-[300px] mx-auto object-contain" 
                  />
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    className="absolute top-2 right-2" 
                    onClick={handleRemoveImage}
                    disabled={isExtracting || isGrading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={extractTextFromImage} 
                    disabled={isExtracting || isGrading}
                    className="mr-2"
                  >
                    {isExtracting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        Extracting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" /> 
                        Extract Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {isExtracting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Extracting text...</p>
                <p className="text-sm text-muted-foreground">{Math.round(extractionProgress)}%</p>
              </div>
              <Progress value={extractionProgress} />
            </div>
          )}
          
          {extractedText && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Extracted Text</label>
              <Textarea 
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[100px]"
                disabled={isGrading}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Grading Rubric</label>
            <Textarea 
              placeholder="Enter grading criteria (e.g., Accuracy, Structure, Clarity...)"
              value={gradingRubric}
              onChange={(e) => setGradingRubric(e.target.value)}
              className="min-h-[80px]"
              disabled={isGrading || isExtracting}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGradeSubmission} 
            disabled={!extractedText || isGrading || isExtracting} 
            className="w-full"
          >
            {isGrading ? (
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
              <span className="text-xl font-bold">{gradingResult.score}/100</span>
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

export default OCRGradingComponent;
