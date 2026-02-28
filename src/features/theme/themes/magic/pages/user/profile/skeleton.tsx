export function ProfilePageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="magic-skeleton h-8 w-32 rounded" />
        <div className="magic-skeleton h-4 w-64 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="magic-card p-6 space-y-4">
            <div className="magic-skeleton h-24 w-24 mx-auto rounded-full" />
            <div className="magic-skeleton h-6 w-32 mx-auto rounded" />
            <div className="magic-skeleton h-4 w-24 mx-auto rounded" />
            <div className="magic-skeleton h-10 w-full rounded" />
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="magic-card p-6 space-y-4">
            <div className="magic-skeleton h-12 rounded-lg" />
            <div className="magic-skeleton h-12 rounded-lg" />
            <div className="magic-skeleton h-12 rounded-lg" />
            <div className="magic-skeleton h-24 rounded-lg" />
            <div className="flex gap-4">
              <div className="magic-skeleton h-10 w-24 rounded-lg" />
              <div className="magic-skeleton h-10 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
