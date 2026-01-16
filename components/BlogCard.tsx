import { motion } from "framer-motion";
import React from "react";
import { Calendar, User } from "lucide-react";
import { Blog } from "@/types/blogType";
import { formatDate } from "@/lib/formatDate";

const BlogCard = ({ blog }: { blog: Blog }) => {
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
  return (
    <motion.a href="" variants={cardVariants} whileHover={{ y: -5 }}>
      <div
        className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full"
        onClick={() => (window.location.href = `/blog/${blog.slug}`)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              blog.featuredImage
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${blog.featuredImage}`
                : "/placeholder.png"
            }
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="text-xs font-medium text-primary mb-2">
            {blog.category}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
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
        </div>
      </div>
    </motion.a>
  );
};

export default BlogCard;
