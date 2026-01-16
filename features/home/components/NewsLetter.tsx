"use client"
import { Loader2, MailCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscribe } from "../hooks/useSubscribe";

const NewsLetter = () => {
  const { email, setEmail, isLoading, isSubscribed, setIsSubscribed, handleSubscribe} = useSubscribe()
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4 text-primary">
            <MailCheck className="h-10 w-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Never Miss a Recipe
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe as a guest to get instant email notifications whenever our
            chefs publish new culinary stories and recipes.
          </p>

          {!isSubscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="chef-lover@example.com"
                className="flex-1 bg-background"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Subscribe Now
              </Button>
            </form>
          ) : (
            <div className="bg-background p-6 rounded-lg border border-primary/20 shadow-sm animate-in fade-in zoom-in duration-300">
              <p className="font-semibold text-primary">
                Thank you for joining our community!
              </p>
              <p className="text-sm text-muted-foreground">
                Check your inbox for a confirmation email.
              </p>
              <Button
                variant="link"
                className="mt-2 h-auto p-0"
                onClick={() => setIsSubscribed(false)}
              >
                Subscribe another email
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-6">
            By subscribing, you agree to receive marketing emails about new chef
            posts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
