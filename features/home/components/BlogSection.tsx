"use client";
import { ArrowRight } from "lucide-react";
import { Blog } from "@/types/blogType";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useFeaturedBlogs } from "../hooks/useFeaturedBlogs";
import { useRouter } from "next/navigation";

const BlogSection = () => {
  const { blogs, isLoading } = useFeaturedBlogs()
  const router = useRouter();
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories, techniques, and inspiration from our culinary adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {!isLoading && (
          blogs.map((blog: Blog) => (
            <BlogCard key={blog._id} blog={blog} />
          )))
          }
        </div>

        <div className="text-center">
          <Button onClick={() => router.push("/blogs")} size="lg" variant="outline">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
