"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileText, ImagePlus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Schema & Services
import { BlogFormValues, blogSchema } from "@/types/blogType";
import blogService from "@/services/blogService";
import uploadService from "@/services/uploadService";

export default function NewBlogPage() {
  const router = useRouter();
  const { storeNewBlog } = blogService;
  const { uploadImage } = uploadService;
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const response = await storeNewBlog(data);
      const blogId = response.data._id;

      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        await uploadImage(`/blogs/${blogId}/image`, formData);
      }

      toast.success("Blog post published successfully!");
      router.push("/dashboard");
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create Blog</h1>
              <p className="text-muted-foreground">
                Share your culinary stories with the world.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Publish Blog
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Blog Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Blog Title</Label>
                    <Input
                      {...register("title")}
                      placeholder="e.g., The Secret to Perfect Pasta"
                    />
                    {errors.title && (
                      <p className="text-xs text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Excerpt (Brief Summary)</Label>
                    <Textarea
                      {...register("excerpt")}
                      placeholder="Write a compelling summary (150-200 characters)"
                      className="resize-none"
                    />
                    {errors.excerpt && (
                      <p className="text-xs text-destructive">
                        {errors.excerpt.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Blog Content</Label>
                    <Textarea
                      {...register("content")}
                      rows={12}
                      placeholder="Write your blog post here..."
                    />
                    {/* Markdown Tips Added Here */}
                    <p className="text-xs text-muted-foreground mt-2">
                      Tip: Use ## for section headings, - for bullet points, and
                      1. for numbered lists
                    </p>
                    {errors.content && (
                      <p className="text-xs text-destructive">
                        {errors.content.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tips for a Great Blog Post Card Added Here */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">
                    Tips for a Great Blog Post
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Be Authentic:</strong> Share your unique culinary
                    journey and insights
                  </p>
                  <p>
                    <strong>Add Value:</strong> Teach techniques, share
                    knowledge, or inspire your audience
                  </p>
                  <p>
                    <strong>Use Images:</strong> High-quality featured images
                    increase engagement
                  </p>
                  <p>
                    <strong>Structure Matters:</strong> Break your content into
                    clear sections with headings
                  </p>
                  <p>
                    <strong>Call to Action:</strong> Encourage readers to try
                    recipes or share feedback
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/30 group">
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(null);
                            setPhotoFile(null);
                          }}
                          className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <Label
                        htmlFor="blog-image"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <ImagePlus className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs">Upload Image</span>
                      </Label>
                    )}
                    <input
                      id="blog-image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      {...register("category")}
                      placeholder="e.g., Techniques, News"
                    />
                    {errors.category && (
                      <p className="text-xs text-destructive">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
