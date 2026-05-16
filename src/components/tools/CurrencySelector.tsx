import { useCurrency, CURRENCY_OPTIONS, CurrencyCode } from "@/hooks/useLocale";

const CurrencySelector = () => {
  const { currencyCode, setCurrencyCode } = useCurrency();

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1">
      {CURRENCY_OPTIONS.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setCurrencyCode(opt.code)}
          className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
            currencyCode === opt.code
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <span>{opt.flag}</span>
          <span>{opt.symbol}</span>
        </button>
      ))}
    </div>
  );
};

export default CurrencySelector;
