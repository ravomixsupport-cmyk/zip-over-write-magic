import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const TemperatureConv = () => {
  const [value, setValue] = useState(100);
  const [from, setFrom] = useState('C');

  const convert = (v: number, f: string): Record<string, number> => {
    let c: number;
    if (f === 'C') c = v;
    else if (f === 'F') c = (v - 32) * 5 / 9;
    else c = v - 273.15;
    return { C: c, F: c * 9 / 5 + 32, K: c + 273.15 };
  };

  const results = convert(value, from);
  const units = ['C', 'F', 'K'];

  return (
    <div className="space-y-4">
      <InputField label="Temperature" value={value} onChange={setValue} />
      <SelectField label="From" value={from} onChange={setFrom}>
        {units.map(u => <option key={u} value={u}>°{u === 'K' ? 'K (Kelvin)' : u === 'C' ? 'C (Celsius)' : 'F (Fahrenheit)'}</option>)}
      </SelectField>
      <div className="grid grid-cols-3 gap-2">
        {units.map(u => <ResultBox key={u} label={`°${u}`} value={results[u].toFixed(1)} />)}
      </div>
    </div>
  );
};
export default TemperatureConv;
