import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const CSSUnitConv = () => {
  const [px, setPx] = useState(16);
  const [baseFontSize, setBaseFontSize] = useState(16);
  const rem = px / baseFontSize;
  const em = rem;
  const pt = px * 0.75;
  const vw = (px / 1920) * 100;

  return (
    <div className="space-y-4">
      <InputField label="Pixels (px)" value={px} onChange={setPx} min={0} step={0.5} />
      <InputField label="Base Font Size (px)" value={baseFontSize} onChange={setBaseFontSize} min={1} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="rem" value={rem.toFixed(4)} />
        <ResultBox label="em" value={em.toFixed(4)} />
        <ResultBox label="pt" value={pt.toFixed(2)} />
        <ResultBox label="vw (1920px)" value={`${vw.toFixed(3)}vw`} />
      </div>
    </div>
  );
};
export default CSSUnitConv;
