
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface EnrollmentCardProps {
  handleEnroll: () => Promise<void>;
  isEnrolling: boolean;
}

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({ handleEnroll, isEnrolling }) => {
  return (
    <div className="lg:w-1/3">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-4">Enroll in this course</h3>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl font-bold">Free</span>
            <span className="text-muted-foreground line-through">₹1999</span>
            <Badge className="ml-2">Limited Time</Badge>
          </div>
          
          <Button 
            className="w-full mb-4"
            onClick={handleEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </Button>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
              <span>Full lifetime access</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
              <span>Access on mobile and desktop</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
              <span>Certificate of completion</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentCard;
