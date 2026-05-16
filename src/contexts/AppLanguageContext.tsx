import { createContext, useContext, useState, ReactNode } from "react";

export type AppLang = 'en' | 'hi';

interface AppLanguageContextType {
  lang: AppLang;
  setLang: (lang: AppLang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<AppLang, string>> = {
  // Home
  'home.tagline': { en: 'Documents & utilities, worldwide.', hi: 'दस्तावेज़ और उपयोगिताएं, दुनिया भर में।' },
  'home.search': { en: 'Search applications, tools...', hi: 'एप्लिकेशन, टूल खोजें...' },
  'home.popular': { en: 'Popular Templates', hi: 'लोकप्रिय टेम्पलेट' },
  'home.more': { en: 'More', hi: 'और देखें' },
  'home.forms': { en: 'Forms', hi: 'फॉर्म' },
  'home.tools': { en: 'Tools', hi: 'टूल्स' },
  'home.online': { en: 'Online', hi: 'ऑनलाइन' },
  'home.templates': { en: 'templates', hi: 'टेम्पलेट' },

  // Categories
  'cat.applications': { en: 'Applications', hi: 'आवेदन' },
  'cat.complaints': { en: 'Complaints', hi: 'शिकायतें' },
  'cat.tools': { en: 'Tools', hi: 'टूल्स' },

  // Bottom Nav
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.apps': { en: 'Apps', hi: 'आवेदन' },
  'nav.complaints': { en: 'Complaints', hi: 'शिकायत' },
  'nav.tools': { en: 'Tools', hi: 'टूल्स' },

  // Quick Links
  'quick.spin': { en: 'Spin Wheel Game', hi: 'स्पिन व्हील गेम' },
  'quick.settings': { en: 'Settings', hi: 'सेटिंग्स' },
  'quick.about': { en: 'About', hi: 'हमारे बारे में' },
  'quick.privacy': { en: 'Privacy', hi: 'गोपनीयता' },

  // Application template titles (first 6)
  'tpl.leave-school': { en: 'Leave Application (School)', hi: 'छुट्टी आवेदन (स्कूल)' },
  'tpl.leave-college': { en: 'Leave Application (College)', hi: 'छुट्टी आवेदन (कॉलेज)' },
  'tpl.bonafide': { en: 'Bonafide Certificate Application', hi: 'बोनाफाइड प्रमाणपत्र आवेदन' },
  'tpl.character': { en: 'Character Certificate Application', hi: 'चरित्र प्रमाणपत्र आवेदन' },
  'tpl.tc': { en: 'Transfer Certificate Application', hi: 'स्थानांतरण प्रमाणपत्र आवेदन' },
  'tpl.fee-concession': { en: 'Fee Concession Application', hi: 'शुल्क रियायत आवेदन' },

  // Categories for templates
  'tplcat.school': { en: 'School / College', hi: 'स्कूल / कॉलेज' },

  // Disclaimer
  'disclaimer.title': { en: 'Disclaimer', hi: 'अस्वीकरण' },

  // Page headings
  'page.applications': { en: 'Applications', hi: 'आवेदन पत्र' },
  'page.complaints': { en: 'Complaints', hi: 'शिकायत पत्र' },
  'disclaimer.text': {
    en: 'This app generates document templates for guidance and personal convenience only. Ravomix provides 200+ application and complaint templates (School/College, Office, Bank, Government, Advocate/Legal, CA/Finance, Postal/Courier, Startup/Business) along with 50+ utility tools. Ravomix is NOT affiliated with or endorsed by any government authority, bank, court, law firm, chartered accountant, postal service, or any official institution. Generated documents do not constitute professional legal, financial, tax, or administrative advice. Users should verify all details and consult a qualified professional before official submission.',
    hi: 'यह ऐप केवल मार्गदर्शन और व्यक्तिगत सुविधा के लिए दस्तावेज़ टेम्पलेट बनाता है। Ravomix 200+ आवेदन और शिकायत टेम्पलेट (स्कूल/कॉलेज, ऑफिस, बैंक, सरकारी, अधिवक्ता/कानूनी, CA/वित्त, डाक/कूरियर, स्टार्टअप/व्यापार) के साथ 50+ उपयोगिता टूल प्रदान करता है। Ravomix किसी भी सरकारी प्राधिकरण, बैंक, न्यायालय, कानूनी फर्म, चार्टर्ड एकाउंटेंट, डाक सेवा या किसी आधिकारिक संस्थान से संबद्ध या समर्थित नहीं है। उत्पन्न दस्तावेज़ पेशेवर कानूनी, वित्तीय, कर या प्रशासनिक सलाह नहीं हैं। उपयोगकर्ताओं को आधिकारिक जमा से पहले सभी विवरण सत्यापित करने और किसी योग्य पेशेवर से परामर्श लेना चाहिए।',
  },

  // Filter tabs
  'filter.all': { en: 'All', hi: 'सभी' },
  'filter.apps': { en: 'Apps', hi: 'आवेदन' },
  'filter.complaints': { en: 'Complaints', hi: 'शिकायत' },
  'filter.tools': { en: 'Tools', hi: 'टूल्स' },

  // Privacy Page
  'privacy.title': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  'privacy.updated': { en: 'Last updated: April 8, 2026', hi: 'अंतिम अपडेट: 8 अप्रैल 2026' },
  'privacy.h1': { en: '1. Introduction', hi: '1. परिचय' },
  'privacy.p1': {
    en: 'Ravomix ("we", "our", or "us") is an all-in-one online cloud-powered document and utility toolkit. This Privacy Policy explains how we handle information when you use our application ("App"). An active internet connection is required to access and process document templates. By using Ravomix, you agree to the practices described in this policy.',
    hi: 'Ravomix ("हम", "हमारा") एक ऑल-इन-वन ऑनलाइन क्लाउड-संचालित दस्तावेज़ और उपयोगिता टूलकिट है। यह गोपनीयता नीति बताती है कि जब आप हमारे ऐप्लिकेशन ("ऐप") का उपयोग करते हैं तो हम जानकारी कैसे संभालते हैं। दस्तावेज़ टेम्पलेट तक पहुँचने के लिए सक्रिय इंटरनेट कनेक्शन आवश्यक है। Ravomix का उपयोग करके, आप इस नीति में वर्णित प्रथाओं से सहमत होते हैं।',
  },
  'privacy.h2': { en: '2. Data We Collect for Advertising & Analytics', hi: '2. विज्ञापन और एनालिटिक्स के लिए एकत्र किया गया डेटा' },
  'privacy.p2': {
    en: 'This website uses Google AdSense, a service provided by Google Inc., to display advertisements. Google AdSense may use cookies and similar technologies to serve ads based on users\' previous visits to this website or other websites. Users may opt out of personalized advertising by visiting Google\'s Ads Settings (https://adssettings.google.com).\n\nWe do NOT collect, store, or transmit any personal form data you enter (names, addresses, complaint details) to external servers.',
    hi: 'यह वेबसाइट विज्ञापन प्रदर्शित करने के लिए Google Inc. द्वारा प्रदान की गई सेवा Google AdSense का उपयोग करती है। Google AdSense इस वेबसाइट या अन्य वेबसाइटों पर उपयोगकर्ताओं की पिछली विज़िट के आधार पर विज्ञापन दिखाने के लिए कुकीज़ और समान तकनीकों का उपयोग कर सकता है। उपयोगकर्ता Google की विज्ञापन सेटिंग्स पर जाकर वैयक्तिकृत विज्ञापन से ऑप्ट आउट कर सकते हैं।\n\nहम आपके द्वारा दर्ज किया गया कोई भी व्यक्तिगत फॉर्म डेटा (नाम, पते, शिकायत विवरण) बाहरी सर्वर पर एकत्र, संग्रहीत या प्रेषित नहीं करते।',
  },
  'privacy.h3': { en: '3. Personal Form Data & Privacy Guarantee', hi: '3. व्यक्तिगत फॉर्म डेटा और गोपनीयता गारंटी' },
  'privacy.p3': {
    en: 'Personal information you enter into application forms and complaint templates (such as your name, address, phone number, or complaint details) is used exclusively for document generation on your device. This data is stored locally in your browser\'s storage and is NEVER uploaded, shared, or transmitted to our servers or any third party. Your form data remains 100% under your control.',
    hi: 'आवेदन फॉर्म और शिकायत टेम्पलेट में आपके द्वारा दर्ज की गई व्यक्तिगत जानकारी (जैसे आपका नाम, पता, फ़ोन नंबर, या शिकायत विवरण) केवल आपके डिवाइस पर दस्तावेज़ निर्माण के लिए उपयोग की जाती है। यह डेटा आपके ब्राउज़र के स्टोरेज में स्थानीय रूप से संग्रहीत है और कभी भी हमारे सर्वर या किसी तृतीय पक्ष को अपलोड, साझा या प्रेषित नहीं किया जाता। आपका फॉर्म डेटा 100% आपके नियंत्रण में रहता है।',
  },
  'privacy.h4': { en: '4. App Features & Data Usage', hi: '4. ऐप सुविधाएं और डेटा उपयोग' },
  'privacy.p4': {
    en: 'Ravomix provides the following features: (a) Document Generation — A comprehensive library of templates including application forms and complaint templates across multiple categories: School / College, Office / Workplace, Bank / Financial, Government / Civic, Advocate / Legal (bail, vakalatnama, affidavit, court petitions, divorce, custody), CA / Finance (ITR, GST, TDS, PAN, audit, MSME, company registration), Postal / Courier (lost parcel, delays, address change, Speed Post), and Startup / Business (startup registration, trade license, shop act). (b) Utility Tools — GST, EMI, SIP/FD/PPF/RD calculators, income tax estimator, currency converter, password generator, BMI, unit converters, and more. (c) Spin Wheel Game — Entertainment feature. (d) Dark Mode & Language Support — English (US/UK) and Hindi. An internet connection is required to access cloud-powered features and serve advertisements.',
    hi: 'Ravomix निम्नलिखित सुविधाएं प्रदान करता है: (a) दस्तावेज़ निर्माण — कई श्रेणियों में आवेदन फॉर्म और शिकायत टेम्पलेट: स्कूल / कॉलेज, ऑफिस / कार्यस्थल, बैंक / वित्तीय, सरकारी / नागरिक, अधिवक्ता / कानूनी (जमानत, वकालतनामा, शपथपत्र, न्यायालय याचिका, तलाक, अभिरक्षा), CA / वित्त (ITR, GST, TDS, PAN, ऑडिट, MSME, कंपनी पंजीकरण), डाक / कूरियर (खोया पार्सल, देरी, पता परिवर्तन, स्पीड पोस्ट), और स्टार्टअप / व्यापार (स्टार्टअप पंजीकरण, व्यापार लाइसेंस, शॉप एक्ट)। (b) उपयोगिता उपकरण — GST, EMI, SIP/FD/PPF/RD कैलकुलेटर, आयकर अनुमानक, मुद्रा कनवर्टर, पासवर्ड जनरेटर, BMI, यूनिट कनवर्टर आदि। (c) स्पिन व्हील गेम — मनोरंजन सुविधा। (d) डार्क मोड और भाषा समर्थन — अंग्रेज़ी (US/UK) और हिंदी। क्लाउड-संचालित सुविधाओं और विज्ञापन प्रदर्शित करने के लिए इंटरनेट कनेक्शन आवश्यक है।',
  },
  'privacy.h5': { en: '5. Local Storage', hi: '5. लोकल स्टोरेज' },
  'privacy.p5': { en: 'Ravomix uses your device\'s local storage to save: user preferences (theme, language), saved documents, spin wheel status, and disclaimer acceptance. This data is stored entirely on your device and can be cleared at any time through the app\'s Settings > Clear All Data option.', hi: 'Ravomix आपके डिवाइस के लोकल स्टोरेज का उपयोग इन चीज़ों को सहेजने के लिए करता है: उपयोगकर्ता प्राथमिकताएं (थीम, भाषा), सहेजे गए दस्तावेज़, स्पिन व्हील स्थिति, और अस्वीकरण स्वीकृति।' },
  'privacy.h6': { en: '6. Google AdSense — Advertising Disclosure', hi: '6. Google AdSense — विज्ञापन प्रकटीकरण' },
  'privacy.p6': { en: 'Advertisements displayed on this website are provided by Google AdSense. These ads help support the maintenance and development of the platform. Google AdSense may collect and share device information (cookies, browser type, IP address) as described in Google\'s Privacy Policy (https://policies.google.com/privacy).', hi: 'इस वेबसाइट पर प्रदर्शित विज्ञापन Google AdSense द्वारा प्रदान किए जाते हैं। ये विज्ञापन प्लेटफ़ॉर्म के रखरखाव और विकास में सहायता करते हैं। Google AdSense डिवाइस जानकारी (कुकीज़, ब्राउज़र प्रकार, IP पता) एकत्र और साझा कर सकता है जैसा कि Google की गोपनीयता नीति में वर्णित है।' },
  'privacy.h7': { en: '7. Children\'s Privacy', hi: '7. बच्चों की गोपनीयता' },
  'privacy.p7': { en: 'Ravomix is designed for general audiences and does not knowingly collect personal information from children under the age of 13. The app does not require account creation or login.', hi: 'Ravomix सामान्य दर्शकों के लिए डिज़ाइन किया गया है और जानबूझकर 13 वर्ष से कम उम्र के बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करता।' },
  'privacy.h8': { en: '8. Data Security', hi: '8. डेटा सुरक्षा' },
  'privacy.p8': { en: 'Personal form data remains on your device and is never transmitted to external servers. We recommend keeping your device secured with a screen lock and keeping your operating system updated. For advertising data, Google applies its own security measures as per its policies.', hi: 'व्यक्तिगत फॉर्म डेटा आपके डिवाइस पर रहता है और कभी बाहरी सर्वर पर प्रेषित नहीं होता। विज्ञापन डेटा के लिए, Google अपनी नीतियों के अनुसार अपने सुरक्षा उपाय लागू करता है।' },
  'privacy.h9': { en: '9. User Rights', hi: '9. उपयोगकर्ता अधिकार' },
  'privacy.p9': { en: 'You have full control over your local data. You can view, modify, or delete any data stored by the app at any time through Settings > Clear All Data. For advertising preferences, you can opt out of personalized ads through your device\'s advertising settings.', hi: 'आपके स्थानीय डेटा पर आपका पूर्ण नियंत्रण है। आप सेटिंग्स > सारा डेटा मिटाएं के माध्यम से ऐप द्वारा संग्रहीत किसी भी डेटा को किसी भी समय देख, संशोधित या हटा सकते हैं।' },
  'privacy.h10': { en: '10. Changes to This Policy', hi: '10. इस नीति में बदलाव' },
  'privacy.p10': { en: 'We may update this Privacy Policy from time to time. Any changes will be reflected within the app with an updated date. Continued use of the app after changes constitutes acceptance of the updated policy. For questions, contact us at: Ravomixsupport@gmail.com', hi: 'हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। प्रश्नों के लिए हमसे संपर्क करें: Ravomixsupport@gmail.com' },
  'privacy.h11': { en: '11. Legal Disclaimer', hi: '11. कानूनी अस्वीकरण' },
  'privacy.p11': { en: 'Ravomix generates draft documents (templates) for guidance and personal convenience only. These documents do not constitute professional legal advice. This app is NOT affiliated with, endorsed by, or connected to any government authority, bank, court, or legal institution. Users should verify all details and consult qualified professionals before official submission. The user is solely responsible for the accuracy and use of all generated content.', hi: 'Ravomix केवल मार्गदर्शन और व्यक्तिगत सुविधा के लिए ड्राफ्ट दस्तावेज़ (टेम्पलेट) बनाता है। ये दस्तावेज़ पेशेवर कानूनी सलाह नहीं हैं। यह ऐप किसी भी सरकारी प्राधिकरण, बैंक, न्यायालय या कानूनी संस्थान से संबद्ध नहीं है। उपयोगकर्ताओं को आधिकारिक जमा से पहले सभी विवरण सत्यापित करने चाहिए।' },

  // About Page
  'about.title': { en: 'About Ravomix', hi: 'Ravomix के बारे में' },
  'about.desc': {
    en: 'Ravomix is a comprehensive digital assistant for daily documentation — proudly Made in India 🇮🇳 for the world. An online cloud-powered toolkit with 200+ ready-to-use document templates across School/College, Office, Bank, Government, Advocate/Legal, CA/Finance, Postal/Courier, and Startup/Business categories — plus 50+ utility tools (GST, EMI, SIP, tax, converters, and more). Designed for students, professionals, lawyers, chartered accountants, business owners, and global users, Ravomix supports English (US & UK) and Hindi. An active internet connection is required to access all features.',
    hi: 'Ravomix दैनिक दस्तावेज़ीकरण के लिए एक व्यापक डिजिटल सहायक है — गर्व से भारत में बना 🇮🇳 दुनिया के लिए। एक ऑनलाइन क्लाउड-संचालित टूलकिट जिसमें स्कूल/कॉलेज, ऑफिस, बैंक, सरकारी, अधिवक्ता/कानूनी, CA/वित्त, डाक/कूरियर, और स्टार्टअप/व्यापार श्रेणियों में 200+ तैयार दस्तावेज़ टेम्पलेट हैं — साथ ही 50+ उपयोगिता टूल (GST, EMI, SIP, टैक्स, कनवर्टर आदि)। छात्रों, पेशेवरों, अधिवक्ताओं, चार्टर्ड एकाउंटेंट्स, व्यापार मालिकों और वैश्विक उपयोगकर्ताओं के लिए डिज़ाइन किया गया, Ravomix अंग्रेज़ी (US & UK) और हिंदी का समर्थन करता है।',
  },
  'about.madein': { en: 'Made in India 🇮🇳 for the World 🌍 — Cloud Powered', hi: 'भारत में बना 🇮🇳 दुनिया के लिए 🌍 — क्लाउड संचालित' },
  'about.features': { en: 'Key Features', hi: 'मुख्य विशेषताएं' },
  'about.feat1.title': { en: 'Document Templates', hi: 'दस्तावेज़ टेम्पलेट' },
  'about.feat1.desc': { en: 'Application forms and complaint templates — ready to use instantly.', hi: 'आवेदन फॉर्म और शिकायत टेम्पलेट — तुरंत उपयोग के लिए तैयार।' },
  'about.feat2.title': { en: 'Online Cloud-Powered', hi: 'ऑनलाइन क्लाउड-संचालित' },
  'about.feat2.desc': { en: 'Cloud-powered toolkit requiring an active internet connection. Personal form data stays on your device.', hi: 'क्लाउड-संचालित टूलकिट जिसके लिए सक्रिय इंटरनेट कनेक्शन आवश्यक है। व्यक्तिगत फॉर्म डेटा आपके डिवाइस पर रहता है।' },
  'about.feat3.title': { en: 'Global Standards', hi: 'वैश्विक मानक' },
  'about.feat3.desc': { en: 'Templates follow UK, US, and Indian formatting — suitable for international use.', hi: 'टेम्पलेट UK, US और भारतीय प्रारूप का पालन करते हैं — अंतर्राष्ट्रीय उपयोग के लिए उपयुक्त।' },
  'about.feat4.title': { en: 'Multi-Language Support', hi: 'बहु-भाषा समर्थन' },
  'about.feat4.desc': { en: 'Full support for English (US), English (UK), and Hindi — more languages coming soon.', hi: 'अंग्रेज़ी (US), अंग्रेज़ी (UK) और हिंदी के लिए पूर्ण समर्थन — और भाषाएं जल्द आ रही हैं।' },
  'about.feat5.title': { en: 'Instant Generation', hi: 'तुरंत निर्माण' },
  'about.feat5.desc': { en: 'No sign-ups required. Generate professional documents in seconds with an internet connection.', hi: 'कोई साइन-अप आवश्यक नहीं। इंटरनेट कनेक्शन के साथ सेकंडों में पेशेवर दस्तावेज़ बनाएं।' },
  'about.feat6.title': { en: 'Cloud Utility Toolkit', hi: 'क्लाउड उपयोगिता टूलकिट' },
  'about.feat6.desc': { en: 'Built-in GST calculator, EMI calculator, SIP/FD/PPF/RD calculators, income tax estimator, password generator, stopwatch, world clock, and many more productivity tools.', hi: 'बिल्ट-इन GST कैलकुलेटर, EMI कैलकुलेटर, SIP/FD/PPF/RD कैलकुलेटर, आयकर अनुमानक, पासवर्ड जनरेटर, स्टॉपवॉच, विश्व घड़ी और कई और प्रोडक्टिविटी टूल।' },
  'about.whofor': { en: 'Who Is Ravomix For?', hi: 'Ravomix किसके लिए है?' },
  'about.who1': { en: 'Students', hi: 'छात्र' },
  'about.who1.desc': { en: 'Leave applications, bonafide certificates, TC requests', hi: 'छुट्टी आवेदन, बोनाफाइड प्रमाणपत्र, TC अनुरोध' },
  'about.who2': { en: 'Business Owners', hi: 'व्यापार मालिक' },
  'about.who2.desc': { en: 'GST calculations, formal letters, professional documents', hi: 'GST गणना, औपचारिक पत्र, पेशेवर दस्तावेज़' },
  'about.who3': { en: 'Professionals', hi: 'पेशेवर' },
  'about.who3.desc': { en: 'Legal letters, complaint templates, formal correspondence', hi: 'कानूनी पत्र, शिकायत टेम्पलेट, औपचारिक पत्राचार' },
  'about.who4': { en: 'Global Users', hi: 'वैश्विक उपयोगकर्ता' },
  'about.who4.desc': { en: 'UK/US formatted documents, multi-language support', hi: 'UK/US प्रारूपित दस्तावेज़, बहु-भाषा समर्थन' },
  'about.whatcando': { en: 'What You Can Do', hi: 'आप क्या कर सकते हैं' },
  'about.disclaimer': { en: 'Disclaimer', hi: 'अस्वीकरण' },
  'about.disclaimer.text': { en: 'The documents generated by Ravomix are templates for guidance only and do not constitute professional legal advice. Users are responsible for verifying and adapting the content to their specific needs before official use. Ravomix does not guarantee the legal validity of any generated document. Always consult a qualified professional for legal or official matters.', hi: 'Ravomix द्वारा बनाए गए दस्तावेज़ केवल मार्गदर्शन के लिए टेम्पलेट हैं और पेशेवर कानूनी सलाह नहीं हैं। उपयोगकर्ता आधिकारिक उपयोग से पहले अपनी विशिष्ट आवश्यकताओं के अनुसार सामग्री की जांच और अनुकूलन के लिए जिम्मेदार हैं। कानूनी या आधिकारिक मामलों के लिए हमेशा किसी योग्य पेशेवर से परामर्श करें।' },

  // Settings Page
  'settings.title': { en: 'Settings', hi: 'सेटिंग्स' },
  'settings.subtitle': { en: 'Configure your profile & app', hi: 'अपनी प्रोफ़ाइल और ऐप सेटिंग करें' },
  'settings.profile': { en: 'Business Profile', hi: 'व्यापार प्रोफ़ाइल' },
  'settings.bizname': { en: 'Business / Your Name', hi: 'व्यापार / आपका नाम' },
  'settings.address': { en: 'Address', hi: 'पता' },
  'settings.phone': { en: 'Phone', hi: 'फ़ोन' },
  'settings.email': { en: 'Email', hi: 'ईमेल' },
  'settings.currency': { en: 'Default Currency', hi: 'डिफ़ॉल्ट मुद्रा' },
  'settings.removeLogo': { en: 'Remove Logo', hi: 'लोगो हटाएं' },
  'settings.savedLocal': { en: 'Saved locally on your device. Used for documents.', hi: 'आपके डिवाइस पर स्थानीय रूप से सहेजा गया। दस्तावेज़ों के लिए उपयोग किया जाता है।' },
  'settings.privacyLegal': { en: 'Privacy & Legal', hi: 'गोपनीयता और कानूनी' },
  'settings.privacyPolicy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  'settings.privacyDesc': { en: 'How we handle your data', hi: 'हम आपके डेटा को कैसे संभालते हैं' },
  'settings.app': { en: 'App', hi: 'ऐप' },
  'settings.share': { en: 'Share App', hi: 'ऐप शेयर करें' },
  'settings.shareDesc': { en: 'Recommend Ravomix to friends', hi: 'दोस्तों को Ravomix की सिफारिश करें' },
  'settings.rate': { en: 'Rate Us', hi: 'हमें रेट करें' },
  'settings.rateDesc': { en: 'Leave a review on Play Store', hi: 'Play Store पर समीक्षा दें' },
  'settings.clearAll': { en: 'Clear All Data', hi: 'सारा डेटा मिटाएं' },
  'settings.clearDesc': { en: 'Reset all saved documents & preferences', hi: 'सभी सहेजे गए दस्तावेज़ और प्राथमिकताएं रीसेट करें' },
  'settings.clearConfirm': { en: 'Are you sure? This will delete all saved documents, preferences, and profile data. This cannot be undone.', hi: 'क्या आप सुनिश्चित हैं? यह सभी सहेजे गए दस्तावेज़, प्राथमिकताएं और प्रोफ़ाइल डेटा हटा देगा। यह पूर्ववत नहीं किया जा सकता।' },
  'settings.privacyModal': { en: 'Ravomix — Privacy Policy', hi: 'Ravomix — गोपनीयता नीति' },
  'settings.privacyOnline': { en: 'Ravomix is an online cloud-powered utility toolkit. An active internet connection is required to access all features.', hi: 'Ravomix एक ऑनलाइन क्लाउड-संचालित उपयोगिता टूलकिट है। सभी सुविधाओं तक पहुँचने के लिए सक्रिय इंटरनेट कनेक्शन आवश्यक है।' },
  'settings.privacyLocal': { en: 'Personal form data (names, addresses, complaint details) stays on your device and is never shared with third parties.', hi: 'व्यक्तिगत फॉर्म डेटा (नाम, पते, शिकायत विवरण) आपके डिवाइस पर रहता है और तृतीय पक्षों के साथ साझा नहीं किया जाता।' },
  'settings.privacyAdSense': { en: 'This website uses Google AdSense for displaying advertisements. Cookies and similar technologies may be used to serve ads based on your browsing activity.', hi: 'यह वेबसाइट विज्ञापन प्रदर्शित करने के लिए Google AdSense का उपयोग करती है। आपकी ब्राउज़िंग गतिविधि के आधार पर विज्ञापन दिखाने के लिए कुकीज़ और समान तकनीकों का उपयोग किया जा सकता है।' },
  'settings.privacyFormData': { en: 'Personal information entered into forms/complaints is used only for document generation and is NOT shared with third parties.', hi: 'फॉर्म/शिकायतों में दर्ज व्यक्तिगत जानकारी केवल दस्तावेज़ निर्माण के लिए उपयोग की जाती है और तृतीय पक्षों के साथ साझा नहीं की जाती।' },
  'settings.understand': { en: 'I Understand', hi: 'मैं समझता/समझती हूँ' },
  'settings.fullPrivacy': { en: 'Full Privacy Policy', hi: 'पूर्ण गोपनीयता नीति' },
  'settings.fullPrivacyDesc': { en: 'Read the complete privacy policy', hi: 'पूर्ण गोपनीयता नीति पढ़ें' },
  'settings.aboutUs': { en: 'About Us', hi: 'हमारे बारे में' },
  'settings.aboutUsDesc': { en: 'Learn more about Ravomix — Made in India', hi: 'Ravomix के बारे में अधिक जानें — भारत में बना' },
  'settings.madeInIndia': { en: 'Made in India 🇮🇳', hi: 'भारत में बना 🇮🇳' },
  'settings.contactSupport': { en: 'Contact Support', hi: 'सहायता से संपर्क करें' },
  'settings.dataDeletion': { en: 'Data Deletion', hi: 'डेटा हटाएं' },
  'settings.dataDeletionDesc': { en: 'Delete all local data & learn more', hi: 'सभी स्थानीय डेटा हटाएं और अधिक जानें' },

  // Tools Page
  'tools.title': { en: 'Tools', hi: 'टूल्स' },
  'tools.search': { en: 'Search tools...', hi: 'टूल खोजें...' },
  'tools.notFound': { en: 'No tools found for', hi: 'कोई टूल नहीं मिला' },
  'tools.toolNotFound': { en: 'Tool not found', hi: 'टूल नहीं मिला' },
  'tools.comingSoon': { en: 'Coming soon', hi: 'जल्द आ रहा है' },

  // Form common (Application & Complaint forms)
  'form.edit': { en: 'Edit', hi: 'संपादन' },
  'form.preview': { en: 'Preview', hi: 'पूर्वावलोकन' },

  // Signature Pad
  'sig.label': { en: 'Signature', hi: 'हस्ताक्षर' },
  'sig.saved': { en: 'Saved', hi: 'सेव हो गया' },
  'sig.redraw': { en: 'Redraw Signature', hi: 'दोबारा हस्ताक्षर करें' },
  'sig.remove': { en: 'Remove', hi: 'हटाएं' },
  'sig.draw': { en: 'Draw Signature', hi: 'हस्ताक्षर करें' },
  'sig.drawHere': { en: 'Draw your signature here', hi: 'यहाँ अपना हस्ताक्षर करें' },
  'sig.save': { en: 'Save Signature', hi: 'हस्ताक्षर सेव करें' },
  'sig.clear': { en: 'Clear', hi: 'मिटाएं' },
  'sig.cancel': { en: 'Cancel', hi: 'रद्द करें' },

  // Share Actions
  'share.shareExport': { en: 'Share / Export', hi: 'शेयर / एक्सपोर्ट' },
  'share.exportShare': { en: 'Export & Share', hi: 'एक्सपोर्ट और शेयर' },
  'share.print': { en: 'Print', hi: 'प्रिंट' },
  'share.downloadPdf': { en: 'Share as PDF', hi: 'PDF शेयर करें' },
  'share.downloadRtf': { en: 'Share as DOC', hi: 'DOC शेयर करें' },
  'share.downloadTxt': { en: 'Download .TXT', hi: '.TXT डाउनलोड' },
  'share.whatsapp': { en: 'WhatsApp', hi: 'WhatsApp' },
  'share.email': { en: 'Email', hi: 'ईमेल' },
  'share.copy': { en: 'Copy Text', hi: 'टेक्स्ट कॉपी' },
  'share.copied': { en: 'Copied!', hi: 'कॉपी हो गया!' },
  'share.nativeShare': { en: 'More Apps', hi: 'अन्य ऐप्स' },

  // Document Preview
  'doc.phone': { en: 'Phone', hi: 'फ़ोन' },
  'doc.email': { en: 'Email', hi: 'ईमेल' },
  'doc.contact': { en: 'Contact', hi: 'संपर्क' },
  'doc.verifiedBy': { en: 'Electronically Verified by Ravomix', hi: 'Ravomix द्वारा इलेक्ट्रॉनिक रूप से सत्यापित' },
  'doc.generatedBy': { en: 'Generated by Ravomix', hi: 'Ravomix द्वारा बनाया गया' },

  // Branding
  'brand.generatedBy': { en: 'Generated by', hi: 'द्वारा बनाया गया' },
  'brand.removed': { en: 'Branding removed for this session', hi: 'इस सत्र के लिए ब्रांडिंग हटा दी गई' },

  // Terms of Service
  'tos.title': { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
  'tos.updated': { en: 'Last updated: April 2026', hi: 'अंतिम अपडेट: अप्रैल 2026' },
  'tos.h1': { en: '1. Acceptance of Terms', hi: '1. शर्तों की स्वीकृति' },
  'tos.p1': { en: 'By downloading, installing, or using the Ravomix application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.', hi: 'Ravomix एप्लिकेशन ("ऐप") को डाउनलोड, इंस्टॉल या उपयोग करके, आप इन सेवा की शर्तों ("शर्तें") से बाध्य होने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया ऐप का उपयोग न करें।' },
  'tos.h2': { en: '2. Description of Service', hi: '2. सेवा का विवरण' },
  'tos.p2': {
    en: 'Ravomix is an online cloud-powered document and utility toolkit that provides 200+ application and complaint templates across School/College, Office, Bank, Government, Advocate/Legal, CA/Finance, Postal/Courier, and Startup/Business categories, plus 50+ utility tools. The App requires an active internet connection to function. Generated documents are draft templates intended for personal use and guidance only and do not constitute legal, financial, tax or professional advice.',
    hi: 'Ravomix एक ऑनलाइन क्लाउड-संचालित दस्तावेज़ और उपयोगिता टूलकिट है जो स्कूल/कॉलेज, ऑफिस, बैंक, सरकारी, अधिवक्ता/कानूनी, CA/वित्त, डाक/कूरियर और स्टार्टअप/व्यापार श्रेणियों में 200+ आवेदन और शिकायत टेम्पलेट और 50+ उपयोगिता टूल प्रदान करता है। ऐप को कार्य करने के लिए सक्रिय इंटरनेट कनेक्शन की आवश्यकता होती है। उत्पन्न दस्तावेज़ केवल व्यक्तिगत उपयोग और मार्गदर्शन के लिए ड्राफ्ट टेम्पलेट हैं और कानूनी, वित्तीय, कर या पेशेवर सलाह नहीं हैं।',
  },
  'tos.h3': { en: '3. User Responsibilities', hi: '3. उपयोगकर्ता की जिम्मेदारियां' },
  'tos.p3': { en: 'You are solely responsible for the accuracy, completeness, and legality of any content you generate using the App. You agree not to use the App for any unlawful purpose, to impersonate any person or entity, or to submit false or misleading information in generated documents.', hi: 'आप ऐप का उपयोग करके उत्पन्न किसी भी सामग्री की सटीकता, पूर्णता और वैधता के लिए पूरी तरह से जिम्मेदार हैं। आप सहमत हैं कि ऐप का उपयोग किसी भी गैरकानूनी उद्देश्य के लिए, किसी व्यक्ति या संस्था का प्रतिरूपण करने के लिए, या उत्पन्न दस्तावेज़ों में गलत या भ्रामक जानकारी प्रस्तुत करने के लिए नहीं करेंगे।' },
  'tos.h4': { en: '4. Intellectual Property', hi: '4. बौद्धिक संपदा' },
  'tos.p4': { en: 'All content, design, logos, and code within Ravomix are the intellectual property of Ravomix and are protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any part of the App without prior written consent.', hi: 'Ravomix के भीतर सभी सामग्री, डिज़ाइन, लोगो और कोड Ravomix की बौद्धिक संपदा हैं और लागू कॉपीराइट और ट्रेडमार्क कानूनों द्वारा संरक्षित हैं। आप पूर्व लिखित सहमति के बिना ऐप के किसी भी हिस्से से पुनरुत्पादन, वितरण या व्युत्पन्न कार्य नहीं बना सकते।' },
  'tos.h5': { en: '5. Disclaimer of Warranties', hi: '5. वारंटी का अस्वीकरण' },
  'tos.p5': { en: 'The App is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Ravomix does not warrant that the App will be uninterrupted, error-free, or free of viruses. Generated documents are templates for guidance only and do not constitute professional legal, financial, or administrative advice.', hi: 'ऐप "जैसा है" और "जैसा उपलब्ध है" के आधार पर किसी भी प्रकार की वारंटी के बिना प्रदान किया जाता है, चाहे व्यक्त हो या निहित। Ravomix इस बात की गारंटी नहीं देता कि ऐप निर्बाध, त्रुटि-मुक्त या वायरस-मुक्त होगा। उत्पन्न दस्तावेज़ केवल मार्गदर्शन के लिए टेम्पलेट हैं और पेशेवर कानूनी, वित्तीय या प्रशासनिक सलाह नहीं हैं।' },
  'tos.h6': { en: '6. Limitation of Liability', hi: '6. दायित्व की सीमा' },
  'tos.p6': { en: 'In no event shall Ravomix be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the App. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.', hi: 'किसी भी स्थिति में Ravomix आपके ऐप के उपयोग से उत्पन्न या उससे संबंधित किसी भी अप्रत्यक्ष, आकस्मिक, विशेष, परिणामी या दंडात्मक क्षति के लिए उत्तरदायी नहीं होगा। इसमें लाभ, डेटा या अन्य अमूर्त हानियों के लिए क्षति शामिल है, लेकिन यह इन्हीं तक सीमित नहीं है।' },
  'tos.h7': { en: '7. Advertising & Monetization', hi: '7. विज्ञापन और मुद्रीकरण' },
  'tos.p7': { en: 'Ravomix is a free web application that displays advertisements through Google AdSense to support development and keep the platform free for users. By using the website, you consent to the display of ads and the use of cookies as described in our Privacy Policy.', hi: 'Ravomix एक मुफ्त वेब एप्लिकेशन है जो विकास का समर्थन करने और उपयोगकर्ताओं के लिए प्लेटफ़ॉर्म को मुफ्त रखने के लिए Google AdSense के माध्यम से विज्ञापन प्रदर्शित करता है। वेबसाइट का उपयोग करके, आप हमारी गोपनीयता नीति में वर्णित विज्ञापनों के प्रदर्शन और कुकीज़ के उपयोग के लिए सहमति देते हैं।' },
  'tos.h8': { en: '8. Modifications to Terms', hi: '8. शर्तों में संशोधन' },
  'tos.p8': { en: 'Ravomix reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the App after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.', hi: 'Ravomix किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखता है। परिवर्तन पोस्ट करने के तुरंत बाद प्रभावी होंगे। किसी भी परिवर्तन के बाद ऐप का आपका निरंतर उपयोग नई शर्तों की आपकी स्वीकृति माना जाएगा। हम आपको समय-समय पर इन शर्तों की समीक्षा करने के लिए प्रोत्साहित करते हैं।' },
  'tos.h9': { en: '9. Governing Law', hi: '9. शासी कानून' },
  'tos.p9': { en: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in India.', hi: 'ये शर्तें भारत के कानूनों के अनुसार शासित और व्याख्यायित होंगी। इन शर्तों के तहत उत्पन्न होने वाले किसी भी विवाद पर भारत के न्यायालयों का विशेष क्षेत्राधिकार होगा।' },
  'tos.h10': { en: '10. Contact Us', hi: '10. हमसे संपर्क करें' },
  'tos.p10': { en: 'If you have any questions or concerns about these Terms, please contact us at Ravomixsupport@gmail.com.', hi: 'यदि इन शर्तों के बारे में आपके कोई प्रश्न या चिंताएं हैं, तो कृपया हमसे Ravomixsupport@gmail.com पर संपर्क करें।' },

  // Settings TOS link
  'settings.tos': { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
  'settings.tosDesc': { en: 'Read full terms of use', hi: 'उपयोग की पूर्ण शर्तें पढ़ें' },

  // Data Deletion Page
  'dataDeletion.title': { en: 'Data Deletion', hi: 'डेटा हटाएं' },
  'dataDeletion.yourData': { en: 'Your Data, Your Control', hi: 'आपका डेटा, आपका नियंत्रण' },
  'dataDeletion.info1': { en: 'Ravomix does NOT collect, store, or transmit any personal data to external servers.', hi: 'Ravomix कोई भी व्यक्तिगत डेटा बाहरी सर्वर पर एकत्र, संग्रहीत या प्रेषित नहीं करता।' },
  'dataDeletion.info2': { en: 'All information you enter (names, addresses, form data, calculator inputs) is processed and stored entirely on your device using local browser storage.', hi: 'आपके द्वारा दर्ज की गई सभी जानकारी (नाम, पते, फॉर्म डेटा, कैलकुलेटर इनपुट) पूरी तरह से आपके डिवाइस पर स्थानीय ब्राउज़र स्टोरेज का उपयोग करके संसाधित और संग्रहीत की जाती है।' },
  'dataDeletion.info3': { en: 'Since no data is stored on our servers, there is no server-side data to delete. However, you can clear all locally stored data below.', hi: 'चूंकि हमारे सर्वर पर कोई डेटा संग्रहीत नहीं है, इसलिए सर्वर-साइड डेटा हटाने की आवश्यकता नहीं है। हालांकि, आप नीचे सभी स्थानीय रूप से संग्रहीत डेटा साफ़ कर सकते हैं।' },
  'dataDeletion.whatDeleted': { en: 'What gets deleted:', hi: 'क्या हटाया जाएगा:' },
  'dataDeletion.item1': { en: 'Saved form drafts and preferences', hi: 'सहेजे गए फॉर्म ड्राफ्ट और प्राथमिकताएं' },
  'dataDeletion.item2': { en: 'App settings and language preference', hi: 'ऐप सेटिंग्स और भाषा प्राथमिकता' },
  'dataDeletion.item3': { en: 'Disclaimer acceptance status', hi: 'अस्वीकरण स्वीकृति स्थिति' },
  'dataDeletion.item4': { en: 'All cached data and offline content', hi: 'सभी कैश्ड डेटा और ऑफ़लाइन सामग्री' },
  'dataDeletion.item5': { en: 'Debug mode settings', hi: 'डिबग मोड सेटिंग्स' },
  'dataDeletion.altMethods': { en: 'Alternative deletion methods:', hi: 'वैकल्पिक हटाने के तरीके:' },
  'dataDeletion.android': { en: 'Settings → Apps → Ravomix → Storage → Clear Data', hi: 'सेटिंग्स → ऐप्स → Ravomix → स्टोरेज → डेटा साफ़ करें' },
  'dataDeletion.browser': { en: 'Settings → Privacy → Clear Browsing Data → Cookies & Site Data', hi: 'सेटिंग्स → गोपनीयता → ब्राउज़िंग डेटा साफ़ करें → कुकीज़ और साइट डेटा' },
  'dataDeletion.inApp': { en: 'Use the button below or go to Settings → Clear All Data', hi: 'नीचे दिए गए बटन का उपयोग करें या सेटिंग्स → सारा डेटा मिटाएं पर जाएं' },
  'dataDeletion.deleteBtn': { en: 'Delete All Local Data', hi: 'सभी स्थानीय डेटा हटाएं' },
  'dataDeletion.confirm': { en: 'Are you sure you want to delete all locally stored data? This action cannot be undone.', hi: 'क्या आप सभी स्थानीय रूप से संग्रहीत डेटा हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।' },
  'dataDeletion.success': { en: 'All local data has been successfully deleted.', hi: 'सभी स्थानीय डेटा सफलतापूर्वक हटा दिया गया है।' },
  'dataDeletion.contactLabel': { en: 'Data deletion requests', hi: 'डेटा हटाने के अनुरोध' },
  'dataDeletion.compliance': { en: 'This page complies with Google Play Store data deletion requirements.', hi: 'यह पृष्ठ Google Play Store डेटा हटाने की आवश्यकताओं का पालन करता है।' },

  // Footer
  'footer.privacy': { en: 'Privacy', hi: 'गोपनीयता' },
  'footer.terms': { en: 'Terms', hi: 'शर्तें' },
  'footer.cookies': { en: 'Cookies', hi: 'कुकीज़' },
  'footer.dmca': { en: 'DMCA', hi: 'DMCA' },
  'footer.contact': { en: 'Contact', hi: 'संपर्क' },
  'footer.faq': { en: 'FAQ', hi: 'सवाल-जवाब' },
  'footer.sitemap': { en: 'Sitemap', hi: 'साइटमैप' },

  // Contact Page
  'contact.title': { en: 'Contact Us', hi: 'संपर्क करें' },
  'contact.email': { en: 'Email Support', hi: 'ईमेल सहायता' },
  'contact.note': { en: 'We respond within 24-48 hours.', hi: 'हम 24-48 घंटों में जवाब देते हैं।' },
  'contact.name': { en: 'Full Name', hi: 'पूरा नाम' },
  'contact.emailField': { en: 'Email Address', hi: 'ईमेल पता' },
  'contact.subject': { en: 'Subject', hi: 'विषय' },
  'contact.message': { en: 'Message', hi: 'संदेश' },
  'contact.send': { en: 'Send Message', hi: 'संदेश भेजें' },
  'contact.required': { en: 'Please fill in name, email and message.', hi: 'कृपया नाम, ईमेल और संदेश भरें।' },
  'contact.opened': { en: 'Opening your email app...', hi: 'आपका ईमेल ऐप खुल रहा है...' },
  'contact.failed': { en: 'Could not open email app. Please email us directly.', hi: 'ईमेल ऐप नहीं खुला। कृपया सीधे ईमेल करें।' },
  'contact.desc': { en: 'Contact Us', hi: 'संपर्क करें' },

  // FAQ Page
  'faq.title': { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले सवाल' },
  'faq.intro': { en: 'Quick answers to common questions about Ravomix.', hi: 'Ravomix के बारे में आम सवालों के जल्दी जवाब।' },
  'faq.desc': { en: 'Help & Support', hi: 'सहायता और समर्थन' },
  'faq.q1': { en: 'What is Ravomix?', hi: 'Ravomix क्या है?' },
  'faq.a1': { en: 'Ravomix is a free online toolkit that provides 200+ document templates (applications, complaints, legal, finance, postal, business) and 50+ utility tools (calculators, converters, generators) — all in one place.', hi: 'Ravomix एक मुफ्त ऑनलाइन टूलकिट है जो 200+ दस्तावेज़ टेम्पलेट (आवेदन, शिकायत, कानूनी, वित्त, डाक, व्यापार) और 50+ उपयोगिता टूल (कैलकुलेटर, कनवर्टर, जनरेटर) — सब एक जगह प्रदान करता है।' },
  'faq.q2': { en: 'Is Ravomix free to use?', hi: 'क्या Ravomix मुफ्त है?' },
  'faq.a2': { en: 'Yes — Ravomix is 100% free for all users. No subscription, no hidden charges, no login required. The platform is supported by non-intrusive Google AdSense advertising.', hi: 'हाँ — Ravomix सभी उपयोगकर्ताओं के लिए 100% मुफ्त है। कोई सदस्यता नहीं, कोई छिपा शुल्क नहीं, कोई लॉगिन आवश्यक नहीं। प्लेटफ़ॉर्म Google AdSense विज्ञापन से समर्थित है।' },
  'faq.q3': { en: 'Are my documents saved on your server?', hi: 'क्या मेरे दस्तावेज़ सर्वर पर सहेजे जाते हैं?' },
  'faq.a3': { en: 'No. All form data and generated documents stay on your device using your browser\'s local storage. Nothing is uploaded, shared, or transmitted to our servers.', hi: 'नहीं। सभी फॉर्म डेटा और बनाए गए दस्तावेज़ आपके डिवाइस पर ब्राउज़र के लोकल स्टोरेज में रहते हैं। कुछ भी हमारे सर्वर पर अपलोड, साझा या प्रेषित नहीं होता।' },
  'faq.q4': { en: 'Can I use Ravomix in Hindi and English?', hi: 'क्या मैं Ravomix को हिंदी और अंग्रेज़ी में उपयोग कर सकता हूँ?' },
  'faq.a4': { en: 'Yes. Ravomix fully supports both English and Hindi. You can switch the language anytime from the language toggle in the sidebar or settings.', hi: 'हाँ। Ravomix अंग्रेज़ी और हिंदी दोनों का पूरा समर्थन करता है। आप कभी भी साइडबार या सेटिंग्स से भाषा बदल सकते हैं।' },
  'faq.q5': { en: 'How do I download or share a generated document?', hi: 'मैं बनाए गए दस्तावेज़ को कैसे डाउनलोड या शेयर करूँ?' },
  'faq.a5': { en: 'After filling a form, tap Preview, then use the Download or Share buttons. Documents can be saved as PDF or shared via WhatsApp, Email, and other apps.', hi: 'फॉर्म भरने के बाद, प्रीव्यू पर टैप करें, फिर डाउनलोड या शेयर बटन का उपयोग करें। दस्तावेज़ PDF के रूप में सहेजे जा सकते हैं या WhatsApp, ईमेल आदि से शेयर किए जा सकते हैं।' },
  'faq.q6': { en: 'Is my personal data stored anywhere?', hi: 'क्या मेरा व्यक्तिगत डेटा कहीं संग्रहीत होता है?' },
  'faq.a6': { en: 'No personal data is stored on external servers. Only your local browser saves preferences (language, theme) and any drafts you create. You can clear everything anytime from Settings → Clear All Data.', hi: 'बाहरी सर्वर पर कोई व्यक्तिगत डेटा संग्रहीत नहीं होता। केवल आपका लोकल ब्राउज़र प्राथमिकताएं (भाषा, थीम) और ड्राफ्ट सहेजता है। आप कभी भी सेटिंग्स → सारा डेटा मिटाएं से सब हटा सकते हैं।' },
  'faq.q7': { en: 'Can I use Ravomix on mobile?', hi: 'क्या मैं Ravomix को मोबाइल पर उपयोग कर सकता हूँ?' },
  'faq.a7': { en: 'Absolutely. Ravomix is fully responsive and works on smartphones, tablets, and desktops. There\'s also a free Android app on the Google Play Store.', hi: 'बिल्कुल। Ravomix पूरी तरह से रिस्पॉन्सिव है और स्मार्टफोन, टैबलेट और डेस्कटॉप पर काम करता है। Google Play Store पर एक मुफ्त Android ऐप भी है।' },
  'faq.q8': { en: 'What types of forms are available?', hi: 'किस प्रकार के फॉर्म उपलब्ध हैं?' },
  'faq.a8': { en: 'School/College, Office/Workplace, Bank/Financial, Government/Civic, Advocate/Legal, CA/Finance, Postal/Courier, and Startup/Business — covering applications and complaint letters for every common scenario.', hi: 'स्कूल/कॉलेज, ऑफिस/कार्यस्थल, बैंक/वित्तीय, सरकारी/नागरिक, अधिवक्ता/कानूनी, CA/वित्त, डाक/कूरियर, और स्टार्टअप/व्यापार — हर आम स्थिति के लिए आवेदन और शिकायत पत्र।' },
  'faq.q9': { en: 'Is internet required?', hi: 'क्या इंटरनेट आवश्यक है?' },
  'faq.a9': { en: 'An internet connection is required to load templates and generate/share documents. Once a page is loaded, light browsing may continue offline.', hi: 'टेम्पलेट लोड करने और दस्तावेज़ बनाने/शेयर करने के लिए इंटरनेट कनेक्शन आवश्यक है। एक बार पृष्ठ लोड होने पर, हल्की ब्राउज़िंग ऑफ़लाइन जारी रह सकती है।' },
  'faq.q10': { en: 'How do I contact support?', hi: 'मैं सहायता से कैसे संपर्क करूँ?' },
  'faq.a10': { en: 'Email us anytime at ravomixsupport@gmail.com or use the Contact Us page. We respond within 24-48 hours.', hi: 'किसी भी समय ravomixsupport@gmail.com पर ईमेल करें या संपर्क करें पृष्ठ का उपयोग करें। हम 24-48 घंटों में जवाब देते हैं।' },

  // Cookie Policy
  'cookies.title': { en: 'Cookie Policy', hi: 'कुकी नीति' },
  'cookies.updated': { en: 'Last updated: April 2026', hi: 'अंतिम अपडेट: अप्रैल 2026' },
  'cookies.desc': { en: 'How we use cookies', hi: 'हम कुकीज़ का उपयोग कैसे करते हैं' },
  'cookies.h1': { en: '1. What Are Cookies?', hi: '1. कुकीज़ क्या हैं?' },
  'cookies.p1': { en: 'Cookies are small text files placed on your device by websites you visit. They help sites work efficiently and provide information to site owners about how users interact with their content.', hi: 'कुकीज़ छोटी टेक्स्ट फ़ाइलें हैं जो आपके द्वारा देखी गई वेबसाइटों द्वारा आपके डिवाइस पर रखी जाती हैं। वे साइटों को कुशलता से काम करने में मदद करती हैं और साइट मालिकों को बताती हैं कि उपयोगकर्ता उनकी सामग्री से कैसे इंटरैक्ट करते हैं।' },
  'cookies.h2': { en: '2. Types of Cookies We Use', hi: '2. हम जिस प्रकार की कुकीज़ का उपयोग करते हैं' },
  'cookies.p2': { en: 'Essential Cookies — Required for the site to function (language preference, disclaimer acceptance, theme).\nAnalytics Cookies — Google Analytics helps us understand how visitors use the site so we can improve it.\nAdvertising Cookies — Google AdSense uses cookies to display relevant ads and measure their performance.', hi: 'आवश्यक कुकीज़ — साइट के काम करने के लिए आवश्यक (भाषा प्राथमिकता, अस्वीकरण स्वीकृति, थीम)।\nएनालिटिक्स कुकीज़ — Google Analytics हमें यह समझने में मदद करता है कि विज़िटर साइट का उपयोग कैसे करते हैं।\nविज्ञापन कुकीज़ — Google AdSense प्रासंगिक विज्ञापन दिखाने और उनके प्रदर्शन को मापने के लिए कुकीज़ का उपयोग करता है।' },
  'cookies.h3': { en: '3. How Google AdSense Uses Cookies', hi: '3. Google AdSense कुकीज़ का उपयोग कैसे करता है' },
  'cookies.p3': { en: 'Google, as a third-party vendor, uses cookies to serve ads on Ravomix. Google\'s use of advertising cookies enables it and its partners to serve ads to users based on their visit to this and other sites on the Internet. Users may opt out of personalised advertising by visiting Google\'s Ads Settings (https://adssettings.google.com).', hi: 'Google, एक तृतीय-पक्ष विक्रेता के रूप में, Ravomix पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है। Google के विज्ञापन कुकीज़ के उपयोग से उसे और उसके भागीदारों को इस और इंटरनेट पर अन्य साइटों पर उपयोगकर्ताओं की विज़िट के आधार पर विज्ञापन दिखाने की अनुमति मिलती है। उपयोगकर्ता Google की विज्ञापन सेटिंग्स पर जाकर वैयक्तिकृत विज्ञापन से ऑप्ट आउट कर सकते हैं।' },
  'cookies.h4': { en: '4. How to Disable Cookies', hi: '4. कुकीज़ को कैसे अक्षम करें' },
  'cookies.p4': { en: 'Most browsers allow you to refuse or accept cookies through their settings. Note that disabling essential cookies may affect site functionality. To disable Google personalised ads, visit https://adssettings.google.com.', hi: 'अधिकांश ब्राउज़र आपको अपनी सेटिंग्स के माध्यम से कुकीज़ को अस्वीकार या स्वीकार करने की अनुमति देते हैं। ध्यान दें कि आवश्यक कुकीज़ को अक्षम करने से साइट की कार्यक्षमता प्रभावित हो सकती है।' },
  'cookies.h5': { en: '5. Third-Party Disclaimer', hi: '5. तृतीय-पक्ष अस्वीकरण' },
  'cookies.p5': { en: 'Ravomix is not responsible for cookie policies of third-party services (Google AdSense, Google Analytics). Please review their respective policies for full details.', hi: 'Ravomix तृतीय-पक्ष सेवाओं (Google AdSense, Google Analytics) की कुकी नीतियों के लिए ज़िम्मेदार नहीं है। पूर्ण विवरण के लिए कृपया उनकी संबंधित नीतियों की समीक्षा करें।' },
  'cookies.h6': { en: '6. Changes to This Policy', hi: '6. इस नीति में बदलाव' },
  'cookies.p6': { en: 'We may update this Cookie Policy from time to time. The date at the top will reflect the latest update. Continued use of the site after changes constitutes acceptance.', hi: 'हम समय-समय पर इस कुकी नीति को अपडेट कर सकते हैं। शीर्ष पर दी गई तिथि नवीनतम अपडेट दर्शाएगी। परिवर्तनों के बाद साइट का निरंतर उपयोग स्वीकृति माना जाएगा।' },

  // DMCA
  'dmca.title': { en: 'DMCA Policy', hi: 'DMCA नीति' },
  'dmca.updated': { en: 'Last updated: April 2026', hi: 'अंतिम अपडेट: अप्रैल 2026' },
  'dmca.desc': { en: 'Copyright protection notice', hi: 'कॉपीराइट सुरक्षा सूचना' },
  'dmca.h1': { en: '1. Copyright Notice', hi: '1. कॉपीराइट सूचना' },
  'dmca.p1': { en: '© 2026 Ravomix. All content, design, code, templates, and branding on this site are the property of Ravomix and are protected by international copyright laws.', hi: '© 2026 Ravomix. इस साइट पर सभी सामग्री, डिज़ाइन, कोड, टेम्पलेट और ब्रांडिंग Ravomix की संपत्ति है और अंतरराष्ट्रीय कॉपीराइट कानूनों द्वारा संरक्षित है।' },
  'dmca.h2': { en: '2. What Is DMCA?', hi: '2. DMCA क्या है?' },
  'dmca.p2': { en: 'The Digital Millennium Copyright Act (DMCA) is a United States copyright law that provides a process for copyright holders to request removal of infringing content from online platforms.', hi: 'डिजिटल मिलेनियम कॉपीराइट एक्ट (DMCA) एक संयुक्त राज्य अमेरिका का कॉपीराइट कानून है जो कॉपीराइट धारकों को ऑनलाइन प्लेटफ़ॉर्म से उल्लंघनकारी सामग्री को हटाने का अनुरोध करने की प्रक्रिया प्रदान करता है।' },
  'dmca.h3': { en: '3. Reporting a Copyright Violation', hi: '3. कॉपीराइट उल्लंघन की रिपोर्ट करें' },
  'dmca.p3': { en: 'If you believe content on Ravomix infringes your copyright, email ravomixsupport@gmail.com with:\n• Your contact information (name, email, address)\n• Description of the copyrighted work\n• URL of the allegedly infringing content\n• A statement of good faith belief that the use is unauthorised\n• A statement under penalty of perjury that the information is accurate\n• Your physical or electronic signature', hi: 'यदि आप मानते हैं कि Ravomix पर सामग्री आपके कॉपीराइट का उल्लंघन करती है, तो ravomixsupport@gmail.com पर ईमेल करें:\n• आपकी संपर्क जानकारी (नाम, ईमेल, पता)\n• कॉपीराइट कार्य का विवरण\n• कथित उल्लंघनकारी सामग्री का URL\n• सद्भावना का बयान कि उपयोग अनधिकृत है\n• शपथ के तहत बयान कि जानकारी सटीक है\n• आपका भौतिक या इलेक्ट्रॉनिक हस्ताक्षर' },
  'dmca.h4': { en: '4. Our Response', hi: '4. हमारा जवाब' },
  'dmca.p4': { en: 'We review all valid DMCA notices within 48 hours. If a violation is confirmed, the content will be removed promptly and the uploader will be notified.', hi: 'हम सभी वैध DMCA सूचनाओं की 48 घंटों के भीतर समीक्षा करते हैं। यदि उल्लंघन की पुष्टि होती है, तो सामग्री तुरंत हटा दी जाएगी और अपलोडर को सूचित किया जाएगा।' },
  'dmca.h5': { en: '5. Counter-Notification', hi: '5. प्रति-सूचना' },
  'dmca.p5': { en: 'If your content was removed and you believe it was a mistake, you may submit a counter-notification to ravomixsupport@gmail.com with the same identifying information and a statement under penalty of perjury that the removal was the result of mistake or misidentification.', hi: 'यदि आपकी सामग्री हटा दी गई थी और आप मानते हैं कि यह गलती थी, तो आप ravomixsupport@gmail.com पर प्रति-सूचना भेज सकते हैं उसी पहचान जानकारी और शपथ के तहत बयान के साथ कि हटाना गलती या गलत पहचान का परिणाम था।' },

  // Sitemap
  'sitemap.title': { en: 'Sitemap', hi: 'साइटमैप' },

  // Settings additions
  'settings.cookies': { en: 'Cookie Policy', hi: 'कुकी नीति' },
  'settings.cookiesDesc': { en: 'How we use cookies', hi: 'हम कुकीज़ का उपयोग कैसे करते हैं' },
  'settings.dmca': { en: 'DMCA Policy', hi: 'DMCA नीति' },
  'settings.dmcaDesc': { en: 'Copyright protection', hi: 'कॉपीराइट सुरक्षा' },
  'settings.faq': { en: 'FAQ / Help', hi: 'सवाल-जवाब / सहायता' },
  'settings.faqDesc': { en: 'Frequently asked questions', hi: 'अक्सर पूछे जाने वाले सवाल' },
  'settings.contact': { en: 'Contact Us', hi: 'संपर्क करें' },
  'settings.contactDesc': { en: 'Get in touch with our team', hi: 'हमारी टीम से संपर्क करें' },
};


const AppLanguageContext = createContext<AppLanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const AppLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<AppLang>('en');

  const changeLang = (newLang: AppLang) => {
    setLang(newLang);
  };

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <AppLanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </AppLanguageContext.Provider>
  );
};

export const useAppLang = () => useContext(AppLanguageContext);
