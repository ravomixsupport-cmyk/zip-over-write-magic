import { useState, useEffect, useCallback } from "react";

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const requireOnline = useCallback(
    (callback: () => void, offlineMsg?: string) => {
      if (isOnline) {
        callback();
      } else {
        alert(offlineMsg || "📶 Internet required to generate and share files. Please connect and try again.");
      }
    },
    [isOnline]
  );

  return { isOnline, requireOnline };
}
