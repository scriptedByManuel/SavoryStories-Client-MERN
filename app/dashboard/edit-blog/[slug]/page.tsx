"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ArrowLeft, 
  FileText, 
  ImagePlus, 
  Loader2, 
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Schema & Services
import { Blog, BlogFormValues, blogSchema } from "@/types/blogType";
import blogService from "@/services/blogService";
import uploadService from "@/services/uploadService";
import useEditSlug from "@/features/dashboard/hooks/useEditSlug";

export default function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { getBlogBySlug, updateBlog } = blogService;
  const { uploadImage } = uploadService;
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  // States for Image
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch Existing Data
  const { data, isLoading } = useEditSlug(slug, getBlogBySlug, "blogs");
  const blog: Blog = data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
  });

  // Pre-fill form when data is loaded
  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
      });

      if (blog.featuredImage) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog.featuredImage}`
        );
      }
    }
  }, [blog, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData: BlogFormValues) => {
    try {
      await updateBlog(blog._id, formData);

      if (photoFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", photoFile);
        await uploadImage(`/blogs/${blog._id}/image`, imgFormData);
      }

      toast.success("Blog post updated successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: unknown) {
      if(error instanceof Error) {
        toast.error(error.message || "Failed to update blog");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
              <p className="text-muted-foreground">Keep your stories updated and engaging.</p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Changes
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" /> Content Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Blog Title</Label>
                    <Input {...register("title")} placeholder="Blog Title" />
                    {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Excerpt (Brief Summary)</Label>
                    <Textarea 
                      {...register("excerpt")} 
                      className="h-24 resize-none" 
                      placeholder="Brief summary for preview cards..."
                    />
                    {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Full Content</Label>
                    <Textarea 
                      {...register("content")} 
                      rows={15} 
                      placeholder="Write your story using markdown..." 
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        Tip: Use ## for headings, - for bullets, and 1. for lists.
                    </p>
                    {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Writing Tips Sidebar/Bottom */}
              <Card className="bg-muted/50 border-none">
                <CardHeader><CardTitle className="text-sm">Writing Reminder</CardTitle></CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p><strong>Authenticity:</strong> Stay true to your culinary voice.</p>
                    <p><strong>Structure:</strong> Use headers to make the post readable.</p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
                <CardContent>
                  <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden bg-muted/30 group">
                    <img 
                      src={previewImage || "/placeholder.png"} 
                      className="w-full h-full object-cover" 
                      alt="Blog Preview"
                    />
                    <Label htmlFor="img-edit" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                      <ImagePlus className="text-white h-8 w-8" />
                    </Label>
                    <Input id="img-edit" type="file" className="hidden" onChange={handleImageChange} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Metadata</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input {...register("category")} placeholder="e.g. Techniques, News" />
                    {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
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