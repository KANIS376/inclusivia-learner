
import React from "react";

const EmptyCourseState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">No courses found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
};

export default EmptyCourseState;
