import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const AverageCalc = () => {
  const [numbers, setNumbers] = useState("10, 20, 30, 40, 50");
  const nums = numbers.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = nums.length ? sum / nums.length : 0;
  const min = nums.length ? Math.min(...nums) : 0;
  const max = nums.length ? Math.max(...nums) : 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Numbers (comma separated)</label>
        <input type="text" value={numbers} onChange={e => setNumbers(e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Average" value={avg.toFixed(2)} />
        <ResultBox label="Sum" value={sum.toFixed(2)} />
        <ResultBox label="Min" value={min.toString()} />
        <ResultBox label="Max" value={max.toString()} />
      </div>
      <p className="text-xs text-muted-foreground text-center">{nums.length} numbers</p>
    </div>
  );
};
export default AverageCalc;
