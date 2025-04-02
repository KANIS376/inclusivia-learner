
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isUsingMockData } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

// Define user roles
export type UserRole = 'student' | 'teacher';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  usingMockData: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Get user role from metadata if available
        if (session?.user) {
          const role = session.user.user_metadata?.role as UserRole;
          setUserRole(role || null);
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Get user role from metadata if available
      if (session?.user) {
        const role = session.user.user_metadata?.role as UserRole;
        setUserRole(role || null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      if (isUsingMockData) {
        toast({
          title: "Using Mock Data",
          description: "Set up Supabase credentials to enable real authentication.",
          variant: "default"
        });
        
        // Simulate successful login with mock data
        setTimeout(() => {
          setLoading(false);
          setUserRole(role);
          toast({
            title: "Mock Login Successful",
            description: `Logged in as ${role}`
          });
        }, 1000);
        
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to your learning journey!"
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, role: UserRole) => {
    try {
      setLoading(true);
      
      if (isUsingMockData) {
        toast({
          title: "Using Mock Data",
          description: "Set up Supabase credentials to enable real registration.",
          variant: "default"
        });
        
        // Simulate successful registration with mock data
        setTimeout(() => {
          setLoading(false);
          setUserRole(role);
          toast({
            title: "Mock Registration Successful",
            description: `Registered as ${role}`
          });
        }, 1000);
        
        return;
      }
      
      // Create auth user with role in metadata
      const { error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      toast({
        title: "Account created",
        description: "Welcome to your learning journey!"
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      if (isUsingMockData) {
        // Simulate successful logout with mock data
        setTimeout(() => {
          setLoading(false);
          setUserRole(null);
          toast({
            title: "Mock Logout Successful",
            description: "Logged out with mock data"
          });
        }, 500);
        
        return;
      }
      
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      userRole,
      signIn, 
      signUp, 
      signOut,
      usingMockData: isUsingMockData 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
