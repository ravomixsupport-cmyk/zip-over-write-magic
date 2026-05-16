import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const LengthConv = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("m");
  const units: Record<string, number> = { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.34 };
  const inM = value * (units[from] || 1);

  return (
    <div className="space-y-4">
      <InputField label="Value" value={value} onChange={setValue} min={0} step={0.01} />
      <SelectField label="From" value={from} onChange={setFrom}>
        {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
      </SelectField>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(units).filter(([u]) => u !== from).map(([u, factor]) => (
          <ResultBox key={u} label={u} value={(inM / factor).toFixed(4)} />
        ))}
      </div>
    </div>
  );
};
export default LengthConv;
