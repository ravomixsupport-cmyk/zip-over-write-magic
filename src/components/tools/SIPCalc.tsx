import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const SIPCalc = () => {
  const { currency } = useCurrency();
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const n = years * 12;
  const r = rate / 100 / 12;
  const futureValue = r > 0 ? monthly * (((1 + r) ** n - 1) / r) * (1 + r) : monthly * n;
  const invested = monthly * n;
  const gains = futureValue - invested;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Monthly Investment" value={monthly} onChange={setMonthly} min={100} />
      <InputField label="Expected Return (% p.a.)" value={rate} onChange={setRate} min={0} step={0.5} />
      <InputField label="Time Period (years)" value={years} onChange={setYears} min={1} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Invested" value={fmt(currency, invested)} />
        <ResultBox label="Est. Returns" value={fmt(currency, Math.round(gains))} />
      </div>
      <ResultBox label="Total Value" value={fmt(currency, Math.round(futureValue))} />
    </div>
  );
};
export default SIPCalc;
