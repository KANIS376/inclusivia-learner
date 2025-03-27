
import { supabase, isUsingMockData } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  progress: number;
  last_accessed: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  date_earned: string;
}

// Mock data for when Supabase credentials are not available
const MOCK_PROFILE: UserProfile = {
  id: "mock-user-id",
  first_name: "Demo",
  last_name: "User",
  email: "demo@example.com",
  avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  bio: "This is a demo account using mock data.",
  created_at: new Date().toISOString()
};

const MOCK_COURSES: Course[] = [
  {
    id: "mock-course-1",
    title: "Algebra Fundamentals",
    description: "Learn the basics of algebra",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    progress: 68,
    last_accessed: "2 days ago",
  },
  {
    id: "mock-course-2",
    title: "Introduction to Coding",
    description: "Start your coding journey",
    image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    progress: 42,
    last_accessed: "Yesterday",
  },
  {
    id: "mock-course-3",
    title: "English Literature",
    description: "Explore classic literature",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    progress: 89,
    last_accessed: "Today",
  },
];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "mock-achievement-1",
    name: "Fast Learner",
    description: "Completed 5 lessons in one day",
    icon: "award",
    date_earned: new Date().toISOString(),
  },
  {
    id: "mock-achievement-2",
    name: "Perfect Score",
    description: "Got 100% in a quiz",
    icon: "star",
    date_earned: new Date().toISOString(),
  },
  {
    id: "mock-achievement-3",
    name: "Consistent",
    description: "Studied for 7 days in a row",
    icon: "trophy",
    date_earned: new Date().toISOString(),
  },
];

const MOCK_LESSONS = [
  {
    id: "mock-lesson-1",
    title: "Quadratic Equations",
    subject: "Mathematics",
    scheduled_time: "Today, 3:00 PM",
    progress: 0,
  },
  {
    id: "mock-lesson-2",
    title: "Forces and Motion",
    subject: "Physics",
    scheduled_time: "Tomorrow, 10:00 AM",
    progress: 0,
  },
  {
    id: "mock-lesson-3",
    title: "Cell Structure",
    subject: "Biology",
    scheduled_time: "Wed, 2:00 PM",
    progress: 0,
  },
];

const MOCK_STATS = {
  courses_enrolled: 5,
  lessons_completed: 32,
  hours_spent: 48,
  average_score: 92,
};

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
  if (isUsingMockData) {
    return MOCK_PROFILE;
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const getEnrolledCourses = async (userId: string): Promise<Course[]> => {
  if (isUsingMockData) {
    return MOCK_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from('enrolled_courses')
      .select(`
        courses (
          id,
          title,
          description,
          image_url
        ),
        progress,
        last_accessed
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Transform the data to match the Course interface
    return data.map((enrollment: any) => ({
      id: enrollment.courses.id,
      title: enrollment.courses.title,
      description: enrollment.courses.description,
      image_url: enrollment.courses.image_url,
      progress: enrollment.progress,
      last_accessed: enrollment.last_accessed,
    }));
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    return [];
  }
};

export const getUserAchievements = async (userId: string): Promise<Achievement[]> => {
  if (isUsingMockData) {
    return MOCK_ACHIEVEMENTS;
  }

  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        achievements (
          id,
          name,
          description,
          icon
        ),
        earned_at
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Transform the data to match the Achievement interface
    return data.map((userAchievement: any) => ({
      id: userAchievement.achievements.id,
      name: userAchievement.achievements.name,
      description: userAchievement.achievements.description,
      icon: userAchievement.achievements.icon,
      date_earned: userAchievement.earned_at,
    }));
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }
};

export const getUpcomingLessons = async (userId: string) => {
  if (isUsingMockData) {
    return MOCK_LESSONS;
  }

  try {
    const { data, error } = await supabase
      .from('scheduled_lessons')
      .select(`
        id,
        title,
        subject,
        scheduled_time,
        progress
      `)
      .eq('user_id', userId)
      .order('scheduled_time', { ascending: true })
      .limit(3);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching upcoming lessons:', error);
    return [];
  }
};

export const getUserStats = async (userId: string) => {
  if (isUsingMockData) {
    return MOCK_STATS;
  }

  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      courses_enrolled: 0,
      lessons_completed: 0,
      hours_spent: 0,
      average_score: 0,
    };
  }
};
