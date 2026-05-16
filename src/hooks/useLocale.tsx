import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR';

export interface CurrencyOption {
  code: CurrencyCode;
  symbol: string;
  label: string;
  flag: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'USD', symbol: '$', label: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', label: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', label: 'Euro', flag: '🇪🇺' },
];

interface CurrencyContextType {
  currencyCode: CurrencyCode;
  currency: string;
  setCurrencyCode: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currencyCode: 'INR',
  currency: '₹',
  setCurrencyCode: () => {},
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('ravomix-currency');
      return (saved as CurrencyCode) || 'INR';
    } catch {
      return 'INR';
    }
  });

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrencyCodeState(code);
    try {
      localStorage.setItem('ravomix-currency', code);
    } catch {
      // ignore storage failures in private/TWA/webview contexts
    }
  };

  const currency = CURRENCY_OPTIONS.find(c => c.code === currencyCode)?.symbol || '₹';

  return (
    <CurrencyContext.Provider value={{ currencyCode, currency, setCurrencyCode }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

/** Format a number with currency symbol */
export function fmt(symbol: string, value: number, decimals = 0): string {
  return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}
