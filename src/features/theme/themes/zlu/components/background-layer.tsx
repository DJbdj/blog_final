export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--zlu-primary) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--zlu-accent) 0%, transparent 70%)",
        }}
      />
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--zlu-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--zlu-border) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
