export function VerifyEmailPageSkeleton() {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="magic-card p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="magic-skeleton h-12 w-12 mx-auto rounded-full" />
          <div className="magic-skeleton h-8 w-32 mx-auto rounded" />
          <div className="magic-skeleton h-4 w-48 mx-auto rounded" />
        </div>

        <div className="magic-skeleton h-12 w-32 mx-auto rounded-lg" />
      </div>
    </div>
  );
}
