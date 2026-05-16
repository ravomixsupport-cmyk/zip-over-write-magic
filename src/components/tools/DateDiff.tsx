import { useState } from "react";
import { ResultBox } from "./ToolShared";

const DateDiff = () => {
  const today = new Date().toISOString().split('T')[0];
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  const d1 = new Date(from);
  const d2 = new Date(to);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = (days / 7).toFixed(1);
  const months = (days / 30.44).toFixed(1);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">From Date</label>
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">To Date</label>
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <ResultBox label="Days" value={days.toString()} />
        <ResultBox label="Weeks" value={weeks} />
        <ResultBox label="Months" value={months} />
      </div>
    </div>
  );
};
export default DateDiff;
