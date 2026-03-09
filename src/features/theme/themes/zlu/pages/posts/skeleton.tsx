export function PostsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="text-center py-6">
        <div className="zlu-skeleton h-8 w-48 mx-auto mb-2" />
        <div className="zlu-skeleton h-4 w-32 mx-auto" />
      </div>

      {/* Tags Filter Skeleton */}
      <div className="zlu-sidebar-card">
        <div className="zlu-skeleton h-5 w-24 mb-4" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="zlu-skeleton h-7 w-16 rounded-full" />
          ))}
        </div>
      </div>

      {/* Posts List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="zlu-skeleton h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
