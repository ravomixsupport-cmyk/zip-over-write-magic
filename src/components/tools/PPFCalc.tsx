import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const PPFCalc = () => {
  const { currency } = useCurrency();
  const [yearly, setYearly] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  let total = 0;
  for (let i = 0; i < years; i++) {
    total = (total + yearly) * (1 + rate / 100);
  }
  const invested = yearly * years;
  const interest = total - invested;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label={`Yearly Investment (${currency})`} value={yearly} onChange={setYearly} min={500} max={150000} />
      <InputField label="Interest Rate (%)" value={rate} onChange={setRate} min={0} step={0.1} />
      <InputField label="Duration (Years)" value={years} onChange={setYears} min={15} max={50} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Invested" value={fmt(currency, invested)} />
        <ResultBox label="Interest" value={fmt(currency, interest)} />
      </div>
      <ResultBox label="Maturity Value" value={fmt(currency, total)} />
    </div>
  );
};
export default PPFCalc;
