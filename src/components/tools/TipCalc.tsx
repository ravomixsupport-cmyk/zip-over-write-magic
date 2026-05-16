import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const TipCalc = () => {
  const { currency } = useCurrency();
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);
  const tipAmt = (bill * tip) / 100;
  const perPerson = people > 0 ? (bill + tipAmt) / people : 0;
  return (
    <div className="space-y-3">
      <CurrencySelector />
      <InputField label="Bill Amount" value={bill} onChange={setBill} />
      <InputField label="Tip (%)" value={tip} onChange={setTip} />
      <InputField label="Split Between" value={people} onChange={setPeople} min={1} />
      <ResultBox label="Tip Amount" value={fmt(currency, tipAmt, 2)} />
      <ResultBox label="Per Person" value={fmt(currency, perPerson, 2)} />
    </div>
  );
};

export default TipCalc;
