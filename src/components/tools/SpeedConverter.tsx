import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const speeds: Record<string, number> = { 'km/h': 1, 'mph': 1.60934, 'm/s': 3.6, 'knots': 1.852, 'ft/s': 1.09728 };

const SpeedConverter = () => {
  const [value, setValue] = useState(100);
  const [from, setFrom] = useState('km/h');
  const [to, setTo] = useState('mph');

  const result = (value * speeds[from]) / speeds[to];

  return (
    <div className="space-y-4">
      <InputField label="Value" value={value} onChange={setValue} />
      <div className="grid grid-cols-2 gap-3">
        <SelectField label="From" value={from} onChange={setFrom}>
          {Object.keys(speeds).map(u => <option key={u} value={u}>{u}</option>)}
        </SelectField>
        <SelectField label="To" value={to} onChange={setTo}>
          {Object.keys(speeds).map(u => <option key={u} value={u}>{u}</option>)}
        </SelectField>
      </div>
      <ResultBox label={`${value} ${from} =`} value={`${result.toFixed(2)} ${to}`} />
    </div>
  );
};
export default SpeedConverter;
