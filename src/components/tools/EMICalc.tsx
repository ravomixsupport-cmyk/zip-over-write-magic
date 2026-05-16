import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const EMICalc = () => {
  const { currency } = useCurrency();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(12);
  const r = rate / 12 / 100;
  const emi = r > 0 ? (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : principal / months;
  return (
    <div className="space-y-3">
      <CurrencySelector />
      <InputField label="Loan Amount" value={principal} onChange={setPrincipal} />
      <InputField label="Interest Rate (% p.a.)" value={rate} onChange={setRate} step="0.1" />
      <InputField label="Tenure (months)" value={months} onChange={setMonths} />
      <ResultBox label="Monthly EMI" value={fmt(currency, emi)} />
      <ResultBox label="Total Payment" value={fmt(currency, emi * months)} />
    </div>
  );
};

export default EMICalc;
