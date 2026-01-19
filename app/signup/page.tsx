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

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { chef, setChef, updateChef } = useProfileStore();
  const { signup, isLoading } = useSignup();
  const { changeNameAndBio } = profileService;
  const { uploadImage } = uploadService;

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (chef) {
      setIsRedirecting(true);
      router.replace("/dashboard");
    }
  }, [chef, router]);

  if (!isMounted || chef || isRedirecting) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", bio: "" },
  });

  const watchedName = watch("name");

  const handleInitialSignup = async (data: SignupFormValues) => {
    const user = await signup(data);
    if (user) {
      setChef(user);
      setStep(2);
    }
  };

  const handleProfileCompletion = async (data: SignupFormValues) => {
    try {
      const payload = {
        name: data.name,
        bio: data.bio || "",
      };
      const profileResponse = await changeNameAndBio(payload);

      if (photoFile) {
        const formData = new FormData();
        formData.append("avatar", photoFile);

        const uploadResponse = await uploadImage("/profile/avatar", formData);

        updateChef(uploadResponse.data);
      } else {
        updateChef(profileResponse.data);
      }

      toast.success(`Welcome to Savory Stories, ${data.name}`);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
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

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Join our Chef Community
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Enter your details to create your chef account"
              : "Tell us more about yourself and upload a photo"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            <form
              onSubmit={handleSubmit(handleInitialSignup)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Chef Auguste Gusteau"
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}{" "}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="chef@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}{" "}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  required
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}{" "}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleProfileCompletion)}
              className="space-y-6"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-muted">
                    <AvatarImage
                      src={photoPreview || ""}
                      alt="Chef Preview"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-muted text-2xl">
                      {watchedName
                        ? watchedName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "CH"}
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
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
                <p className="text-sm text-muted-foreground">
                  Select your profile photo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  {...register("bio")}
                  id="bio"
                  placeholder="Tell your culinary story..."
                  className="h-24 resize-none"
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">
                    {errors.bio.message}{" "}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete My Profile
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
