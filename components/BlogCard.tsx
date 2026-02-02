"use client";
import { motion, Variants } from "framer-motion";
import { Blog } from "@/types/blogType";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const cardVariants: Variants = {
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
  } ;

  const wordsPerMinute = 200;
  const noOfWords = blog.content ? blog.content.split(/\s+/).length : 0;
  const readingTime = Math.ceil(noOfWords / wordsPerMinute) || 1;

  const imageUrl = blog.featuredImage || "/image-placeholder.jpeg";


  return (
    <motion.a
      initial="hidden"
      animate="visible"
      href={`/blog/${blog.slug}`}
      className="group cursor-pointer block h-full"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
            {blog.excerpt || blog.content?.substring(0, 100) + "..."}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{readingTime}</span>
              <span>min read</span>
            </div>
            
            <span className="text-primary font-semibold capitalize bg-primary/10 px-2 py-0.5 rounded">
              {blog.category || "Article"}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default BlogCard;