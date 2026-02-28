export function FriendLinksPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-12 text-center space-y-4">
        <div className="magic-skeleton h-10 w-48 mx-auto rounded" />
        <div className="magic-skeleton h-4 w-96 mx-auto rounded" />
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="magic-card p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="magic-skeleton h-12 w-12 rounded" />
              <div className="flex-1 space-y-3">
                <div className="magic-skeleton h-5 w-3/4 rounded" />
                <div className="magic-skeleton h-4 w-full rounded" />
                <div className="magic-skeleton h-3 w-full rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}