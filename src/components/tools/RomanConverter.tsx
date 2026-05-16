import { useState } from "react";
import { ResultBox } from "./ToolShared";

const RomanConverter = () => {
  const [num, setNum] = useState(2024);

  const toRoman = (n: number) => {
    if (n < 1 || n > 3999) return "Out of range (1-3999)";
    const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";
    for (let i = 0; i < vals.length; i++) {
      while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
    }
    return result;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Number (1-3999)</label>
        <input type="number" value={num} onChange={e => setNum(+e.target.value)} min={1} max={3999}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>
      <ResultBox label="Roman Numeral" value={toRoman(num)} />
    </div>
  );
};
export default RomanConverter;
