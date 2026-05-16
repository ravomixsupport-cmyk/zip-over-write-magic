export interface ToolDef {
  id: string;
  title: string;
  titleHi: string;
  icon: string;
  description: string;
  descriptionHi: string;
  category: string;
  categoryHi: string;
}

export const toolsList: ToolDef[] = [
  { id: 'gst', title: 'GST Calculator', titleHi: 'GST कैलकुलेटर', icon: '🧾', description: 'Calculate GST amount and total', descriptionHi: 'GST राशि और कुल गणना करें', category: 'Tax', categoryHi: 'कर' },
  { id: 'income-tax', title: 'Income Tax Calculator', titleHi: 'आयकर कैलकुलेटर', icon: '💰', description: 'Estimate your income tax', descriptionHi: 'अपना आयकर अनुमान लगाएं', category: 'Tax', categoryHi: 'कर' },
  { id: 'emi', title: 'EMI Calculator', titleHi: 'EMI कैलकुलेटर', icon: '🏠', description: 'Calculate monthly EMI', descriptionHi: 'मासिक EMI गणना करें', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'age', title: 'Age Calculator', titleHi: 'आयु कैलकुलेटर', icon: '🎂', description: 'Calculate exact age', descriptionHi: 'सटीक आयु गणना करें', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'percentage', title: 'Percentage Calculator', titleHi: 'प्रतिशत कैलकुलेटर', icon: '📊', description: 'Calculate percentages easily', descriptionHi: 'आसानी से प्रतिशत गणना करें', category: 'Math', categoryHi: 'गणित' },
  { id: 'unit', title: 'Unit Converter', titleHi: 'इकाई कनवर्टर', icon: '📐', description: 'Convert between units', descriptionHi: 'इकाइयों के बीच रूपांतरण', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'loan', title: 'Loan Calculator', titleHi: 'ऋण कैलकुलेटर', icon: '🏦', description: 'Calculate loan payments', descriptionHi: 'ऋण भुगतान गणना करें', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'discount', title: 'Discount Calculator', titleHi: 'छूट कैलकुलेटर', icon: '🏷️', description: 'Calculate discount savings', descriptionHi: 'छूट बचत गणना करें', category: 'Shopping', categoryHi: 'खरीदारी' },
  { id: 'currency', title: 'Currency Converter', titleHi: 'मुद्रा कनवर्टर', icon: '💱', description: 'Convert currencies (offline rates)', descriptionHi: 'मुद्रा रूपांतरण (ऑफलाइन दरें)', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'tip', title: 'Tip Calculator', titleHi: 'टिप कैलकुलेटर', icon: '🍽️', description: 'Calculate tips and split bills', descriptionHi: 'टिप गणना और बिल विभाजन', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'bmi', title: 'BMI Calculator', titleHi: 'BMI कैलकुलेटर', icon: '⚖️', description: 'Calculate Body Mass Index', descriptionHi: 'बॉडी मास इंडेक्स गणना', category: 'Health', categoryHi: 'स्वास्थ्य' },
  { id: 'password-gen', title: 'Password Generator', titleHi: 'पासवर्ड जनरेटर', icon: '🔐', description: 'Generate strong passwords', descriptionHi: 'मजबूत पासवर्ड बनाएं', category: 'Security', categoryHi: 'सुरक्षा' },
  { id: 'word-counter', title: 'Word Counter', titleHi: 'शब्द गणक', icon: '📝', description: 'Count words, characters & sentences', descriptionHi: 'शब्द, अक्षर और वाक्य गिनें', category: 'Text', categoryHi: 'टेक्स्ट' },
  { id: 'color-picker', title: 'Color Picker', titleHi: 'रंग चयनकर्ता', icon: '🎨', description: 'Pick and convert colors', descriptionHi: 'रंग चुनें और कन्वर्ट करें', category: 'Design', categoryHi: 'डिज़ाइन' },
  { id: 'speed-converter', title: 'Speed Converter', titleHi: 'गति कनवर्टर', icon: '🚀', description: 'Convert speed units', descriptionHi: 'गति इकाइयां कन्वर्ट करें', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'temperature', title: 'Temperature Converter', titleHi: 'तापमान कनवर्टर', icon: '🌡️', description: 'Convert °C, °F, K', descriptionHi: '°C, °F, K रूपांतरण', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'stopwatch', title: 'Stopwatch & Timer', titleHi: 'स्टॉपवॉच और टाइमर', icon: '⏱️', description: 'Stopwatch with lap timer', descriptionHi: 'लैप टाइमर के साथ स्टॉपवॉच', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'number-base', title: 'Number Base Converter', titleHi: 'संख्या आधार कनवर्टर', icon: '🔢', description: 'Binary, Octal, Decimal, Hex', descriptionHi: 'बाइनरी, ऑक्टल, दशमलव, हेक्स', category: 'Math', categoryHi: 'गणित' },
  { id: 'sip', title: 'SIP Calculator', titleHi: 'SIP कैलकुलेटर', icon: '📈', description: 'Calculate SIP returns', descriptionHi: 'SIP रिटर्न गणना करें', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'compound-interest', title: 'Compound Interest', titleHi: 'चक्रवृद्धि ब्याज', icon: '🏧', description: 'Calculate compound interest', descriptionHi: 'चक्रवृद्धि ब्याज गणना', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'simple-interest', title: 'Simple Interest', titleHi: 'साधारण ब्याज', icon: '💵', description: 'Calculate simple interest', descriptionHi: 'साधारण ब्याज गणना', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'date-diff', title: 'Date Difference', titleHi: 'तिथि अंतर', icon: '📅', description: 'Days between two dates', descriptionHi: 'दो तिथियों के बीच दिन', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'random-number', title: 'Random Number', titleHi: 'यादृच्छिक संख्या', icon: '🎲', description: 'Generate random numbers', descriptionHi: 'यादृच्छिक संख्या बनाएं', category: 'Math', categoryHi: 'गणित' },
  { id: 'text-case', title: 'Text Case Converter', titleHi: 'टेक्स्ट केस कनवर्टर', icon: '🔤', description: 'UPPER, lower, Title, camelCase', descriptionHi: 'बड़े, छोटे, शीर्षक, कैमलकेस', category: 'Text', categoryHi: 'टेक्स्ट' },
  { id: 'fuel-cost', title: 'Fuel Cost Calculator', titleHi: 'ईंधन लागत कैलकुलेटर', icon: '⛽', description: 'Calculate trip fuel cost', descriptionHi: 'यात्रा ईंधन लागत गणना', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'data-storage', title: 'Data Storage Converter', titleHi: 'डेटा स्टोरेज कनवर्टर', icon: '💾', description: 'KB, MB, GB, TB converter', descriptionHi: 'KB, MB, GB, TB रूपांतरण', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'time-zone', title: 'Time Zone Converter', titleHi: 'समय क्षेत्र कनवर्टर', icon: '🌍', description: 'Convert between time zones', descriptionHi: 'समय क्षेत्रों के बीच रूपांतरण', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'profit-loss', title: 'Profit & Loss', titleHi: 'लाभ और हानि', icon: '📉', description: 'Calculate profit/loss percentage', descriptionHi: 'लाभ/हानि प्रतिशत गणना', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'square-root', title: 'Square Root & Power', titleHi: 'वर्गमूल और घात', icon: '√', description: 'Calculate roots and powers', descriptionHi: 'मूल और घात गणना', category: 'Math', categoryHi: 'गणित' },
  { id: 'lorem-gen', title: 'Lorem Ipsum Generator', titleHi: 'लोरेम इप्सम जनरेटर', icon: '📄', description: 'Generate placeholder text', descriptionHi: 'प्लेसहोल्डर टेक्स्ट बनाएं', category: 'Text', categoryHi: 'टेक्स्ट' },
  { id: 'area', title: 'Area Calculator', titleHi: 'क्षेत्रफल कैलकुलेटर', icon: '📏', description: 'Calculate area & perimeter', descriptionHi: 'क्षेत्रफल और परिधि गणना', category: 'Math', categoryHi: 'गणित' },
  { id: 'average', title: 'Average Calculator', titleHi: 'औसत कैलकुलेटर', icon: '📊', description: 'Calculate average, sum, min, max', descriptionHi: 'औसत, योग, न्यूनतम, अधिकतम', category: 'Math', categoryHi: 'गणित' },
  { id: 'marks-percent', title: 'Marks Percentage', titleHi: 'अंक प्रतिशत', icon: '🎓', description: 'Calculate marks % & grade', descriptionHi: 'अंक प्रतिशत और ग्रेड गणना', category: 'Education', categoryHi: 'शिक्षा' },
  { id: 'electricity-bill', title: 'Electricity Bill', titleHi: 'बिजली बिल', icon: '⚡', description: 'Estimate electricity bill', descriptionHi: 'बिजली बिल अनुमान', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'rent-split', title: 'Rent Splitter', titleHi: 'किराया विभाजक', icon: '🏘️', description: 'Split rent & bills equally', descriptionHi: 'किराया और बिल बराबर बांटें', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'char-counter', title: 'Character Counter', titleHi: 'अक्षर गणक', icon: '🔡', description: 'Count chars, vowels, consonants', descriptionHi: 'अक्षर, स्वर, व्यंजन गिनें', category: 'Text', categoryHi: 'टेक्स्ट' },
  { id: 'weight-conv', title: 'Weight Converter', titleHi: 'वज़न कनवर्टर', icon: '⚖️', description: 'kg, lb, oz, ton, gram', descriptionHi: 'किग्रा, पाउंड, औंस, टन, ग्राम', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'length-conv', title: 'Length Converter', titleHi: 'लंबाई कनवर्टर', icon: '📐', description: 'mm, cm, m, km, ft, inch, mile', descriptionHi: 'मिमी, सेमी, मी, किमी, फीट, इंच, मील', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'gold-calc', title: 'Gold Calculator', titleHi: 'सोना कैलकुलेटर', icon: '🥇', description: 'Calculate gold value by weight', descriptionHi: 'वज़न से सोने का मूल्य गणना', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'fd-calc', title: 'FD Calculator', titleHi: 'FD कैलकुलेटर', icon: '🏦', description: 'Fixed Deposit maturity', descriptionHi: 'सावधि जमा परिपक्वता', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'ppf-calc', title: 'PPF Calculator', titleHi: 'PPF कैलकुलेटर', icon: '🏛️', description: 'PPF maturity calculator', descriptionHi: 'PPF परिपक्वता कैलकुलेटर', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'rd-calc', title: 'RD Calculator', titleHi: 'RD कैलकुलेटर', icon: '💳', description: 'Recurring Deposit maturity', descriptionHi: 'आवर्ती जमा परिपक्वता', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'world-clock', title: 'World Clock', titleHi: 'विश्व घड़ी', icon: '🕐', description: 'Live time in major cities', descriptionHi: 'प्रमुख शहरों में लाइव समय', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'roman', title: 'Roman Numeral', titleHi: 'रोमन अंक', icon: '🏛️', description: 'Convert number to Roman', descriptionHi: 'संख्या को रोमन में बदलें', category: 'Math', categoryHi: 'गणित' },
  { id: 'number-words', title: 'Number to Words', titleHi: 'संख्या से शब्द', icon: '🔢', description: 'Convert numbers to words', descriptionHi: 'संख्या को शब्दों में बदलें', category: 'Text', categoryHi: 'टेक्स्ट' },
  { id: 'time-converter', title: 'Time Converter', titleHi: 'समय कनवर्टर', icon: '⏳', description: 'Seconds, minutes, hours, days', descriptionHi: 'सेकंड, मिनट, घंटे, दिन', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'salary-calc', title: 'Salary Calculator', titleHi: 'वेतन कैलकुलेटर', icon: '💼', description: 'Monthly to yearly/daily/hourly', descriptionHi: 'मासिक से वार्षिक/दैनिक/प्रति घंटा', category: 'Finance', categoryHi: 'वित्त' },
  { id: 'mileage', title: 'Mileage Calculator', titleHi: 'माइलेज कैलकुलेटर', icon: '🚗', description: 'Calculate vehicle mileage', descriptionHi: 'वाहन माइलेज गणना', category: 'Utility', categoryHi: 'उपयोगिता' },
  { id: 'hash-gen', title: 'Hash Generator', titleHi: 'हैश जनरेटर', icon: '🔒', description: 'Generate hashes & Base64', descriptionHi: 'हैश और Base64 बनाएं', category: 'Security', categoryHi: 'सुरक्षा' },
  { id: 'css-unit', title: 'CSS Unit Converter', titleHi: 'CSS इकाई कनवर्टर', icon: '🎨', description: 'px to rem, em, pt, vw', descriptionHi: 'px से rem, em, pt, vw', category: 'Design', categoryHi: 'डिज़ाइन' },
];

export const CURRENCIES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  GBP: { symbol: '£', rate: 0.79 },
  EUR: { symbol: '€', rate: 0.92 },
  AUD: { symbol: 'A$', rate: 1.53 },
  CAD: { symbol: 'C$', rate: 1.36 },
  JPY: { symbol: '¥', rate: 149.5 },
  AED: { symbol: 'د.إ', rate: 3.67 },
  SGD: { symbol: 'S$', rate: 1.34 },
};

export const SPIN_REWARDS = [
  '💡 Try the EMI Calculator!',
  '🌟 You are amazing today!',
  '🎯 Explore Useful Tools!',
  '💪 Keep going, champion!',
  '📄 Try Leave Application!',
  '🔥 Unlock your potential!',
  '🎉 Great day ahead!',
  '✨ Try the GST Calculator!',
];
