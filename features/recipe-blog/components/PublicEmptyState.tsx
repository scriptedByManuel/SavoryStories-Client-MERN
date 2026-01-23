import { SearchX, Sparkles } from "lucide-react";

const PublicEmptyState = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="relative max-w-2xl mx-auto text-center">
        <div className="absolute inset-0 -top-10 left-1/2 -translate-x-1/2 bg-primary/5 w-64 h-64 blur-3xl rounded-full -z-10" />

        <div className="relative inline-block mb-8">
          <div className="bg-background border shadow-sm p-5 rounded-2xl rotate-3 transition-transform hover:rotate-0">
            <SearchX className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-bounce" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
          The Kitchen is Getting Ready!
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
          We couldn't find any recipes matching your search, or maybe the chef is still busy plating the next big thing.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-primary">
          <div className="h-px w-8 bg-primary/30" />
          <span>Coming Soon: New Flavors & Stories</span>
          <div className="h-px w-8 bg-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default PublicEmptyState