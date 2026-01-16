import subscribeService from "@/services/subscribeService";
import { useState } from "react";
import { toast } from "sonner";

export const useSubscribe = () => {
  const { subscribe } = subscribeService;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await subscribe({ email });
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");

      toast.success("Successfully Subscribed!", {
        description:
          "You'll now receive emails when our chefs post new delicious recipes.",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    isSubscribed,
    setIsSubscribed,
    handleSubscribe,
  };
};
