import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const SquareRoot = () => {
  const [number, setNumber] = useState(144);
  const [power, setPower] = useState(2);

  const sqrt = Math.sqrt(number);
  const cbrt = Math.cbrt(number);
  const powered = Math.pow(number, power);

  return (
    <div className="space-y-4">
      <InputField label="Number" value={number} onChange={setNumber} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Square Root (√)" value={sqrt.toFixed(4)} />
        <ResultBox label="Cube Root (∛)" value={cbrt.toFixed(4)} />
      </div>
      <InputField label="Power (n)" value={power} onChange={setPower} min={0} step={0.1} />
      <ResultBox label={`${number}^${power}`} value={powered.toLocaleString(undefined, { maximumFractionDigits: 4 })} />
    </div>
  );
};
export default SquareRoot;
