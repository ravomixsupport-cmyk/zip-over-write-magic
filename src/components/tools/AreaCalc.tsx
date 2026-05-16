import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const AreaCalc = () => {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(5);
  const area = length * width;
  const perimeter = 2 * (length + width);

  return (
    <div className="space-y-4">
      <InputField label="Length" value={length} onChange={setLength} min={0} />
      <InputField label="Width" value={width} onChange={setWidth} min={0} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Area" value={`${area.toFixed(2)}`} />
        <ResultBox label="Perimeter" value={`${perimeter.toFixed(2)}`} />
      </div>
    </div>
  );
};
export default AreaCalc;
