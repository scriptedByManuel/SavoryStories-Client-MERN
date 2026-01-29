"use client";
import React from "react";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/hero-bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/40 dark:bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
          Discover Culinary Magic
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
          Explore authentic recipes, cooking techniques, and stories from
          kitchens around the world
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            onClick={() => router.push("/recipes")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Explore Recipes
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() => router.push("/blogs")}
            size="lg"
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur"
          >
            Read Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
