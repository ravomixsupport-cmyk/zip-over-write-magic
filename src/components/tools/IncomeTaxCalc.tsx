import { useState } from "react";
import { InputField, ResultBox } from "./ToolShared";
import { useCurrency, fmt } from "@/hooks/useLocale";
import { useAppLang } from "@/contexts/AppLanguageContext";
import CurrencySelector from "./CurrencySelector";

const IncomeTaxCalc = () => {
  const { currency, currencyCode } = useCurrency();
  const { lang } = useAppLang();
  const hi = lang === 'hi';
  const [income, setIncome] = useState(0);

  // India New Regime slabs
  const calcIndianTax = (inc: number) => {
    if (inc <= 300000) return 0;
    if (inc <= 700000) return (inc - 300000) * 0.05;
    if (inc <= 1000000) return 20000 + (inc - 700000) * 0.1;
    if (inc <= 1200000) return 50000 + (inc - 1000000) * 0.15;
    if (inc <= 1500000) return 80000 + (inc - 1200000) * 0.2;
    return 140000 + (inc - 1500000) * 0.3;
  };

  // US-inspired progressive brackets
  const calcUSTax = (inc: number) => {
    if (inc <= 11000) return inc * 0.10;
    if (inc <= 44725) return 1100 + (inc - 11000) * 0.12;
    if (inc <= 95375) return 5147 + (inc - 44725) * 0.22;
    if (inc <= 182100) return 16290 + (inc - 95375) * 0.24;
    if (inc <= 231250) return 37104 + (inc - 182100) * 0.32;
    return 52832 + (inc - 231250) * 0.35;
  };

  // UK-inspired brackets
  const calcUKTax = (inc: number) => {
    if (inc <= 12570) return 0;
    if (inc <= 50270) return (inc - 12570) * 0.20;
    if (inc <= 125140) return 7540 + (inc - 50270) * 0.40;
    return 37488 + (inc - 125140) * 0.45;
  };

  const tax = currencyCode === 'INR' ? calcIndianTax(income) 
            : currencyCode === 'GBP' ? calcUKTax(income) 
            : calcUSTax(income);

  const regimeLabel = currencyCode === 'INR' ? 'Estimated Tax (New Regime)' 
                    : currencyCode === 'GBP' ? 'Estimated Tax (UK)' 
                    : 'Estimated Tax (US)';

  return (
    <div className="space-y-3">
      <CurrencySelector />
      <InputField label={`Annual Income (${currency})`} value={income} onChange={setIncome} />
      <ResultBox label={regimeLabel} value={fmt(currency, tax)} />
      <ResultBox label="Effective Rate" value={income > 0 ? `${((tax / income) * 100).toFixed(1)}%` : '0%'} />
      <p className="text-center text-xs text-muted-foreground">
        {currencyCode === 'INR' ? (hi ? 'भारत नई कर व्यवस्था (अनुमानित)' : 'India New Tax Regime (approx.)') 
        : 'Approximate estimate only'}
      </p>
    </div>
  );
};

export default IncomeTaxCalc;
