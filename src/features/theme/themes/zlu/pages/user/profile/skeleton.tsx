export function ProfilePageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="text-center py-6">
        <div className="zlu-skeleton h-8 w-48 mx-auto mb-2" />
        <div className="zlu-skeleton h-4 w-64 mx-auto" />
      </div>

      {/* Profile Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="zlu-skeleton h-64 rounded-xl" />
        <div className="zlu-skeleton h-64 rounded-xl lg:col-span-2" />
      </div>
    </div>
  );
}
