import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import { useAppLang } from "@/contexts/AppLanguageContext";
import CurrencySelector from "./CurrencySelector";

const ProfitLoss = () => {
  const { currency } = useCurrency();
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [cost, setCost] = useState(1000);
  const [selling, setSelling] = useState(1200);

  const diff = selling - cost;
  const percentage = cost > 0 ? (diff / cost) * 100 : 0;
  const isProfit = diff >= 0;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Cost Price" value={cost} onChange={setCost} min={0} />
      <InputField label="Selling Price" value={selling} onChange={setSelling} min={0} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label={isProfit ? 'Profit' : 'Loss'} value={fmt(currency, Math.abs(diff))} />
        <ResultBox label="Percentage" value={`${Math.abs(percentage).toFixed(1)}%`} />
      </div>
      <div className="text-center text-sm font-bold">
        {isProfit ? (hi ? '📈 लाभ' : '📈 Profit') : (hi ? '📉 हानि' : '📉 Loss')}
      </div>
    </div>
  );
};
export default ProfitLoss;
