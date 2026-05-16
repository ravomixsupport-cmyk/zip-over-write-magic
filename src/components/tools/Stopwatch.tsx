import { useState, useRef, useEffect } from "react";
import { useAppLang } from "@/contexts/AppLanguageContext";

const Stopwatch = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setMs(p => p + 10), 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const fmt = (t: number) => {
    const m = Math.floor(t / 60000);
    const s = Math.floor((t % 60000) / 1000);
    const ms = Math.floor((t % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const reset = () => { setMs(0); setRunning(false); setLaps([]); };
  const lap = () => setLaps(prev => [ms, ...prev]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
        <p className="text-4xl font-mono font-extrabold text-primary tracking-wider">{fmt(ms)}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setRunning(!running)} className={`flex-1 rounded-xl py-3 text-sm font-semibold active:scale-[0.98] ${running ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}>
          {running ? (hi ? '⏸ रुकें' : '⏸ Pause') : (hi ? '▶ शुरू' : '▶ Start')}
        </button>
        <button onClick={lap} disabled={!running} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold active:scale-[0.98] disabled:opacity-40">{hi ? 'लैप' : 'Lap'}</button>
        <button onClick={reset} className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold active:scale-[0.98]">{hi ? 'रीसेट' : 'Reset'}</button>
      </div>
      {laps.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-3 space-y-1">
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{hi ? 'लैप' : 'Lap'} {laps.length - i}</span>
              <span className="font-mono font-semibold">{fmt(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Stopwatch;
