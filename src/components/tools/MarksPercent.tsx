import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const MarksPercent = () => {
  const [obtained, setObtained] = useState(450);
  const [total, setTotal] = useState(500);
  const pct = total > 0 ? (obtained / total) * 100 : 0;
  const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B+" : pct >= 60 ? "B" : pct >= 50 ? "C" : pct >= 40 ? "D" : "F";

  return (
    <div className="space-y-4">
      <InputField label="Marks Obtained" value={obtained} onChange={setObtained} min={0} />
      <InputField label="Total Marks" value={total} onChange={setTotal} min={1} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Percentage" value={`${pct.toFixed(2)}%`} />
        <ResultBox label="Grade" value={grade} />
      </div>
    </div>
  );
};
export default MarksPercent;
