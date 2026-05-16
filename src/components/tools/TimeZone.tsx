import { useState } from "react";
import { SelectField } from "./ToolShared";

const zones: Record<string, number> = {
  'UTC': 0, 'IST (India)': 5.5, 'EST (US)': -5, 'CST (US)': -6, 'PST (US)': -8,
  'GMT (UK)': 0, 'CET (Europe)': 1, 'JST (Japan)': 9, 'AEST (Australia)': 10,
  'CST (China)': 8, 'AST (Arabia)': 3, 'SGT (Singapore)': 8,
};

const TimeZone = () => {
  const [from, setFrom] = useState('IST (India)');
  const [to, setTo] = useState('EST (US)');
  const [time, setTime] = useState('12:00');

  const [h, m] = time.split(':').map(Number);
  const utcMinutes = h * 60 + m - zones[from] * 60;
  const targetMinutes = ((utcMinutes + zones[to] * 60) % 1440 + 1440) % 1440;
  const th = Math.floor(targetMinutes / 60);
  const tm = Math.round(targetMinutes % 60);
  const result = `${th.toString().padStart(2, '0')}:${tm.toString().padStart(2, '0')}`;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary" />
      </div>
      <SelectField label="From" value={from} onChange={setFrom}>
        {Object.keys(zones).map(z => <option key={z} value={z}>{z}</option>)}
      </SelectField>
      <SelectField label="To" value={to} onChange={setTo}>
        {Object.keys(zones).map(z => <option key={z} value={z}>{z}</option>)}
      </SelectField>
      <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-center">
        <p className="text-xs font-medium text-muted-foreground mb-1">{to}</p>
        <p className="text-3xl font-extrabold text-primary tracking-tight">{result}</p>
      </div>
    </div>
  );
};
export default TimeZone;
