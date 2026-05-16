// SEO landing-page definitions. Each entry powers a clean indexable URL
// (e.g. /emi-calculator) with H1, bilingual intro, FAQs and JSON-LD, while
// the underlying tool/form continues to live at its existing route.

export type SeoKind = "tool" | "application" | "complaint";

export interface SeoFAQ {
  q: string;
  a: string;
}

export interface SeoLanding {
  slug: string;            // URL path without leading slash
  kind: SeoKind;
  targetId: string;        // id used by Tools/ApplicationForm/ComplaintForm
  title: string;           // <title> + og:title (<=70 chars ideal)
  description: string;     // <meta description> (<=160 chars)
  h1: string;              // primary H1 on the landing page
  h1Hi?: string;           // optional Hindi sub-heading
  intro: string;           // 80-150 word SEO intro (English)
  introHi?: string;        // optional Hindi intro
  keywords?: string[];     // chip-style keyword surfacing
  related?: string[];      // related slugs for internal linking
  faqs: SeoFAQ[];
}

const targetPath = (l: Pick<SeoLanding, "kind" | "targetId">) =>
  l.kind === "tool"
    ? `/tools/${l.targetId}`
    : l.kind === "application"
    ? `/applications/${l.targetId}`
    : `/complaints/${l.targetId}`;

export const seoLandings: SeoLanding[] = [
  // ---------- FINANCE / TOOLS ----------
  {
    slug: "emi-calculator",
    kind: "tool",
    targetId: "emi",
    title: "Free EMI Calculator India 2026 | Home, Car, Personal Loan | Ravomix",
    description:
      "Calculate home loan, car loan and personal loan EMI instantly with Ravomix free EMI Calculator. Monthly EMI, total interest and amortisation in seconds.",
    h1: "EMI Calculator — Home, Car & Personal Loan",
    h1Hi: "EMI कैलकुलेटर (होम, कार और पर्सनल लोन)",
    intro:
      "Use Ravomix's free EMI Calculator to find your monthly Equated Monthly Instalment (EMI) for home loans, car loans, personal loans and education loans in India. Just enter the loan amount, annual interest rate and tenure — you'll instantly see your monthly EMI, total interest payable and total repayment. The calculator works offline, supports Indian Rupees and other currencies, and is mobile friendly so you can compare lenders right from your phone.",
    introHi:
      "Ravomix EMI कैलकुलेटर से होम लोन, कार लोन और पर्सनल लोन की मासिक EMI तुरंत निकालें। केवल लोन राशि, ब्याज दर और अवधि दर्ज करें — मासिक EMI, कुल ब्याज और कुल भुगतान सेकंडों में देखें।",
    keywords: ["emi calculator", "home loan emi", "car loan emi", "personal loan emi", "EMI कैलकुलेटर"],
    related: ["gst-calculator", "income-tax-calculator", "sip-calculator"],
    faqs: [
      {
        q: "How is EMI calculated?",
        a: "EMI is calculated using the formula EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments.",
      },
      {
        q: "Does the EMI Calculator work for home loans and personal loans?",
        a: "Yes. The same formula applies to home loans, car loans, personal loans, education loans and gold loans — just enter the relevant amount, rate and tenure.",
      },
      {
        q: "Is the Ravomix EMI Calculator free?",
        a: "Yes, it is completely free, requires no login and works offline once the page is loaded.",
      },
      {
        q: "Can I see total interest and total payment?",
        a: "Yes. Along with monthly EMI you will see the total interest payable and the total amount you'll repay over the loan tenure.",
      },
    ],
  },
  {
    slug: "gst-calculator",
    kind: "tool",
    targetId: "gst",
    title: "Free GST Calculator India — Add & Remove GST | Ravomix",
    description:
      "Calculate GST on any amount instantly. Supports 5%, 12%, 18% and 28% slabs with inclusive/exclusive options. Free GST Calculator for shops, freelancers and CAs.",
    h1: "GST Calculator (5%, 12%, 18%, 28%)",
    h1Hi: "GST कैलकुलेटर — भारत",
    intro:
      "Ravomix's free GST Calculator helps Indian shoppers, freelancers, shop owners and chartered accountants compute Goods and Services Tax on any amount in seconds. Choose any GST slab — 5%, 12%, 18% or 28% — and switch between GST-inclusive and GST-exclusive billing. The tool shows the base price, GST amount and final price separately so you can prepare invoices, quotations and bills correctly under Indian GST rules.",
    introHi:
      "Ravomix GST कैलकुलेटर से किसी भी राशि पर GST तुरंत निकालें। 5%, 12%, 18% और 28% स्लैब के साथ — invoice और बिल बनाते समय बेस प्राइस, GST राशि और कुल अमाउंट देखें।",
    keywords: ["gst calculator", "gst india", "18 percent gst", "GST कैलकुलेटर"],
    related: ["income-tax-calculator", "emi-calculator", "sip-calculator"],
    faqs: [
      {
        q: "What is GST and how is it calculated?",
        a: "GST (Goods and Services Tax) is an indirect tax on supply of goods and services in India. GST amount = (Base Price × GST Rate) ÷ 100. The final price is Base Price + GST.",
      },
      {
        q: "What are the GST slabs in India?",
        a: "The main GST slabs are 0%, 5%, 12%, 18% and 28%. Most everyday items fall under 5%, 12% or 18%, while luxury and sin goods attract 28%.",
      },
      {
        q: "What is the difference between GST inclusive and exclusive?",
        a: "GST exclusive means GST is added on top of the listed price. GST inclusive means the listed price already contains GST and must be reverse-calculated to find the base price.",
      },
      {
        q: "Is this GST Calculator free?",
        a: "Yes — completely free, no signup, works on mobile and desktop, and supports both Hindi and English.",
      },
    ],
  },
  {
    slug: "income-tax-calculator",
    kind: "tool",
    targetId: "income-tax",
    title: "Income Tax Calculator India 2025-26 — Old vs New Regime | Ravomix",
    description:
      "Estimate your Indian income tax for FY 2025-26 under the old and new regime. Free Income Tax Calculator with slab-wise breakdown, deductions and cess.",
    h1: "Income Tax Calculator (FY 2025-26)",
    h1Hi: "आयकर कैलकुलेटर भारत",
    intro:
      "Estimate your Indian income tax liability for FY 2025-26 with Ravomix's free Income Tax Calculator. Enter your annual salary and deductions to see slab-wise tax under both the old regime and the new regime, including health & education cess. Useful for salaried employees, freelancers and consultants who want to plan investments under Section 80C, 80D and 80CCD before filing their ITR.",
    introHi:
      "Ravomix आयकर कैलकुलेटर से FY 2025-26 के लिए old regime और new regime में अपनी टैक्स देनदारी निकालें। सेक्शन 80C, 80D के तहत निवेश की योजना बनाने में मदद।",
    keywords: ["income tax calculator", "new regime", "old regime", "ITR 2026", "आयकर कैलकुलेटर"],
    related: ["gst-calculator", "sip-calculator", "emi-calculator"],
    faqs: [
      {
        q: "What is the new tax regime for FY 2025-26?",
        a: "The new regime offers lower slab rates but disallows most exemptions and deductions (except standard deduction and employer NPS contribution under 80CCD(2)). It is the default regime unless you opt for the old one.",
      },
      {
        q: "Which regime is better, old or new?",
        a: "It depends on your deductions. If you claim significant 80C/80D/HRA/home loan interest, the old regime often saves more. Otherwise, the simpler new regime usually wins.",
      },
      {
        q: "Does the calculator include cess?",
        a: "Yes — a 4% Health & Education Cess is added to the computed tax before showing the final liability.",
      },
      {
        q: "Is this Income Tax Calculator free?",
        a: "Yes, it is completely free and gives a realistic estimate. For final filing, always cross-check with a chartered accountant or the official Income Tax portal.",
      },
    ],
  },
  {
    slug: "sip-calculator",
    kind: "tool",
    targetId: "sip",
    title: "SIP Calculator — Mutual Fund Returns | Ravomix",
    description:
      "Plan your mutual fund SIP with Ravomix's free SIP Calculator. Enter monthly amount, expected return and tenure to see maturity value and total wealth gained.",
    h1: "SIP Calculator — Mutual Fund Returns",
    h1Hi: "SIP कैलकुलेटर — म्यूचुअल फंड",
    intro:
      "Ravomix's free SIP Calculator helps you plan systematic investments in mutual funds. Enter your monthly SIP amount, expected annual return and investment tenure — you'll instantly see the future value, total invested amount and wealth gained. Perfect for first-time investors, retirement planning and goal-based saving for education, marriage or buying a home.",
    introHi:
      "Ravomix SIP कैलकुलेटर से अपने मासिक SIP की maturity value, कुल निवेश और कुल लाभ तुरंत निकालें। retirement और goal-based saving के लिए आदर्श।",
    keywords: ["sip calculator", "mutual fund", "monthly sip", "SIP कैलकुलेटर"],
    related: ["emi-calculator", "income-tax-calculator", "gst-calculator"],
    faqs: [
      {
        q: "How does an SIP work?",
        a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount each month into a mutual fund. Over time, rupee-cost averaging and compounding can build significant wealth.",
      },
      {
        q: "What returns can I expect from an SIP?",
        a: "Equity mutual funds historically deliver 10-14% CAGR over long periods, but returns are market-linked and not guaranteed.",
      },
      {
        q: "Is the SIP Calculator accurate?",
        a: "It uses the standard SIP future-value formula and gives a precise mathematical estimate. Actual returns depend on the fund's performance.",
      },
      {
        q: "Is it free to use?",
        a: "Yes — free, no login, works on mobile in Hindi and English.",
      },
    ],
  },

  // ---------- APPLICATIONS ----------
  {
    slug: "work-from-home-request-letter",
    kind: "application",
    targetId: "wfh",
    title: "Work From Home Request Letter — Format & Sample | Ravomix",
    description:
      "Free Work From Home request letter format with editable sample. Polite, professional WFH application for employees in India. PDF download in Hindi & English.",
    h1: "Work From Home Request Letter",
    h1Hi: "घर से काम करने के लिए आवेदन",
    intro:
      "Need to request work from home from your manager or HR? Ravomix gives you a ready-made Work From Home request letter that is professional, polite and short. Fill in your name, designation, reason (health, family, commute) and the dates — your formatted letter is generated instantly and can be downloaded as a PDF or shared. Suitable for IT, corporate, BPO and government employees in India.",
    introHi:
      "अपने मैनेजर या HR को घर से काम (WFH) के लिए विनम्र और प्रोफेशनल आवेदन भेजें। नाम, पद, कारण और तारीखें भरें — फॉर्मेटेड पत्र तुरंत PDF में डाउनलोड करें।",
    keywords: ["work from home letter", "wfh request", "remote work application", "WFH आवेदन"],
    related: ["leave-application", "resignation-letter", "salary-increase-letter"],
    faqs: [
      {
        q: "How do I write a work from home request letter?",
        a: "Address it to your manager/HR, state the duration you want to work remotely, give a clear reason, mention how you'll stay reachable, and close politely. Ravomix's template does this automatically.",
      },
      {
        q: "Should I mention the reason for WFH?",
        a: "Yes. Genuine reasons (medical, family emergency, long commute, infrastructure issues) help your manager approve quickly.",
      },
      {
        q: "Can I download the letter as a PDF?",
        a: "Yes — preview the letter and tap Download to save it as a PDF, or use Share to send via WhatsApp or email.",
      },
      {
        q: "Is the WFH letter available in Hindi?",
        a: "Yes, switch the document language to Hindi for a fully translated version.",
      },
    ],
  },
  {
    slug: "leave-application",
    kind: "application",
    targetId: "leave-employee",
    title: "Leave Application Letter — Office, School, Sick Leave | Ravomix",
    description:
      "Free leave application format for office, school and college. Sick leave, casual leave and earned leave samples in Hindi & English. PDF download.",
    h1: "Leave Application — Office, School & College",
    h1Hi: "अवकाश के लिए प्रार्थना पत्र",
    intro:
      "Write a polite leave application in minutes with Ravomix. Whether you need sick leave, casual leave, earned leave or a school leave letter for parents, fill in your name, dates and reason — a properly formatted letter is generated instantly. Templates cover office employees, college students and school students in both Hindi and English, ready to download as a PDF or share on WhatsApp.",
    introHi:
      "ऑफिस, स्कूल या कॉलेज के लिए अवकाश पत्र (sick leave, casual leave) तुरंत बनाएं। नाम, तारीख और कारण भरें — Hindi/English में PDF डाउनलोड करें।",
    keywords: ["leave application", "sick leave letter", "school leave", "अवकाश आवेदन"],
    related: ["work-from-home-request-letter", "resignation-letter", "salary-increase-letter"],
    faqs: [
      {
        q: "How to write a leave application for office?",
        a: "Address it to your reporting manager, mention the leave type (sick/casual/earned), state the dates, give a brief reason, and offer a handover plan. Use Ravomix's template to auto-generate this format.",
      },
      {
        q: "What is the format of a school leave application?",
        a: "Address it to the Principal/Class Teacher, mention the student's name, class, section, leave dates and reason, and close with a parent/guardian signature.",
      },
      {
        q: "Can I use this for medical/sick leave?",
        a: "Yes. Choose 'medical leave' as the reason and attach a doctor's certificate if your organisation requires one.",
      },
      {
        q: "Is the leave letter free?",
        a: "Yes, completely free, no signup required, available in Hindi and English.",
      },
    ],
  },
  {
    slug: "resignation-letter",
    kind: "application",
    targetId: "resignation",
    title: "Resignation Letter Format India — Free Sample | Ravomix",
    description:
      "Professional resignation letter format with notice period, last working day and thank-you note. Free editable template in Hindi & English. PDF download.",
    h1: "Resignation Letter — Professional Format",
    h1Hi: "इस्तीफा पत्र (Resignation Letter)",
    intro:
      "Plan to leave your job? Ravomix's free resignation letter template helps you exit gracefully. Enter your name, designation, notice period and last working day — a respectful, professionally worded letter is generated for you to download as a PDF. Suitable for IT engineers, government employees, teachers and BPO staff across India, with both Hindi and English versions.",
    introHi:
      "नौकरी छोड़ने के लिए विनम्र और प्रोफेशनल resignation letter तुरंत बनाएं। नोटिस पीरियड, अंतिम कार्य दिवस और thank-you नोट के साथ।",
    keywords: ["resignation letter", "job resignation format", "इस्तीफा पत्र"],
    related: ["leave-application", "work-from-home-request-letter", "salary-increase-letter"],
    faqs: [
      {
        q: "How should I word a resignation letter?",
        a: "Keep it short and respectful: state your intention to resign, your last working day (per notice period), thank the employer for the opportunity, and offer to assist with handover.",
      },
      {
        q: "What notice period should I mention?",
        a: "Mention the notice period from your offer letter (commonly 30, 60 or 90 days) and the exact last working day calculated from your resignation date.",
      },
      {
        q: "Should I give a reason for resigning?",
        a: "It's optional. Common reasons include career growth, higher studies, personal/family reasons or relocation. Keep it positive.",
      },
      {
        q: "Is this resignation letter legally valid?",
        a: "Yes, it serves as written notice. For full legal compliance, follow the notice and exit formalities defined in your employment contract.",
      },
    ],
  },
  {
    slug: "salary-increase-letter",
    kind: "application",
    targetId: "salary-increase",
    title: "Salary Increase Request Letter — Format & Sample | Ravomix",
    description:
      "Free salary hike / increment request letter format. Professional template to justify your raise based on performance and market. Hindi & English PDF.",
    h1: "Salary Increase / Increment Request Letter",
    h1Hi: "वेतन वृद्धि के लिए आवेदन",
    intro:
      "Asking for a raise? Ravomix's free salary increase request letter helps you make a strong, polite case to your manager or HR. Fill in your name, designation, tenure, current salary, expected salary and key achievements — a confident, professionally worded letter is generated and ready for download or sharing. Available in Hindi and English.",
    introHi:
      "अपने मैनेजर या HR को वेतन वृद्धि (increment) के लिए विनम्र और मजबूत आवेदन भेजें। उपलब्धियों और अनुभव के आधार पर तुरंत letter तैयार।",
    keywords: ["salary increase letter", "increment request", "वेतन वृद्धि आवेदन"],
    related: ["resignation-letter", "leave-application", "work-from-home-request-letter"],
    faqs: [
      {
        q: "How do I ask for a salary increase in writing?",
        a: "Highlight your contributions, projects delivered, additional responsibilities and current market salary for your role. Be specific about the increment you're requesting.",
      },
      {
        q: "When is the best time to send a salary hike letter?",
        a: "Around appraisal cycles, after completing a major project, or after gaining a new certification or qualification.",
      },
      {
        q: "Should I mention market salary?",
        a: "Yes, referencing fair market salary (e.g. from job portals) strengthens your case without sounding aggressive.",
      },
      {
        q: "Is this letter free?",
        a: "Yes — free, no login, available in Hindi and English.",
      },
    ],
  },

  // ---------- COMPLAINTS ----------
  {
    slug: "bank-complaint-letter",
    kind: "complaint",
    targetId: "bank-complaint",
    title: "Bank Complaint Letter — Banking Ombudsman Format | Ravomix",
    description:
      "Free bank complaint letter format for unauthorised charges, poor service, ATM issues and ombudsman escalation. PDF download in Hindi & English.",
    h1: "Bank Complaint Letter (Branch & Ombudsman)",
    h1Hi: "बैंक के विरुद्ध शिकायत पत्र",
    intro:
      "File a strong, formal complaint against your bank using Ravomix's free Bank Complaint Letter template. Cover unauthorised charges, failed transactions, ATM disputes, hidden fees or poor service. Enter your bank account details, branch, issue date and what you want resolved — a properly formatted letter is generated for submission to the branch manager and, if needed, escalation to the RBI Banking Ombudsman.",
    introHi:
      "अनधिकृत चार्ज, failed transaction, ATM समस्या या खराब सेवा के लिए बैंक के विरुद्ध औपचारिक शिकायत पत्र तुरंत बनाएं। शाखा प्रबंधक और RBI Banking Ombudsman दोनों के लिए उपयुक्त।",
    keywords: ["bank complaint", "banking ombudsman", "rbi complaint", "बैंक शिकायत"],
    related: ["consumer-complaint", "cyber-fraud-complaint", "rti-application"],
    faqs: [
      {
        q: "How do I file a complaint against a bank in India?",
        a: "First send a written complaint to the branch manager. If unresolved in 30 days, escalate to the bank's nodal officer, and then to the RBI Banking Ombudsman via cms.rbi.org.in.",
      },
      {
        q: "What details should the complaint letter include?",
        a: "Your name, account number, branch, date of issue, clear description of the problem, supporting transaction IDs, and the resolution you are seeking.",
      },
      {
        q: "Is there a fee to complain to the Banking Ombudsman?",
        a: "No, the RBI Banking Ombudsman scheme is completely free for customers.",
      },
      {
        q: "How long does it take to resolve a bank complaint?",
        a: "Banks are expected to respond within 30 days. The Ombudsman typically resolves cases within 60-90 days.",
      },
    ],
  },
  {
    slug: "cyber-fraud-complaint",
    kind: "complaint",
    targetId: "cyber-fraud",
    title: "Cyber Fraud Complaint Letter — Online Fraud Format | Ravomix",
    description:
      "Free cyber fraud complaint letter format for UPI, credit card, OTP and online scam victims. File on cybercrime.gov.in. PDF in Hindi & English.",
    h1: "Cyber Fraud Complaint Letter",
    h1Hi: "साइबर धोखाधड़ी शिकायत पत्र",
    intro:
      "If you've been a victim of online fraud — UPI scam, OTP fraud, fake e-commerce, credit card phishing or social media impersonation — act fast. Ravomix's free Cyber Fraud Complaint Letter template helps you draft a clear, evidence-based complaint to the local cyber cell, bank and the National Cyber Crime Reporting Portal (cybercrime.gov.in). Hindi and English supported.",
    introHi:
      "UPI scam, OTP fraud, online shopping धोखा या phishing के शिकार हैं? Ravomix से तुरंत साइबर अपराध शिकायत पत्र बनाएं — स्थानीय cyber cell, बैंक और cybercrime.gov.in के लिए उपयुक्त।",
    keywords: ["cyber fraud complaint", "online fraud letter", "upi scam", "साइबर अपराध शिकायत"],
    related: ["bank-complaint-letter", "consumer-complaint", "rti-application"],
    faqs: [
      {
        q: "Where do I report cyber fraud in India?",
        a: "Call 1930 immediately, then file at cybercrime.gov.in. Also inform your bank to block transactions and freeze the suspect account.",
      },
      {
        q: "What evidence should I attach?",
        a: "Screenshots of the fraud message, transaction IDs, UPI/UTR numbers, bank SMS, caller numbers and any communication with the fraudster.",
      },
      {
        q: "Will I get my money back?",
        a: "If you report within 24 hours (the 'golden hour'), banks can often reverse UPI/card transactions. The earlier you report, the higher the chance of recovery.",
      },
      {
        q: "Is the cybercrime complaint free?",
        a: "Yes. Filing at cybercrime.gov.in and calling 1930 are completely free.",
      },
    ],
  },
  {
    slug: "consumer-complaint",
    kind: "complaint",
    targetId: "consumer-court-complaint",
    title: "Consumer Complaint Letter — Consumer Court Format | Ravomix",
    description:
      "Free consumer complaint letter format for defective products, refund, service deficiency. Under Consumer Protection Act 2019. PDF in Hindi & English.",
    h1: "Consumer Complaint Letter (Consumer Court)",
    h1Hi: "उपभोक्ता शिकायत पत्र",
    intro:
      "Got a defective product, unfair charge or poor service? Ravomix's free Consumer Complaint Letter template helps you assert your rights under the Consumer Protection Act, 2019. Address the seller/service provider first, then escalate to the District, State or National Consumer Disputes Redressal Commission. Add invoice details, payment proof, the deficiency and the relief you want — a court-style letter is ready in seconds.",
    introHi:
      "खराब प्रोडक्ट, धोखाधड़ी या सेवा में कमी हो? उपभोक्ता संरक्षण अधिनियम 2019 के तहत मुफ्त उपभोक्ता शिकायत पत्र बनाएं — विक्रेता, जिला आयोग या राष्ट्रीय आयोग के लिए।",
    keywords: ["consumer complaint", "consumer court letter", "उपभोक्ता शिकायत"],
    related: ["bank-complaint-letter", "cyber-fraud-complaint", "rti-application"],
    faqs: [
      {
        q: "Where do I file a consumer complaint?",
        a: "For claims up to ₹1 crore, file at the District Consumer Disputes Redressal Commission. Higher claims go to the State (up to ₹10 cr) or National Commission (above ₹10 cr). You can also file online at edaakhil.nic.in.",
      },
      {
        q: "Is there a court fee for consumer complaints?",
        a: "Yes, but fees are nominal — typically ₹100 to ₹5,000 depending on the value of the claim.",
      },
      {
        q: "What documents do I need?",
        a: "Invoice/bill, payment proof, warranty card, photographs/screenshots of the defect, and copies of all correspondence with the seller.",
      },
      {
        q: "How long do I have to file a complaint?",
        a: "Generally within 2 years from the date the cause of action arose, under the Consumer Protection Act 2019.",
      },
    ],
  },
  {
    slug: "rti-application",
    kind: "application",
    targetId: "rti",
    title: "RTI Application Format India — Free Sample | Ravomix",
    description:
      "File an RTI application in 2 minutes. Free Right to Information format with PIO address, fee details and proper structure. Hindi & English PDF.",
    h1: "RTI Application — Right to Information",
    h1Hi: "RTI आवेदन पत्र",
    intro:
      "Use the Right to Information Act, 2005 to get answers from any government department. Ravomix's free RTI application template helps you draft a properly formatted application to the Public Information Officer (PIO) of any central, state or local body. Enter your name, address, the department, your questions and the period of information — your RTI is ready to print, pay the ₹10 fee and submit, or file online via rtionline.gov.in.",
    introHi:
      "सूचना का अधिकार अधिनियम 2005 के तहत किसी भी सरकारी विभाग से जानकारी पाने के लिए तुरंत RTI आवेदन बनाएं। PIO को संबोधित, ₹10 शुल्क के साथ।",
    keywords: ["rti application", "right to information", "rti format", "RTI आवेदन"],
    related: ["consumer-complaint", "bank-complaint-letter", "cyber-fraud-complaint"],
    faqs: [
      {
        q: "How do I file an RTI application?",
        a: "Address it to the Public Information Officer of the concerned department, state your questions clearly, attach ₹10 fee (postal order or IPO) and submit by post or in person. For central ministries, file online at rtionline.gov.in.",
      },
      {
        q: "What is the RTI application fee?",
        a: "₹10 for general applicants. People below the poverty line are exempt with valid proof.",
      },
      {
        q: "How long does an RTI take?",
        a: "The PIO must respond within 30 days (48 hours if it involves life or liberty). If not, you can appeal to the First Appellate Authority.",
      },
      {
        q: "Can I file RTI in Hindi?",
        a: "Yes. RTI can be filed in English, Hindi or the official language of the area where the application is made.",
      },
    ],
  },
];

export const slugMap: Record<string, SeoLanding> = Object.fromEntries(
  seoLandings.map((l) => [l.slug, l]),
);

export const getSeoLanding = (slug: string): SeoLanding | undefined => slugMap[slug];

export const getTargetPath = targetPath;
