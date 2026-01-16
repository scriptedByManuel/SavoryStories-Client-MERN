
import BlogSection from "@/features/home/components/BlogSection";
import FeaturedRecipes from "@/features/home/components/FeaturedRecipes";
import Hero from "@/features/home/components/Hero";
import NewsLetter from "@/features/home/components/NewsLetter";

const Home = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <FeaturedRecipes />
        <BlogSection />
        <NewsLetter />
      </main>
    </div>
  );
};

export default Home;
