
export interface CourseItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  level: string;
  duration: number | null;
  subject?: string;
  rating?: number;
  students?: number;
  isFree?: boolean;
  hasCertificate?: boolean;
  image?: string;
  progress?: number;
  last_accessed?: string;
}
