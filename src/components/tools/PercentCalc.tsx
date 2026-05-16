import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const PercentCalc = () => {
  const [val, setVal] = useState(0);
  const [total, setTotal] = useState(0);
  return (
    <div className="space-y-3">
      <InputField label="Value" value={val} onChange={setVal} />
      <InputField label="Total" value={total} onChange={setTotal} />
      <ResultBox label="Percentage" value={total > 0 ? `${((val / total) * 100).toFixed(2)}%` : '0%'} />
    </div>
  );
};

export default PercentCalc;
