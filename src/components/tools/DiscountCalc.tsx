import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const DiscountCalc = () => {
  const { currency } = useCurrency();
  const [price, setPrice] = useState(0);
  const [disc, setDisc] = useState(0);
  const saved = (price * disc) / 100;
  return (
    <div className="space-y-3">
      <CurrencySelector />
      <InputField label="Original Price" value={price} onChange={setPrice} />
      <InputField label="Discount (%)" value={disc} onChange={setDisc} />
      <ResultBox label="You Save" value={fmt(currency, saved, 2)} />
      <ResultBox label="Final Price" value={fmt(currency, price - saved, 2)} />
    </div>
  );
};

export default DiscountCalc;
