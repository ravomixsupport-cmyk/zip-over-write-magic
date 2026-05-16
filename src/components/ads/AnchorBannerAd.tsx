import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const EXCLUDED_PATHS = ["/about", "/privacy", "/terms", "/contact", "/cookies", "/dmca", "/data-deletion"];
const BANNER_HEIGHT = 60;
const LABEL_HEIGHT = 14;

/**
 * Sticky bottom anchor banner — global primary revenue unit.
 * - Fixed at the very bottom on desktop; sits ABOVE BottomNav on mobile.
 * - Solid background, clearly labeled "Advertisement", no blur.
 * - Reserved height (no CLS), respects safe-area.
 * - Hidden on legal pages, while typing in inputs, and during print.
 *
 * Page content gets bottom padding via the global `body[data-anchor-ad="on"]`
 * rule in index.css so nothing is hidden behind the banner.
 */
const AnchorBannerAd = () => {
  const { pathname } = useLocation();
  const [typing, setTyping] = useState(false);
  const [filled, setFilled] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable) {
        setTyping(true);
      }
    };
    const onFocusOut = () => setTyping(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const excluded = EXCLUDED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const visible = !excluded && !typing && filled;

  // Toggle global flag so CSS can add bottom padding to body
  useEffect(() => {
    if (visible) document.body.setAttribute("data-anchor-ad", "on");
    else document.body.removeAttribute("data-anchor-ad");
    return () => document.body.removeAttribute("data-anchor-ad");
  }, [visible]);

  useEffect(() => {
    if (excluded || typing || pushedRef.current || !insRef.current) return;
    let tries = 0;
    const push = () => {
      if (typeof (window as any).adsbygoogle === "undefined") {
        if (tries++ < 20) setTimeout(push, 400);
        return;
      }
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch { /* noop */ }
    };
    push();
  }, [excluded, typing]);

  // Observe ad fill status — only show container when AdSense actually serves an ad
  useEffect(() => {
    const el = insRef.current;
    if (!el) return;
    const check = () => {
      const status = el.getAttribute("data-ad-status");
      if (status === "filled") setFilled(true);
      else if (status === "unfilled") setFilled(false);
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(el, { attributes: true, attributeFilter: ["data-ad-status"] });
    return () => obs.disconnect();
  }, []);

  if (excluded) return null;

  return (
    <div
      className="no-print fixed inset-x-0 z-40 pointer-events-none"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + var(--anchor-ad-offset, 76px))",
        display: visible ? "block" : "none",
      }}
      aria-label="Advertisement"
    >
      <div
        className="mx-auto max-w-3xl pointer-events-auto"
        style={{ background: "#0B0D13" }}
      >
        <div
          className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/60"
          style={{ height: LABEL_HEIGHT, lineHeight: `${LABEL_HEIGHT}px` }}
        >
          Advertisement
        </div>
        <ins
          ref={insRef as any}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: BANNER_HEIGHT, background: "#0B0D13" }}
          data-ad-client="ca-pub-3723403066187944"
          data-ad-slot="test"
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest={import.meta.env.DEV ? "on" : undefined}
        />
      </div>
    </div>
  );
};

export default AnchorBannerAd;
