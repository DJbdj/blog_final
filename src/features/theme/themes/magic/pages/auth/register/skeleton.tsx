export function RegisterPageSkeleton() {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="magic-card p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="magic-skeleton h-8 w-32 mx-auto rounded" />
          <div className="magic-skeleton h-4 w-48 mx-auto rounded" />
        </div>

        <div className="space-y-4">
          <div className="magic-skeleton h-12 rounded-lg" />
          <div className="magic-skeleton h-12 rounded-lg" />
          <div className="magic-skeleton h-12 rounded-lg" />
          <div className="magic-skeleton h-12 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
