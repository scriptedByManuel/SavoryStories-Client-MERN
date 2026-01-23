"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "@/components/Pagination";
import { useItemList } from "@/features/recipe-blog/hooks/useItemList";
import blogService from "@/services/blogService";
import { Blog } from "@/types/blogType";
import BlogCard from "@/components/BlogCard";
import PublicEmptyState from "@/features/recipe-blog/components/PublicEmptyState";

const BlogPage = () => {
  const { getAllBlogs } = blogService;
  const {
    data,
    isLoading,
    searchInput,
    handleSearch,
    handleSort,
    sort,
    handleUrlChange,
  } = useItemList("blogs", getAllBlogs);

  const blogs = data?.data || [];
  const meta = data?.meta;
  const links = data?.links;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };
  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <main className="flex-1 pt-8">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Culinary Blog</h1>
          <p className="text-muted-foreground mt-2">
            Stories, techniques, and inspiration from our community of chefs
          </p>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={searchInput}
                placeholder="Search blogs by title, or content..."
              onChange={handleSearch}
              className="pl-10 pr-12"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <ChevronDown className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-1" align="end">
                <DropdownMenuItem
                  onClick={() => handleSort("newest")}
                  className={
                    sort === "newest"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSort("oldest")}
                  className={
                    sort === "oldest"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Oldest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? null : blogs.length === 0 ? (
          <PublicEmptyState />
        ) : (
          <motion.div
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog: Blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {meta && meta.last_page > 1 && (
              <Pagination
                links={links}
                meta={meta}
                handleUrlChange={handleUrlChange}
              />
            )}
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default BlogPage;
