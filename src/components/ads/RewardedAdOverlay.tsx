import { useEffect, useRef, useState } from "react";

type RewardedDetail = {
  label?: string;
  reason?: string;
  onResolve: (rewarded: boolean) => void;
};

const SKIP_AFTER_SECONDS = 5;

/**
 * Global rewarded-ad overlay. Listens for the
 * `ravomix:rewarded-ad` CustomEvent and shows a full-screen ad.
 * - Skip button enabled after 5 seconds (policy compliant).
 * - On close (skip OR completion) the action proceeds.
 * - Clearly labeled "Advertisement" — never mimics system UI.
 */
const RewardedAdOverlay = () => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<RewardedDetail | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(SKIP_AFTER_SECONDS);
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    const onShow = (e: Event) => {
      const ce = e as CustomEvent<RewardedDetail>;
      if (!ce.detail || open) return;
      setDetail(ce.detail);
      setSecondsLeft(SKIP_AFTER_SECONDS);
      pushedRef.current = false;
      setOpen(true);
    };
    window.addEventListener("ravomix:rewarded-ad", onShow as EventListener);
    return () => window.removeEventListener("ravomix:rewarded-ad", onShow as EventListener);
  }, [open]);

  // Countdown
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [open]);

  // Push ad to AdSense once mounted
  useEffect(() => {
    if (!open || pushedRef.current) return;
    let tries = 0;
    const push = () => {
      if (typeof (window as any).adsbygoogle === "undefined") {
        if (tries++ < 20) setTimeout(push, 300);
        return;
      }
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch { /* noop */ }
    };
    push();
  }, [open]);

  const close = (rewarded: boolean) => {
    if (!open) return;
    const cb = detail?.onResolve;
    setOpen(false);
    setDetail(null);
    if (cb) setTimeout(() => cb(rewarded), 0);
  };

  if (!open) return null;
  const canSkip = secondsLeft <= 0;

  return (
    <div
      className="no-print fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-label="Advertisement"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Advertisement
          </span>
          <button
            onClick={() => close(canSkip)}
            disabled={!canSkip}
            className="text-xs font-semibold rounded-md px-3 py-1.5 bg-foreground/10 text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/15 transition"
            aria-label={canSkip ? "Close ad" : `Skip in ${secondsLeft} seconds`}
          >
            {canSkip ? "Skip ✕" : `Skip in ${secondsLeft}s`}
          </button>
        </div>

        {detail?.reason && (
          <p className="px-4 pt-3 text-[11px] text-center text-muted-foreground">
            {detail.reason}
          </p>
        )}

        <div className="p-3" style={{ minHeight: 280 }}>
          <ins
            ref={insRef as any}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: 280 }}
            data-ad-client="ca-pub-3723403066187944"
            data-ad-slot="test"
            data-ad-format="auto"
            data-full-width-responsive="true"
            data-adtest={import.meta.env.DEV ? "on" : undefined}
          />
        </div>
      </div>
    </div>
  );
};

/** Trigger a rewarded ad. Resolves true if user watched (skip allowed after 5s). */
export const showRewardedAd = (opts: { reason?: string } = {}): Promise<boolean> => {
  return new Promise((resolve) => {
    window.dispatchEvent(
      new CustomEvent("ravomix:rewarded-ad", {
        detail: { reason: opts.reason, onResolve: resolve },
      })
    );
  });
};

export default RewardedAdOverlay;
