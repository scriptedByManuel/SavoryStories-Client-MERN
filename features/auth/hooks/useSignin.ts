"use client";

import { useState } from "react";
import { LoginFormValues } from "@/types/authType";
import { toast } from "sonner";
import authService from "@/services/authService";

export const useSignin = () => {
  const { login } = authService;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(data);
      toast.success("Login Successfull");
      return response.user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signin, isLoading, error };
};
