import type { AppLang } from "@/contexts/AppLanguageContext";

export interface GuideArticle {
  id: string;
  title: Record<AppLang, string>;
  content: Record<AppLang, string>;
  icon: string;
}

export const guideArticles: GuideArticle[] = [
  {
    id: "leave-application",
    title: {
      en: "How to Write a Leave Application",
      hi: "छुट्टी के लिए आवेदन कैसे लिखें",
    },
    icon: "📝",
    content: {
      en: `A leave application is a formal letter written to request time off from school, college, or workplace. Whether you are a student seeking permission from a principal or an employee requesting leave from a manager, a well-structured leave application creates a positive impression and increases the chances of approval.

**Understanding the Purpose**

A leave application serves as an official record of your absence. It informs the concerned authority about the reason for your leave, the duration, and any arrangements made to cover your responsibilities during the absence. Writing a clear and concise application is essential for maintaining professionalism.

**Structure of a Leave Application**

1. **Sender's Information**: Start with your name, class/department, and roll number or employee ID at the top of the letter.

2. **Date**: Always include the date on which the application is being written. This helps in maintaining records.

3. **Recipient's Details**: Address the application to the appropriate authority — Principal, Class Teacher, HR Manager, or Department Head.

4. **Subject Line**: Write a clear subject that summarizes the purpose. For example: "Subject: Application for Leave of Absence for 3 Days."

5. **Salutation**: Use formal greetings such as "Respected Sir/Madam" or "Dear Mr./Ms. [Name]."

6. **Body of the Application**: This is the most important part. State the reason for leave clearly and honestly. Mention the exact dates — from when to when you need leave. If applicable, mention who will handle your responsibilities in your absence.

7. **Closing**: End with a polite closing such as "I kindly request you to grant me leave for the mentioned dates. I shall be grateful for your consideration."

8. **Signature**: Sign the application with your full name, class/designation, and contact information.

**Tips for Writing an Effective Leave Application**

- **Be Honest**: Always state the genuine reason for your leave. Fabricating reasons can lead to trust issues.
- **Be Concise**: Keep the application brief and to the point. Avoid unnecessary details.
- **Be Polite**: Use respectful language throughout the application.
- **Submit Early**: Whenever possible, submit your leave application in advance to give the authority time to make arrangements.
- **Follow Format**: Stick to the formal letter format. Avoid casual language or slang.
- **Proofread**: Check for spelling and grammatical errors before submitting.

**Common Reasons for Leave**

- Medical reasons or illness
- Family emergencies or functions
- Personal reasons
- Examinations or competitive tests
- Travel or vacation
- Religious festivals or ceremonies

**Sample Leave Application**

To,
The Principal,
[School/College Name],
[City]

Subject: Application for Leave

Respected Sir/Madam,

I am [Your Name], a student of Class [X], Roll No. [XX]. I am writing to request leave from [start date] to [end date] due to [reason]. I kindly request you to grant me leave for the mentioned period. I assure you that I will complete all pending assignments and coursework upon my return.

Thanking you,
Yours obediently,
[Your Name]
[Class/Section]
[Date]

**Using Ravomix for Leave Applications**

Ravomix makes it incredibly easy to generate professional leave applications. Simply select the appropriate template, fill in the required details, choose your language preference, and download or share the document instantly. The app supports multiple formats for school, college, and office leave applications.`,

      hi: `छुट्टी का आवेदन एक औपचारिक पत्र है जो स्कूल, कॉलेज या कार्यस्थल से समय की छुट्टी का अनुरोध करने के लिए लिखा जाता है। चाहे आप एक छात्र हों जो प्रधानाचार्य से अनुमति माँग रहे हों या एक कर्मचारी हों जो प्रबंधक से छुट्टी का अनुरोध कर रहे हों, एक अच्छी तरह से संरचित छुट्टी आवेदन सकारात्मक प्रभाव बनाता है और स्वीकृति की संभावना बढ़ाता है।

**उद्देश्य को समझना**

छुट्टी का आवेदन आपकी अनुपस्थिति का एक आधिकारिक रिकॉर्ड के रूप में कार्य करता है। यह संबंधित प्राधिकारी को आपकी छुट्टी के कारण, अवधि और अनुपस्थिति के दौरान आपकी जिम्मेदारियों को पूरा करने के लिए की गई किसी भी व्यवस्था के बारे में सूचित करता है। पेशेवर बने रहने के लिए एक स्पष्ट और संक्षिप्त आवेदन लिखना आवश्यक है।

**छुट्टी आवेदन की संरचना**

1. **प्रेषक की जानकारी**: पत्र के शीर्ष पर अपना नाम, कक्षा/विभाग, और रोल नंबर या कर्मचारी आईडी से शुरू करें।

2. **दिनांक**: हमेशा वह तारीख शामिल करें जिस दिन आवेदन लिखा जा रहा है। इससे रिकॉर्ड बनाए रखने में मदद मिलती है।

3. **प्राप्तकर्ता का विवरण**: आवेदन को उचित प्राधिकारी को संबोधित करें — प्रधानाचार्य, कक्षा शिक्षक, एचआर प्रबंधक, या विभाग प्रमुख।

4. **विषय पंक्ति**: एक स्पष्ट विषय लिखें जो उद्देश्य को संक्षेप में बताए। उदाहरण: "विषय: 3 दिनों की छुट्टी के लिए आवेदन।"

5. **अभिवादन**: औपचारिक अभिवादन का उपयोग करें जैसे "आदरणीय महोदय/महोदया" या "प्रिय श्री/श्रीमती [नाम]।"

6. **आवेदन का मुख्य भाग**: यह सबसे महत्वपूर्ण हिस्सा है। छुट्टी का कारण स्पष्ट रूप से और ईमानदारी से बताएं। सटीक तारीखें बताएं — कब से कब तक आपको छुट्टी चाहिए। यदि लागू हो, तो बताएं कि आपकी अनुपस्थिति में कौन आपकी जिम्मेदारियाँ संभालेगा।

7. **समापन**: एक विनम्र समापन के साथ समाप्त करें जैसे "मैं आपसे विनम्र अनुरोध करता/करती हूँ कि मुझे उल्लिखित तारीखों के लिए छुट्टी प्रदान करें। मैं आपके विचार के लिए आभारी रहूँगा/रहूँगी।"

8. **हस्ताक्षर**: अपने पूरे नाम, कक्षा/पदनाम और संपर्क जानकारी के साथ आवेदन पर हस्ताक्षर करें।

**प्रभावी छुट्टी आवेदन लिखने के सुझाव**

- **ईमानदार रहें**: हमेशा अपनी छुट्टी का वास्तविक कारण बताएं। कारणों को गढ़ने से विश्वास की समस्या हो सकती है।
- **संक्षिप्त रहें**: आवेदन को संक्षिप्त और मुद्दे पर रखें। अनावश्यक विवरणों से बचें।
- **विनम्र रहें**: पूरे आवेदन में सम्मानजनक भाषा का उपयोग करें।
- **जल्दी जमा करें**: जब भी संभव हो, प्राधिकारी को व्यवस्था करने का समय देने के लिए अपना छुट्टी आवेदन अग्रिम में जमा करें।
- **प्रारूप का पालन करें**: औपचारिक पत्र प्रारूप से चिपके रहें। अनौपचारिक भाषा से बचें।
- **जाँच करें**: जमा करने से पहले वर्तनी और व्याकरणिक त्रुटियों की जाँच करें।

**छुट्टी के सामान्य कारण**

- चिकित्सा कारण या बीमारी
- पारिवारिक आपातकाल या कार्यक्रम
- व्यक्तिगत कारण
- परीक्षाएं या प्रतियोगी परीक्षण
- यात्रा या अवकाश
- धार्मिक त्योहार या समारोह

**नमूना छुट्टी आवेदन**

सेवा में,
प्रधानाचार्य महोदय,
[स्कूल/कॉलेज का नाम],
[शहर]

विषय: छुट्टी के लिए आवेदन

आदरणीय महोदय/महोदया,

मैं [आपका नाम], कक्षा [X], रोल नं. [XX] का/की छात्र/छात्रा हूँ। मैं [कारण] के कारण [प्रारंभ तिथि] से [समाप्ति तिथि] तक छुट्टी का अनुरोध कर रहा/रही हूँ। कृपया मुझे उल्लिखित अवधि के लिए छुट्टी प्रदान करें। मैं आश्वस्त करता/करती हूँ कि मैं लौटने पर सभी लंबित कार्य पूरे करूँगा/करूँगी।

धन्यवाद,
आपका/आपकी आज्ञाकारी,
[आपका नाम]
[कक्षा/अनुभाग]
[दिनांक]

**Ravomix से छुट्टी आवेदन बनाना**

Ravomix से पेशेवर छुट्टी आवेदन बनाना बेहद आसान है। बस उपयुक्त टेम्पलेट चुनें, आवश्यक विवरण भरें, अपनी भाषा वरीयता चुनें, और दस्तावेज़ को तुरंत डाउनलोड या साझा करें। ऐप स्कूल, कॉलेज और कार्यालय छुट्टी आवेदनों के लिए कई प्रारूपों का समर्थन करता है।`,
    },
  },
  {
    id: "complaint-letter",
    title: {
      en: "How to Write a Complaint Letter",
      hi: "शिकायत पत्र कैसे लिखें",
    },
    icon: "📨",
    content: {
      en: `A complaint letter is a formal written document used to express dissatisfaction about a product, service, or situation. Whether you are writing to a company, a government office, or any organization, a well-crafted complaint letter can help resolve issues effectively and ensure your voice is heard.

**Why Write a Complaint Letter?**

Complaint letters serve as official records of grievances. They provide a paper trail that can be referenced later if the issue escalates. A formal complaint is often taken more seriously than a verbal one, and many organizations have specific procedures that require written complaints before they can take action.

**Essential Components of a Complaint Letter**

1. **Your Contact Information**: Include your full name, address, phone number, and email at the top of the letter. This allows the recipient to respond to your complaint.

2. **Date**: The date of writing is important for record-keeping and establishing timelines.

3. **Recipient's Details**: Address the letter to a specific person or department whenever possible. This ensures your complaint reaches the right person.

4. **Subject Line**: A clear, concise subject line helps the recipient understand the nature of your complaint immediately. Example: "Subject: Complaint Regarding Defective Product — Order #12345."

5. **Salutation**: Use a formal greeting such as "Dear Sir/Madam" or "Dear [Name/Title]."

6. **Introduction**: State the purpose of your letter in the first paragraph. Mention what product or service you are complaining about, when and where the issue occurred.

7. **Description of the Problem**: Provide detailed information about the issue. Include dates, times, reference numbers, and any relevant facts. Be specific but avoid emotional language.

8. **Previous Attempts**: If you have already tried to resolve the issue through other channels (phone calls, emails, in-person visits), mention these attempts and their outcomes.

9. **Desired Resolution**: Clearly state what you want the organization to do — refund, replacement, repair, apology, or any other specific action.

10. **Supporting Documents**: Mention any attached documents such as receipts, photographs, previous correspondence, or warranty cards.

11. **Closing**: End with a professional closing that sets a reasonable timeline for response. For example: "I look forward to your response within 15 working days."

12. **Signature**: Include your signature, printed name, and any relevant reference numbers.

**Types of Complaint Letters**

- **Consumer Complaints**: About defective products, poor service, billing errors, or warranty issues.
- **Workplace Complaints**: About harassment, discrimination, unsafe conditions, or policy violations.
- **Government Complaints**: About public services, infrastructure issues, or administrative problems.
- **Banking Complaints**: About unauthorized transactions, service charges, or account issues.
- **Noise/Nuisance Complaints**: About disturbances in residential areas.

**Tips for Effective Complaint Letters**

- Keep a copy of the letter and all supporting documents.
- Send the letter via registered post or email with read receipt for proof of delivery.
- Set a reasonable deadline for response (typically 15-30 days).
- If you do not receive a response, follow up with a reminder letter referencing the original complaint.
- Maintain a professional tone even if you are frustrated.
- Stick to facts and avoid exaggeration.

**Using Ravomix for Complaint Letters**

Ravomix provides ready-made complaint letter templates for various scenarios including consumer complaints, bank complaints, noise complaints, and more. Simply select the appropriate template, fill in the details, and generate a professional complaint letter in seconds. Available in both English and Hindi.`,

      hi: `शिकायत पत्र एक औपचारिक लिखित दस्तावेज है जिसका उपयोग किसी उत्पाद, सेवा या स्थिति के बारे में असंतोष व्यक्त करने के लिए किया जाता है। चाहे आप किसी कंपनी, सरकारी कार्यालय, या किसी भी संगठन को लिख रहे हों, एक अच्छी तरह से तैयार किया गया शिकायत पत्र मुद्दों को प्रभावी ढंग से हल करने में मदद कर सकता है।

**शिकायत पत्र क्यों लिखें?**

शिकायत पत्र शिकायतों के आधिकारिक रिकॉर्ड के रूप में कार्य करते हैं। वे एक कागजी निशान प्रदान करते हैं जिसे बाद में संदर्भित किया जा सकता है यदि मुद्दा बढ़ जाए। एक औपचारिक शिकायत को अक्सर मौखिक शिकायत की तुलना में अधिक गंभीरता से लिया जाता है, और कई संगठनों में विशिष्ट प्रक्रियाएं हैं जिनमें कार्रवाई करने से पहले लिखित शिकायतों की आवश्यकता होती है।

**शिकायत पत्र के आवश्यक घटक**

1. **आपकी संपर्क जानकारी**: पत्र के शीर्ष पर अपना पूरा नाम, पता, फोन नंबर और ईमेल शामिल करें। इससे प्राप्तकर्ता आपकी शिकायत का जवाब दे सकता है।

2. **दिनांक**: लिखने की तारीख रिकॉर्ड रखने और समयसीमा स्थापित करने के लिए महत्वपूर्ण है।

3. **प्राप्तकर्ता का विवरण**: जब भी संभव हो पत्र को किसी विशिष्ट व्यक्ति या विभाग को संबोधित करें।

4. **विषय पंक्ति**: एक स्पष्ट, संक्षिप्त विषय पंक्ति प्राप्तकर्ता को आपकी शिकायत की प्रकृति तुरंत समझने में मदद करती है। उदाहरण: "विषय: दोषपूर्ण उत्पाद के संबंध में शिकायत — ऑर्डर #12345।"

5. **अभिवादन**: "आदरणीय महोदय/महोदया" जैसे औपचारिक अभिवादन का उपयोग करें।

6. **परिचय**: पहले पैराग्राफ में अपने पत्र का उद्देश्य बताएं। बताएं कि आप किस उत्पाद या सेवा के बारे में शिकायत कर रहे हैं, समस्या कब और कहाँ हुई।

7. **समस्या का विवरण**: समस्या के बारे में विस्तृत जानकारी प्रदान करें। तारीखें, समय, संदर्भ संख्या और कोई भी प्रासंगिक तथ्य शामिल करें। विशिष्ट रहें लेकिन भावनात्मक भाषा से बचें।

8. **पिछले प्रयास**: यदि आपने पहले से ही अन्य चैनलों (फोन कॉल, ईमेल, व्यक्तिगत मुलाकात) के माध्यम से समस्या को हल करने का प्रयास किया है, तो इन प्रयासों और उनके परिणामों का उल्लेख करें।

9. **वांछित समाधान**: स्पष्ट रूप से बताएं कि आप संगठन से क्या चाहते हैं — धनवापसी, प्रतिस्थापन, मरम्मत, माफी, या कोई अन्य विशिष्ट कार्रवाई।

10. **सहायक दस्तावेज**: रसीदें, तस्वीरें, पिछला पत्र-व्यवहार, या वारंटी कार्ड जैसे किसी भी संलग्न दस्तावेज़ का उल्लेख करें।

11. **समापन**: एक पेशेवर समापन के साथ समाप्त करें जो प्रतिक्रिया के लिए उचित समयसीमा निर्धारित करे। उदाहरण: "मुझे 15 कार्य दिवसों के भीतर आपकी प्रतिक्रिया की प्रतीक्षा है।"

12. **हस्ताक्षर**: अपना हस्ताक्षर, मुद्रित नाम और कोई भी प्रासंगिक संदर्भ संख्या शामिल करें।

**शिकायत पत्रों के प्रकार**

- **उपभोक्ता शिकायतें**: दोषपूर्ण उत्पादों, खराब सेवा, बिलिंग त्रुटियों, या वारंटी मुद्दों के बारे में।
- **कार्यस्थल शिकायतें**: उत्पीड़न, भेदभाव, असुरक्षित स्थितियों, या नीति उल्लंघन के बारे में।
- **सरकारी शिकायतें**: सार्वजनिक सेवाओं, बुनियादी ढांचे के मुद्दों, या प्रशासनिक समस्याओं के बारे में।
- **बैंकिंग शिकायतें**: अनधिकृत लेनदेन, सेवा शुल्क, या खाता मुद्दों के बारे में।

**प्रभावी शिकायत पत्रों के लिए सुझाव**

- पत्र और सभी सहायक दस्तावेजों की एक प्रति रखें।
- डिलीवरी के प्रमाण के लिए पत्र को पंजीकृत डाक या रीड रिसीट वाले ईमेल से भेजें।
- प्रतिक्रिया के लिए उचित समय सीमा निर्धारित करें (आमतौर पर 15-30 दिन)।
- यदि आपको जवाब नहीं मिलता है, तो मूल शिकायत का संदर्भ देते हुए एक अनुस्मारक पत्र भेजें।
- पेशेवर लहजा बनाए रखें भले ही आप निराश हों।

**Ravomix से शिकायत पत्र बनाना**

Ravomix उपभोक्ता शिकायतों, बैंक शिकायतों, शोर शिकायतों और अन्य विभिन्न परिदृश्यों के लिए तैयार शिकायत पत्र टेम्पलेट प्रदान करता है। बस उपयुक्त टेम्पलेट चुनें, विवरण भरें, और सेकंडों में एक पेशेवर शिकायत पत्र बनाएं। अंग्रेजी और हिंदी दोनों में उपलब्ध है।`,
    },
  },
  {
    id: "gst-calculator",
    title: {
      en: "How to Use the GST Calculator",
      hi: "GST कैलकुलेटर का उपयोग कैसे करें",
    },
    icon: "🧮",
    content: {
      en: `The Goods and Services Tax (GST) is a comprehensive indirect tax levied on the supply of goods and services in India. Understanding how to calculate GST correctly is essential for business owners, accountants, freelancers, and even regular consumers who want to verify their bills. Ravomix provides a powerful GST Calculator tool that makes these calculations quick and accurate.

**What is GST?**

GST was introduced in India on July 1, 2017, replacing multiple indirect taxes such as VAT, Service Tax, Excise Duty, and others. It is a destination-based tax applied at every stage of the supply chain, with input tax credit available to avoid cascading taxation. GST is divided into three categories: CGST (Central GST), SGST (State GST), and IGST (Integrated GST).

**GST Tax Slabs in India**

India follows a multi-rate structure with the following standard rates:
- **0%**: Essential items like fresh fruits, vegetables, milk, and grains
- **5%**: Common items like packaged food, transport services, and economy hotel rooms
- **12%**: Items like processed food, business class air tickets, and certain electronics
- **18%**: Most goods and services including restaurants, telecom, IT services, and financial services
- **28%**: Luxury items like automobiles, tobacco products, and premium consumer goods

**How to Calculate GST**

There are two common scenarios:

**1. Adding GST to a Base Price (Exclusive Calculation)**
When you know the price before tax and need to find the total price including GST:
- Formula: GST Amount = (Base Price × GST Rate) / 100
- Total Price = Base Price + GST Amount
- Example: If a product costs ₹1,000 and GST rate is 18%
  - GST Amount = (1000 × 18) / 100 = ₹180
  - Total Price = ₹1,000 + ₹180 = ₹1,180
  - CGST = ₹90 (9%), SGST = ₹90 (9%)

**2. Extracting GST from a Total Price (Inclusive Calculation)**
When you have the total price including GST and need to find the base price:
- Formula: Base Price = (Total Price × 100) / (100 + GST Rate)
- GST Amount = Total Price - Base Price
- Example: If total price is ₹1,180 with 18% GST
  - Base Price = (1180 × 100) / 118 = ₹1,000
  - GST Amount = ₹1,180 - ₹1,000 = ₹180

**Using the Ravomix GST Calculator**

1. Open the Ravomix app and navigate to Tools section.
2. Find and tap on "GST Calculator."
3. Enter the amount (either base price or total price).
4. Select the GST rate (5%, 12%, 18%, or 28%) or enter a custom rate.
5. Choose whether you want to add GST or extract GST from the entered amount.
6. The calculator instantly shows the base amount, GST amount, CGST, SGST, and total amount.

**When to Use a GST Calculator**

- Verifying restaurant bills and service charges
- Calculating tax on business invoices
- Comparing prices of products with different GST rates
- Filing GST returns and maintaining accounts
- Preparing quotations and estimates for clients
- Understanding the tax component of any purchase

**Common GST Mistakes to Avoid**

- Applying the wrong GST rate for a product category
- Confusing inclusive and exclusive GST calculations
- Not separating CGST and SGST correctly for intra-state transactions
- Forgetting to account for GST when comparing prices between vendors

The Ravomix GST Calculator eliminates these errors by automating the entire calculation process, giving you accurate results every time.`,

      hi: `वस्तु एवं सेवा कर (GST) भारत में वस्तुओं और सेवाओं की आपूर्ति पर लगाया जाने वाला एक व्यापक अप्रत्यक्ष कर है। GST की सही गणना करना व्यापार मालिकों, लेखाकारों, फ्रीलांसरों और यहां तक कि सामान्य उपभोक्ताओं के लिए भी आवश्यक है जो अपने बिलों की जांच करना चाहते हैं। Ravomix एक शक्तिशाली GST कैलकुलेटर टूल प्रदान करता है जो इन गणनाओं को त्वरित और सटीक बनाता है।

**GST क्या है?**

GST को भारत में 1 जुलाई 2017 को लागू किया गया था, जिसने VAT, सेवा कर, उत्पाद शुल्क और अन्य जैसे कई अप्रत्यक्ष करों को प्रतिस्थापित किया। यह आपूर्ति श्रृंखला के हर चरण पर लागू होने वाला गंतव्य-आधारित कर है, जिसमें कैस्केडिंग कराधान से बचने के लिए इनपुट टैक्स क्रेडिट उपलब्ध है। GST को तीन श्रेणियों में विभाजित किया गया है: CGST (केंद्रीय GST), SGST (राज्य GST), और IGST (एकीकृत GST)।

**भारत में GST कर दरें**

भारत निम्नलिखित मानक दरों के साथ बहु-दर संरचना का पालन करता है:
- **0%**: आवश्यक वस्तुएं जैसे ताजे फल, सब्जियां, दूध और अनाज
- **5%**: सामान्य वस्तुएं जैसे पैकेज्ड भोजन, परिवहन सेवाएं
- **12%**: प्रसंस्कृत भोजन, बिजनेस क्लास हवाई टिकट जैसी वस्तुएं
- **18%**: अधिकांश वस्तुएं और सेवाएं जिनमें रेस्तरां, टेलीकॉम, आईटी सेवाएं शामिल हैं
- **28%**: विलासिता की वस्तुएं जैसे ऑटोमोबाइल, तंबाकू उत्पाद

**GST की गणना कैसे करें**

दो सामान्य परिदृश्य हैं:

**1. आधार मूल्य में GST जोड़ना (एक्सक्लूसिव गणना)**
जब आप कर से पहले की कीमत जानते हैं और GST सहित कुल कीमत ज्ञात करनी हो:
- सूत्र: GST राशि = (आधार मूल्य × GST दर) / 100
- कुल मूल्य = आधार मूल्य + GST राशि
- उदाहरण: यदि किसी उत्पाद की कीमत ₹1,000 है और GST दर 18% है
  - GST राशि = (1000 × 18) / 100 = ₹180
  - कुल मूल्य = ₹1,000 + ₹180 = ₹1,180
  - CGST = ₹90 (9%), SGST = ₹90 (9%)

**2. कुल मूल्य से GST निकालना (इंक्लूसिव गणना)**
जब आपके पास GST सहित कुल कीमत हो और आधार मूल्य ज्ञात करना हो:
- सूत्र: आधार मूल्य = (कुल मूल्य × 100) / (100 + GST दर)
- GST राशि = कुल मूल्य - आधार मूल्य
- उदाहरण: यदि कुल मूल्य ₹1,180 है और 18% GST है
  - आधार मूल्य = (1180 × 100) / 118 = ₹1,000
  - GST राशि = ₹1,180 - ₹1,000 = ₹180

**Ravomix GST कैलकुलेटर का उपयोग**

1. Ravomix ऐप खोलें और टूल्स सेक्शन में जाएं।
2. "GST कैलकुलेटर" खोजें और टैप करें।
3. राशि दर्ज करें (आधार मूल्य या कुल मूल्य)।
4. GST दर (5%, 12%, 18%, या 28%) चुनें या कस्टम दर दर्ज करें।
5. चुनें कि आप दर्ज राशि में GST जोड़ना चाहते हैं या निकालना चाहते हैं।
6. कैलकुलेटर तुरंत आधार राशि, GST राशि, CGST, SGST और कुल राशि दिखाता है।

**GST कैलकुलेटर कब उपयोग करें**

- रेस्तरां बिल और सेवा शुल्क की जांच करना
- व्यापार चालान पर कर की गणना
- विभिन्न GST दरों वाले उत्पादों की कीमतों की तुलना
- GST रिटर्न दाखिल करना और खाते बनाए रखना
- ग्राहकों के लिए कोटेशन और अनुमान तैयार करना
- किसी भी खरीद के कर घटक को समझना

**बचने के लिए सामान्य GST गलतियां**

- किसी उत्पाद श्रेणी के लिए गलत GST दर लागू करना
- इंक्लूसिव और एक्सक्लूसिव GST गणनाओं को भ्रमित करना
- अंतर-राज्य लेनदेन के लिए CGST और SGST को सही ढंग से अलग न करना

Ravomix GST कैलकुलेटर संपूर्ण गणना प्रक्रिया को स्वचालित करके इन त्रुटियों को समाप्त करता है, हर बार आपको सटीक परिणाम देता है।`,
    },
  },
  {
    id: "bonafide-certificate",
    title: {
      en: "How to Write a Bonafide Certificate Request",
      hi: "बोनाफाइड प्रमाणपत्र अनुरोध कैसे लिखें",
    },
    icon: "🎓",
    content: {
      en: `A bonafide certificate is an official document issued by an educational institution that certifies a student is genuinely enrolled and studying at that institution. It is one of the most commonly required documents for students in India and is needed for various purposes including scholarships, bank account opening, travel concessions, and more.

**What is a Bonafide Certificate?**

The word "bonafide" comes from Latin, meaning "in good faith" or "genuine." A bonafide certificate is essentially a letter of verification that confirms a student's enrollment status, including details such as the student's name, enrollment number, course, year of study, and the institution's name and address. It bears the official seal and signature of an authorized person, typically the principal or registrar.

**When Do You Need a Bonafide Certificate?**

Students typically need a bonafide certificate for the following purposes:

- **Scholarship Applications**: Many government and private scholarships require proof of enrollment.
- **Bank Account Opening**: Banks often require bonafide certificates for opening student accounts.
- **Travel Concessions**: Railway and bus authorities provide student discounts upon presentation of a bonafide certificate.
- **Passport Application**: As proof of current educational status.
- **Visa Applications**: For student visa processing at embassies and consulates.
- **Library Membership**: Public and institutional libraries may require this document.
- **Hostel Admission**: For securing accommodation in hostels.
- **Competition Participation**: Some academic or sports competitions require enrollment verification.
- **Educational Loans**: Banks require proof of enrollment for processing education loans.
- **Internship Applications**: Companies may request this document to verify student status.

**How to Write a Bonafide Certificate Application**

Here is a step-by-step guide to writing an effective bonafide certificate application:

1. **Format**: Use the standard formal letter format with proper margins and spacing.

2. **Addressing**: Address the application to the Principal, Dean, or Registrar of your institution.

3. **Subject**: Clearly state: "Subject: Application for Issuance of Bonafide Certificate."

4. **Introduction**: Introduce yourself with your full name, roll number, course name, semester/year, and department.

5. **Purpose**: Clearly mention why you need the bonafide certificate. Be specific — for example, "for the purpose of applying for a railway concession pass" or "for opening a bank account."

6. **Request**: Politely request the authority to issue the certificate at their earliest convenience.

7. **Closing**: Thank the recipient and express gratitude for their time and consideration.

8. **Signature**: Sign with your full name, roll number, course details, and contact information.

**Important Tips**

- Apply at least a week in advance, as processing may take time.
- Some institutions have specific forms for bonafide certificate requests — check with the administration office first.
- If you need multiple copies, mention the number of copies required in your application.
- Keep a copy of your application for your records.
- Follow up if you do not receive the certificate within the expected timeframe.

**Sample Application**

To,
The Principal,
[Institution Name],
[City, State]

Subject: Application for Bonafide Certificate

Respected Sir/Madam,

I am [Your Name], a student of [Course Name], [Year/Semester], bearing Roll No. [XXX], studying in the Department of [Department Name]. I require a bonafide certificate for the purpose of [state purpose, e.g., "applying for a government scholarship"]. I kindly request you to issue the same at your earliest convenience.

I shall be grateful for your kind cooperation.

Thanking you,
Yours obediently,
[Your Name]
[Roll No.]
[Course/Department]
[Contact Number]
[Date]

**Using Ravomix**

Ravomix has a dedicated bonafide certificate application template. Simply select it from the Applications section, fill in your details, and generate a professionally formatted document ready for submission.`,

      hi: `बोनाफाइड प्रमाणपत्र एक आधिकारिक दस्तावेज है जो किसी शैक्षणिक संस्थान द्वारा जारी किया जाता है और यह प्रमाणित करता है कि एक छात्र वास्तव में उस संस्थान में नामांकित है और पढ़ाई कर रहा है। यह भारत में छात्रों के लिए सबसे अधिक आवश्यक दस्तावेजों में से एक है और छात्रवृत्ति, बैंक खाता खोलने, यात्रा रियायतों और अन्य कई उद्देश्यों के लिए आवश्यक है।

**बोनाफाइड प्रमाणपत्र क्या है?**

"बोनाफाइड" शब्द लैटिन से आया है, जिसका अर्थ है "सद्भावना में" या "वास्तविक।" एक बोनाफाइड प्रमाणपत्र अनिवार्य रूप से सत्यापन का एक पत्र है जो एक छात्र की नामांकन स्थिति की पुष्टि करता है, जिसमें छात्र का नाम, नामांकन संख्या, पाठ्यक्रम, अध्ययन का वर्ष, और संस्थान का नाम और पता जैसे विवरण शामिल हैं। यह एक अधिकृत व्यक्ति, आमतौर पर प्रधानाचार्य या रजिस्ट्रार, की आधिकारिक मुहर और हस्ताक्षर वहन करता है।

**बोनाफाइड प्रमाणपत्र कब आवश्यक है?**

छात्रों को आमतौर पर निम्नलिखित उद्देश्यों के लिए बोनाफाइड प्रमाणपत्र की आवश्यकता होती है:

- **छात्रवृत्ति आवेदन**: कई सरकारी और निजी छात्रवृत्तियों के लिए नामांकन के प्रमाण की आवश्यकता होती है।
- **बैंक खाता खोलना**: बैंक अक्सर छात्र खाते खोलने के लिए बोनाफाइड प्रमाणपत्र की आवश्यकता रखते हैं।
- **यात्रा रियायतें**: रेलवे और बस प्राधिकरण बोनाफाइड प्रमाणपत्र प्रस्तुत करने पर छात्र छूट प्रदान करते हैं।
- **पासपोर्ट आवेदन**: वर्तमान शैक्षिक स्थिति के प्रमाण के रूप में।
- **वीजा आवेदन**: दूतावासों में छात्र वीजा प्रोसेसिंग के लिए।
- **पुस्तकालय सदस्यता**: सार्वजनिक पुस्तकालयों को इस दस्तावेज की आवश्यकता हो सकती है।
- **छात्रावास प्रवेश**: छात्रावासों में आवास सुरक्षित करने के लिए।
- **शैक्षिक ऋण**: बैंकों को शिक्षा ऋण के लिए नामांकन के प्रमाण की आवश्यकता होती है।

**बोनाफाइड प्रमाणपत्र आवेदन कैसे लिखें**

यहां एक प्रभावी बोनाफाइड प्रमाणपत्र आवेदन लिखने के लिए चरण-दर-चरण मार्गदर्शिका है:

1. **प्रारूप**: उचित मार्जिन और स्पेसिंग के साथ मानक औपचारिक पत्र प्रारूप का उपयोग करें।

2. **संबोधन**: आवेदन को अपने संस्थान के प्रधानाचार्य, डीन, या रजिस्ट्रार को संबोधित करें।

3. **विषय**: स्पष्ट रूप से लिखें: "विषय: बोनाफाइड प्रमाणपत्र जारी करने हेतु आवेदन।"

4. **परिचय**: अपना पूरा नाम, रोल नंबर, पाठ्यक्रम का नाम, सेमेस्टर/वर्ष और विभाग के साथ अपना परिचय दें।

5. **उद्देश्य**: स्पष्ट रूप से बताएं कि आपको बोनाफाइड प्रमाणपत्र की आवश्यकता क्यों है। विशिष्ट रहें — उदाहरण के लिए, "रेलवे रियायत पास के लिए आवेदन करने के उद्देश्य से" या "बैंक खाता खोलने के लिए।"

6. **अनुरोध**: विनम्रतापूर्वक प्राधिकारी से जल्द से जल्द प्रमाणपत्र जारी करने का अनुरोध करें।

7. **समापन**: प्राप्तकर्ता को धन्यवाद दें और उनके समय और विचार के लिए आभार व्यक्त करें।

8. **हस्ताक्षर**: अपने पूरे नाम, रोल नंबर, पाठ्यक्रम विवरण और संपर्क जानकारी के साथ हस्ताक्षर करें।

**महत्वपूर्ण सुझाव**

- कम से कम एक सप्ताह पहले आवेदन करें, क्योंकि प्रोसेसिंग में समय लग सकता है।
- कुछ संस्थानों में बोनाफाइड प्रमाणपत्र अनुरोधों के लिए विशिष्ट फॉर्म होते हैं — पहले प्रशासन कार्यालय से जांच करें।
- यदि आपको कई प्रतियों की आवश्यकता है, तो अपने आवेदन में आवश्यक प्रतियों की संख्या का उल्लेख करें।

**नमूना आवेदन**

सेवा में,
प्रधानाचार्य महोदय,
[संस्थान का नाम],
[शहर, राज्य]

विषय: बोनाफाइड प्रमाणपत्र हेतु आवेदन

आदरणीय महोदय/महोदया,

मैं [आपका नाम], [पाठ्यक्रम का नाम], [वर्ष/सेमेस्टर], रोल नं. [XXX], [विभाग का नाम] विभाग में अध्ययनरत छात्र/छात्रा हूँ। मुझे [उद्देश्य बताएं] के उद्देश्य से बोनाफाइड प्रमाणपत्र की आवश्यकता है। कृपया जल्द से जल्द प्रमाणपत्र जारी करने की कृपा करें।

आपके सहयोग के लिए आभारी रहूँगा/रहूँगी।

धन्यवाद,
आपका/आपकी आज्ञाकारी,
[आपका नाम]
[रोल नं.]
[पाठ्यक्रम/विभाग]
[संपर्क नंबर]
[दिनांक]

**Ravomix का उपयोग**

Ravomix में एक समर्पित बोनाफाइड प्रमाणपत्र आवेदन टेम्पलेट है। बस इसे एप्लिकेशन सेक्शन से चुनें, अपना विवरण भरें, और जमा करने के लिए तैयार एक पेशेवर रूप से स्वरूपित दस्तावेज़ बनाएं।`,
    },
  },
  {
    id: "bank-complaint",
    title: {
      en: "How to Write a Bank Complaint Letter",
      hi: "बैंक शिकायत पत्र कैसे लिखें",
    },
    icon: "🏦",
    content: {
      en: `Banking complaints are among the most common grievances faced by customers in India. Whether it is an unauthorized transaction, excessive service charges, ATM issues, loan disputes, or poor customer service, knowing how to write an effective bank complaint letter is crucial for getting your issue resolved promptly.

**Common Banking Issues That Require Complaints**

- Unauthorized or fraudulent transactions on your account
- Excessive or incorrect service charges and fees
- ATM-related issues (card stuck, cash not dispensed, wrong amount)
- Delay in loan processing or disbursement
- Issues with internet banking or mobile banking services
- Non-receipt of debit/credit card or cheque book
- Incorrect account statements or balance discrepancies
- Poor behavior or service by bank staff
- Pension-related issues
- Issues with fixed deposit or recurring deposit accounts
- Insurance misselling by bank staff
- Delay in cheque clearance

**Steps to Write a Bank Complaint Letter**

**Step 1: Gather All Relevant Information**
Before writing, collect all necessary details:
- Your account number and branch details
- Transaction reference numbers and dates
- Previous complaint reference numbers (if any)
- Copies of relevant documents (bank statements, receipts, screenshots)

**Step 2: Address the Right Authority**
- For initial complaints, address the Branch Manager.
- If unresolved, escalate to the Regional/Zonal Manager.
- For further escalation, contact the Banking Ombudsman.
- Reserve RBI (Reserve Bank of India) complaints for issues not resolved by the bank or ombudsman.

**Step 3: Write a Clear Subject Line**
Example: "Subject: Complaint Regarding Unauthorized Debit of ₹5,000 from Savings Account No. XXXX1234"

**Step 4: Structure Your Letter**

Introduction:
- State your account details (account number, type, branch).
- Briefly describe the issue in one or two sentences.

Body:
- Provide a chronological account of what happened.
- Include specific dates, times, amounts, and transaction IDs.
- Mention any previous complaints or attempts to resolve the issue.
- Describe the impact of the issue on you.

Resolution Requested:
- Clearly state what action you expect (refund, reversal, explanation, compensation).
- Specify a reasonable deadline for response.

**Step 5: Attach Supporting Documents**
- Bank statements showing the disputed transaction
- Screenshots of error messages or failed transactions
- Previous complaint acknowledgments
- Any relevant correspondence with the bank

**Escalation Process**

If the bank does not resolve your complaint within 30 days:
1. File a complaint with the Banking Ombudsman (appointed by RBI).
2. Visit https://cms.rbi.org.in for online complaint filing.
3. The Ombudsman will try to resolve the issue within 30 days.
4. If still unresolved, you can appeal to the Appellate Authority at RBI.

**Important Legal Rights**

Under RBI guidelines, customers have the right to:
- Receive acknowledgment of complaints within a specified time
- Get unauthorized electronic transaction reversals within 10 working days
- Receive interest on delayed refunds
- File complaints free of charge with the Banking Ombudsman

**Tips for Success**

- Always keep copies of all correspondence.
- Send complaints via registered post or email with delivery confirmation.
- Note down complaint reference numbers provided by the bank.
- Follow up regularly and maintain a log of all interactions.
- Be factual and avoid emotional language.

**Using Ravomix**

Ravomix offers ready-made bank complaint templates covering common scenarios. Generate professional bank complaint letters with all necessary details filled in, download as PDF, and submit to your bank immediately.`,

      hi: `बैंकिंग शिकायतें भारत में ग्राहकों द्वारा सामना की जाने वाली सबसे आम शिकायतों में से हैं। चाहे यह अनधिकृत लेनदेन हो, अत्यधिक सेवा शुल्क, ATM समस्याएं, ऋण विवाद, या खराब ग्राहक सेवा, एक प्रभावी बैंक शिकायत पत्र लिखना जानना आपकी समस्या के शीघ्र समाधान के लिए महत्वपूर्ण है।

**सामान्य बैंकिंग समस्याएं जिनके लिए शिकायत आवश्यक है**

- आपके खाते में अनधिकृत या धोखाधड़ी लेनदेन
- अत्यधिक या गलत सेवा शुल्क और फीस
- ATM संबंधित समस्याएं (कार्ड फंसना, नकद न निकलना, गलत राशि)
- ऋण प्रोसेसिंग या वितरण में देरी
- इंटरनेट बैंकिंग या मोबाइल बैंकिंग सेवाओं में समस्याएं
- डेबिट/क्रेडिट कार्ड या चेक बुक प्राप्त न होना
- गलत खाता विवरण या शेष विसंगतियां
- बैंक कर्मचारियों द्वारा खराब व्यवहार या सेवा
- पेंशन संबंधित समस्याएं
- सावधि जमा या आवर्ती जमा खातों में समस्याएं

**बैंक शिकायत पत्र लिखने के चरण**

**चरण 1: सभी प्रासंगिक जानकारी इकट्ठा करें**
लिखने से पहले, सभी आवश्यक विवरण एकत्र करें:
- आपका खाता नंबर और शाखा विवरण
- लेनदेन संदर्भ संख्या और तारीखें
- पिछले शिकायत संदर्भ संख्या (यदि कोई हो)
- प्रासंगिक दस्तावेजों की प्रतियां (बैंक स्टेटमेंट, रसीदें, स्क्रीनशॉट)

**चरण 2: सही प्राधिकारी को संबोधित करें**
- प्रारंभिक शिकायतों के लिए, शाखा प्रबंधक को संबोधित करें।
- यदि हल नहीं होता, तो क्षेत्रीय/जोनल प्रबंधक को भेजें।
- आगे बढ़ाने के लिए, बैंकिंग लोकपाल से संपर्क करें।
- बैंक या लोकपाल द्वारा हल नहीं किए गए मुद्दों के लिए RBI शिकायत दर्ज करें।

**चरण 3: स्पष्ट विषय पंक्ति लिखें**
उदाहरण: "विषय: बचत खाता संख्या XXXX1234 से ₹5,000 की अनधिकृत डेबिट के संबंध में शिकायत"

**चरण 4: अपने पत्र की संरचना करें**

परिचय:
- अपने खाते का विवरण बताएं (खाता नंबर, प्रकार, शाखा)।
- एक या दो वाक्यों में समस्या का संक्षिप्त विवरण दें।

मुख्य भाग:
- क्या हुआ उसका कालानुक्रमिक विवरण प्रदान करें।
- विशिष्ट तारीखें, समय, राशियां, और लेनदेन आईडी शामिल करें।
- किसी भी पिछली शिकायत या समस्या को हल करने के प्रयासों का उल्लेख करें।

अनुरोधित समाधान:
- स्पष्ट रूप से बताएं कि आप क्या कार्रवाई चाहते हैं (धनवापसी, प्रत्यावर्तन, स्पष्टीकरण, मुआवजा)।
- प्रतिक्रिया के लिए उचित समय सीमा निर्दिष्ट करें।

**वृद्धि प्रक्रिया**

यदि बैंक 30 दिनों के भीतर आपकी शिकायत का समाधान नहीं करता:
1. बैंकिंग लोकपाल (RBI द्वारा नियुक्त) के पास शिकायत दर्ज करें।
2. ऑनलाइन शिकायत दर्ज करने के लिए https://cms.rbi.org.in पर जाएं।
3. लोकपाल 30 दिनों के भीतर समस्या को हल करने का प्रयास करेगा।

**महत्वपूर्ण कानूनी अधिकार**

RBI दिशानिर्देशों के तहत, ग्राहकों को अधिकार है:
- निर्दिष्ट समय के भीतर शिकायतों की पावती प्राप्त करना
- 10 कार्य दिवसों के भीतर अनधिकृत इलेक्ट्रॉनिक लेनदेन प्रत्यावर्तन
- विलंबित धनवापसी पर ब्याज प्राप्त करना
- बैंकिंग लोकपाल के पास निःशुल्क शिकायत दर्ज करना

**सफलता के लिए सुझाव**

- हमेशा सभी पत्राचार की प्रतियां रखें।
- डिलीवरी पुष्टि के साथ पंजीकृत डाक या ईमेल से शिकायतें भेजें।
- बैंक द्वारा प्रदान किए गए शिकायत संदर्भ नंबर नोट करें।
- नियमित रूप से फॉलो अप करें और सभी इंटरैक्शन का लॉग बनाए रखें।

**Ravomix का उपयोग**

Ravomix सामान्य परिदृश्यों को कवर करने वाले तैयार बैंक शिकायत टेम्पलेट प्रदान करता है। सभी आवश्यक विवरणों के साथ पेशेवर बैंक शिकायत पत्र बनाएं, PDF के रूप में डाउनलोड करें, और तुरंत अपने बैंक में जमा करें।`,
    },
  },
  {
    id: "legal-notice",
    title: {
      en: "How to Write a Legal Notice",
      hi: "कानूनी नोटिस कैसे लिखें",
    },
    icon: "⚖️",
    content: {
      en: `A legal notice is a formal communication sent by one party to another, informing them of an intention to take legal action if a specific grievance is not addressed within a given timeframe. It serves as a warning before initiating court proceedings and is an important step in the legal process in India.

**What is a Legal Notice?**

Under Section 80 of the Code of Civil Procedure (CPC), 1908, a legal notice is a formal document that must be sent before filing a civil suit against the government or a public officer. While not always mandatory for private disputes, sending a legal notice is considered good practice as it often leads to settlement without going to court, saving time and money for both parties.

**When Should You Send a Legal Notice?**

Legal notices are commonly sent in the following situations:

- **Property Disputes**: Boundary issues, encroachment, illegal possession, tenant-landlord disputes
- **Cheque Bounce Cases**: Under Section 138 of the Negotiable Instruments Act (mandatory requirement)
- **Debt Recovery**: When someone owes you money and refuses to pay
- **Breach of Contract**: When a party fails to fulfill contractual obligations
- **Consumer Complaints**: Defective products or deficient services
- **Defamation**: When someone damages your reputation through false statements
- **Divorce**: Before filing for divorce in certain cases
- **Employment Issues**: Wrongful termination, unpaid wages, or workplace disputes
- **Intellectual Property**: Copyright or trademark infringement

**Structure of a Legal Notice**

1. **Notice Header**: Include "LEGAL NOTICE" prominently at the top, along with the date and reference number.

2. **Sender's Details**: Full name, address, and description of the sender (through their advocate, if applicable).

3. **Recipient's Details**: Full name, address, and description of the person or entity being notified.

4. **Facts of the Case**: A chronological and detailed account of events leading to the dispute. Include dates, places, and relevant facts.

5. **Legal Grounds**: Cite relevant laws, sections, and legal provisions that support your claim.

6. **Demand/Relief Sought**: Clearly state what you want the recipient to do — pay a certain amount, vacate a property, cease an activity, etc.

7. **Time Limit**: Specify a reasonable deadline (usually 15-30 days) for the recipient to comply or respond.

8. **Consequences**: State the legal action you intend to take if the recipient fails to comply, including court proceedings and costs.

9. **Advocate's Details**: If sent through an advocate, include their name, enrollment number, and contact details.

**Important Legal Points**

- A legal notice should be sent via registered post with acknowledgment due (RPAD) to establish proof of delivery.
- Keep copies of the notice, postal receipt, and acknowledgment card.
- The notice period (time given to respond) is typically 15 to 30 days, depending on the nature of the case.
- For cheque bounce cases under Section 138 NI Act, the notice MUST be sent within 30 days of receiving the bank memo/return of the cheque.
- Multiple recipients can be addressed in the same notice.

**Costs Involved**

- Advocate fees for drafting the notice (varies by complexity and location)
- Postal charges for registered post with AD
- If you draft it yourself, only postal charges apply

**Common Mistakes to Avoid**

- Not sending the notice to the correct address
- Using vague or ambiguous language
- Not specifying the exact relief sought
- Missing statutory deadlines (especially in cheque bounce cases)
- Not keeping proof of dispatch and delivery
- Making false or exaggerated claims (which can backfire legally)

**Disclaimer**: Legal notices involve complex legal procedures. While Ravomix provides templates for guidance, it is strongly recommended to consult a qualified lawyer for drafting and sending legal notices. Ravomix templates are for educational and reference purposes only and do not constitute legal advice.

**Using Ravomix**

Ravomix offers legal notice templates for common scenarios. While these templates provide a good starting point, always consult with a legal professional before sending any legal notice.`,

      hi: `कानूनी नोटिस एक पक्ष द्वारा दूसरे पक्ष को भेजा गया एक औपचारिक संचार है, जो उन्हें सूचित करता है कि यदि एक विशिष्ट शिकायत को दी गई समयसीमा के भीतर संबोधित नहीं किया जाता है तो कानूनी कार्रवाई करने का इरादा है। यह अदालती कार्यवाही शुरू करने से पहले एक चेतावनी के रूप में कार्य करता है और भारत में कानूनी प्रक्रिया में एक महत्वपूर्ण कदम है।

**कानूनी नोटिस क्या है?**

सिविल प्रक्रिया संहिता (CPC), 1908 की धारा 80 के तहत, कानूनी नोटिस एक औपचारिक दस्तावेज है जो सरकार या सार्वजनिक अधिकारी के खिलाफ दीवानी मुकदमा दायर करने से पहले भेजा जाना चाहिए। हालांकि निजी विवादों के लिए हमेशा अनिवार्य नहीं है, कानूनी नोटिस भेजना अच्छा अभ्यास माना जाता है क्योंकि यह अक्सर अदालत में जाए बिना समझौते की ओर ले जाता है, दोनों पक्षों का समय और पैसा बचाता है।

**कानूनी नोटिस कब भेजना चाहिए?**

कानूनी नोटिस आमतौर पर निम्नलिखित स्थितियों में भेजे जाते हैं:

- **संपत्ति विवाद**: सीमा मुद्दे, अतिक्रमण, अवैध कब्ज़ा, किरायेदार-मकान मालिक विवाद
- **चेक बाउंस मामले**: परक्राम्य लिखत अधिनियम की धारा 138 के तहत (अनिवार्य आवश्यकता)
- **ऋण वसूली**: जब कोई आपका पैसा देने से मना करे
- **अनुबंध का उल्लंघन**: जब कोई पक्ष संविदात्मक दायित्वों को पूरा करने में विफल हो
- **उपभोक्ता शिकायतें**: दोषपूर्ण उत्पाद या अपर्याप्त सेवाएं
- **मानहानि**: जब कोई झूठे बयानों से आपकी प्रतिष्ठा को नुकसान पहुंचाए
- **रोजगार मुद्दे**: गलत बर्खास्तगी, अवैतनिक वेतन, या कार्यस्थल विवाद

**कानूनी नोटिस की संरचना**

1. **नोटिस शीर्षक**: शीर्ष पर "कानूनी नोटिस" प्रमुखता से शामिल करें, साथ ही तारीख और संदर्भ संख्या।

2. **प्रेषक का विवरण**: प्रेषक का पूरा नाम, पता, और विवरण (यदि लागू हो तो उनके अधिवक्ता के माध्यम से)।

3. **प्राप्तकर्ता का विवरण**: अधिसूचित किए जा रहे व्यक्ति या संस्था का पूरा नाम, पता, और विवरण।

4. **मामले के तथ्य**: विवाद की ओर ले जाने वाली घटनाओं का कालानुक्रमिक और विस्तृत विवरण। तारीखें, स्थान और प्रासंगिक तथ्य शामिल करें।

5. **कानूनी आधार**: आपके दावे का समर्थन करने वाले प्रासंगिक कानूनों, धाराओं और कानूनी प्रावधानों का हवाला दें।

6. **मांग/अनुतोष**: स्पष्ट रूप से बताएं कि आप प्राप्तकर्ता से क्या चाहते हैं — एक निश्चित राशि का भुगतान, संपत्ति खाली करना, किसी गतिविधि को रोकना, आदि।

7. **समय सीमा**: प्राप्तकर्ता के अनुपालन या प्रतिक्रिया के लिए एक उचित समय सीमा (आमतौर पर 15-30 दिन) निर्दिष्ट करें।

8. **परिणाम**: बताएं कि यदि प्राप्तकर्ता अनुपालन नहीं करता तो आप क्या कानूनी कार्रवाई करने का इरादा रखते हैं।

**महत्वपूर्ण कानूनी बिंदु**

- डिलीवरी का प्रमाण स्थापित करने के लिए कानूनी नोटिस पावती सहित रजिस्टर्ड डाक (RPAD) से भेजा जाना चाहिए।
- नोटिस, डाक रसीद और पावती कार्ड की प्रतियां रखें।
- नोटिस अवधि आमतौर पर 15 से 30 दिन है।
- चेक बाउंस मामलों में, बैंक मेमो प्राप्त होने के 30 दिनों के भीतर नोटिस भेजा जाना अनिवार्य है।

**बचने के लिए सामान्य गलतियां**

- सही पते पर नोटिस न भेजना
- अस्पष्ट भाषा का उपयोग करना
- मांगे गए सटीक अनुतोष को निर्दिष्ट न करना
- वैधानिक समय सीमा चूकना
- प्रेषण और डिलीवरी का प्रमाण न रखना
- झूठे या अतिरंजित दावे करना

**अस्वीकरण**: कानूनी नोटिस में जटिल कानूनी प्रक्रियाएं शामिल हैं। जबकि Ravomix मार्गदर्शन के लिए टेम्पलेट प्रदान करता है, कानूनी नोटिस तैयार करने और भेजने के लिए एक योग्य वकील से परामर्श करने की दृढ़ता से अनुशंसा की जाती है।

**Ravomix का उपयोग**

Ravomix सामान्य परिदृश्यों के लिए कानूनी नोटिस टेम्पलेट प्रदान करता है। हालांकि ये टेम्पलेट एक अच्छा शुरुआती बिंदु प्रदान करते हैं, कोई भी कानूनी नोटिस भेजने से पहले हमेशा कानूनी पेशेवर से परामर्श करें।`,
    },
  },
  {
    id: "emi-calculator",
    title: {
      en: "How to Use the EMI Calculator",
      hi: "EMI कैलकुलेटर का उपयोग कैसे करें",
    },
    icon: "💰",
    content: {
      en: `An EMI (Equated Monthly Installment) is a fixed payment made by a borrower to a lender on a specified date each month. Understanding EMI calculations is essential when taking any kind of loan — whether it is a home loan, car loan, personal loan, or education loan. The Ravomix EMI Calculator helps you plan your finances by providing instant and accurate EMI calculations.

**What is EMI?**

EMI stands for Equated Monthly Installment. It is the amount you pay every month to the bank or financial institution until the loan is fully repaid. Each EMI payment consists of two components:

1. **Principal Component**: The portion that goes toward repaying the actual loan amount.
2. **Interest Component**: The portion that goes toward paying the interest charged by the lender.

In the initial months, a larger portion of the EMI goes toward interest, and as you progress through the loan tenure, a larger portion goes toward the principal. This is known as the amortization schedule.

**The EMI Formula**

EMI is calculated using the following mathematical formula:

EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]

Where:
- P = Principal loan amount
- R = Monthly interest rate (Annual rate / 12 / 100)
- N = Number of monthly installments (Loan tenure in months)

**Example Calculation**

Let us calculate EMI for a home loan:
- Loan Amount (P): ₹30,00,000 (30 lakhs)
- Annual Interest Rate: 8.5%
- Loan Tenure: 20 years (240 months)

Monthly Interest Rate (R) = 8.5 / 12 / 100 = 0.007083

EMI = [30,00,000 × 0.007083 × (1.007083)^240] / [(1.007083)^240 - 1]
EMI ≈ ₹26,035 per month

Total amount payable = ₹26,035 × 240 = ₹62,48,400
Total interest payable = ₹62,48,400 - ₹30,00,000 = ₹32,48,400

**How to Use the Ravomix EMI Calculator**

1. Open the Ravomix app and go to the Tools section.
2. Select "EMI Calculator" from the list.
3. Enter the Loan Amount — the total amount you wish to borrow.
4. Enter the Annual Interest Rate — the rate offered by your bank or lender.
5. Enter the Loan Tenure — in months or years.
6. The calculator instantly displays your monthly EMI, total interest payable, and total amount payable.

**Factors That Affect Your EMI**

- **Loan Amount**: Higher loan amount means higher EMI.
- **Interest Rate**: Higher interest rate increases the EMI and total interest paid.
- **Loan Tenure**: Longer tenure reduces EMI but increases total interest paid. Shorter tenure increases EMI but saves on total interest.
- **Type of Interest**: Fixed rate EMIs remain constant, while floating rate EMIs can change based on market conditions.
- **Prepayments**: Making partial prepayments can reduce the outstanding principal and thereby reduce future EMIs or tenure.

**Types of Loans and Typical Interest Rates (India, 2024-2025)**

- **Home Loan**: 8.25% - 9.50% (20-30 year tenure)
- **Car Loan**: 8.50% - 12.00% (3-7 year tenure)
- **Personal Loan**: 10.50% - 24.00% (1-5 year tenure)
- **Education Loan**: 8.00% - 15.00% (5-15 year tenure)
- **Gold Loan**: 7.00% - 17.00% (3 months - 3 years)

**Tips for Managing EMIs**

- Keep your total EMI obligations below 40% of your monthly income.
- Compare interest rates from multiple lenders before taking a loan.
- Consider making prepayments when you have surplus funds.
- Choose between fixed and floating interest rates based on market outlook.
- Always read the fine print for processing fees, prepayment penalties, and other charges.

The Ravomix EMI Calculator is a powerful tool that helps you make informed financial decisions. Use it to compare different loan scenarios and find the best option for your needs.`,

      hi: `EMI (समान मासिक किस्त) एक निश्चित भुगतान है जो एक उधारकर्ता द्वारा हर महीने एक निश्चित तिथि पर ऋणदाता को किया जाता है। किसी भी प्रकार का ऋण लेते समय EMI गणना को समझना आवश्यक है — चाहे वह होम लोन हो, कार लोन, पर्सनल लोन, या एजुकेशन लोन। Ravomix EMI कैलकुलेटर तत्काल और सटीक EMI गणना प्रदान करके आपकी वित्तीय योजना बनाने में मदद करता है।

**EMI क्या है?**

EMI का मतलब है समान मासिक किस्त। यह वह राशि है जो आप ऋण पूरी तरह से चुकाने तक हर महीने बैंक या वित्तीय संस्थान को भुगतान करते हैं। प्रत्येक EMI भुगतान में दो घटक होते हैं:

1. **मूलधन घटक**: वह हिस्सा जो वास्तविक ऋण राशि के पुनर्भुगतान की ओर जाता है।
2. **ब्याज घटक**: वह हिस्सा जो ऋणदाता द्वारा लगाए गए ब्याज के भुगतान की ओर जाता है।

प्रारंभिक महीनों में, EMI का एक बड़ा हिस्सा ब्याज की ओर जाता है, और जैसे-जैसे आप ऋण अवधि में आगे बढ़ते हैं, एक बड़ा हिस्सा मूलधन की ओर जाता है। इसे ऋण परिशोधन अनुसूची कहा जाता है।

**EMI सूत्र**

EMI की गणना निम्नलिखित गणितीय सूत्र का उपयोग करके की जाती है:

EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]

जहाँ:
- P = मूलधन ऋण राशि
- R = मासिक ब्याज दर (वार्षिक दर / 12 / 100)
- N = मासिक किस्तों की संख्या (महीनों में ऋण अवधि)

**उदाहरण गणना**

आइए होम लोन के लिए EMI की गणना करें:
- ऋण राशि (P): ₹30,00,000 (30 लाख)
- वार्षिक ब्याज दर: 8.5%
- ऋण अवधि: 20 वर्ष (240 महीने)

मासिक ब्याज दर (R) = 8.5 / 12 / 100 = 0.007083

EMI ≈ ₹26,035 प्रति माह

कुल देय राशि = ₹26,035 × 240 = ₹62,48,400
कुल देय ब्याज = ₹62,48,400 - ₹30,00,000 = ₹32,48,400

**Ravomix EMI कैलकुलेटर का उपयोग कैसे करें**

1. Ravomix ऐप खोलें और टूल्स सेक्शन में जाएं।
2. सूची से "EMI कैलकुलेटर" चुनें।
3. ऋण राशि दर्ज करें — वह कुल राशि जो आप उधार लेना चाहते हैं।
4. वार्षिक ब्याज दर दर्ज करें — आपके बैंक या ऋणदाता द्वारा प्रस्तावित दर।
5. ऋण अवधि दर्ज करें — महीनों या वर्षों में।
6. कैलकुलेटर तुरंत आपकी मासिक EMI, कुल देय ब्याज, और कुल देय राशि प्रदर्शित करता है।

**EMI को प्रभावित करने वाले कारक**

- **ऋण राशि**: अधिक ऋण राशि का मतलब अधिक EMI।
- **ब्याज दर**: उच्च ब्याज दर EMI और कुल भुगतान किए गए ब्याज को बढ़ाती है।
- **ऋण अवधि**: लंबी अवधि EMI को कम करती है लेकिन कुल ब्याज बढ़ाती है। छोटी अवधि EMI बढ़ाती है लेकिन कुल ब्याज पर बचत करती है।
- **ब्याज का प्रकार**: फिक्स्ड रेट EMI स्थिर रहती है, जबकि फ्लोटिंग रेट EMI बाजार की स्थितियों के आधार पर बदल सकती है।
- **प्रीपेमेंट**: आंशिक प्रीपेमेंट बकाया मूलधन को कम कर सकता है।

**ऋण के प्रकार और सामान्य ब्याज दरें (भारत, 2024-2025)**

- **होम लोन**: 8.25% - 9.50% (20-30 वर्ष अवधि)
- **कार लोन**: 8.50% - 12.00% (3-7 वर्ष अवधि)
- **पर्सनल लोन**: 10.50% - 24.00% (1-5 वर्ष अवधि)
- **एजुकेशन लोन**: 8.00% - 15.00% (5-15 वर्ष अवधि)
- **गोल्ड लोन**: 7.00% - 17.00% (3 महीने - 3 वर्ष)

**EMI प्रबंधन के लिए सुझाव**

- अपनी कुल EMI दायित्वों को अपनी मासिक आय के 40% से नीचे रखें।
- ऋण लेने से पहले कई ऋणदाताओं से ब्याज दरों की तुलना करें।
- जब आपके पास अतिरिक्त धन हो तो प्रीपेमेंट करने पर विचार करें।
- बाजार के दृष्टिकोण के आधार पर फिक्स्ड और फ्लोटिंग ब्याज दरों के बीच चुनें।

Ravomix EMI कैलकुलेटर एक शक्तिशाली उपकरण है जो आपको सूचित वित्तीय निर्णय लेने में मदद करता है।`,
    },
  },
  {
    id: "transfer-certificate",
    title: {
      en: "How to Write a Transfer Certificate Request",
      hi: "स्थानांतरण प्रमाणपत्र अनुरोध कैसे लिखें",
    },
    icon: "📜",
    content: {
      en: `A Transfer Certificate (TC) is an official document issued by an educational institution when a student leaves the institution to join another. It is a critical document that contains the student's academic record, conduct, and other essential details required for admission to a new institution.

**What is a Transfer Certificate?**

A Transfer Certificate, also known as a School Leaving Certificate (SLC) in some regions, is issued by the head of an educational institution (Principal, Headmaster, or Registrar) when a student officially withdraws from the institution. It serves as proof that the student was enrolled at the institution and has been officially released to join another institution.

**Key Information in a Transfer Certificate**

A standard TC typically contains:
- Student's full name and date of birth
- Father's/Guardian's name
- Date of admission and date of leaving
- Class/Standard in which the student was last enrolled
- Whether the student has paid all dues
- Conduct and character assessment
- Reason for leaving
- Whether the student is qualified for promotion to the next class
- School/College registration number
- Official seal and signature of the issuing authority

**When Do You Need a Transfer Certificate?**

- Transferring to another school or college within the same city
- Relocating to a different city or state
- Switching from one board to another (e.g., CBSE to State Board)
- Moving from school to college (after Class 10 or 12)
- Joining a professional course or university
- Discontinuing studies temporarily or permanently

**How to Write a TC Application**

**Step 1: Use Proper Format**
Follow the standard formal letter format with correct date, addressing, and subject line.

**Step 2: Address the Right Person**
Usually the Principal or Headmaster for schools, and the Registrar or Dean for colleges and universities.

**Step 3: Introduction**
Introduce yourself with complete details — name, class/course, roll number, section, and academic year.

**Step 4: State the Reason**
Clearly mention why you need the TC. Common reasons include:
- Family relocation to another city
- Admission to a higher education institution
- Transfer of parent's job
- Personal or health reasons
- Switching to a different educational board

**Step 5: Request Issuance**
Politely request the issuance of the TC and mention any urgency if applicable.

**Step 6: Mention Dues**
State that you have cleared all dues (library fees, tuition fees, hostel charges, etc.) or are willing to clear them before collecting the TC.

**Step 7: Closing**
Thank the authority and provide your contact information for any follow-up.

**Sample TC Application**

To,
The Principal,
[School/College Name],
[City, State]

Subject: Application for Transfer Certificate

Respected Sir/Madam,

I am [Your Name], a student of Class [X], Section [A], bearing Roll No. [XXX], studying in your esteemed institution during the academic year [YYYY-YYYY].

I am writing to request the issuance of my Transfer Certificate as my father has been transferred to [City Name], and I need to continue my studies at a school there. I have cleared all pending dues with the institution.

I kindly request you to issue my Transfer Certificate at the earliest so that I can secure admission at my new school before the deadline.

I am enclosing the following documents:
1. Fee clearance receipt
2. Library clearance certificate
3. ID card

Thanking you for your kind cooperation.

Yours obediently,
[Your Name]
[Class/Section]
[Roll Number]
[Parent's Contact: XXXXXXXXXX]
[Date]

**Important Tips**

- Apply for the TC well in advance, especially during peak admission seasons.
- Ensure all institutional dues are cleared before applying.
- Collect the TC in person and verify all details (especially name spelling, dates, and class) immediately.
- Keep photocopies of the TC for your records before submitting it to the new institution.
- If there is any error in the TC, get it corrected immediately before leaving the institution.
- Some institutions may require the parent/guardian to sign the TC application.

**Using Ravomix**

Ravomix provides a ready-made Transfer Certificate application template. Select it from the Applications section, fill in your details, and generate a professional application instantly. Available in English and Hindi.`,

      hi: `स्थानांतरण प्रमाणपत्र (TC) एक आधिकारिक दस्तावेज है जो एक शैक्षणिक संस्थान द्वारा जारी किया जाता है जब कोई छात्र संस्थान छोड़कर दूसरे में शामिल होता है। यह एक महत्वपूर्ण दस्तावेज है जिसमें छात्र का शैक्षणिक रिकॉर्ड, आचरण, और नए संस्थान में प्रवेश के लिए आवश्यक अन्य आवश्यक विवरण शामिल होते हैं।

**स्थानांतरण प्रमाणपत्र क्या है?**

स्थानांतरण प्रमाणपत्र, जिसे कुछ क्षेत्रों में स्कूल छोड़ने का प्रमाणपत्र (SLC) भी कहा जाता है, किसी शैक्षणिक संस्थान के प्रमुख (प्रधानाचार्य, प्रधानाध्यापक, या रजिस्ट्रार) द्वारा जारी किया जाता है जब कोई छात्र आधिकारिक रूप से संस्थान से हटता है। यह इस बात का प्रमाण है कि छात्र संस्थान में नामांकित था और आधिकारिक रूप से दूसरे संस्थान में शामिल होने के लिए रिहा किया गया है।

**स्थानांतरण प्रमाणपत्र में मुख्य जानकारी**

एक मानक TC में आमतौर पर शामिल होता है:
- छात्र का पूरा नाम और जन्म तिथि
- पिता/अभिभावक का नाम
- प्रवेश की तिथि और छोड़ने की तिथि
- कक्षा जिसमें छात्र अंतिम बार नामांकित था
- क्या छात्र ने सभी बकाया राशि का भुगतान किया है
- आचरण और चरित्र मूल्यांकन
- छोड़ने का कारण
- क्या छात्र अगली कक्षा में पदोन्नति के योग्य है
- विद्यालय/महाविद्यालय पंजीकरण संख्या
- जारी करने वाले प्राधिकारी की आधिकारिक मुहर और हस्ताक्षर

**स्थानांतरण प्रमाणपत्र कब आवश्यक है?**

- उसी शहर में किसी अन्य स्कूल या कॉलेज में स्थानांतरण
- किसी अन्य शहर या राज्य में स्थानांतरण
- एक बोर्ड से दूसरे बोर्ड में बदलना (जैसे CBSE से राज्य बोर्ड)
- स्कूल से कॉलेज जाना (कक्षा 10 या 12 के बाद)
- पेशेवर पाठ्यक्रम या विश्वविद्यालय में शामिल होना

**TC आवेदन कैसे लिखें**

**चरण 1: उचित प्रारूप का उपयोग करें**
सही तिथि, संबोधन और विषय पंक्ति के साथ मानक औपचारिक पत्र प्रारूप का पालन करें।

**चरण 2: सही व्यक्ति को संबोधित करें**
आमतौर पर स्कूलों के लिए प्रधानाचार्य या प्रधानाध्यापक, और कॉलेजों और विश्वविद्यालयों के लिए रजिस्ट्रार या डीन।

**चरण 3: परिचय**
अपने पूरे विवरण के साथ अपना परिचय दें — नाम, कक्षा/पाठ्यक्रम, रोल नंबर, अनुभाग और शैक्षणिक वर्ष।

**चरण 4: कारण बताएं**
स्पष्ट रूप से बताएं कि आपको TC की आवश्यकता क्यों है। सामान्य कारणों में शामिल हैं:
- परिवार का दूसरे शहर में स्थानांतरण
- उच्च शिक्षा संस्थान में प्रवेश
- माता-पिता की नौकरी का स्थानांतरण
- व्यक्तिगत या स्वास्थ्य कारण

**चरण 5: जारी करने का अनुरोध**
विनम्रतापूर्वक TC जारी करने का अनुरोध करें और यदि लागू हो तो किसी भी तत्काल आवश्यकता का उल्लेख करें।

**चरण 6: बकाया राशि का उल्लेख**
बताएं कि आपने सभी बकाया राशि (पुस्तकालय शुल्क, शिक्षण शुल्क, छात्रावास शुल्क, आदि) चुका दी है।

**नमूना TC आवेदन**

सेवा में,
प्रधानाचार्य महोदय,
[स्कूल/कॉलेज का नाम],
[शहर, राज्य]

विषय: स्थानांतरण प्रमाणपत्र हेतु आवेदन

आदरणीय महोदय/महोदया,

मैं [आपका नाम], कक्षा [X], अनुभाग [A], रोल नं. [XXX], शैक्षणिक वर्ष [YYYY-YYYY] के दौरान आपके प्रतिष्ठित संस्थान में अध्ययनरत छात्र/छात्रा हूँ।

मैं अपना स्थानांतरण प्रमाणपत्र जारी करने का अनुरोध कर रहा/रही हूँ क्योंकि मेरे पिता का [शहर का नाम] में स्थानांतरण हो गया है, और मुझे वहां एक स्कूल में अपनी पढ़ाई जारी रखनी है। मैंने संस्थान के सभी बकाया राशि का भुगतान कर दिया है।

कृपया मेरा स्थानांतरण प्रमाणपत्र जल्द से जल्द जारी करने की कृपा करें ताकि मैं समय सीमा से पहले अपने नए स्कूल में प्रवेश सुरक्षित कर सकूं।

धन्यवाद,
आपका/आपकी आज्ञाकारी,
[आपका नाम]
[कक्षा/अनुभाग]
[रोल नंबर]
[अभिभावक संपर्क: XXXXXXXXXX]
[दिनांक]

**महत्वपूर्ण सुझाव**

- TC के लिए समय से पहले आवेदन करें, विशेष रूप से प्रवेश के व्यस्त मौसम में।
- आवेदन करने से पहले सभी संस्थागत बकाया राशि का भुगतान सुनिश्चित करें।
- TC को व्यक्तिगत रूप से लें और सभी विवरणों की तुरंत जांच करें।
- नए संस्थान में जमा करने से पहले TC की फोटोकॉपी अपने रिकॉर्ड के लिए रखें।

**Ravomix का उपयोग**

Ravomix एक तैयार स्थानांतरण प्रमाणपत्र आवेदन टेम्पलेट प्रदान करता है। इसे एप्लिकेशन सेक्शन से चुनें, अपना विवरण भरें, और तुरंत एक पेशेवर आवेदन बनाएं। अंग्रेजी और हिंदी में उपलब्ध।`,
    },
  },
  {
    id: "office-application",
    title: {
      en: "How to Write an Office Application",
      hi: "कार्यालय आवेदन कैसे लिखें",
    },
    icon: "🏢",
    content: {
      en: `Office applications are formal letters written by employees to their employers, managers, or HR departments for various purposes. Whether you need to request leave, apply for a transfer, ask for a salary advance, or communicate any official matter, knowing how to write a professional office application is an essential workplace skill.

**Types of Office Applications**

Office applications can be broadly categorized into the following types:

1. **Leave Applications**: Casual leave, sick leave, earned leave, maternity/paternity leave, emergency leave
2. **Transfer Applications**: Requesting transfer to another branch, department, or location
3. **Salary Related**: Salary advance, increment request, salary certificate request
4. **Certificate Requests**: Experience certificate, employment certificate, no-objection certificate (NOC)
5. **Resignation Letters**: Formal notice of intention to leave the organization
6. **Permission Requests**: Work from home, flexible hours, early departure
7. **Complaint Applications**: Harassment complaints, facility complaints, policy grievances
8. **Reimbursement Requests**: Medical reimbursement, travel expense claims
9. **Training Requests**: Request for professional development or training programs

**Standard Format for Office Applications**

Every office application should follow this general structure:

**1. Header Information**
- Your name and employee ID
- Department and designation
- Date of writing

**2. Recipient Information**
- Name and designation of the person you are addressing
- Department name
- Company name and address

**3. Subject Line**
A clear, specific subject line that immediately conveys the purpose. Examples:
- "Subject: Application for 5 Days Casual Leave"
- "Subject: Request for Transfer to Mumbai Branch"
- "Subject: Application for Salary Advance"

**4. Salutation**
Use appropriate formal greetings:
- "Dear Mr./Ms. [Last Name],"
- "Respected Sir/Madam,"
- "Dear [Designation],"

**5. Body of the Application**

First paragraph — State the purpose clearly and directly. Do not beat around the bush.

Middle paragraph(s) — Provide relevant details:
- For leave: dates, reason, work coverage plan
- For transfer: reason, preferred location, how long you have been at current location
- For salary advance: amount needed, reason, repayment plan

Final paragraph — Summarize your request and express gratitude.

**6. Closing**
- "Thanking you,"
- "Looking forward to your kind approval,"
- "I shall be grateful for your consideration,"

**7. Signature Block**
- Your full name
- Employee ID
- Designation
- Department
- Contact number
- Email address

**Professional Writing Tips**

- **Be Professional**: Use formal language throughout. Avoid slang, abbreviations, or casual expressions.
- **Be Specific**: Clearly mention dates, amounts, and other specific details.
- **Be Concise**: Keep the application focused and avoid unnecessary information.
- **Be Respectful**: Maintain a polite and respectful tone regardless of the nature of the application.
- **Proofread**: Check for grammatical errors, typos, and formatting issues.
- **Follow Company Policy**: Be aware of your company's specific procedures for different types of applications.
- **CC Relevant People**: If required, copy relevant stakeholders like HR, your manager's manager, etc.
- **Provide Supporting Documents**: Attach any required documents such as medical certificates, bills, or approvals.

**Email vs. Hard Copy**

In modern workplaces, many applications are submitted via email. When sending an email application:
- Use a clear subject line with the application type
- Keep the format professional
- Attach any supporting documents as PDF files
- CC relevant stakeholders as needed
- Request a read receipt for important applications

**Sample Office Application (Leave Request)**

To,
The Manager,
[Department Name],
[Company Name]

Date: [DD/MM/YYYY]

Subject: Application for Casual Leave

Respected Sir/Madam,

I am writing to request casual leave for [number] days from [start date] to [end date] due to [reason]. During my absence, [colleague name] has kindly agreed to handle any urgent matters in my department.

I have ensured that all pending tasks are completed before my leave period, and I will be reachable via email for any critical issues.

I kindly request you to approve my leave application. I shall be grateful for your consideration.

Thanking you,
Yours sincerely,
[Your Name]
Employee ID: [XXXXX]
[Designation]
[Department]
[Contact Number]

**Using Ravomix**

Ravomix offers various office application templates covering leave, transfer, salary advance, and more. Simply select the template that matches your need, fill in the details, and generate a professional application ready to submit.`,

      hi: `कार्यालय आवेदन कर्मचारियों द्वारा अपने नियोक्ताओं, प्रबंधकों, या एचआर विभागों को विभिन्न उद्देश्यों के लिए लिखे गए औपचारिक पत्र हैं। चाहे आपको छुट्टी का अनुरोध करना हो, स्थानांतरण के लिए आवेदन करना हो, वेतन अग्रिम मांगना हो, या कोई भी आधिकारिक मामला संवाद करना हो, एक पेशेवर कार्यालय आवेदन लिखना जानना एक आवश्यक कार्यस्थल कौशल है।

**कार्यालय आवेदनों के प्रकार**

कार्यालय आवेदनों को मोटे तौर पर निम्नलिखित प्रकारों में वर्गीकृत किया जा सकता है:

1. **छुट्टी आवेदन**: आकस्मिक छुट्टी, बीमारी की छुट्टी, अर्जित छुट्टी, मातृत्व/पितृत्व छुट्टी, आपातकालीन छुट्टी
2. **स्थानांतरण आवेदन**: किसी अन्य शाखा, विभाग, या स्थान पर स्थानांतरण का अनुरोध
3. **वेतन संबंधित**: वेतन अग्रिम, वेतन वृद्धि अनुरोध, वेतन प्रमाणपत्र अनुरोध
4. **प्रमाणपत्र अनुरोध**: अनुभव प्रमाणपत्र, रोजगार प्रमाणपत्र, अनापत्ति प्रमाणपत्र (NOC)
5. **त्यागपत्र**: संगठन छोड़ने के इरादे की औपचारिक सूचना
6. **अनुमति अनुरोध**: घर से काम, लचीले घंटे, जल्दी जाना
7. **शिकायत आवेदन**: उत्पीड़न शिकायत, सुविधा शिकायत, नीति शिकायत
8. **प्रतिपूर्ति अनुरोध**: चिकित्सा प्रतिपूर्ति, यात्रा व्यय दावे

**कार्यालय आवेदनों का मानक प्रारूप**

प्रत्येक कार्यालय आवेदन को इस सामान्य संरचना का पालन करना चाहिए:

**1. शीर्ष जानकारी**
- आपका नाम और कर्मचारी आईडी
- विभाग और पदनाम
- लिखने की तारीख

**2. प्राप्तकर्ता की जानकारी**
- उस व्यक्ति का नाम और पदनाम जिसे आप संबोधित कर रहे हैं
- विभाग का नाम
- कंपनी का नाम और पता

**3. विषय पंक्ति**
एक स्पष्ट, विशिष्ट विषय पंक्ति जो तुरंत उद्देश्य बताए। उदाहरण:
- "विषय: 5 दिनों की आकस्मिक छुट्टी के लिए आवेदन"
- "विषय: मुंबई शाखा में स्थानांतरण का अनुरोध"

**4. अभिवादन**
उपयुक्त औपचारिक अभिवादन का उपयोग करें:
- "आदरणीय महोदय/महोदया,"
- "प्रिय श्री/श्रीमती [नाम],"

**5. आवेदन का मुख्य भाग**

पहला पैराग्राफ — उद्देश्य स्पष्ट रूप से और सीधे बताएं।

मध्य पैराग्राफ — प्रासंगिक विवरण प्रदान करें:
- छुट्टी के लिए: तारीखें, कारण, कार्य कवरेज योजना
- स्थानांतरण के लिए: कारण, पसंदीदा स्थान
- वेतन अग्रिम के लिए: आवश्यक राशि, कारण, पुनर्भुगतान योजना

अंतिम पैराग्राफ — अपने अनुरोध को संक्षेप में प्रस्तुत करें और आभार व्यक्त करें।

**6. समापन**
- "धन्यवाद,"
- "आपकी कृपया स्वीकृति की प्रतीक्षा में,"

**7. हस्ताक्षर खंड**
- आपका पूरा नाम
- कर्मचारी आईडी
- पदनाम
- विभाग
- संपर्क नंबर

**पेशेवर लेखन सुझाव**

- **पेशेवर रहें**: पूरे पत्र में औपचारिक भाषा का उपयोग करें।
- **विशिष्ट रहें**: तारीखें, राशियां और अन्य विशिष्ट विवरण स्पष्ट रूप से बताएं।
- **संक्षिप्त रहें**: आवेदन को केंद्रित रखें और अनावश्यक जानकारी से बचें।
- **सम्मानजनक रहें**: आवेदन की प्रकृति की परवाह किए बिना विनम्र और सम्मानजनक लहजा बनाए रखें।
- **जाँच करें**: व्याकरणिक त्रुटियों, टाइपो और स्वरूपण मुद्दों की जाँच करें।
- **कंपनी नीति का पालन करें**: विभिन्न प्रकार के आवेदनों के लिए अपनी कंपनी की विशिष्ट प्रक्रियाओं से अवगत रहें।

**नमूना कार्यालय आवेदन (छुट्टी अनुरोध)**

सेवा में,
प्रबंधक महोदय,
[विभाग का नाम],
[कंपनी का नाम]

दिनांक: [DD/MM/YYYY]

विषय: आकस्मिक छुट्टी के लिए आवेदन

आदरणीय महोदय/महोदया,

मैं [कारण] के कारण [प्रारंभ तिथि] से [समाप्ति तिथि] तक [संख्या] दिनों की आकस्मिक छुट्टी का अनुरोध कर रहा/रही हूँ। मेरी अनुपस्थिति के दौरान, [सहकर्मी का नाम] ने मेरे विभाग में किसी भी तत्काल मामले को संभालने पर सहमति व्यक्त की है।

मैंने सुनिश्चित किया है कि मेरी छुट्टी अवधि से पहले सभी लंबित कार्य पूरे हो गए हैं।

कृपया मेरे छुट्टी आवेदन को स्वीकृत करने की कृपा करें।

धन्यवाद,
भवदीय/भवदीया,
[आपका नाम]
कर्मचारी आईडी: [XXXXX]
[पदनाम]
[विभाग]
[संपर्क नंबर]

**Ravomix का उपयोग**

Ravomix छुट्टी, स्थानांतरण, वेतन अग्रिम और अन्य कई कार्यालय आवेदन टेम्पलेट प्रदान करता है। बस अपनी आवश्यकता से मेल खाने वाला टेम्पलेट चुनें, विवरण भरें, और जमा करने के लिए तैयार एक पेशेवर आवेदन बनाएं।`,
    },
  },
  {
    id: "income-tax-calculator",
    title: {
      en: "How to Use the Income Tax Calculator",
      hi: "आयकर कैलकुलेटर का उपयोग कैसे करें",
    },
    icon: "🧾",
    content: {
      en: `Understanding income tax calculations is essential for every earning individual in India. Whether you are a salaried employee, a freelancer, a business owner, or a professional, knowing how much tax you owe helps in financial planning and ensures compliance with tax laws. The Ravomix Income Tax Calculator simplifies this process by providing quick and accurate tax estimates.

**What is Income Tax?**

Income tax is a direct tax levied by the Government of India on the income earned by individuals, Hindu Undivided Families (HUFs), companies, firms, and other entities during a financial year (April 1 to March 31). The Income Tax Act, 1961, governs the taxation system, and the Central Board of Direct Taxes (CBDT) under the Ministry of Finance administers it.

**Income Tax Regimes in India**

From FY 2023-24, India has two tax regimes:

**New Tax Regime (Default from FY 2023-24)**
- ₹0 - ₹3,00,000: Nil
- ₹3,00,001 - ₹6,00,000: 5%
- ₹6,00,001 - ₹9,00,000: 10%
- ₹9,00,001 - ₹12,00,000: 15%
- ₹12,00,001 - ₹15,00,000: 20%
- Above ₹15,00,000: 30%
- Standard deduction: ₹50,000 for salaried individuals
- No other major deductions available

**Old Tax Regime (Optional)**
- ₹0 - ₹2,50,000: Nil
- ₹2,50,001 - ₹5,00,000: 5%
- ₹5,00,001 - ₹10,00,000: 20%
- Above ₹10,00,000: 30%
- Multiple deductions available (80C, 80D, HRA, etc.)

**Important Deductions Under Old Regime**

1. **Section 80C** (Max ₹1,50,000): PPF, ELSS, Life Insurance, EPF, NSC, Tax-saving FDs, Tuition fees
2. **Section 80D** (Max ₹25,000-₹1,00,000): Health insurance premiums
3. **Section 24(b)** (Max ₹2,00,000): Home loan interest
4. **HRA Exemption**: Based on rent paid, salary, and city of residence
5. **Section 80E**: Education loan interest (no upper limit)
6. **Section 80G**: Donations to specified funds and charities
7. **Standard Deduction**: ₹50,000 for salaried employees

**How to Calculate Income Tax**

Step 1: Calculate Gross Total Income
- Include salary, house property income, capital gains, business income, and other sources

Step 2: Subtract Deductions (Old Regime)
- Apply eligible deductions under 80C, 80D, 80E, 80G, HRA, etc.
- This gives you the Taxable Income

Step 3: Apply Tax Slab Rates
- Apply the appropriate slab rates to the taxable income
- Calculate tax for each slab separately and add them up

Step 4: Add Surcharge (if applicable)
- Income between ₹50 lakh - ₹1 crore: 10% surcharge
- Income between ₹1 crore - ₹2 crore: 15% surcharge
- Higher surcharges for higher income levels

Step 5: Add Health & Education Cess
- 4% cess on total tax (including surcharge)

Step 6: Subtract TDS/Advance Tax Already Paid
- Deduct any Tax Deducted at Source (TDS) or advance tax paid during the year

**Example Tax Calculation (New Regime)**

Annual Income: ₹12,00,000
Standard Deduction: ₹50,000
Taxable Income: ₹11,50,000

Tax Calculation:
- ₹0 - ₹3,00,000 = ₹0
- ₹3,00,001 - ₹6,00,000 = ₹15,000 (5%)
- ₹6,00,001 - ₹9,00,000 = ₹30,000 (10%)
- ₹9,00,001 - ₹11,50,000 = ₹37,500 (15%)
- Total Tax = ₹82,500
- Add Cess (4%) = ₹3,300
- Total Tax Payable = ₹85,800

**Using the Ravomix Income Tax Calculator**

1. Open Ravomix and go to Tools section.
2. Select "Income Tax Calculator."
3. Enter your annual income.
4. Select the tax regime (Old or New).
5. If using the old regime, enter applicable deductions.
6. The calculator instantly shows your tax liability, effective tax rate, and take-home amount.

**Tips for Tax Planning**

- Compare both regimes using the calculator to see which saves more tax.
- If you have significant deductions (home loan, insurance, PPF), the old regime might be better.
- If you have fewer deductions, the new regime with lower rates might be advantageous.
- Start tax planning at the beginning of the financial year, not at the end.
- Keep records of all investments, deductions, and tax payments.

**Disclaimer**: Tax calculations are based on current tax laws and rates. Always verify with the latest government notifications and consult a tax professional for complex scenarios. Ravomix provides estimates for guidance purposes only.`,

      hi: `भारत में हर कमाने वाले व्यक्ति के लिए आयकर गणना को समझना आवश्यक है। चाहे आप वेतनभोगी कर्मचारी हों, फ्रीलांसर हों, व्यापार मालिक हों, या पेशेवर हों, यह जानना कि आप पर कितना कर बकाया है, वित्तीय योजना बनाने में मदद करता है और कर कानूनों के अनुपालन को सुनिश्चित करता है। Ravomix आयकर कैलकुलेटर त्वरित और सटीक कर अनुमान प्रदान करके इस प्रक्रिया को सरल बनाता है।

**आयकर क्या है?**

आयकर भारत सरकार द्वारा व्यक्तियों, हिंदू अविभाजित परिवारों (HUF), कंपनियों, फर्मों और अन्य संस्थाओं द्वारा एक वित्तीय वर्ष (1 अप्रैल से 31 मार्च) के दौरान अर्जित आय पर लगाया जाने वाला प्रत्यक्ष कर है। आयकर अधिनियम, 1961, कराधान प्रणाली को नियंत्रित करता है।

**भारत में आयकर व्यवस्थाएं**

वित्तीय वर्ष 2023-24 से, भारत में दो कर व्यवस्थाएं हैं:

**नई कर व्यवस्था (FY 2023-24 से डिफ़ॉल्ट)**
- ₹0 - ₹3,00,000: शून्य
- ₹3,00,001 - ₹6,00,000: 5%
- ₹6,00,001 - ₹9,00,000: 10%
- ₹9,00,001 - ₹12,00,000: 15%
- ₹12,00,001 - ₹15,00,000: 20%
- ₹15,00,000 से ऊपर: 30%
- मानक कटौती: वेतनभोगी व्यक्तियों के लिए ₹50,000

**पुरानी कर व्यवस्था (वैकल्पिक)**
- ₹0 - ₹2,50,000: शून्य
- ₹2,50,001 - ₹5,00,000: 5%
- ₹5,00,001 - ₹10,00,000: 20%
- ₹10,00,000 से ऊपर: 30%
- कई कटौतियां उपलब्ध (80C, 80D, HRA, आदि)

**पुरानी व्यवस्था के तहत महत्वपूर्ण कटौतियां**

1. **धारा 80C** (अधिकतम ₹1,50,000): PPF, ELSS, जीवन बीमा, EPF, NSC, कर-बचत FD, ट्यूशन फीस
2. **धारा 80D** (अधिकतम ₹25,000-₹1,00,000): स्वास्थ्य बीमा प्रीमियम
3. **धारा 24(b)** (अधिकतम ₹2,00,000): होम लोन ब्याज
4. **HRA छूट**: भुगतान किए गए किराये, वेतन और निवास शहर के आधार पर
5. **धारा 80E**: शिक्षा ऋण ब्याज (कोई ऊपरी सीमा नहीं)
6. **धारा 80G**: निर्दिष्ट निधि और दान में दान

**आयकर की गणना कैसे करें**

चरण 1: सकल कुल आय की गणना करें
- वेतन, गृह संपत्ति आय, पूंजी लाभ, व्यापार आय, और अन्य स्रोतों को शामिल करें

चरण 2: कटौतियां घटाएं (पुरानी व्यवस्था)
- 80C, 80D, 80E, 80G, HRA आदि के तहत पात्र कटौतियां लागू करें
- यह आपको कर योग्य आय देता है

चरण 3: कर स्लैब दरें लागू करें
- कर योग्य आय पर उचित स्लैब दरें लागू करें
- प्रत्येक स्लैब के लिए अलग-अलग कर की गणना करें और उन्हें जोड़ें

चरण 4: अधिभार जोड़ें (यदि लागू हो)
- ₹50 लाख - ₹1 करोड़ के बीच आय: 10% अधिभार
- ₹1 करोड़ - ₹2 करोड़ के बीच आय: 15% अधिभार

चरण 5: स्वास्थ्य और शिक्षा उपकर जोड़ें
- कुल कर (अधिभार सहित) पर 4% उपकर

चरण 6: TDS/अग्रिम कर घटाएं
- वर्ष के दौरान भुगतान किए गए स्रोत पर कर कटौती (TDS) या अग्रिम कर घटाएं

**उदाहरण कर गणना (नई व्यवस्था)**

वार्षिक आय: ₹12,00,000
मानक कटौती: ₹50,000
कर योग्य आय: ₹11,50,000

कर गणना:
- ₹0 - ₹3,00,000 = ₹0
- ₹3,00,001 - ₹6,00,000 = ₹15,000 (5%)
- ₹6,00,001 - ₹9,00,000 = ₹30,000 (10%)
- ₹9,00,001 - ₹11,50,000 = ₹37,500 (15%)
- कुल कर = ₹82,500
- उपकर (4%) = ₹3,300
- कुल देय कर = ₹85,800

**Ravomix आयकर कैलकुलेटर का उपयोग**

1. Ravomix खोलें और टूल्स सेक्शन में जाएं।
2. "आयकर कैलकुलेटर" चुनें।
3. अपनी वार्षिक आय दर्ज करें।
4. कर व्यवस्था चुनें (पुरानी या नई)।
5. यदि पुरानी व्यवस्था का उपयोग कर रहे हैं, तो लागू कटौतियां दर्ज करें।
6. कैलकुलेटर तुरंत आपकी कर देयता, प्रभावी कर दर, और हाथ में आने वाली राशि दिखाता है।

**कर नियोजन के लिए सुझाव**

- दोनों व्यवस्थाओं की तुलना करने के लिए कैलकुलेटर का उपयोग करें।
- यदि आपके पास महत्वपूर्ण कटौतियां हैं (होम लोन, बीमा, PPF), तो पुरानी व्यवस्था बेहतर हो सकती है।
- यदि आपके पास कम कटौतियां हैं, तो कम दरों वाली नई व्यवस्था फायदेमंद हो सकती है।
- वित्तीय वर्ष की शुरुआत में कर नियोजन शुरू करें, अंत में नहीं।

**अस्वीकरण**: कर गणना वर्तमान कर कानूनों और दरों पर आधारित है। हमेशा नवीनतम सरकारी अधिसूचनाओं से सत्यापित करें और जटिल परिदृश्यों के लिए कर पेशेवर से परामर्श करें। Ravomix केवल मार्गदर्शन उद्देश्यों के लिए अनुमान प्रदान करता है।`,
    },
  },
];
