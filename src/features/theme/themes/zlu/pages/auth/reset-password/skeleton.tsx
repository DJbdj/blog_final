export function ResetPasswordPageSkeleton() {
  return (
    <div className="zlu-auth-card">
      <div className="zlu-skeleton h-8 w-32 mx-auto mb-2" />
      <div className="zlu-skeleton h-4 w-24 mx-auto mb-6" />
      <div className="space-y-4">
        <div className="zlu-skeleton h-10 w-full" />
        <div className="zlu-skeleton h-10 w-full" />
        <div className="zlu-skeleton h-10 w-full mt-4" />
      </div>
    </div>
  );
}
