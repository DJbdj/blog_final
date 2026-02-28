export function HomePageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Section Skeleton */}
      <section className="text-center space-y-4 py-8">
        <div className="magic-skeleton h-12 w-64 mx-auto rounded-lg" />
        <div className="magic-skeleton h-5 w-full max-w-2xl mx-auto rounded" />
      </section>

      {/* Featured Posts Skeleton */}
      <section className="space-y-4">
        <div className="magic-skeleton h-7 w-32 rounded" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="magic-skeleton min-w-[280px] h-72 rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </section>

      {/* Regular Posts Skeleton */}
      <section className="space-y-4">
        <div className="magic-skeleton h-7 w-32 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="magic-skeleton h-64 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
