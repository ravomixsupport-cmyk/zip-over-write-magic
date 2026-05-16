import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import CurrencySelector from "./CurrencySelector";

const RentSplit = () => {
  const { currency } = useCurrency();
  const [rent, setRent] = useState(15000);
  const [people, setPeople] = useState(3);
  const [electricity, setElectricity] = useState(2000);
  const [water, setWater] = useState(500);
  const total = rent + electricity + water;
  const perPerson = people > 0 ? total / people : 0;

  return (
    <div className="space-y-4">
      <CurrencySelector />
      <InputField label={`Monthly Rent (${currency})`} value={rent} onChange={setRent} min={0} />
      <InputField label={`Electricity Bill (${currency})`} value={electricity} onChange={setElectricity} min={0} />
      <InputField label={`Water Bill (${currency})`} value={water} onChange={setWater} min={0} />
      <InputField label="Number of People" value={people} onChange={setPeople} min={1} />
      <div className="grid grid-cols-2 gap-3">
        <ResultBox label="Total" value={fmt(currency, total)} />
        <ResultBox label="Per Person" value={fmt(currency, perPerson)} />
      </div>
    </div>
  );
};
export default RentSplit;
