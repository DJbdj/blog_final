export function BackgroundLayer() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      {/* Gradient Orbs */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--zlu-primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--zlu-accent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
