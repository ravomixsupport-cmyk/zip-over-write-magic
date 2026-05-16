import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const SalaryCalc = () => {
  const { currency } = useCurrency();
  const [monthly, setMonthly] = useState(50000);
  const yearly = monthly * 12;
  const daily = monthly / 30;
  const hourly = daily / 8;
  const weekly = daily * 7;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label={`Monthly Salary (${currency})`} value={monthly} onChange={setMonthly} min={0} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Yearly" value={fmt(currency, yearly)} />
        <ResultBox label="Weekly" value={fmt(currency, weekly)} />
        <ResultBox label="Daily" value={fmt(currency, daily)} />
        <ResultBox label="Hourly" value={fmt(currency, hourly)} />
      </div>
    </div>
  );
};
export default SalaryCalc;
