
export interface CourseItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  level: string;
  duration: number | null;
  subject?: string;
  progress?: number;
  last_accessed?: string;
}
