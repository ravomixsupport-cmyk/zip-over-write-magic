import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const FuelCost = () => {
  const { currency } = useCurrency();
  const [distance, setDistance] = useState(500);
  const [mileage, setMileage] = useState(15);
  const [price, setPrice] = useState(100);

  const fuel = distance / mileage;
  const cost = fuel * price;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Distance (km)" value={distance} onChange={setDistance} min={1} />
      <InputField label="Mileage (km/L)" value={mileage} onChange={setMileage} min={0.1} step={0.1} />
      <InputField label="Fuel Price (per liter)" value={price} onChange={setPrice} min={0} step={0.1} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Fuel Needed" value={`${fuel.toFixed(1)} L`} />
        <ResultBox label="Total Cost" value={fmt(currency, cost)} />
      </div>
    </div>
  );
};
export default FuelCost;
