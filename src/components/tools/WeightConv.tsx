import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const WeightConv = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("kg");
  const units: Record<string, number> = { mg: 0.000001, g: 0.001, kg: 1, lb: 0.453592, oz: 0.0283495, ton: 1000, quintal: 100 };
  const inKg = value * (units[from] || 1);

  return (
    <div className="space-y-4">
      <InputField label="Value" value={value} onChange={setValue} min={0} step={0.01} />
      <SelectField label="From" value={from} onChange={setFrom}>
        {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
      </SelectField>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(units).filter(([u]) => u !== from).map(([u, factor]) => (
          <ResultBox key={u} label={u} value={(inKg / factor).toFixed(4)} />
        ))}
      </div>
    </div>
  );
};
export default WeightConv;
