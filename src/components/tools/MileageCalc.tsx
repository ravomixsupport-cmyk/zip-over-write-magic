import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const MileageCalc = () => {
  const { currency } = useCurrency();
  const [distance, setDistance] = useState(500);
  const [fuel, setFuel] = useState(30);
  const [fuelPrice, setFuelPrice] = useState(105);
  const mileage = fuel > 0 ? distance / fuel : 0;
  const costPerKm = mileage > 0 ? fuelPrice / mileage : 0;
  const totalCost = fuel * fuelPrice;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Distance (km)" value={distance} onChange={setDistance} min={0} />
      <InputField label="Fuel Used (litres)" value={fuel} onChange={setFuel} min={0.1} step={0.1} />
      <InputField label={`Fuel Price (${currency}/litre)`} value={fuelPrice} onChange={setFuelPrice} min={0} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Mileage" value={`${mileage.toFixed(1)} km/l`} />
        <ResultBox label="Cost/km" value={fmt(currency, costPerKm, 1)} />
      </div>
      <ResultBox label="Total Fuel Cost" value={fmt(currency, totalCost)} />
    </div>
  );
};
export default MileageCalc;
