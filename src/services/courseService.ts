import { supabase, isUsingMockData } from '@/lib/supabase';
import type { CourseItem } from '@/pages/Courses';

// Mock data for when Supabase credentials are not available or in development environments
const MOCK_COURSES: CourseItem[] = [
  {
    id: "mock-course-1",
    title: "Algebra Fundamentals",
    description: "Learn the basics of algebra with interactive examples and exercises.",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    level: "Beginner",
    duration: 4,
  },
  {
    id: "mock-course-2",
    title: "Introduction to Coding",
    description: "Start your coding journey with this comprehensive introduction to programming concepts.",
    image_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    level: "Beginner",
    duration: 6,
  },
  {
    id: "mock-course-3",
    title: "English Literature",
    description: "Explore classic literature and develop critical reading and writing skills.",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    level: "Intermediate",
    duration: 8,
  },
  {
    id: "mock-course-4",
    title: "Physics: Forces & Motion",
    description: "Explore Newton's laws and mechanics with virtual simulations.",
    image_url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    level: "Intermediate",
    duration: 6,
  },
  {
    id: "mock-course-5",
    title: "Advanced Calculus",
    description: "Master differential equations and multivariable calculus concepts.",
    image_url: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    level: "Advanced",
    duration: 10,
  },
  {
    id: "mock-course-6",
    title: "Chemistry Essentials",
    description: "Master the basics of chemistry with virtual lab experiments.",
    image_url: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    level: "Beginner",
    duration: 5,
  },
];

/**
 * Fetch all available courses
 */
export const getCourses = async (): Promise<CourseItem[]> => {
  if (isUsingMockData) {
    return MOCK_COURSES;
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, description, image_url, level, duration')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

/**
 * Fetch a single course by ID
 */
export const getCourseById = async (courseId: string): Promise<CourseItem | null> => {
  if (isUsingMockData) {
    return MOCK_COURSES.find(course => course.id === courseId) || null;
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, description, image_url, level, duration')
      .eq('id', courseId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

/**
 * Enroll a user in a course
 */
export const enrollInCourse = async (userId: string, courseId: string): Promise<boolean> => {
  if (isUsingMockData) {
    // Simulate successful enrollment
    console.log(`Mock enrollment: User ${userId} enrolled in course ${courseId}`);
    return true;
  }

  try {
    // Check if the user is already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from('enrolled_courses')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if not enrolled
      throw checkError;
    }
    
    // If already enrolled, return success
    if (existingEnrollment) {
      return true;
    }
    
    // Enroll the user
    const { error } = await supabase
      .from('enrolled_courses')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
        last_accessed: new Date().toISOString()
      });
    
    if (error) throw error;
    
    // First, get the incremented value from the RPC function
    const { data: incrementedValue, error: rpcError } = await supabase.rpc('increment', { x: 1 });
    
    if (rpcError) {
      console.error('Error calling increment function:', rpcError);
    } else if (incrementedValue !== null && incrementedValue !== undefined) {
      // Then update the user stats with the returned numeric value
      const { error: updateError } = await supabase
        .from('user_stats')
        .update({ courses_enrolled: incrementedValue })
        .eq('user_id', userId);
        
      if (updateError) {
        console.error('Error updating user stats with incremented value:', updateError);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return false;
  }
};
