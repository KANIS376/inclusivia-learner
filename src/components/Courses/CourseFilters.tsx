
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface CourseFiltersProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ activeFilter, onFilterChange }) => {
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
        All Levels
      </Button>
      {["Beginner", "Intermediate", "Advanced"].map((filter, index) => (
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
    </div>
  );
};

export default CourseFilters;
