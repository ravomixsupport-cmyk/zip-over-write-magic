import { FileText, Calculator, Megaphone, Zap, Shield, Sparkles } from "lucide-react";
import ravomixIcon from "@/assets/ravomix-icon.png";

const features = [
  { icon: <FileText className="h-5 w-5" />, label: "Apps", color: "#818CF8" },
  { icon: <Megaphone className="h-5 w-5" />, label: "Complaints", color: "#FB7185" },
  { icon: <Calculator className="h-5 w-5" />, label: "Tools", color: "#34D399" },
  { icon: <Zap className="h-5 w-5" />, label: "Fast", color: "#A78BFA" },
  { icon: <Shield className="h-5 w-5" />, label: "Secure", color: "#22D3EE" },
  { icon: <Sparkles className="h-5 w-5" />, label: "Smart", color: "#FBBF24" },
];

const ICON_COUNT = features.length;

const Hero3D = () => {
  return (
    <div
      className="relative mb-6 overflow-hidden rounded-3xl border border-border/30"
      style={{ minHeight: "260px" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 15% 25%, hsl(var(--primary) / 0.18), transparent),
              radial-gradient(ellipse 60% 70% at 85% 75%, hsl(var(--secondary) / 0.15), transparent),
              radial-gradient(ellipse 70% 50% at 50% 50%, hsl(250 60% 60% / 0.08), transparent)
            `,
          }}
        />
        <div className="absolute inset-0 bg-background/65 dark:bg-background/75 backdrop-blur-2xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute w-40 h-40 rounded-full blur-[60px] opacity-[0.15] dark:opacity-[0.25]"
        style={{ background: "hsl(var(--primary))", top: "5%", left: "0%" }}
      />
      <div
        className="absolute w-28 h-28 rounded-full blur-[50px] opacity-[0.12] dark:opacity-[0.20]"
        style={{ background: "hsl(var(--secondary))", bottom: "5%", right: "5%" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-6 sm:py-8 px-4">

        {/* Static orbital layout — responsive via CSS scale */}
        <div
          className="relative mb-5 origin-center scale-[0.75] sm:scale-90 md:scale-100"
          style={{ width: 280, height: 280 }}
        >
          {/* Orbit track */}
          <div
            className="absolute rounded-full border border-primary/[0.07]"
            style={{
              width: 220,
              height: 220,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Center logo */}
          <img
            src={ravomixIcon}
            alt="Ravomix"
            className="absolute object-contain z-10 drop-shadow-lg"
            style={{
              width: 140, height: 140,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Static icons around the center */}
          <div className="absolute inset-0">
            {features.map((feat, i) => {
              const angleDeg = (360 / ICON_COUNT) * i;
              const angleRad = (angleDeg * Math.PI) / 180;
              const orbitRadius = 110;
              const x = Math.cos(angleRad) * orbitRadius;
              const y = Math.sin(angleRad) * orbitRadius;

              return (
                <div
                  key={feat.label}
                  className="absolute flex items-center gap-1.5 rounded-full border border-border/40 bg-card/80 dark:bg-card/60 backdrop-blur-md px-3 py-1.5 shadow-md"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    boxShadow: `0 0 10px ${feat.color}20, 0 2px 6px rgba(0,0,0,0.12)`,
                  }}
                >
                  <span style={{ color: feat.color }}>{feat.icon}</span>
                  <span className="text-[11px] font-semibold text-foreground/80 whitespace-nowrap">{feat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-wrap justify-center gap-x-1.5 mb-3">
          <span className="text-base md:text-lg font-extrabold" style={{ color: "#FF8C00" }}>All-in-One</span>
          <span
            className="text-base md:text-lg font-extrabold"
            style={{
              backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Toolkit
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-[11px] md:text-xs text-center max-w-[260px]">
          <span style={{ color: "#FF8C00" }}>Applications</span>
          <span className="text-muted-foreground">, </span>
          <span className="text-primary">Complaints</span>
          <span className="text-muted-foreground"> & </span>
          <span style={{ color: "#FF8C00" }}>Tools</span>
          <span className="text-muted-foreground"> — cloud-powered, always ready ✨</span>
        </p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 dark:from-primary/20 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/8 dark:from-secondary/15 to-transparent rounded-tr-full pointer-events-none" />
    </div>
  );
};

export default Hero3D;
