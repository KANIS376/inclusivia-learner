
import { supabase } from '@/lib/supabase';
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

export const getUserProfile = async (user: User): Promise<UserProfile | null> => {
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
    return (data || []).map((enrollment) => ({
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
    return (data || []).map((userAchievement) => ({
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
