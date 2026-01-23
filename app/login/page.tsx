"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChefHat, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "@/types/authType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignin } from "@/features/auth/hooks/useSignin";
import { useProfileStore } from "@/stores/useProfileStore";

export default function LoginPage() {
  const router = useRouter();
  const { signin, isLoading } = useSignin();
  const { setChef, chef } = useProfileStore();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

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

  const handleLogin = async (data: LoginFormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const user = await signin(payload);
    if (user) {
      setChef(user);
      router.push("/dashboard");
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
          <CardTitle className="text-2xl font-bold">Chef Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your chef dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
              Log In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up as a chef
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
