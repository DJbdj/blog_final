export function PostPageSkeleton() {
  return (
    <div className="zlu-article">
      {/* Back Button Skeleton */}
      <div className="zlu-skeleton h-8 w-24 mb-6" />

      {/* Article Header Skeleton */}
      <header className="zlu-article-header">
        <div className="zlu-skeleton h-10 w-full mb-4" />
        <div className="zlu-skeleton h-6 w-3/4 mb-6" />
        <div className="flex gap-4 mb-4">
          <div className="zlu-skeleton h-5 w-24" />
          <div className="zlu-skeleton h-5 w-24" />
          <div className="zlu-skeleton h-5 w-24" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="zlu-skeleton h-6 w-16 rounded-full" />
          ))}
        </div>
      </header>

      {/* Cover Image Skeleton */}
      <div className="zlu-skeleton h-64 w-full mb-8 rounded-xl" />

      {/* Article Content Skeleton */}
      <div className="space-y-4">
        <div className="zlu-skeleton h-4 w-full" />
        <div className="zlu-skeleton h-4 w-full" />
        <div className="zlu-skeleton h-4 w-3/4" />
        <div className="zlu-skeleton h-32 w-full" />
        <div className="zlu-skeleton h-4 w-full" />
        <div className="zlu-skeleton h-4 w-5/6" />
      </div>
    </div>
  );
}
