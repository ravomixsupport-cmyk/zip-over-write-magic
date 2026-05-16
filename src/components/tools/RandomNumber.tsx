import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";

const RandomNumber = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const nums = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    setResults(nums);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Min" value={min} onChange={setMin} />
        <InputField label="Max" value={max} onChange={setMax} />
      </div>
      <InputField label="Count" value={count} onChange={setCount} min={1} max={50} />
      <button onClick={generate} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98]">🎲 Generate</button>
      {results.length > 0 && (
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-center">
          <p className="text-2xl font-extrabold text-primary tracking-tight">{results.join(', ')}</p>
        </div>
      )}
    </div>
  );
};
export default RandomNumber;
