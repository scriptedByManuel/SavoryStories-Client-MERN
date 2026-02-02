"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfileStore } from "@/stores/useProfileStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import profileService from "@/services/profileService";
import uploadService from "@/services/uploadService";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be under 500 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const router = useRouter();
  const { chef, updateChef, logout } = useProfileStore();
  const { updateProfile, deleteAccount } = profileService;
  const { uploadImage } = uploadService;
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentAvatarUrl = chef?.avatar || "";

  // 2. React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: chef?.name || "",
      bio: chef?.bio || "",
    },
  });

  // 3. Handle Profile Update (Two-step logic)
  const onSaveProfile = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      let url = currentAvatarUrl;
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const uploadRes = await uploadImage(formData);
        url = uploadRes.url;
      }
      const payload = {
        name: data.name,
        bio: data.bio,
        avatar: url,
      };
      const profileRes = await updateProfile(payload);
      const updatedChefData = profileRes.data;
      updateChef(updatedChefData);
      toast.success("Profile updated successfully!");
      setPhotoFile(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success("Account deleted. Hope to see you again!");
      logout();
      router.push("/");
    } catch (error: unknown) {
      if(error instanceof Error) {
        toast.error("Failed to delete account");
      }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Profile Information Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold">Profile Information</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your chef's identity and professional culinary bio.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 rounded-2xl border-2 border-primary shadow-lg">
                <AvatarImage
                  src={photoPreview || currentAvatarUrl}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-xl bg-secondary text-2xl font-black">
                  {chef?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground border-4 border-background rounded-full shadow-xl hover:scale-110 transition-transform"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold">Chef Avatar</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or WebP.</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold">
                Display Name
              </Label>
              <Input
                {...register("name")}
                id="name"
                defaultValue={chef?.name}
                className={`max-w-md bg-secondary/20 border-border/40 focus:bg-background ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="font-bold">
                Culinary Bio
              </Label>
              <Textarea
                {...register("bio")}
                id="bio"
                defaultValue={chef?.bio}
                className="max-w-md bg-secondary/20 border-border/40 focus:bg-background h-32 resize-none"
              />
              {errors.bio && (
                <p className="text-xs text-destructive">{errors.bio.message}</p>
              )}
            </div>
          </div>

          <Button
            disabled={isLoading}
            className="px-10  tracking-tight shadow-md"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </form>
      </section>

      {/* Danger Zone Section */}
      <div className="h-px bg-border/40" />
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-destructive">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back.
          </p>
        </div>

        <div className="p-6 border border-destructive/20 rounded-2xl bg-destructive/5 space-y-4">
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            All your data, including recipes, photos, and followers, will be
            permanently removed from our servers.
          </p>
          <Button
            onClick={handleDeleteAccount}
            variant="destructive"
            className="font-bold px-8"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete My Account
          </Button>
        </div>
      </section>
    </div>
  );
}
