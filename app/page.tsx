"use client";

import { IntroSplash } from "@/components/IntroSplash";
import BlogSection from "@/features/home/components/BlogSection";
import FeaturedRecipes from "@/features/home/components/FeaturedRecipes";
import Hero from "@/features/home/components/Hero";
import NewsLetter from "@/features/home/components/NewsLetter";
import { useState } from "react";

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}
      <div className="min-h-screen">
        <main>
          <Hero />
          <FeaturedRecipes />
          <BlogSection />
          <NewsLetter />
        </main>
      </div>
    </>
  );
};

export default Home;
