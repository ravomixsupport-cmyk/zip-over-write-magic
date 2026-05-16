import React, { lazy, Suspense, useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import InlineAd from "@/components/ads/InlineAd";

import { toolsList } from "@/data/tools";
import { ArrowLeft, ChevronRight, Search, X } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import useSEO from "@/hooks/useSEO";

// Lazy load individual tools
const toolComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  gst: lazy(() => import("@/components/tools/GSTCalc")),
  "income-tax": lazy(() => import("@/components/tools/IncomeTaxCalc")),
  emi: lazy(() => import("@/components/tools/EMICalc")),
  age: lazy(() => import("@/components/tools/AgeCalc")),
  percentage: lazy(() => import("@/components/tools/PercentCalc")),
  unit: lazy(() => import("@/components/tools/UnitConverter")),
  loan: lazy(() => import("@/components/tools/LoanCalc")),
  discount: lazy(() => import("@/components/tools/DiscountCalc")),
  currency: lazy(() => import("@/components/tools/CurrencyConv")),
  tip: lazy(() => import("@/components/tools/TipCalc")),
  bmi: lazy(() => import("@/components/tools/BMICalc")),
  "password-gen": lazy(() => import("@/components/tools/PasswordGen")),
  "word-counter": lazy(() => import("@/components/tools/WordCounter")),
  "color-picker": lazy(() => import("@/components/tools/ColorPicker")),
  "speed-converter": lazy(() => import("@/components/tools/SpeedConverter")),
  temperature: lazy(() => import("@/components/tools/TemperatureConv")),
  stopwatch: lazy(() => import("@/components/tools/Stopwatch")),
  "number-base": lazy(() => import("@/components/tools/NumberBase")),
  sip: lazy(() => import("@/components/tools/SIPCalc")),
  "compound-interest": lazy(() => import("@/components/tools/CompoundInterest")),
  "simple-interest": lazy(() => import("@/components/tools/SimpleInterest")),
  "date-diff": lazy(() => import("@/components/tools/DateDiff")),
  "random-number": lazy(() => import("@/components/tools/RandomNumber")),
  "text-case": lazy(() => import("@/components/tools/TextCase")),
  "fuel-cost": lazy(() => import("@/components/tools/FuelCost")),
  "data-storage": lazy(() => import("@/components/tools/DataStorage")),
  "time-zone": lazy(() => import("@/components/tools/TimeZone")),
  "profit-loss": lazy(() => import("@/components/tools/ProfitLoss")),
  "square-root": lazy(() => import("@/components/tools/SquareRoot")),
  "lorem-gen": lazy(() => import("@/components/tools/LoremGen")),
  area: lazy(() => import("@/components/tools/AreaCalc")),
  average: lazy(() => import("@/components/tools/AverageCalc")),
  "marks-percent": lazy(() => import("@/components/tools/MarksPercent")),
  "electricity-bill": lazy(() => import("@/components/tools/ElectricityBill")),
  "rent-split": lazy(() => import("@/components/tools/RentSplit")),
  "char-counter": lazy(() => import("@/components/tools/CharCounter")),
  "weight-conv": lazy(() => import("@/components/tools/WeightConv")),
  "length-conv": lazy(() => import("@/components/tools/LengthConv")),
  "gold-calc": lazy(() => import("@/components/tools/GoldCalc")),
  "fd-calc": lazy(() => import("@/components/tools/FDCalc")),
  "ppf-calc": lazy(() => import("@/components/tools/PPFCalc")),
  "rd-calc": lazy(() => import("@/components/tools/RDCalc")),
  "world-clock": lazy(() => import("@/components/tools/WorldClock")),
  roman: lazy(() => import("@/components/tools/RomanConverter")),
  "number-words": lazy(() => import("@/components/tools/NumberToWords")),
  "time-converter": lazy(() => import("@/components/tools/TimeConverter")),
  "salary-calc": lazy(() => import("@/components/tools/SalaryCalc")),
  mileage: lazy(() => import("@/components/tools/MileageCalc")),
  "hash-gen": lazy(() => import("@/components/tools/HashGenerator")),
  "css-unit": lazy(() => import("@/components/tools/CSSUnitConv")),
};

const ToolFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

class ToolErrorBoundary extends React.Component<
  { children: React.ReactNode; toolName?: string },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm font-semibold text-destructive mb-2">
            {this.props.toolName || 'Tool'} failed to load
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ToolsList = () => {
  const [search, setSearch] = useState("");
  const { t, lang } = useAppLang();
  const isHi = lang === 'hi';
  useSEO({
    title: "Free Online Tools — EMI, GST, Income Tax, BMI & 50+ Calculators | Ravomix",
    description: `${toolsList.length}+ free online calculators and converters: EMI, GST, income tax, BMI, currency, units, password generator. Works offline in Hindi & English.`,
    path: "/tools",
  });
  const filtered = useMemo(() => {
    if (!search.trim()) return toolsList;
    const q = search.toLowerCase();
    return toolsList.filter(tool => {
      const title = isHi ? tool.titleHi : tool.title;
      const desc = isHi ? tool.descriptionHi : tool.description;
      const cat = isHi ? tool.categoryHi : tool.category;
      return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || cat.toLowerCase().includes(q) || tool.title.toLowerCase().includes(q);
    });
  }, [search, isHi]);

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/" className="rounded-xl bg-card p-2 shadow-sm border border-border active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold">{t('tools.title')}</h1>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('tools.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">{t('tools.notFound')} "{search}"</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {filtered.map((tool) => (
            <Link key={tool.id} to={tool.id === 'spin-wheel' ? '/spin' : `/tools/${tool.id}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 md:p-4 transition active:scale-[0.98] hover:shadow-md">
              <span className="text-xl icon-rotate">{tool.icon}</span>
              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold">{isHi ? tool.titleHi : tool.title}</p>
                <p className="text-xs text-muted-foreground">{isHi ? tool.descriptionHi : tool.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
        <InlineAd />
        <div className="h-24" />
      </div>
    </Layout>
  );
};

const ToolPage = () => {
  const { id } = useParams();
  const { t, lang } = useAppLang();
  const isHi = lang === 'hi';
  const tool = toolsList.find((t) => t.id === id);
  const displayTitle = tool ? (isHi ? tool.titleHi : tool.title) : "Tool";
  useSEO({
    title: tool ? `${displayTitle} — Free Online ${tool.category} Tool | Ravomix` : "Tool — Ravomix",
    description: tool
      ? `${tool.description}. Free online ${displayTitle.toLowerCase()} from Ravomix — works offline, no login required.`
      : "Free online tool from Ravomix.",
    path: `/tools/${id ?? ""}`,
    jsonLd: tool
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: displayTitle,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          description: tool.description,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }
      : undefined,
  });

  if (!tool) return <Layout><div className="flex h-[60vh] items-center justify-center text-muted-foreground">{t('tools.toolNotFound')}</div></Layout>;

  const ToolComponent = id ? toolComponents[id] : null;

  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/tools" className="rounded-xl bg-card p-2 shadow-sm border border-border active:scale-95 transition-transform">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg md:text-xl font-bold">{tool.icon} {displayTitle}</h1>
        </div>
        <div className="max-w-2xl">
          <ToolErrorBoundary toolName={displayTitle}>
            <Suspense fallback={<ToolFallback />}>
              {ToolComponent ? <ToolComponent /> : <p className="text-muted-foreground">{t('tools.comingSoon')}</p>}
            </Suspense>
          </ToolErrorBoundary>
        </div>
        <InlineAd />
        <div className="h-24" />
      </div>
    </Layout>
  );
};

export { ToolsList, ToolPage };
export default ToolsList;
