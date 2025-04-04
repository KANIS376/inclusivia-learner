
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface CourseFiltersProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  activeSubject?: string | null;
  onSubjectChange?: (subject: string | null) => void;
  isLevelFilter?: boolean;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ 
  activeFilter, 
  onFilterChange, 
  activeSubject,
  onSubjectChange,
  isLevelFilter = true
}) => {
  // Define filter options based on the type of filter
  const filterOptions = isLevelFilter 
    ? ["Beginner", "Intermediate", "Advanced"] 
    : ["Free", "Certificate"];

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        variant="outline"
        className={`inline-flex items-center px-4 py-2 rounded-full ${
          activeFilter === null 
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        } transition-colors text-sm`}
        onClick={() => onFilterChange(null)}
      >
        <Filter className="mr-2 h-4 w-4" />
        {isLevelFilter ? "All Levels" : "All Filters"}
      </Button>
      {filterOptions.map((filter, index) => (
        <Button
          key={index}
          variant="outline"
          className={`px-4 py-2 rounded-full ${
            activeFilter === filter 
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-background border border-input hover:bg-accent/50"
          } transition-colors text-sm`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
      
      {/* If we have subject filtering enabled, show active subject */}
      {activeSubject && onSubjectChange && (
        <div className="ml-auto">
          <Button
            variant="outline"
            className="px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors text-sm"
            onClick={() => onSubjectChange(null)}
          >
            {activeSubject} ✕
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseFilters;
