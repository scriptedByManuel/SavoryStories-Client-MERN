"use client";
import { motion } from "framer-motion";
import { Calendar, User, Edit2, Trash2 } from "lucide-react";
import { Blog } from "@/types/blogType";
import { formatDate } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const ChefBlogCard = ({ blog, deleteOneBlog, onDeleteSuccess}: { blog: Blog, deleteOneBlog: any, onDeleteSuccess: any }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

   const handleDelete = async (id: string) => {
    try {
      const data = await deleteOneBlog(id)
      onDeleteSuccess()
      toast.success(data.message)
    } catch (error: unknown) {
      if(error instanceof Error) {
        toast.error("Failed to delete")
      }
    }
  }

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group h-full flex flex-col"
    >
      {/* Image Section - Link to Detail */}
      <Link href={`/blog/${blog.slug}`} className="relative h-48 overflow-hidden block">
        <img
          src={
            blog.featuredImage
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog.featuredImage}`
              : "/placeholder.png"
          }
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs font-medium text-primary mb-2">
          {blog.category}
        </div>
        
        {/* Title Section - Link to Detail */}
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
          {blog.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{blog.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons - Dashboard Specific */}
        <div className="flex gap-2 mt-4 pt-4">
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={`/dashboard/edit-blog/${blog._id}`}>
              <Edit2 className="mr-2 h-3 w-3" />
              Edit
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-destructive hover:bg-destructive/10 bg-transparent border-destructive/20"
            onClick={() => handleDelete(blog._id)}
          >
            <Trash2 className="mr-2 h-3 w-3" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChefBlogCard;