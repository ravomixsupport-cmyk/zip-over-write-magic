import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const LoanCalc = () => {
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);
  const totalInterest = (amount * rate * years) / 100;
  return (
    <div className="space-y-3">
      <CurrencySelector />
      <InputField label="Loan Amount" value={amount} onChange={setAmount} />
      <InputField label="Interest Rate (%)" value={rate} onChange={setRate} step="0.1" />
      <InputField label="Years" value={years} onChange={setYears} />
      <ResultBox label="Total Interest" value={fmt(currency, totalInterest)} />
      <ResultBox label="Total Repayment" value={fmt(currency, amount + totalInterest)} />
    </div>
  );
};

export default LoanCalc;
