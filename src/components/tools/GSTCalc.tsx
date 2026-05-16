import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import { useAppLang } from "@/contexts/AppLanguageContext";
import CurrencySelector from "./CurrencySelector";

const GSTCalc = () => {
  const { currency } = useCurrency();
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(18);
  const tax = (amount * rate) / 100;

  const rates = hi ? [5, 12, 18, 28] : [5, 10, 15, 18, 20, 25];
  const taxLabel = hi ? 'GST' : 'Tax/VAT';

  return (
    <div className="space-y-3">
      <CurrencySelector />
      <InputField label="Amount" value={amount} onChange={setAmount} />
      <SelectField label={hi ? 'GST Rate' : 'Tax Rate'} value={rate} onChange={(v: string) => setRate(+v)}>
        {rates.map(r => <option key={r} value={r}>{r}%</option>)}
      </SelectField>
      <ResultBox label={`${taxLabel} Amount`} value={fmt(currency, tax, 2)} />
      <ResultBox label={hi ? 'Total (incl. GST)' : `Total (incl. ${taxLabel})`} value={fmt(currency, amount + tax, 2)} />
    </div>
  );
};

export default GSTCalc;
