export function HomePageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Section Skeleton */}
      <section className="text-center py-8">
        <div className="zlu-skeleton h-10 w-64 mx-auto mb-3" />
        <div className="zlu-skeleton h-4 w-80 mx-auto" />
      </section>

      {/* Featured Posts Skeleton */}
      <section className="zlu-featured-section">
        <div className="zlu-skeleton h-6 w-32 mb-6" />
        <div className="zlu-featured-scroll">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="zlu-skeleton zlu-skeleton-card flex-shrink-0 w-[300px]" />
          ))}
        </div>
      </section>

      {/* Recent Posts Skeleton */}
      <section>
        <div className="zlu-skeleton h-6 w-32 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="zlu-skeleton h-48 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
