import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square } from "lucide-react";
import { useAppLang } from "@/contexts/AppLanguageContext";
import ravomixIcon from "@/assets/ravomix-icon.png";

const STORAGE_KEY = "ravomix-disclaimer-accepted";

const content = {
  en: {
    welcome: "Welcome to Ravomix",
    welcomeDesc: "Your All-in-One Document Generator & Utility Toolkit — 200+ templates across School/College, Office, Bank, Government, Advocate/Legal, CA/Finance, Postal/Courier and Startup/Business, plus 50+ utility tools. Please read the following carefully before using the app.",
    privacyTitle: "📋 DATA & PRIVACY",
    privacyPoints: [
      "All documents are generated on your device and stored locally — nothing is sent to any server.",
      "Personal information entered into forms (names, addresses, etc.) is used only for document generation and is NOT collected or shared with anyone.",
      "No user accounts or logins are required to use this app.",
      "An active internet connection may be required for loading templates, advertisements, and updates.",
      "This website may display ads through Google AdSense — see Privacy Policy for details.",
      "You can clear all local data anytime from Settings.",
    ],
    legalTitle: "⚠️ IMPORTANT LEGAL DISCLAIMER",
    legalPoints: [
      "Ravomix is NOT affiliated with, endorsed by, or connected to any government authority, bank, court, law firm, chartered accountant, postal service, educational institution, or any official organization.",
      "All application and complaint templates (including legal, finance, postal, and business categories) are provided for convenience and guidance only — they are NOT official documents.",
      "Users MUST verify all information, formatting, and legal requirements before submitting any generated document for official purposes.",
      "Generated documents do NOT constitute legal, financial, tax, accounting, or professional advice of any kind. Always consult a qualified advocate, CA, or relevant professional.",
      "Ravomix is NOT a legal advisor, chartered accountant, financial consultant, or certified professional service provider.",
      "Users are solely responsible for the accuracy, use, and consequences of any generated documents.",
      "Calculator and converter tools provide estimates only — verify independently before making important decisions.",
      "Ravomix is not responsible for any loss, damage, or consequences arising from the use of this app.",
    ],
    checkbox: "I have read, understood, and agree to continue",
    acceptButton: "Accept & Continue",
    closeButton: "Close",
  },
  hi: {
    welcome: "Ravomix में आपका स्वागत है",
    welcomeDesc: "आपका ऑल-इन-वन दस्तावेज़ जनरेटर और उपयोगिता टूलकिट — स्कूल/कॉलेज, ऑफिस, बैंक, सरकारी, अधिवक्ता/कानूनी, CA/वित्त, डाक/कूरियर और स्टार्टअप/व्यापार श्रेणियों में 200+ टेम्पलेट और 50+ उपयोगिता टूल्स। ऐप का उपयोग करने से पहले कृपया निम्नलिखित ध्यान से पढ़ें।",
    privacyTitle: "📋 डेटा और गोपनीयता",
    privacyPoints: [
      "सभी दस्तावेज़ आपके डिवाइस पर बनाए जाते हैं और स्थानीय रूप से संग्रहीत होते हैं — कुछ भी किसी सर्वर पर नहीं भेजा जाता।",
      "फॉर्म में दर्ज व्यक्तिगत जानकारी (नाम, पता आदि) केवल दस्तावेज़ निर्माण के लिए उपयोग होती है और किसी के साथ साझा नहीं की जाती।",
      "इस ऐप का उपयोग करने के लिए किसी खाते या लॉगिन की आवश्यकता नहीं है।",
      "टेम्पलेट, विज्ञापन और अपडेट लोड करने के लिए सक्रिय इंटरनेट कनेक्शन आवश्यक हो सकता है।",
      "यह वेबसाइट Google AdSense के माध्यम से विज्ञापन दिखा सकती है — विवरण के लिए गोपनीयता नीति देखें।",
      "आप सेटिंग्स से कभी भी सारा स्थानीय डेटा साफ़ कर सकते हैं।",
    ],
    legalTitle: "⚠️ महत्वपूर्ण कानूनी अस्वीकरण",
    legalPoints: [
      "Ravomix किसी भी सरकारी प्राधिकरण, बैंक, न्यायालय, कानूनी फर्म, चार्टर्ड एकाउंटेंट, डाक सेवा, शैक्षणिक संस्थान या किसी भी आधिकारिक संगठन से संबद्ध, समर्थित या जुड़ा नहीं है।",
      "सभी आवेदन और शिकायत टेम्पलेट (कानूनी, वित्त, डाक और व्यापार श्रेणियों सहित) केवल सुविधा और मार्गदर्शन के लिए प्रदान किए गए हैं — ये आधिकारिक दस्तावेज़ नहीं हैं।",
      "उपयोगकर्ताओं को आधिकारिक उद्देश्यों के लिए कोई भी दस्तावेज़ जमा करने से पहले सभी जानकारी, प्रारूपण और कानूनी आवश्यकताओं की पुष्टि अवश्य करनी चाहिए।",
      "उत्पन्न दस्तावेज़ किसी भी प्रकार की कानूनी, वित्तीय, कर, लेखांकन या पेशेवर सलाह नहीं हैं। हमेशा किसी योग्य अधिवक्ता, CA या संबंधित पेशेवर से परामर्श लें।",
      "Ravomix कानूनी सलाहकार, चार्टर्ड एकाउंटेंट, वित्तीय सलाहकार या प्रमाणित पेशेवर सेवा प्रदाता नहीं है।",
      "उपयोगकर्ता किसी भी उत्पन्न दस्तावेज़ की सटीकता, उपयोग और परिणामों के लिए पूरी तरह स्वयं जिम्मेदार हैं।",
      "कैलकुलेटर और कनवर्टर टूल केवल अनुमान प्रदान करते हैं — महत्वपूर्ण निर्णय लेने से पहले स्वतंत्र रूप से सत्यापित करें।",
      "Ravomix इस ऐप के उपयोग से उत्पन्न किसी भी हानि, क्षति या परिणामों के लिए जिम्मेदार नहीं है।",
    ],
    checkbox: "मैंने पढ़ लिया, समझ लिया और जारी रखने के लिए सहमत हूँ",
    acceptButton: "स्वीकार करें और जारी रखें",
    closeButton: "बंद करें",
  },
};

interface WelcomeDisclaimerProps {
  onAccept: () => void;
}

const WelcomeDisclaimer = ({ onAccept }: WelcomeDisclaimerProps) => {
  const [agreed, setAgreed] = useState(false);
  const { lang } = useAppLang();
  const [disclaimerLang, setDisclaimerLang] = useState<"en" | "hi">(lang === "hi" ? "hi" : "en");
  const c = content[disclaimerLang];

  const handleAccept = () => {
    if (!agreed) return;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage failures and continue into the app
    }
    onAccept();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] flex items-start justify-center overflow-y-auto bg-background/90 p-4 pt-6 backdrop-blur-sm sm:items-center"
      >
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl flex flex-col"
          style={{ maxHeight: "85vh" }}
        >
          <div
            className="px-6 pt-5 pb-4 flex-shrink-0 rounded-t-3xl"
            style={{ background: "linear-gradient(135deg, #f97316, #f59e0b, #eab308)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden">
                  <img src={ravomixIcon} alt="Ravomix" className="h-8 w-8 object-contain drop-shadow-sm" />
                </div>
                <h2 className="text-lg font-extrabold text-white">{c.welcome}</h2>
              </div>
              <div className="flex gap-1 bg-white/20 rounded-full p-0.5">
                <button
                  onClick={() => setDisclaimerLang("en")}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${disclaimerLang === "en" ? "bg-white text-orange-600" : "text-white/80"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setDisclaimerLang("hi")}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${disclaimerLang === "hi" ? "bg-white text-orange-600" : "text-white/80"}`}
                >
                  हिं
                </button>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-white/90">{c.welcomeDesc}</p>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto bg-card px-6 py-5 space-y-5 flex-1 min-h-0">
            <div>
              <h3 className="text-sm font-extrabold text-foreground mb-2">{c.privacyTitle}</h3>
              <ul className="space-y-2">
                {c.privacyPoints.map((point, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-foreground mb-2">{c.legalTitle}</h3>
              <ul className="space-y-2">
                {c.legalPoints.map((point, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">⚠</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-card border-t border-border px-6 py-4 space-y-3 flex-shrink-0 rounded-b-3xl">
            <button
              onClick={() => setAgreed(!agreed)}
              className="flex w-full items-center gap-3 text-left select-none active:scale-[0.99]"
            >
              {agreed ? (
                <CheckSquare className="h-5 w-5 text-primary flex-shrink-0" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              <span className="text-xs font-medium text-foreground">{c.checkbox}</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => {
                    try {
                      localStorage.setItem(STORAGE_KEY, "true");
                    } catch {
                      // ignore storage failures and continue into the app
                    }
                  onAccept();
                }}
                className="flex-1 rounded-2xl py-3 text-sm font-bold border border-border bg-muted text-muted-foreground transition-all active:scale-[0.98]"
              >
                {c.closeButton}
              </button>
              <button
                onClick={handleAccept}
                disabled={!agreed}
                className="flex-1 rounded-2xl py-3 text-sm font-bold text-primary-foreground transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: agreed
                    ? "linear-gradient(135deg, #f97316, #ef4444)"
                    : "hsl(var(--muted))",
                }}
              >
                {c.acceptButton}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export { STORAGE_KEY };
export default WelcomeDisclaimer;
