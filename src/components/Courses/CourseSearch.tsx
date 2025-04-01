
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CourseSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CourseSearch: React.FC<CourseSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search courses..."
        className="pl-10 pr-4 py-2 w-full"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default CourseSearch;
