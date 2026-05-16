import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";

const NumberBase = () => {
  const [value, setValue] = useState('255');
  const [base, setBase] = useState('10');

  const num = parseInt(value, +base);
  const valid = !isNaN(num);

  return (
    <div className="space-y-4">
      <InputField label="Number" value={value} onChange={setValue} type="text" />
      <SelectField label="Input Base" value={base} onChange={setBase}>
        <option value="2">Binary (2)</option>
        <option value="8">Octal (8)</option>
        <option value="10">Decimal (10)</option>
        <option value="16">Hexadecimal (16)</option>
      </SelectField>
      {valid ? (
        <div className="grid grid-cols-2 gap-3">
          <ResultBox label="Binary" value={num.toString(2)} />
          <ResultBox label="Octal" value={num.toString(8)} />
          <ResultBox label="Decimal" value={num.toString(10)} />
          <ResultBox label="Hex" value={num.toString(16).toUpperCase()} />
        </div>
      ) : (
        <p className="text-center text-sm text-destructive">Invalid number for base {base}</p>
      )}
    </div>
  );
};
export default NumberBase;
