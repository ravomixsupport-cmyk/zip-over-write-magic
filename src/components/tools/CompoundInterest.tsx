import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const CompoundInterest = () => {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const [n, setN] = useState(12);

  const amount = principal * Math.pow(1 + rate / 100 / n, n * years);
  const interest = amount - principal;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Principal Amount" value={principal} onChange={setPrincipal} min={1} />
      <InputField label="Annual Rate (%)" value={rate} onChange={setRate} min={0} step={0.1} />
      <InputField label="Time (years)" value={years} onChange={setYears} min={1} />
      <InputField label="Compounds per Year" value={n} onChange={setN} min={1} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Interest" value={fmt(currency, Math.round(interest))} />
        <ResultBox label="Total Amount" value={fmt(currency, Math.round(amount))} />
      </div>
    </div>
  );
};
export default CompoundInterest;
