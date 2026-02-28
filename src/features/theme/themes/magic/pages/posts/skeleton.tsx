export function PostsPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Skeleton */}
      <header className="mb-8 space-y-2">
        <div className="magic-skeleton h-10 w-48 rounded" />
        <div className="magic-skeleton h-5 w-full max-w-lg rounded" />
      </header>

      {/* Tags Skeleton */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="magic-skeleton h-8 w-24 rounded-full" />
        ))}
      </div>

      {/* Posts Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="magic-skeleton h-64 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
