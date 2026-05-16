import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const ElectricityBill = () => {
  const { currency } = useCurrency();
  const [units, setUnits] = useState(250);
  const [rate, setRate] = useState(7.5);
  const [fixedCharge, setFixedCharge] = useState(100);
  const energyCharge = units * rate;
  const total = energyCharge + fixedCharge;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label="Units Consumed (kWh)" value={units} onChange={setUnits} min={0} />
      <InputField label={`Rate per Unit (${currency})`} value={rate} onChange={setRate} min={0} step={0.1} />
      <InputField label={`Fixed Charge (${currency})`} value={fixedCharge} onChange={setFixedCharge} min={0} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Energy Charge" value={fmt(currency, energyCharge, 2)} />
        <ResultBox label="Total Bill" value={fmt(currency, total, 2)} />
      </div>
    </div>
  );
};
export default ElectricityBill;
