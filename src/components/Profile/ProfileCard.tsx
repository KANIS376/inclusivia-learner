
import React, { useState } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface ProfileCardProps {
  user: User | null;
  profile: UserProfile | null;
  onUpdate: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getInitials = () => {
    if (!profile) return "U";
    return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          bio: bio,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
    setBio(profile?.bio || "");
    setIsEditing(false);
  };

  if (!profile) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-accent/60"></div>
          <div className="space-y-2">
            <div className="h-4 w-48 bg-accent/60 rounded"></div>
            <div className="h-3 w-32 bg-accent/60 rounded"></div>
          </div>
        </div>
        <div className="h-20 bg-accent/60 rounded mt-4"></div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        {!isEditing ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
            className="text-primary hover:text-primary/80"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={profile.avatar_url || ""} alt={`${profile.first_name} ${profile.last_name}`} />
            <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
          </Avatar>
          {!isEditing && (
            <div className="mt-2 text-center">
              <p className="text-sm text-muted-foreground">Member since</p>
              <p className="text-sm font-medium">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium block mb-1">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium block mb-1">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>
              <div>
                <label htmlFor="bio" className="text-sm font-medium block mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold">{profile.first_name} {profile.last_name}</h3>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Bio</h4>
                <p className="text-sm">
                  {profile.bio || "No bio provided. Click edit to add a bio."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
