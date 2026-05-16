import { ReactNode } from "react";
import { useAppLang } from "@/contexts/AppLanguageContext";

const hiLabels: Record<string, string> = {
  // Common
  'Amount': 'राशि',
  'Value': 'मूल्य',
  'Total': 'कुल',
  'Result': 'परिणाम',
  'Number': 'संख्या',
  'Count': 'गणना',
  'Type': 'प्रकार',
  'From': 'से',
  'To': 'तक',
  'Date': 'तिथि',
  'Length': 'लंबाई',
  'Width': 'चौड़ाई',
  'Years': 'वर्ष',
  'Months': 'महीने',
  'Weeks': 'सप्ताह',
  'Days': 'दिन',
  'Reason': 'कारण',

  // Tax
  'GST Amount': 'GST राशि',
  'GST Rate': 'GST दर',
  'Total (incl. GST)': 'कुल (GST सहित)',
  'Annual Income (₹)': 'वार्षिक आय (₹)',
  'Estimated Tax (New Regime)': 'अनुमानित कर (नई व्यवस्था)',
  'Effective Rate': 'प्रभावी दर',

  // Finance
  'Loan Amount': 'ऋण राशि',
  'Interest Rate (% p.a.)': 'ब्याज दर (% प्रति वर्ष)',
  'Interest Rate (%)': 'ब्याज दर (%)',
  'Tenure (months)': 'अवधि (महीने)',
  'Monthly EMI': 'मासिक EMI',
  'Total Payment': 'कुल भुगतान',
  'Total Interest': 'कुल ब्याज',
  'Total Repayment': 'कुल पुनर्भुगतान',
  'Monthly Investment': 'मासिक निवेश',
  'Expected Return (% p.a.)': 'अपेक्षित रिटर्न (% प्रति वर्ष)',
  'Time Period (years)': 'समय अवधि (वर्ष)',
  'Invested': 'निवेशित',
  'Est. Returns': 'अनु. रिटर्न',
  'Total Value': 'कुल मूल्य',
  'Principal Amount': 'मूल राशि',
  'Principal Amount (₹)': 'मूल राशि (₹)',
  'Time (years)': 'समय (वर्ष)',
  'Interest': 'ब्याज',
  'Total Amount': 'कुल राशि',
  'Compounds per Year': 'प्रति वर्ष चक्रवृद्धि',
  'Annual Rate (%)': 'वार्षिक दर (%)',
  'Interest Earned': 'अर्जित ब्याज',
  'Maturity Amount': 'परिपक्वता राशि',
  'Maturity Value': 'परिपक्वता मूल्य',
  'Duration (Years)': 'अवधि (वर्ष)',
  'Duration (Months)': 'अवधि (महीने)',
  'Yearly Investment (₹)': 'वार्षिक निवेश (₹)',
  'Monthly Deposit (₹)': 'मासिक जमा (₹)',
  'Tenure (Years)': 'अवधि (वर्ष)',

  // Shopping
  'Original Price': 'मूल कीमत',
  'Discount (%)': 'छूट (%)',
  'You Save': 'आपकी बचत',
  'Final Price': 'अंतिम कीमत',
  'Cost Price': 'लागत मूल्य',
  'Selling Price': 'विक्रय मूल्य',
  'Profit': 'लाभ',
  'Loss': 'हानि',

  // Utility
  'Date of Birth': 'जन्म तिथि',
  'Your Age': 'आपकी आयु',
  'Bill Amount': 'बिल राशि',
  'Tip (%)': 'टिप (%)',
  'Split Between': 'बीच में बांटें',
  'Tip Amount': 'टिप राशि',
  'Per Person': 'प्रति व्यक्ति',
  'Your BMI': 'आपका BMI',
  'Unit System': 'इकाई प्रणाली',
  'Weight (kg)': 'वज़न (किग्रा)',
  'Weight (lbs)': 'वज़न (पाउंड)',
  'Height (cm)': 'ऊंचाई (सेमी)',
  'Height (inches)': 'ऊंचाई (इंच)',
  'Percentage': 'प्रतिशत',

  // Fuel
  'Distance (km)': 'दूरी (किमी)',
  'Mileage (km/L)': 'माइलेज (किमी/ली)',
  'Fuel Price (per liter)': 'ईंधन मूल्य (प्रति लीटर)',
  'Fuel Price (₹/litre)': 'ईंधन मूल्य (₹/लीटर)',
  'Fuel Used (litres)': 'ईंधन उपयोग (लीटर)',
  'Total Fuel Cost': 'कुल ईंधन लागत',
  'Fuel Needed': 'आवश्यक ईंधन',
  'Mileage': 'माइलेज',
  'Cost/km': 'लागत/किमी',
  'Total Cost': 'कुल लागत',

  // Text
  'Words': 'शब्द',
  'Characters': 'अक्षर',
  'Sentences': 'वाक्य',
  'Read Time': 'पढ़ने का समय',
  'Vowels': 'स्वर',
  'Consonants': 'व्यंजन',
  'No Spaces': 'बिना स्पेस',

  // Math
  'Area': 'क्षेत्रफल',
  'Perimeter': 'परिधि',
  'Average': 'औसत',
  'Sum': 'योग',
  'Min': 'न्यूनतम',
  'Max': 'अधिकतम',
  'Square Root (√)': 'वर्गमूल (√)',
  'Cube Root (∛)': 'घनमूल (∛)',
  'Power (n)': 'घात (n)',
  'Marks Obtained': 'प्राप्त अंक',
  'Total Marks': 'कुल अंक',
  'Grade': 'ग्रेड',
  'Roman Numeral': 'रोमन अंक',
  'In Words': 'शब्दों में',
  'Input Base': 'इनपुट बेस',

  // Number bases
  'Binary': 'बाइनरी',
  'Octal': 'ऑक्टल',
  'Decimal': 'दशमलव',
  'Hex': 'हेक्स',

  // Electricity
  'Units Consumed (kWh)': 'इकाइयां (kWh)',
  'Rate per Unit (₹)': 'प्रति यूनिट दर (₹)',
  'Fixed Charge (₹)': 'निश्चित शुल्क (₹)',
  'Energy Charge': 'ऊर्जा शुल्क',
  'Electricity Bill (₹)': 'बिजली बिल (₹)',
  'Total Bill': 'कुल बिल',
  'Water Bill (₹)': 'पानी बिल (₹)',

  // Rent
  'Monthly Rent (₹)': 'मासिक किराया (₹)',
  'Number of People': 'लोगों की संख्या',

  // Salary
  'Monthly Salary (₹)': 'मासिक वेतन (₹)',
  'Yearly': 'वार्षिक',
  'Weekly': 'साप्ताहिक',
  'Daily': 'दैनिक',
  'Hourly': 'प्रति घंटा',

  // Gold
  'Weight (grams)': 'वज़न (ग्राम)',
  'Purity (Karat)': 'शुद्धता (कैरेट)',
  'Gold Price per gram (₹)': 'सोने की कीमत प्रति ग्राम (₹)',
  'Pure Gold (g)': 'शुद्ध सोना (ग्राम)',
  'Making (~8%)': 'मेकिंग (~8%)',
  'Gold Value': 'सोने का मूल्य',

  // CSS
  'Pixels (px)': 'पिक्सेल (px)',
  'Base Font Size (px)': 'बेस फ़ॉन्ट साइज़ (px)',
  'rem': 'rem',
  'em': 'em',
  'pt': 'pt',
  'vw (1920px)': 'vw (1920px)',

  // Hash
  'Hash (DJB2)': 'हैश (DJB2)',
  'Hash (Murmur)': 'हैश (Murmur)',
  'Base64': 'Base64',

  // Temperature
  'Temperature': 'तापमान',
  'Conversion': 'रूपांतरण',
};

/** Auto-translate a label to Hindi if available */
function useLabel(label: string): string {
  const { lang } = useAppLang();
  if (lang !== 'hi') return label;
  // Exact match
  if (hiLabels[label]) return hiLabels[label];
  // Dynamic labels like "Result (km)" - try prefix match
  for (const [en, hi] of Object.entries(hiLabels)) {
    if (label.startsWith(en)) return hi + label.slice(en.length);
  }
  return label;
}

export const ResultBox = ({ label, value }: { label: string; value: string }) => {
  const displayLabel = useLabel(label);
  return (
    <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-center backdrop-blur-sm">
      <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1">{displayLabel}</p>
      <p className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight break-words">{value}</p>
    </div>
  );
};

const placeholderMap: Record<string, string> = {
  number: 'Enter value',
  text: 'Enter text',
  date: 'Tap to select date',
};

export const InputField = ({ label, value, onChange, type = "number", placeholder, ...props }: any) => {
  const displayLabel = useLabel(label);
  const resolvedPlaceholder = placeholder || placeholderMap[type] || '';
  return (
    <div>
      <label className="mb-1.5 block text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">{displayLabel}</label>
      <input
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        value={value}
        onChange={(e) => onChange(type === "number" ? +e.target.value : e.target.value)}
        placeholder={resolvedPlaceholder}
        className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm md:text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 active:scale-[0.99] placeholder:text-muted-foreground/50 min-h-[48px]"
        {...props}
      />
    </div>
  );
};

export const SelectField = ({ label, value, onChange, children }: { label: string; value: string | number; onChange: (v: any) => void; children: ReactNode }) => {
  const displayLabel = useLabel(label);
  return (
    <div>
      <label className="mb-1.5 block text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">{displayLabel}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-4 py-3.5 pr-10 text-sm md:text-base outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none min-h-[48px] cursor-pointer"
        >
          {children}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
};

/** Reusable hook for components with custom text */
export { useLabel };
