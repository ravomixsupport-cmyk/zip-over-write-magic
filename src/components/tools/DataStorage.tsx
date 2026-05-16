import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const units: Record<string, number> = { 'Bytes': 1, 'KB': 1024, 'MB': 1024**2, 'GB': 1024**3, 'TB': 1024**4, 'PB': 1024**5 };

const DataStorage = () => {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState('GB');
  const [to, setTo] = useState('MB');

  const result = (value * units[from]) / units[to];

  return (
    <div className="space-y-4">
      <InputField label="Value" value={value} onChange={setValue} min={0} step={0.01} />
      <div className="grid grid-cols-2 gap-3">
        <SelectField label="From" value={from} onChange={setFrom}>
          {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
        </SelectField>
        <SelectField label="To" value={to} onChange={setTo}>
          {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
        </SelectField>
      </div>
      <ResultBox label={`${value} ${from} =`} value={`${result.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${to}`} />
    </div>
  );
};
export default DataStorage;
