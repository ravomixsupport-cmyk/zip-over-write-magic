import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const FDCalc = () => {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5);
  const maturity = principal * Math.pow(1 + rate / 400, years * 4);
  const interest = maturity - principal;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label={`Principal Amount (${currency})`} value={principal} onChange={setPrincipal} min={0} />
      <InputField label="Interest Rate (%)" value={rate} onChange={setRate} min={0} step={0.1} />
      <InputField label="Tenure (Years)" value={years} onChange={setYears} min={0.25} step={0.25} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Maturity Amount" value={fmt(currency, maturity)} />
        <ResultBox label="Interest Earned" value={fmt(currency, interest)} />
      </div>
    </div>
  );
};
export default FDCalc;
