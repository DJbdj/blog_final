export function FriendLinksPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="text-center py-6">
        <div className="zlu-skeleton h-8 w-48 mx-auto mb-2" />
        <div className="zlu-skeleton h-4 w-64 mx-auto" />
      </div>

      {/* Links Grid Skeleton */}
      <div className="zlu-friend-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="zlu-skeleton h-20 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
