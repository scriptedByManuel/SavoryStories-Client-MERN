"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, KeyRound } from "lucide-react";
import { useState } from "react";
import profileService from "@/services/profileService";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function PasswordSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword } = profileService;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      console.log("Submit Data:", data);
      await changePassword(data);
      toast.success("Password updated successfully!");
      reset();
    } catch (error: any) {
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold">Update Password</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Secure your chef account with a strong password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword font-semibold">
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            className={`bg-secondary/10 border-border/40 focus:bg-background ${
              errors.currentPassword
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <p className="text-xs text-destructive font-medium">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword font-semibold">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="••••••••"
            className={`bg-secondary/10 border-border/40 focus:bg-background ${
              errors.newPassword
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <p className="text-xs text-destructive font-medium">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="px-10 font-black uppercase tracking-tight shadow-lg shadow-primary/10"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <KeyRound className="mr-2 h-4 w-4" />
          )}
          Update Password
        </Button>
      </form>
    </section>
  );
}
