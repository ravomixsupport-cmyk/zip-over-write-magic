import { useRef, useState, useEffect, useCallback } from "react";
import { Trash2, PenTool, Save, Check } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";

interface SignaturePadProps {
  value?: string;
  onChange: (dataUrl: string) => void;
}

const SignaturePad = ({ value, onChange }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const { t } = useAppLang();

  const setupCtx = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
  }, []);

  const getPos = useCallback((e: TouchEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    if ("clientX" in e) {
      return {
        x: ((e as MouseEvent).clientX - rect.left) * scaleX,
        y: ((e as MouseEvent).clientY - rect.top) * scaleY,
      };
    }
    return { x: 0, y: 0 };
  }, []);

  const drawSmoothLine = useCallback((ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) => {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    if (points.length === 2) {
      ctx.lineTo(points[1].x, points[1].y);
    } else {
      for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      const last = points[points.length - 1];
      ctx.lineTo(last.x, last.y);
    }
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupCtx(ctx);
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setHasDrawn(true);
        setSaved(true);
      };
      img.src = value;
    }
  }, [value, setupCtx]);

  useEffect(() => {
    if (!isDrawMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupCtx(ctx);
    if (!value && !hasDrawn) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const startDraw = (e: TouchEvent | MouseEvent) => {
      e.preventDefault();
      drawingRef.current = true;
      const pos = getPos(e);
      lastPointRef.current = pos;
      pointsRef.current = [pos];
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + 0.5, pos.y + 0.5);
      ctx.stroke();
    };

    const moveDraw = (e: TouchEvent | MouseEvent) => {
      if (!drawingRef.current) return;
      e.preventDefault();
      const pos = getPos(e);
      pointsRef.current.push(pos);
      const pts = pointsRef.current;
      if (pts.length >= 3) {
        const p0 = pts[pts.length - 3];
        const p1 = pts[pts.length - 2];
        const p2 = pts[pts.length - 1];
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        ctx.stroke();
      } else {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
      lastPointRef.current = pos;
      if (!hasDrawn) setHasDrawn(true);
      setSaved(false);
    };

    const endDraw = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      lastPointRef.current = null;
      pointsRef.current = [];
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", moveDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", moveDraw, { passive: false });
    canvas.addEventListener("touchend", endDraw);
    canvas.addEventListener("touchcancel", endDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", moveDraw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mouseleave", endDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", moveDraw);
      canvas.removeEventListener("touchend", endDraw);
      canvas.removeEventListener("touchcancel", endDraw);
    };
  }, [isDrawMode, getPos, setupCtx, hasDrawn, value]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;
      const exportCtx = exportCanvas.getContext("2d");
      if (exportCtx) {
        exportCtx.fillStyle = "#ffffff";
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
        exportCtx.drawImage(canvas, 0, 0);
        onChange(exportCanvas.toDataURL("image/png"));
      } else {
        onChange(canvas.toDataURL("image/png"));
      }
      setSaved(true);
      setIsDrawMode(false);
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setupCtx(ctx);
    }
    setHasDrawn(false);
    setSaved(false);
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="mb-1 block text-xs font-semibold text-muted-foreground">
        ✍️ {t('sig.label')}
      </label>

      {!isDrawMode && saved && value ? (
        <div className="space-y-2">
          <div className="relative rounded-xl border-2 border-green-300 bg-white overflow-hidden p-2">
            <img src={value} alt="Saved Signature" className="h-[100px] w-full object-contain" />
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5">
              <Check className="h-3 w-3 text-green-600" />
              <span className="text-[10px] font-semibold text-green-700">{t('sig.saved')}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { clear(); setIsDrawMode(true); }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2.5 text-xs font-semibold text-foreground active:scale-[0.98]"
            >
              <PenTool className="h-3.5 w-3.5" /> {t('sig.redraw')}
            </button>
            <button
              onClick={clear}
              className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold text-destructive active:scale-[0.98]"
            >
              <Trash2 className="h-3.5 w-3.5" /> {t('sig.remove')}
            </button>
          </div>
        </div>
      ) : !isDrawMode ? (
        <button
          onClick={() => setIsDrawMode(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card py-8 text-sm font-semibold text-muted-foreground transition-all active:scale-[0.98] hover:border-primary hover:text-primary"
        >
          <PenTool className="h-4 w-4" />
          {t('sig.draw')}
        </button>
      ) : (
        <>
          <div className="relative rounded-xl border-2 border-primary/40 bg-white overflow-hidden">
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="w-full cursor-crosshair"
              style={{ height: 140, touchAction: "none" }}
            />
            {!hasDrawn && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p className="text-xs text-muted-foreground/40 select-none">{t('sig.drawHere')}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {hasDrawn && !saved && (
              <button
                onClick={handleSave}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground active:scale-[0.98] transition-all"
              >
                <Save className="h-3.5 w-3.5" /> {t('sig.save')}
              </button>
            )}
            {hasDrawn && (
              <button
                onClick={clear}
                className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold text-destructive active:scale-[0.98]"
              >
                <Trash2 className="h-3.5 w-3.5" /> {t('sig.clear')}
              </button>
            )}
            {!hasDrawn && (
              <button
                onClick={() => setIsDrawMode(false)}
                className="flex flex-1 items-center justify-center rounded-xl border border-border bg-card py-2.5 text-xs font-semibold text-muted-foreground active:scale-[0.98]"
              >
                {t('sig.cancel')}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SignaturePad;
