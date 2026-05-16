import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";
import ravomixIcon from "@/assets/ravomix-icon.png";

const ICON_BG = "#1B1E30";

const NetworkGuard = () => {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const handleRetry = useCallback(() => {
    setChecking(true);
    setTimeout(() => {
      setIsOnline(navigator.onLine);
      setChecking(false);
      if (navigator.onLine) {
        window.location.reload();
      }
    }, 1200);
  }, []);

  if (isOnline) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ backgroundColor: ICON_BG }}
      >
        <div
          className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-border p-5 text-center shadow-2xl"
          style={{ backgroundColor: ICON_BG }}
        >
          <img
            src={ravomixIcon}
            alt="Ravomix"
            className="w-16 h-16 object-contain mb-6"
            style={{ filter: "drop-shadow(0 4px 20px rgba(249,115,22,0.35))" }}
          />

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <WifiOff className="h-6 w-6" style={{ color: "rgba(255,255,255,0.5)" }} />
          </div>

          <h2 className="text-lg font-bold mb-1" style={{ color: "#fff" }}>
            You're offline
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            Please check your internet connection
          </p>

          <button
            onClick={handleRetry}
            disabled={checking}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "#fff",
              minWidth: 140,
            }}
          >
            <RefreshCw className={`h-4 w-4 ${checking ? "animate-spin" : ""}`} />
            {checking ? "Checking…" : "Retry"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NetworkGuard;
