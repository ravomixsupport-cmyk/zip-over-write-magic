import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const EXCLUDED_PATHS = ["/about", "/privacy", "/terms", "/contact", "/cookies", "/dmca", "/data-deletion"];
const AD_HEIGHT = 250;
const LABEL_HEIGHT = 14;

/**
 * In-content responsive ad block.
 * - Pre-allocated fixed height to prevent CLS.
 * - Sits above the sticky bottom anchor banner (placed inside page content).
 * - Hidden while user is typing in any input/textarea.
 * - Hidden on legal pages and in print.
 * - Container hides completely when AdSense doesn't serve an ad.
 */
const InlineAd = () => {
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

  useEffect(() => {
    if (excluded || pushedRef.current || !insRef.current) return;
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
  }, [excluded]);

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

  const isDev = import.meta.env.DEV;
  const visible = !typing && (filled || isDev);

  return (
    <div
      className="no-print w-full my-6"
      style={{ display: visible ? "block" : "none" }}
      aria-label="Advertisement"
    >
      <div
        className="mx-auto max-w-3xl"
        style={{
          background: "#0B0D13",
          border: isDev && !filled ? "1px dashed rgba(255,255,255,0.25)" : undefined,
          borderRadius: 8,
        }}
      >
        <div
          className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white/60"
          style={{ height: LABEL_HEIGHT, lineHeight: `${LABEL_HEIGHT}px` }}
        >
          Advertisement
        </div>
        <div style={{ position: "relative", width: "100%", height: AD_HEIGHT }}>
          <ins
            ref={insRef as any}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: AD_HEIGHT, background: "#0B0D13" }}
            data-ad-client="ca-pub-3723403066187944"
            data-ad-slot="test"
            data-ad-format="auto"
            data-full-width-responsive="true"
            data-adtest={isDev ? "on" : undefined}
          />
          {isDev && !filled && (
            <div
              style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase", pointerEvents: "none",
              }}
            >
              AdSense slot · preview only
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InlineAd;
