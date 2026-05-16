import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const conversions: Record<string, { label: string; factor: number; from: string; to: string }> = {
  'km-mi': { label: 'KM → Miles', factor: 0.621371, from: 'km', to: 'mi' },
  'kg-lb': { label: 'KG → Pounds', factor: 2.20462, from: 'kg', to: 'lb' },
  'c-f': { label: '°C → °F', factor: 0, from: '°C', to: '°F' },
  'm-ft': { label: 'Meters → Feet', factor: 3.28084, from: 'm', to: 'ft' },
  'l-gal': { label: 'Liters → Gallons', factor: 0.264172, from: 'L', to: 'gal' },
};

const UnitConverter = () => {
  const [val, setVal] = useState(0);
  const [type, setType] = useState('km-mi');
  const conv = conversions[type];
  const result = type === 'c-f' ? (val * 9 / 5) + 32 : val * conv.factor;
  return (
    <div className="space-y-3">
      <SelectField label="Conversion" value={type} onChange={setType}>
        {Object.entries(conversions).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
      </SelectField>
      <InputField label={`Value (${conv.from})`} value={val} onChange={setVal} step="0.01" />
      <ResultBox label={`Result (${conv.to})`} value={result.toFixed(2)} />
    </div>
  );
};

export default UnitConverter;
