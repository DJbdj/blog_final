export function SearchPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="magic-skeleton h-8 w-16 rounded-full" />
        </div>
        <div className="flex gap-3">
          <div className="flex-1 magic-skeleton h-12 rounded-lg" />
          <div className="magic-skeleton h-12 w-24 rounded-lg" />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Loading State */}
        <div className="text-center py-4">
          <div className="magic-skeleton h-5 w-64 mx-auto rounded" />
        </div>

        {/* Result Cards */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="magic-card p-6 space-y-4">
              <div className="magic-skeleton h-6 w-3/4 rounded" />
              <div className="space-y-2">
                <div className="magic-skeleton h-4 w-full rounded" />
                <div className="magic-skeleton h-4 w-5/6 rounded" />
              </div>
              <div className="flex gap-4">
                <div className="magic-skeleton h-4 w-24 rounded" />
                <div className="magic-skeleton h-4 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
