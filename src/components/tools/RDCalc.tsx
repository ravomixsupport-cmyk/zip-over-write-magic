import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const RDCalc = () => {
  const { currency } = useCurrency();
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7);
  const [months, setMonths] = useState(60);
  let maturity = 0;
  for (let i = 0; i < months; i++) {
    maturity = (maturity + monthly) * (1 + rate / 100 / 12);
  }
  const invested = monthly * months;
  const interest = maturity - invested;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label={`Monthly Deposit (${currency})`} value={monthly} onChange={setMonthly} min={100} />
      <InputField label="Interest Rate (%)" value={rate} onChange={setRate} min={0} step={0.1} />
      <InputField label="Duration (Months)" value={months} onChange={setMonths} min={6} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Invested" value={fmt(currency, invested)} />
        <ResultBox label="Interest" value={fmt(currency, interest)} />
      </div>
      <ResultBox label="Maturity Value" value={fmt(currency, maturity)} />
    </div>
  );
};
export default RDCalc;
