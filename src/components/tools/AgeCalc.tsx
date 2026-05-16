import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const AgeCalc = () => {
  const [dob, setDob] = useState('');
  const calcAge = () => {
    if (!dob) return { years: 0, months: 0, days: 0 };
    const b = new Date(dob);
    const now = new Date();
    let y = now.getFullYear() - b.getFullYear();
    let m = now.getMonth() - b.getMonth();
    let d = now.getDate() - b.getDate();
    if (d < 0) { m--; d += 30; }
    if (m < 0) { y--; m += 12; }
    return { years: y, months: m, days: d };
  };
  const age = calcAge();
  return (
    <div className="space-y-3">
      <InputField label="Date of Birth" value={dob} onChange={setDob} type="date" />
      {dob && <ResultBox label="Your Age" value={`${age.years}y ${age.months}m ${age.days}d`} />}
    </div>
  );
};

export default AgeCalc;
