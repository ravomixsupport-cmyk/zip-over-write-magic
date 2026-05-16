import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";
import { CURRENCIES } from "@/data/tools";
import { useAppLang } from "@/contexts/AppLanguageContext";

const CurrencyConv = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState(hi ? 'INR' : 'USD');
  const [to, setTo] = useState(hi ? 'USD' : 'INR');
  const result = (amount / CURRENCIES[from].rate) * CURRENCIES[to].rate;
  return (
    <div className="space-y-3">
      <InputField label="Amount" value={amount} onChange={setAmount} />
      <div className="grid grid-cols-2 gap-2">
        <SelectField label="From" value={from} onChange={setFrom}>
          {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
        </SelectField>
        <SelectField label="To" value={to} onChange={setTo}>
          {Object.keys(CURRENCIES).map(c => <option key={c} value={c}>{c}</option>)}
        </SelectField>
      </div>
      <ResultBox label={`${CURRENCIES[to].symbol} ${to}`} value={result.toFixed(2)} />
      <p className="text-center text-xs text-muted-foreground">Offline approximation rates</p>
    </div>
  );
};

export default CurrencyConv;
