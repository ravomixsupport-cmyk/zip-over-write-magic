import { useState, useRef, ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  depth?: number;
}

const Card3D = forwardRef<HTMLDivElement, Card3DProps>(
  ({ children, className = "", glareColor = "hsl(var(--primary))", depth = 12 }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setRotateX((0.5 - y) * depth);
      setRotateY((x - 0.5) * depth);
      setGlarePos({ x: x * 100, y: y * 100 });
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      // Skip touch tracking to avoid intercepting taps/clicks on mobile
      return;
    };

    const handleLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setGlarePos({ x: 50, y: 50 });
    };

    return (
      <motion.div
        ref={(node) => {
          // Handle both internal ref and forwarded ref
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={`relative ${className}`}
        style={{
          perspective: "800px",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      >
        {children}
        {/* Glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glareColor} 0%, transparent 60%)`,
          }}
        />
      </motion.div>
    );
  }
);

Card3D.displayName = "Card3D";

export default Card3D;
