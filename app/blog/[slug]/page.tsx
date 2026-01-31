"use client";
import { BlogNotFound } from "@/features/recipe-blog/components/RecipeNotFound";
import { Card } from "@/components/ui/card";
import useSlug from "@/features/recipe-blog/hooks/useSlug";
import { formatDate } from "@/lib/formatDate";
import blogService from "@/services/blogService";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { BlogDetailSkeleton } from "@/features/recipe-blog/components/BlogDetailSkeleton";
import { Blog } from "@/types/blogType";

const BlogDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const { getBlogBySlug } = blogService;
  const { data, isLoading } = useSlug<Blog>(slug, getBlogBySlug, "blogs");

  const blog = data;

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL;

  const blogImageUrl = blog?.featuredImage
    ? `${BASE_URL}/${blog.featuredImage}`
    : "/placeholder.png";

  const authorImageUrl = blog?.author?.avatar
    ? `${BASE_URL}/${blog.author.avatar}`
    : "/default-avatar.png";

  const renderContent = (content: string) => {
    if (!content) return null;

    return content.split("\n\n").map((paragraph, index) => {
      const trimmedPara = paragraph.trim();

      // 1. Headings (##)
      if (trimmedPara.startsWith("##")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {trimmedPara.replace(/^##\s*/, "")}
          </h2>
        );
      }

      // 2. Unordered Lists (-)
      if (trimmedPara.startsWith("-")) {
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4">
            {trimmedPara
              .split("\n")
              .filter((l) => l.trim())
              .map((item, i) => (
                <li key={i}>{item.replace(/^-\s*/, "")}</li>
              ))}
          </ul>
        );
      }

      // 3. Numbered Lists (1. or 2. etc)
      if (/^\d+\./.test(trimmedPara)) {
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 my-4">
            {trimmedPara
              .split("\n")
              .filter((l) => l.trim())
              .map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
              ))}
          </ol>
        );
      }

      // 4. Normal Paragraph
      return (
        <p key={index} className="text-lg leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };
  if (isLoading) return <BlogDetailSkeleton />;
  if (!blog) return <BlogNotFound />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to All Blogs
        </Link>

        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase mb-4">
              {blog.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-6 py-6 border-y border-border">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary/60" />
                <span className="font-semibold">{blog.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary/60" />
                <span className="text-muted-foreground">
                  {formatDate(blog.createdAt)}
                </span>
              </div>
            </div>
          </header>

          <div className="relative h-72 md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={blogImageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose max-w-none">{renderContent(blog.content)}</div>

          <footer className="mt-16 pt-10 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">About the Author</h3>
            <Card className="p-6 md:p-8 bg-muted/30 border-none shadow-sm">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="h-24 w-24 rounded-full border-2 border-primary overflow-hidden bg-primary/10 flex-shrink-0 shadow-md">
                  <img
                    src={authorImageUrl}
                    alt={blog.author?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-xl mb-2">
                    {blog.author?.name}
                  </h4>
                  <p className="text-muted-foreground italic leading-relaxed">
                    {blog.author?.bio}
                  </p>
                </div>
              </div>
            </Card>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default BlogDetailPage;
