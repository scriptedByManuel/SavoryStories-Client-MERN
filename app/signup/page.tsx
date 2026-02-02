"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { SignupFormValues, signupSchema } from "@/types/authType";
import { useProfileStore } from "@/stores/useProfileStore";
import profileService from "@/services/profileService";
import uploadService from "@/services/uploadService";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Camera, ChefHat, Loader2 } from "lucide-react";
import Link from "next/link";
import CookingLoader from "@/components/CookingLoader";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { chef, setChef } = useProfileStore();
  const { signup, isLoading } = useSignup();
  const { updateProfile } = profileService;
  const { uploadImage } = uploadService;

  const [isMounted, setIsMounted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", bio: "" },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && chef) {
      router.push("/dashboard");
    }
  }, [isMounted, chef, router]);

  const watchedName = watch("name");

  // Multi-step form handler
  const handleInitialSignup = async (data: SignupFormValues) => {
    const user = await signup(data);
    if (user) {
      setStep(2);
    }
  };

  const handleProfileCompletion = async (data: SignupFormValues) => {
    try {
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const uploadResponse = await uploadImage(formData);
        const url = uploadResponse.url;

        const payload = {
          name: data.name,
          bio: data.bio || "",
          avatar: url,
        };

        const profileResponse = await updateProfile(payload);
        setChef(profileResponse.data);

        toast.success(`Welcome to Savory Stories, ${data.name}`);
        router.push("/dashboard");
      } else {
        toast.warning("Please upload a profile photo");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Profile completion failed");
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Avatar Fallback Text Generator
  const getFallback = () => {
    if (!watchedName) return "CH";
    return watchedName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isMounted || (chef && isMounted))
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <CookingLoader />
      </div>
    );

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl bg-primary p-3 shadow-lg shadow-primary/20">
              <ChefHat className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            {step === 1 ? "Chef Registration" : "Set Your Profile"}
          </CardTitle>
          <CardDescription className="text-base">
            {step === 1
              ? "Create your account to start sharing recipes"
              : "Let people know who is behind the flavors"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            <form
              onSubmit={handleSubmit(handleInitialSignup)}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Chef Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="chef@savory.com"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Continue to Profile
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleProfileCompletion)}
              className="space-y-6"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-2xl transition-transform group-hover:scale-105">
                    <AvatarImage
                      src={photoPreview || "/user-placeholder.jpeg"}
                      alt={chef?.name || "Chef Avatar"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-black">
                      {getFallback()}
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="photo-upload"
                    className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 transition-all hover:scale-110"
                  >
                    <Camera className="h-5 w-5" />
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </Label>
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Profile Photo
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Your Culinary Bio</Label>
                <Textarea
                  {...register("bio")}
                  id="bio"
                  placeholder="Passionate about Italian cuisine and spice fusion..."
                  className="h-28 resize-none text-base"
                />
                {errors.bio && (
                  <p className="text-xs text-destructive">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-6"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Complete Setup
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already a member? </span>
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-bold transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
