import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Minimal back-button guard for Android TWA.
 * When the user is on "/" and presses back with no more history,
 * we silently re-push the current state so the app doesn't close.
 * On any other route, we do nothing — React Router handles it.
 */
const ExitConfirmation = () => {
  const location = useLocation();
  const isRoot = useRef(false);

  // Track whether we're on root
  useEffect(() => {
    isRoot.current = location.pathname === "/";
  }, [location.pathname]);

  useEffect(() => {
    // Push one guard entry so the very first back press on "/" is caught
    if (location.pathname === "/") {
      window.history.pushState({ rootGuard: true }, "");
    }

    const onPopState = (e: PopStateEvent) => {
      // Only intercept if we're on the root page
      if (isRoot.current) {
        // Re-push guard so next back press is also caught
        window.history.pushState({ rootGuard: true }, "");
        // Do nothing else — app stays on home
      }
      // For all other routes, React Router's own popstate listener handles navigation
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []); // Only once on mount

  return null;
};

export default ExitConfirmation;
