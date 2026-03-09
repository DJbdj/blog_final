export function SearchPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Search Box Skeleton */}
      <div className="zlu-skeleton h-12 w-full rounded-xl" />

      {/* Results Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="zlu-skeleton h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
