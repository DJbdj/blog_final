export function SearchPageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 md:px-0 py-12 md:py-20">
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <div className="w-20 h-4 bg-muted animate-pulse rounded" />
        </div>
      </header>

      <section className="mb-16">
        <div className="relative flex items-center gap-4 border-b border-border/30 pb-4">
          <div className="flex-1">
            <div className="w-24 h-3 bg-muted animate-pulse rounded mb-2 opacity-50" />
            <div className="w-full h-10 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="group relative p-4 -mx-4 rounded-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="w-3/4 h-6 bg-muted animate-pulse rounded" />
              <div className="w-full h-4 bg-muted animate-pulse rounded opacity-60" />
              <div className="w-1/2 h-4 bg-muted animate-pulse rounded opacity-60" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
