import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const GoldCalc = () => {
  const { currency, currencyCode } = useCurrency();
  const [weight, setWeight] = useState(10);
  const [purity, setPurity] = useState(22);
  const [pricePerGram, setPricePerGram] = useState(currencyCode === 'INR' ? 6500 : 75);
  const pureWeight = weight * (purity / 24);
  const totalValue = pureWeight * pricePerGram;
  const makingCharge = totalValue * 0.08;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Weight (grams)" value={weight} onChange={setWeight} min={0} step={0.01} />
      <InputField label="Purity (Karat)" value={purity} onChange={setPurity} min={1} max={24} />
      <InputField label={`Gold Price per gram (${currency})`} value={pricePerGram} onChange={setPricePerGram} min={0} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Pure Gold (g)" value={pureWeight.toFixed(2)} />
        <ResultBox label="Gold Value" value={fmt(currency, totalValue)} />
        <ResultBox label="Making (~8%)" value={fmt(currency, makingCharge)} />
        <ResultBox label="Total" value={fmt(currency, totalValue + makingCharge)} />
      </div>
    </div>
  );
};
export default GoldCalc;
