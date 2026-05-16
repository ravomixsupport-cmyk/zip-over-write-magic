import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ravomixIcon from "@/assets/ravomix-icon.png";

/** The icon's background color */
const SPLASH_BG = "#0B0D13";

/** Update both theme-color meta tags and html background for TWA status bar sync */
const setStatusBarColor = (color: string) => {
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", color);
  });
  const metaById = document.getElementById("theme-color-meta");
  if (metaById) metaById.setAttribute("content", color);
  document.documentElement.style.backgroundColor = color;
};

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setStatusBarColor(SPLASH_BG);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => {
        document.documentElement.classList.add("app-ready");
        setStatusBarColor("#0B0D13");
        onFinish();
      }, 500);
    }, 1600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: SPLASH_BG }}
        >
          {/* Warm glow behind icon */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "300px",
              height: "300px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
              background:
                "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Logo — uses the clean 512px icon, no border/radius */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.05 }}
          >
            <img
              src={ravomixIcon}
              alt="Ravomix"
              className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]"
              style={{
                width: 104,
                height: 104,
                maxWidth: 120,
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-sm font-semibold relative z-10 tracking-wide"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            All-in-One Utility Toolkit
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="mt-8 h-[3px] w-20 overflow-hidden rounded-full relative z-10"
            style={{ background: "rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #f97316, #1e3a5f)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Made in India badge */}
          <motion.div
            className="absolute flex items-center gap-1.5 z-10"
            style={{ bottom: "2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span
              className="text-[11px] font-medium tracking-wide"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Made in India 🇮🇳
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
