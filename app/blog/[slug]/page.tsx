"use client";
import { BlogNotFound } from "@/features/recipe-blog/components/RecipeNotFound";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useSlug from "@/features/recipe-blog/hooks/useSlug";
import { formatDate } from "@/lib/formatDate";
import blogService from "@/services/blogService";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { BlogDetailSkeleton } from "@/features/recipe-blog/components/BlogDetailSkeleton";

const BlogDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { getBlogBySlug } = blogService;
  const { data, isLoading } = useSlug(slug, getBlogBySlug, "blogs");

  const blog = data?.data;

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading ? (
        <BlogDetailSkeleton />
      ) : blog ? (
        <main className="flex-1 container mx-auto px-4 py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <article className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                {blog?.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {blog?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {blog?.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">
                    {formatDate(blog?.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
              <img
                src={
                  blog.featuredImage
                    ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog?.featuredImage}`
                    : "/placeholder.png"
                }
                alt={blog?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              {blog?.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold mt-8 mb-4 text-foreground"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("-")) {
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside space-y-2 text-foreground/90"
                    >
                      {paragraph
                        .split("\n")
                        .filter((line) => line.startsWith("-"))
                        .map((item, i) => (
                          <li key={i}>{item.replace("- ", "")}</li>
                        ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  return (
                    <ol
                      key={index}
                      className="list-decimal list-inside space-y-2 text-foreground/90"
                    >
                      {paragraph
                        .split("\n")
                        .filter((line) => line.match(/^\d\./))
                        .map((item, i) => (
                          <li key={i}>{item.replace(/^\d\. /, "")}</li>
                        ))}
                    </ol>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-foreground/90 leading-relaxed mb-6"
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <Card className="p-6 bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full border-1 border-primary overflow-hidden bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    <img
                      className=""
                      src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog?.author?.avatar}`}
                      alt={blog?.author?.name}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{blog?.author.name}</h4>
                    <p className="text-muted-foreground">{blog?.author.bio}</p>
                  </div>
                </div>
              </Card>
            </div>
          </article>
        </main>
      ) : (
        <BlogNotFound />
      )}
    </div>
  );
};

export default BlogDetailPage;
