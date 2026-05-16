import { useState } from "react";
import { InputField, ResultBox, SelectField } from "./ToolShared";
import { useAppLang } from "@/contexts/AppLanguageContext";

const BMICalc = () => {
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const bmi = unit === 'metric'
    ? weight / ((height / 100) ** 2)
    : (weight * 703) / (height ** 2);

  const categoryMap: Record<string, [string, string]> = {
    under: ['Underweight', 'कम वज़न'],
    normal: ['Normal', 'सामान्य'],
    over: ['Overweight', 'अधिक वज़न'],
    obese: ['Obese', 'मोटापा'],
  };
  const key = bmi < 18.5 ? 'under' : bmi < 25 ? 'normal' : bmi < 30 ? 'over' : 'obese';
  const category = hi ? categoryMap[key][1] : categoryMap[key][0];
  const color = bmi < 18.5 ? '🔵' : bmi < 25 ? '🟢' : bmi < 30 ? '🟡' : '🔴';

  return (
    <div className="space-y-4">
      <SelectField label="Unit System" value={unit} onChange={setUnit}>
        <option value="metric">{hi ? 'मेट्रिक (किग्रा/सेमी)' : 'Metric (kg/cm)'}</option>
        <option value="imperial">{hi ? 'इम्पीरियल (पाउंड/इंच)' : 'Imperial (lbs/in)'}</option>
      </SelectField>
      <InputField label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'} value={weight} onChange={setWeight} min={1} />
      <InputField label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'} value={height} onChange={setHeight} min={1} />
      <ResultBox label="Your BMI" value={`${bmi.toFixed(1)}`} />
      <div className="text-center text-sm font-semibold">{color} {category}</div>
    </div>
  );
};
export default BMICalc;
