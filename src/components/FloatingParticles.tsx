/**
 * FloatingParticles — lightweight CSS-only version for better mobile performance.
 * Uses CSS animations instead of framer-motion to reduce JS overhead.
 */

const FloatingParticles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Ambient gradient orbs — pure CSS, no JS animation */}
    <div
      className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-[0.08] animate-float-slow"
      style={{ background: "hsl(var(--primary))", top: "-5%", left: "-10%" }}
    />
    <div
      className="absolute w-[200px] h-[200px] rounded-full blur-[80px] opacity-[0.06] animate-float-slow-reverse"
      style={{ background: "hsl(var(--secondary))", bottom: "5%", right: "-5%" }}
    />

    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-0 dark:opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

export default FloatingParticles;
