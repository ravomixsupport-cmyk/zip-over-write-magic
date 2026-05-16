import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const TimeConverter = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("hours");
  const units: Record<string, number> = { seconds: 1, minutes: 60, hours: 3600, days: 86400, weeks: 604800, months: 2592000, years: 31536000 };
  const inSec = value * (units[from] || 1);

  return (
    <div className="space-y-4">
      <InputField label="Value" value={value} onChange={setValue} min={0} step={0.01} />
      <SelectField label="From" value={from} onChange={setFrom}>
        {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
      </SelectField>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(units).filter(([u]) => u !== from).map(([u, factor]) => (
          <ResultBox key={u} label={u} value={(inSec / factor).toFixed(3)} />
        ))}
      </div>
    </div>
  );
};
export default TimeConverter;
