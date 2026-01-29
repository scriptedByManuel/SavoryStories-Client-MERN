import CookingLoader from "@/components/CookingLoader";
import BlogContent from "@/features/recipe-blog/components/BlogContent";
import { Suspense } from "react";

const BlogPage = () => {
  
  return (
     <Suspense fallback={<CookingLoader />}>
      <BlogContent />
     </Suspense>
  );
};

export default BlogPage;
