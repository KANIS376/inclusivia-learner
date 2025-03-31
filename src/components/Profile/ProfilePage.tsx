
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, UserProfile } from "@/services/userService";
import ProfileCard from "./ProfileCard";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const fetchedProfile = await getUserProfile(user);
      setProfile(fetchedProfile);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile information",
        variant: "destructive",
      });
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <div>
      <ProfileCard 
        user={user} 
        profile={profile} 
        onUpdate={fetchProfile}
      />
    </div>
  );
};

export default ProfilePage;
