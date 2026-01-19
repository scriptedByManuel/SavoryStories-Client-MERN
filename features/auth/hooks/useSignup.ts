"use client";

import { useState } from "react";
import { SignupFormValues } from "@/types/authType";
import { toast } from "sonner";
import authService from "@/services/authService";

export const useSignup = () => {
  const { register } = authService;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await register(data);
      toast.success("Signup successfull");
      return response.user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
