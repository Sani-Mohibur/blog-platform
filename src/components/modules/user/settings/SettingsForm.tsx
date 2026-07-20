"use client";

import React, { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { toast } from "sonner";
import { Loader2, Camera } from "lucide-react";
import { uploadImagesAction } from "@/actions/blog.action";

export default function SettingsForm() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      const extendedUser = session.user as any;
      setBio(extendedUser.bio || "");
      
      // format date of birth for input type="date"
      if (extendedUser.dateOfBirth) {
        try {
          const date = new Date(extendedUser.dateOfBirth);
          if (!isNaN(date.getTime())) {
            setDateOfBirth(date.toISOString().split("T")[0]);
          }
        } catch (e) {}
      }
      
      setGender(extendedUser.gender || "");
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsUpdating(true);
    const toastId = toast.loading("Updating profile...");

    try {
      let finalImageUrl = session?.user.image;

      if (avatarFile) {
        toast.loading("Uploading profile picture...", { id: toastId });
        const formData = new FormData();
        formData.append("images", avatarFile);

        const uploadRes = await uploadImagesAction(formData);
        if (uploadRes.error || !uploadRes.data || uploadRes.data.length === 0) {
          toast.error("Failed to upload profile picture", { id: toastId });
          setIsUpdating(false);
          return;
        }
        finalImageUrl = uploadRes.data[0];
      }

      await authClient.updateUser({
        name,
        image: finalImageUrl,
        bio,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
      } as any, {
        onSuccess: () => {
          toast.success("Profile updated successfully", { id: toastId });
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to update profile", { id: toastId });
        }
      });
      
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  const currentUserImage = avatarPreview || session?.user?.image;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Profile Picture Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
           <UserAvatar 
             user={{ name: name || "User", image: currentUserImage }} 
             className="h-24 w-24 text-3xl"
           />
           <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Camera className="h-6 w-6 text-white" />
           </div>
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept="image/*"
             onChange={handleFileChange} 
             disabled={isUpdating}
           />
        </div>
        <div className="flex flex-col justify-center text-center sm:text-left h-24">
          <h3 className="text-sm font-medium">Profile Picture</h3>
          <p className="text-xs text-zinc-500 max-w-sm mt-1">
            Click on your avatar to upload a new profile picture. Recommended size: 256x256px.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">Full Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isUpdating}
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">Email Address</label>
          <Input
            type="email"
            value={session?.user?.email || ""}
            disabled
            className="opacity-50 cursor-not-allowed"
          />
          <p className="text-[10px] text-zinc-500">Email addresses cannot be changed.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">Date of Birth</label>
          <Input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={isUpdating}
            className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
          >
            <option value="">Select Gender...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us a little bit about yourself..."
          disabled={isUpdating}
          rows={4}
          className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isUpdating}
          className="cursor-pointer"
        >
          {isUpdating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving Profile
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
      </div>
    </form>
  );
}
