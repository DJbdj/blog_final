export function PostPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cover Skeleton */}
      <div className="aspect-video w-full magic-skeleton rounded-xl" />

      {/* Header Skeleton */}
      <header className="space-y-4">
        <div className="flex gap-2">
          <div className="magic-skeleton h-7 w-20 rounded-full" />
          <div className="magic-skeleton h-7 w-20 rounded-full" />
        </div>
        <div className="magic-skeleton h-12 w-3/4 rounded" />
        <div className="flex gap-4">
          <div className="magic-skeleton h-5 w-32 rounded" />
          <div className="magic-skeleton h-5 w-32 rounded" />
        </div>
      </header>

      {/* Content Skeleton */}
      <div className="pt-8 space-y-4">
        <div className="magic-skeleton h-4 w-full rounded" />
        <div className="magic-skeleton h-4 w-full rounded" />
        <div className="magic-skeleton h-4 w-5/6 rounded" />
        <div className="magic-skeleton h-64 w-full rounded-lg" />
        <div className="magic-skeleton h-4 w-full rounded" />
        <div className="magic-skeleton h-4 w-full rounded" />
      </div>
    </div>
  );
}
