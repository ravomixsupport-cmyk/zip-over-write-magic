import { useState, useRef, useCallback } from "react";
import { playSpinStart, playCoinFlip, playSuspense, playResultReveal, playBuzz } from "@/utils/sounds";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import useSEO from "@/hooks/useSEO";

import { ArrowLeft, Plus, X, Shuffle, RotateCcw } from "lucide-react";

// ── Vibrant 4K palette ──
const WHEEL_COLORS = [
  "#FF3366", "#FF6B35", "#FFB800", "#00C853",
  "#00B4D8", "#7B61FF", "#E040FB", "#FF1744",
  "#00E5FF", "#76FF03", "#FFAB00", "#D500F9",
  "#FF9100", "#00BFA5", "#536DFE", "#FF4081",
];

// ── Game modes ──
type GameMode = "spin" | "toss" | "yesno" | "truthdare" | "custom";

const MODES: { key: GameMode; label: string; icon: string }[] = [
  { key: "spin", label: "Spin", icon: "🎡" },
  { key: "toss", label: "Toss", icon: "🪙" },
  { key: "yesno", label: "Y / N", icon: "✅" },
  { key: "truthdare", label: "T / D", icon: "🔥" },
  { key: "custom", label: "Custom", icon: "✏️" },
];

const DEFAULT_SPIN_ITEMS = [
  "Pizza 🍕", "Movie 🎬", "Ice Cream 🍦", "Sleep 😴",
  "Dance 💃", "Sing 🎤", "Exercise 💪", "Read 📖",
];

const TRUTH_QUESTIONS = [
  "What's your biggest secret?",
  "Who's your crush?",
  "What's the most embarrassing thing you've done?",
  "Have you ever lied to your best friend?",
  "What's the last lie you told?",
  "What's your biggest fear?",
  "What's the craziest dream you've had?",
  "Who do you secretly admire?",
];

const DARE_CHALLENGES = [
  "Do 20 pushups right now!",
  "Sing a song loudly!",
  "Dance for 30 seconds!",
  "Call a friend and say 'I love you'",
  "Post a funny selfie!",
  "Speak in an accent for 2 minutes",
  "Do your best animal impression",
  "Let someone send a text from your phone",
];

// ── Canvas Wheel Drawing ──
const drawWheel = (
  canvas: HTMLCanvasElement,
  items: string[],
  rotation: number
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const displaySize = canvas.clientWidth;
  canvas.width = displaySize * dpr;
  canvas.height = displaySize * dpr;
  ctx.scale(dpr, dpr);

  const center = displaySize / 2;
  const radius = center - 8;
  const segments = items.length;
  const arc = (2 * Math.PI) / segments;

  ctx.clearRect(0, 0, displaySize, displaySize);

  // Shadow
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#111";
  ctx.fill();
  ctx.restore();

  for (let i = 0; i < segments; i++) {
    const angle = i * arc - Math.PI / 2;
    // Segment
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, angle, angle + arc);
    ctx.closePath();
    ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
    ctx.fill();

    // Divider
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.max(9, Math.min(14, 160 / segments))}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const label = items[i].length > 14 ? items[i].slice(0, 13) + "…" : items[i];
    ctx.fillText(label, radius - 14, 0);
    ctx.restore();
  }

  // Inner ring glow
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, 28);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.7, "#f0f0f0");
  gradient.addColorStop(1, "#e0e0e0");
  ctx.beginPath();
  ctx.arc(center, center, 24, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(center, center, 6, 0, 2 * Math.PI);
  ctx.fillStyle = WHEEL_COLORS[0];
  ctx.fill();
};

// ── Coin Component ──
const CoinFlip = ({ flipping, result }: { flipping: boolean; result: string | null }) => (
  <div className="flex flex-col items-center gap-6">
    <div
      className={`relative h-44 w-44 md:h-56 md:w-56 rounded-full shadow-2xl transition-all duration-700 ${
        flipping ? "animate-[coin-flip_1.5s_ease-in-out]" : ""
      }`}
      style={{
        background: result === "TAILS"
          ? "linear-gradient(135deg, #7B61FF, #D500F9)"
          : "linear-gradient(135deg, #FFB800, #FF6B35)",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
          {result || "?"}
        </span>
      </div>
      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
    </div>
  </div>
);

const SpinWheel = () => {
  useSEO({
    title: "Spin the Wheel — Free Decision Maker, Coin Toss & Yes/No Tool | Ravomix",
    description: "Free interactive spin wheel, coin toss, yes/no picker, truth or dare and custom random picker. Make a quick decision online — no login.",
    path: "/spin",
  });
  const [mode, setMode] = useState<GameMode>("spin");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [customItems, setCustomItems] = useState<string[]>(DEFAULT_SPIN_ITEMS);
  const [newItem, setNewItem] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastResultRef = useRef<string | null>(null);
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = mode === "spin" || mode === "custom" ? customItems : [];

  const canvasCallback = useCallback(
    (node: HTMLCanvasElement | null) => {
      (canvasRef as any).current = node;
      if (node) drawWheel(node, items, rotation);
    },
    [items.length]
  );

  // Ensure consecutive results differ
  const getUniqueRandom = (options: string[]): string => {
    if (options.length <= 1) return options[0] || "";
    let pick: string;
    let attempts = 0;
    do {
      pick = options[Math.floor(Math.random() * options.length)];
      attempts++;
    } while (pick === lastResultRef.current && attempts < 10);
    lastResultRef.current = pick;
    return pick;
  };

  // Reset everything on mode switch
  const switchMode = (newMode: GameMode) => {
    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);
    setSpinning(false);
    setResult(null);
    lastResultRef.current = null;
    setMode(newMode);
  };

  // ── Spin wheel ── (Fixed: pointer is at top, wheel rotates clockwise)
  const handleSpin = () => {
    if (spinning || items.length < 2) return;
    setSpinning(true);
    setResult(null);
    playSpinStart();
    const extraSpins = 8 * 360;
    const randomDeg = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraSpins + randomDeg;
    setRotation(totalRotation);
    spinTimerRef.current = setTimeout(() => {
      // The pointer is at the TOP (12 o'clock). The wheel is drawn with segment 0
      // starting at -PI/2 (top). CSS rotate goes clockwise.
      // After rotation, the segment under the pointer:
      const normalizedAngle = ((totalRotation % 360) + 360) % 360;
      const segmentAngle = 360 / items.length;
      // The pointer points at angle 0 (top). The wheel has been rotated by normalizedAngle clockwise.
      // So the segment at the top is the one whose original position was at -normalizedAngle.
      const idx = Math.floor(((360 - normalizedAngle % 360 + 360) % 360) / segmentAngle) % items.length;
      lastResultRef.current = items[idx];
      setResult(items[idx]);
      setSpinning(false);
      playResultReveal();
    }, 10000);
  };

  const handleToss = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    playCoinFlip();
    spinTimerRef.current = setTimeout(() => {
      const picked = getUniqueRandom(["HEADS", "TAILS"]);
      setResult(picked);
      setSpinning(false);
      playResultReveal();
    }, 1500);
  };

  const handleYesNo = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    playSuspense();
    spinTimerRef.current = setTimeout(() => {
      const picked = getUniqueRandom(["YES ✅", "NO ❌"]);
      setResult(picked);
      setSpinning(false);
      picked.includes("YES") ? playResultReveal() : playBuzz();
    }, 1200);
  };

  const handleTruthDare = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    playSuspense();
    spinTimerRef.current = setTimeout(() => {
      const isTruth = Math.random() < 0.5;
      const pool = isTruth ? TRUTH_QUESTIONS : DARE_CHALLENGES;
      let pick: string;
      let attempts = 0;
      do {
        pick = pool[Math.floor(Math.random() * pool.length)];
        attempts++;
      } while (pick === lastResultRef.current && attempts < 10);
      lastResultRef.current = pick;
      setResult(`${isTruth ? "🤔 TRUTH" : "🔥 DARE"}\n${pick}`);
      setSpinning(false);
      playResultReveal();
    }, 1200);
  };

  const handleAction = () => {
    if (mode === "spin" || mode === "custom") handleSpin();
    else if (mode === "toss") handleToss();
    else if (mode === "yesno") handleYesNo();
    else if (mode === "truthdare") handleTruthDare();
  };

  const addCustomItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed || customItems.length >= 16) return;
    setCustomItems([...customItems, trimmed]);
    setNewItem("");
  };

  const removeCustomItem = (idx: number) => {
    if (customItems.length <= 2) return;
    setCustomItems(customItems.filter((_, i) => i !== idx));
  };

  const resetItems = () => {
    setCustomItems(DEFAULT_SPIN_ITEMS);
    setResult(null);
  };

  const showWheel = mode === "spin" || mode === "custom";

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8 pb-6">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <Link to="/" className="rounded-xl bg-card p-2 shadow-sm border border-border active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-extrabold">🎡 Spin Wheel Game</h1>
        </div>

        {/* Mode Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => switchMode(m.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all active:scale-95 select-none ${
                mode === m.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={mode === m.key ? "icon-rotate inline-block" : ""}>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          {/* ── WHEEL (Spin / Custom) ── */}
          {showWheel && (
            <>
              {/* Pointer */}
              <div className="relative mb-1 z-10">
                <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary drop-shadow-lg" />
              </div>

              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                <canvas
                  ref={canvasCallback}
                  className="w-full h-full rounded-full"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? "transform 10s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                  }}
                />
              </div>
            </>
          )}

          {/* ── COIN (Toss) ── */}
          {mode === "toss" && <CoinFlip flipping={spinning} result={result} />}

          {/* ── YES/NO ── */}
          {mode === "yesno" && (
            <div className="flex flex-col items-center gap-4">
              <div className={`h-44 w-44 md:h-56 md:w-56 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 ${
                spinning ? "animate-pulse scale-110" : ""
              }`} style={{
                background: result?.includes("YES")
                  ? "linear-gradient(135deg, #00C853, #00E5FF)"
                  : result?.includes("NO")
                  ? "linear-gradient(135deg, #FF1744, #FF6B35)"
                  : "linear-gradient(135deg, #536DFE, #7B61FF)",
              }}>
                <span className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                  {result || "?"}
                </span>
              </div>
            </div>
          )}

          {/* ── TRUTH/DARE ── */}
          {mode === "truthdare" && (
            <div className="flex flex-col items-center gap-4">
              <div className={`h-44 w-44 md:h-56 md:w-56 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 ${
                spinning ? "animate-pulse scale-110" : ""
              }`} style={{
                background: result?.includes("TRUTH")
                  ? "linear-gradient(135deg, #00B4D8, #7B61FF)"
                  : result?.includes("DARE")
                  ? "linear-gradient(135deg, #FF3366, #FFAB00)"
                  : "linear-gradient(135deg, #E040FB, #FF4081)",
              }}>
                <span className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                  {result ? (result.includes("TRUTH") ? "🤔" : "🔥") : "?"}
                </span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleAction}
            disabled={spinning || (showWheel && items.length < 2)}
            className="mt-6 rounded-2xl px-10 py-3.5 text-base md:text-lg font-extrabold text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            style={{
              background: "linear-gradient(135deg, #FF3366, #FF6B35, #FFB800)",
            }}
          >
            {spinning
              ? mode === "toss" ? "Flipping..." : mode === "yesno" ? "Deciding..." : mode === "truthdare" ? "Choosing..." : "Spinning..."
              : mode === "toss" ? "FLIP!" : mode === "yesno" ? "DECIDE!" : mode === "truthdare" ? "PICK!" : "SPIN!"
            }
          </button>

          {/* Result Card */}
          <AnimatePresence>
            {result && !spinning && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 w-full max-w-sm rounded-2xl border border-border bg-card p-5 md:p-6 text-center shadow-xl"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Result</p>
                <p className="text-xl md:text-2xl font-extrabold text-foreground whitespace-pre-line leading-snug">
                  {result}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Items Editor */}
          {mode === "custom" && (
            <div className="mt-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-foreground">Custom Items ({customItems.length}/16)</p>
                <button onClick={resetItems} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
              {/* Add item */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                  placeholder="Add item..."
                  maxLength={20}
                  className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={addCustomItem}
                  disabled={!newItem.trim() || customItems.length >= 16}
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {/* Item list */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {customItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-sm"
                  >
                    <div
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ background: WHEEL_COLORS[idx % WHEEL_COLORS.length] }}
                    />
                    <span className="flex-1 truncate font-medium">{item}</span>
                    <button
                      onClick={() => removeCustomItem(idx)}
                      disabled={customItems.length <= 2}
                      className="text-muted-foreground hover:text-destructive transition disabled:opacity-30"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-6 text-xs text-muted-foreground text-center max-w-xs">
            {mode === "spin" && "Spin the wheel for fun picks! 🎡"}
            {mode === "toss" && "Flip a coin — Heads or Tails! 🪙"}
            {mode === "yesno" && "Can't decide? Let fate choose! ✅"}
            {mode === "truthdare" && "Truth or Dare — play with friends! 🔥"}
            {mode === "custom" && "Add your own items and spin! ✏️"}
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default SpinWheel;
