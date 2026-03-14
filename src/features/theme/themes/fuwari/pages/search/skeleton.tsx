import { Keyboard, Search } from "lucide-react";

export function SearchPageSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 pb-12">
      {/* Header Area Skeleton */}
      <div className="fuwari-card-base p-6 md:p-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-muted animate-pulse shrink-0" />
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-4 w-5 h-5 text-muted-foreground">
            <Search />
          </div>
          <div className="w-full h-12 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>

      {/* Tips Area Skeleton */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Keyboard className="w-4 h-4" />
        <div className="w-48 h-4 bg-muted animate-pulse rounded" />
      </div>

      {/* Results Area Skeleton */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="fuwari-card-base p-4 md:p-5 flex flex-col gap-3 animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="w-3/4 h-6 bg-muted rounded" />
            <div className="w-full h-4 bg-muted rounded opacity-60" />
            <div className="w-1/2 h-4 bg-muted rounded opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
}
