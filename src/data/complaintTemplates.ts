export interface ComplaintTemplate {
  id: string;
  title: string;
  icon: string;
  category: string;
  fields: { key: string; label: string; type: 'text' | 'date' | 'textarea' | 'select'; placeholder?: string; required?: boolean; options?: { label: string; value: string }[] }[];
  bodyTemplate: string;
}

const senderNameOnly = [
  { key: 'senderName', label: 'Your Name', type: 'text' as const, required: true },
];

const senderWithPhone = [
  { key: 'senderName', label: 'Your Name', type: 'text' as const, required: true },
  { key: 'senderPhone', label: 'Phone', type: 'text' as const },
  { key: 'senderEmail', label: 'Email', type: 'text' as const },
];

const senderWithAddress = [
  { key: 'senderName', label: 'Your Name', type: 'text' as const, required: true },
  { key: 'senderAddress', label: 'Your Address', type: 'textarea' as const },
  { key: 'senderPhone', label: 'Phone', type: 'text' as const },
  { key: 'senderEmail', label: 'Email', type: 'text' as const },
];

const recipientFields = [
  { key: 'recipientName', label: 'To (Authority / Manager)', type: 'text' as const, required: true },
  { key: 'recipientOrg', label: 'Organization / Department', type: 'text' as const, required: true },
  { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea' as const },
];

export const complaintTemplates: ComplaintTemplate[] = [
  // ═══════════════════════════════════════════
  // HOUSING / PROPERTY COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'landlord',
    title: 'Landlord Complaint',
    icon: '🏠',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally complain regarding issues with the property at:

{{propertyAddress}}

{{description}}

I request an amicable resolution at the earliest. If not resolved, I shall be compelled to seek legal remedies.`,
  },
  {
    id: 'tenant',
    title: 'Tenant Complaint',
    icon: '🔑',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally complain about my tenant regarding the property at:

{{propertyAddress}}

{{description}}

I request immediate corrective action. If not resolved, I shall pursue legal remedies.`,
  },
  {
    id: 'property-dispute',
    title: 'Property Dispute Complaint',
    icon: '⚖️',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Disputed Property Address', type: 'textarea' as const, required: true },
      { key: 'disputeType', label: 'Type of Dispute', type: 'text' as const, required: true },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding a property dispute concerning the property at:

{{propertyAddress}}

Type of Dispute: {{disputeType}}

{{description}}

I request your intervention and a fair resolution. I am ready to provide all supporting documents.`,
  },
  {
    id: 'neighbour-noise',
    title: 'Neighbour Noise Complaint',
    icon: '🔊',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'neighbourAddress', label: 'Neighbour\'s Address', type: 'text' as const },
      { key: 'frequency', label: 'Frequency of Disturbance', type: 'text' as const },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about persistent noise disturbance from a neighbouring property.

Neighbour's Address: {{neighbourAddress}}
Frequency: {{frequency}}

{{description}}

I request you to take appropriate action to resolve this matter and restore peaceful living conditions.`,
  },
  {
    id: 'garbage-collection',
    title: 'Garbage Collection Complaint',
    icon: '🗑️',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'area', label: 'Affected Area / Ward', type: 'text' as const, required: true },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about inadequate garbage collection services in {{area}}.

{{description}}

This is causing unhygienic conditions and health hazards. I urge immediate corrective action.`,
  },

  // ═══════════════════════════════════════════
  // BANK / FINANCIAL COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'bank-complaint',
    title: 'Bank Complaint',
    icon: '🏦',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text' as const },
      { key: 'issue', label: 'Issue Type', type: 'select' as const, options: [
        { label: 'Unauthorized Transaction', value: 'Unauthorized Transaction' },
        { label: 'Service Charge Issue', value: 'Service Charge' },
        { label: 'ATM Issue', value: 'ATM Issue' },
        { label: 'Staff Behavior', value: 'Staff Behavior' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally complain regarding {{issue}} related to my account (No: {{accountNo}}).

{{description}}

I request immediate resolution. If unresolved within a reasonable timeframe, I shall escalate to the Banking Ombudsman.`,
  },
  {
    id: 'insurance-claim',
    title: 'Insurance Claim Complaint',
    icon: '🛡️',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'policyNo', label: 'Policy Number', type: 'text' as const, required: true },
      { key: 'claimNo', label: 'Claim Number', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding my insurance claim (Policy No: {{policyNo}}, Claim No: {{claimNo}}).

{{description}}

I request immediate processing of my claim. If unresolved, I shall approach the Insurance Ombudsman.`,
  },
  {
    id: 'credit-card',
    title: 'Credit Card Complaint',
    icon: '💳',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'cardLast4', label: 'Last 4 Digits of Card', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about an issue with my credit card (ending {{cardLast4}}).

{{description}}

I request immediate investigation and resolution. If unresolved, I shall escalate to regulatory authorities.`,
  },
  {
    id: 'loan-dispute',
    title: 'Loan Dispute Complaint',
    icon: '📊',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'loanAccountNo', label: 'Loan Account Number', type: 'text' as const, required: true },
      { key: 'loanType', label: 'Loan Type', type: 'text' as const },
      { key: 'description', label: 'Dispute Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to raise a dispute regarding my {{loanType}} (Loan Account No: {{loanAccountNo}}).

{{description}}

I request immediate review and rectification. If unresolved, I shall approach consumer protection authorities.`,
  },

  // ═══════════════════════════════════════════
  // PUBLIC UTILITY COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'electricity',
    title: 'Electricity Complaint',
    icon: '⚡',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'consumerId', label: 'Consumer ID / Meter No.', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report an electricity issue.

Consumer ID / Meter No.: {{consumerId}}

{{description}}

I request immediate inspection and resolution. This is causing significant inconvenience.`,
  },
  {
    id: 'electricity-meter',
    title: 'Electricity Meter Dispute',
    icon: '🔌',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'consumerId', label: 'Consumer ID / Meter No.', type: 'text' as const, required: true },
      { key: 'billAmount', label: 'Disputed Bill Amount', type: 'text' as const },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to dispute my electricity meter reading/billing (Consumer ID: {{consumerId}}).

Disputed Amount: {{billAmount}}

{{description}}

I request meter inspection and bill correction at the earliest.`,
  },
  {
    id: 'water-supply',
    title: 'Water Supply Complaint',
    icon: '💧',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'area', label: 'Area / Ward', type: 'text' as const },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a water supply issue in {{area}}.

{{description}}

This is causing severe hardship. I urge immediate corrective action and restoration of regular water supply.`,
  },
  {
    id: 'road-repair',
    title: 'Road Repair Complaint',
    icon: '🛣️',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'location', label: 'Road / Location', type: 'text' as const, required: true },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report the poor condition of the road at {{location}}.

{{description}}

This poses a serious risk to public safety. I request immediate repair work.`,
  },
  {
    id: 'gas-connection',
    title: 'Gas Connection Complaint',
    icon: '🔥',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'consumerId', label: 'Consumer / Connection No.', type: 'text' as const },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding a gas service issue (Consumer No: {{consumerId}}).

{{description}}

I request immediate attention and resolution.`,
  },
  {
    id: 'utility-payment',
    title: 'Utility Payment Extension Request',
    icon: '📅',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'consumerId', label: 'Consumer / Account No.', type: 'text' as const, required: true },
      { key: 'billAmount', label: 'Bill Amount', type: 'text' as const },
      { key: 'dueDate', label: 'Original Due Date', type: 'date' as const },
      { key: 'requestedDate', label: 'Requested Extension Date', type: 'date' as const, required: true },
      { key: 'reason', label: 'Reason', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to request an extension for my utility bill payment (Account No: {{consumerId}}).

Bill Amount: {{billAmount}}
Original Due Date: {{dueDate}}
Requested Extension Date: {{requestedDate}}

Reason:
{{reason}}

I assure you the payment will be made by the requested date. Kindly consider my request.`,
  },

  // ═══════════════════════════════════════════
  // SERVICE PROVIDER COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'internet-service',
    title: 'Internet Service Complaint',
    icon: '🌐',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountId', label: 'Account / Customer ID', type: 'text' as const },
      { key: 'plan', label: 'Current Plan', type: 'text' as const },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about my internet service (Account: {{accountId}}, Plan: {{plan}}).

{{description}}

I request immediate resolution. If unresolved, I shall escalate to TRAI/regulatory authorities and consider switching providers.`,
  },
  {
    id: 'mobile-network',
    title: 'Mobile Network Complaint',
    icon: '📶',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'mobileNo', label: 'Mobile Number', type: 'text' as const, required: true },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about mobile network issues on my number {{mobileNo}}.

{{description}}

I request immediate investigation and resolution. If unresolved, I shall approach regulatory authorities.`,
  },
  {
    id: 'cable-dth',
    title: 'Cable / DTH Complaint',
    icon: '📺',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'customerId', label: 'Customer / Subscriber ID', type: 'text' as const },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about my cable/DTH service (Customer ID: {{customerId}}).

{{description}}

I request immediate rectification. If unresolved, I shall approach consumer protection authorities.`,
  },
  {
    id: 'postal-service',
    title: 'Postal Service Complaint',
    icon: '📮',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'trackingNo', label: 'Tracking / Reference Number', type: 'text' as const },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about a postal service issue (Tracking No: {{trackingNo}}).

{{description}}

I request immediate investigation and resolution.`,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Order Complaint',
    icon: '🛒',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'orderId', label: 'Order ID', type: 'text' as const, required: true },
      { key: 'orderDate', label: 'Order Date', type: 'date' as const },
      { key: 'product', label: 'Product Name', type: 'text' as const },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
      { key: 'resolution', label: 'Resolution Expected', type: 'textarea' as const },
    ],
    bodyTemplate: `I am writing regarding Order ID: {{orderId}} placed on {{orderDate}} for {{product}}.

{{description}}

Resolution Expected:
{{resolution}}

I request immediate action. If unresolved within 7 days, I will file a complaint with the Consumer Forum.`,
  },
  {
    id: 'delivery-service',
    title: 'Delivery Service Complaint',
    icon: '📦',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'trackingNo', label: 'Tracking / AWB Number', type: 'text' as const, required: true },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about a delivery service issue (Tracking No: {{trackingNo}}).

{{description}}

I request immediate investigation and resolution. If my package is lost or damaged, I expect full compensation.`,
  },

  // ═══════════════════════════════════════════
  // TRAVEL COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'railway',
    title: 'Railway Service Complaint',
    icon: '🚆',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'pnr', label: 'PNR / Ticket Number', type: 'text' as const },
      { key: 'trainNo', label: 'Train Number / Name', type: 'text' as const },
      { key: 'travelDate', label: 'Date of Travel', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about railway service (PNR: {{pnr}}, Train: {{trainNo}}, Date: {{travelDate}}).

{{description}}

I request investigation and appropriate action. Compensation may be sought if applicable.`,
  },
  {
    id: 'airline',
    title: 'Airline Service Complaint',
    icon: '✈️',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'bookingRef', label: 'Booking Reference / PNR', type: 'text' as const },
      { key: 'flightNo', label: 'Flight Number', type: 'text' as const },
      { key: 'travelDate', label: 'Date of Travel', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about airline service (Booking: {{bookingRef}}, Flight: {{flightNo}}, Date: {{travelDate}}).

{{description}}

I request immediate resolution and compensation as per applicable regulations.`,
  },
  {
    id: 'taxi-transport',
    title: 'Taxi / Transport Complaint',
    icon: '🚕',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'tripId', label: 'Trip / Booking ID', type: 'text' as const },
      { key: 'tripDate', label: 'Date of Trip', type: 'date' as const },
      { key: 'driverDetails', label: 'Driver / Vehicle Details', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about a taxi/transport service (Trip ID: {{tripId}}, Date: {{tripDate}}).

Driver/Vehicle: {{driverDetails}}

{{description}}

I request investigation and appropriate action against the concerned party.`,
  },

  // ═══════════════════════════════════════════
  // LEGAL / POLICE COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'police',
    title: 'Police Complaint Draft',
    icon: '🚔',
    category: 'Legal / Police',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'incidentDate', label: 'Date of Incident', type: 'date' as const, required: true },
      { key: 'incidentLocation', label: 'Location of Incident', type: 'text' as const, required: true },
      { key: 'description', label: 'Detailed Description', type: 'textarea' as const, required: true },
      { key: 'actionRequested', label: 'Action Requested', type: 'textarea' as const, placeholder: 'FIR registration, investigation...' },
    ],
    bodyTemplate: `I am writing to lodge a formal complaint regarding an incident on {{incidentDate}} at {{incidentLocation}}.

{{description}}

Action Requested:
{{actionRequested}}

I request immediate and appropriate action. I am willing to cooperate fully with the investigation.`,
  },
  {
    id: 'cyber-fraud',
    title: 'Cyber Fraud Complaint',
    icon: '🚨',
    category: 'Legal / Police',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'fraudDate', label: 'Date of Fraud', type: 'date' as const, required: true },
      { key: 'amount', label: 'Amount Involved', type: 'text' as const },
      { key: 'platform', label: 'Platform / Website', type: 'text' as const },
      { key: 'description', label: 'Fraud Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a cyber fraud incident that occurred on {{fraudDate}}.

Platform: {{platform}}
Amount Involved: {{amount}}

{{description}}

I request immediate investigation and action. I have preserved all digital evidence and am willing to cooperate fully.`,
  },
  {
    id: 'workplace-harassment',
    title: 'Workplace Harassment Complaint',
    icon: '⚠️',
    category: 'Legal / Police',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text' as const },
      { key: 'department', label: 'Department', type: 'text' as const },
      { key: 'harasserDetails', label: 'Details of Person(s) Involved', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Incident Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally report workplace harassment.

My Details:
- Designation: {{designation}}
- Department: {{department}}

Person(s) Involved:
{{harasserDetails}}

Incident Details:
{{description}}

I request a thorough investigation and appropriate action as per company policy and applicable laws.`,
  },
  {
    id: 'consumer-court',
    title: 'Consumer Court Complaint',
    icon: '🏛️',
    category: 'Legal / Police',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'product', label: 'Product / Service', type: 'text' as const, required: true },
      { key: 'purchaseDate', label: 'Purchase Date', type: 'date' as const },
      { key: 'invoiceNo', label: 'Invoice / Order No.', type: 'text' as const },
      { key: 'amount', label: 'Amount Involved', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
      { key: 'relief', label: 'Relief Sought', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing a consumer complaint regarding {{product}} purchased on {{purchaseDate}} (Invoice: {{invoiceNo}}).

Amount Involved: {{amount}}

{{description}}

Relief Sought:
{{relief}}

I request the Hon'ble Forum to consider my complaint and grant the relief sought.`,
  },
  {
    id: 'rti-complaint',
    title: 'RTI Complaint',
    icon: '📢',
    category: 'Legal / Police',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'rtiDate', label: 'Original RTI Filing Date', type: 'date' as const, required: true },
      { key: 'rtiRef', label: 'RTI Reference Number', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I filed an RTI application on {{rtiDate}} (Reference: {{rtiRef}}) but have not received a satisfactory response.

{{description}}

I request the concerned authority to provide the information as per the Right to Information Act within the stipulated timeframe.`,
  },

  // ═══════════════════════════════════════════
  // HEALTH / HOSPITAL COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'hospital-negligence',
    title: 'Hospital Negligence Complaint',
    icon: '🏥',
    category: 'Health / Hospital',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'patientName', label: 'Patient Name', type: 'text' as const, required: true },
      { key: 'admissionDate', label: 'Admission Date', type: 'date' as const },
      { key: 'doctorName', label: 'Treating Doctor', type: 'text' as const },
      { key: 'description', label: 'Negligence Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report medical negligence at {{recipientOrg}}.

Patient: {{patientName}}
Admission Date: {{admissionDate}}
Treating Doctor: {{doctorName}}

{{description}}

I request a thorough investigation and appropriate action. I reserve the right to approach medical regulatory bodies and legal forums.`,
  },
  {
    id: 'hospital-discharge',
    title: 'Hospital Discharge Issue Complaint',
    icon: '🚑',
    category: 'Health / Hospital',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'patientName', label: 'Patient Name', type: 'text' as const, required: true },
      { key: 'admissionDate', label: 'Admission Date', type: 'date' as const },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about discharge-related issues at {{recipientOrg}}.

Patient: {{patientName}}
Admission Date: {{admissionDate}}

{{description}}

I request immediate resolution. Withholding patient discharge without valid reason is a violation of patient rights.`,
  },
  {
    id: 'medical-billing',
    title: 'Medical Billing Complaint',
    icon: '💊',
    category: 'Health / Hospital',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'patientName', label: 'Patient Name', type: 'text' as const, required: true },
      { key: 'billNo', label: 'Bill Number', type: 'text' as const },
      { key: 'billAmount', label: 'Billed Amount', type: 'text' as const },
      { key: 'description', label: 'Billing Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to dispute the medical billing at {{recipientOrg}}.

Patient: {{patientName}}
Bill No: {{billNo}}
Amount: {{billAmount}}

{{description}}

I request a detailed itemized bill and correction of any overcharges. If unresolved, I shall approach consumer protection authorities.`,
  },

  // ═══════════════════════════════════════════
  // MUNICIPAL COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'municipal',
    title: 'Municipal / Nagar Nigam Complaint',
    icon: '🏛️',
    category: 'Municipal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'ward', label: 'Ward Number / Area', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am a resident of Ward {{ward}} and writing to bring to your attention the following civic issue:

{{description}}

This is causing considerable inconvenience. I request your urgent intervention and corrective measures.`,
  },
  {
    id: 'property-tax',
    title: 'Property Tax Objection',
    icon: '🏢',
    category: 'Municipal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyId', label: 'Property ID / Assessment No.', type: 'text' as const, required: true },
      { key: 'assessedAmount', label: 'Assessed Tax Amount', type: 'text' as const },
      { key: 'description', label: 'Objection Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to object to the property tax assessment (Property ID: {{propertyId}}).

Assessed Amount: {{assessedAmount}}

{{description}}

I request a reassessment and correction of the tax amount. I am ready to provide supporting documents.`,
  },
  {
    id: 'street-light',
    title: 'Street Light Complaint',
    icon: '💡',
    category: 'Municipal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'location', label: 'Location / Pole Number', type: 'text' as const, required: true },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a street light issue at {{location}}.

{{description}}

Non-functional street lights pose safety risks, especially for pedestrians and commuters at night. I request immediate repair.`,
  },
  {
    id: 'drainage',
    title: 'Drainage Complaint',
    icon: '🚰',
    category: 'Municipal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'location', label: 'Affected Location', type: 'text' as const, required: true },
      { key: 'description', label: 'Issue Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a drainage / sewage issue at {{location}}.

{{description}}

This is causing unhygienic conditions and poses a serious health risk. I urge immediate action to clean and repair the drainage system.`,
  },

  // ═══════════════════════════════════════════
  // ADDITIONAL COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'noise-pollution',
    title: 'Noise Pollution Complaint',
    icon: '🔔',
    category: 'Public Utility',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'sourceOfNoise', label: 'Source of Noise', type: 'select' as const, options: [
        { label: 'Construction Site', value: 'Construction Site' },
        { label: 'Factory / Industrial', value: 'Factory / Industrial' },
        { label: 'Loudspeaker / Music', value: 'Loudspeaker / Music' },
        { label: 'Traffic / Vehicles', value: 'Traffic / Vehicles' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'location', label: 'Location', type: 'text' as const, required: true },
      { key: 'frequency', label: 'Frequency / Timing', type: 'text' as const },
      { key: 'description', label: 'Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about noise pollution in {{location}}.

Source: {{sourceOfNoise}}
Frequency / Timing: {{frequency}}

{{description}}

This excessive noise is causing significant disturbance and health issues for residents. I request immediate action under the Noise Pollution Rules to restore peaceful living conditions.`,
  },
  {
    id: 'land-dispute',
    title: 'Land Dispute Complaint',
    icon: '🏗️',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'landLocation', label: 'Land Location / Survey No.', type: 'text' as const, required: true },
      { key: 'landArea', label: 'Land Area', type: 'text' as const },
      { key: 'disputeWith', label: 'Dispute With (Name / Party)', type: 'text' as const, required: true },
      { key: 'description', label: 'Dispute Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a land dispute regarding the property at {{landLocation}}.

Land Area: {{landArea}}
Dispute With: {{disputeWith}}

{{description}}

I request your intervention for a fair resolution. I am ready to provide all land records, revenue documents, and supporting evidence.`,
  },
  {
    id: 'eviction-notice',
    title: 'Eviction Notice (Tenant)',
    icon: '🚪',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea' as const, required: true },
      { key: 'tenantName', label: 'Tenant Name', type: 'text' as const, required: true },
      { key: 'evictionDate', label: 'Eviction Date', type: 'date' as const, required: true },
      { key: 'reason', label: 'Reason for Eviction', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `This notice is being served to {{tenantName}} regarding the property at:

{{propertyAddress}}

You are hereby required to vacate the above-mentioned premises on or before {{evictionDate}}.

Reason:
{{reason}}

Failure to comply with this notice may result in legal proceedings as per the applicable tenancy laws. Please contact the undersigned for any queries.`,
  },
  {
    id: 'demand-notice',
    title: 'Demand Notice (Services/Goods)',
    icon: '📋',
    category: 'Legal / Police',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'invoiceNo', label: 'Invoice / Order Number', type: 'text' as const },
      { key: 'amount', label: 'Amount Due', type: 'text' as const, required: true },
      { key: 'dueDate', label: 'Original Due Date', type: 'date' as const },
      { key: 'description', label: 'Details of Goods / Services', type: 'textarea' as const, required: true },
      { key: 'deadline', label: 'Payment Deadline', type: 'date' as const, required: true },
    ],
    bodyTemplate: `This is a formal demand notice regarding the outstanding payment for goods/services provided.

Invoice / Order No: {{invoiceNo}}
Amount Due: {{amount}}
Original Due Date: {{dueDate}}

Details:
{{description}}

You are hereby requested to make the full payment on or before {{deadline}}. Failure to do so will compel us to initiate legal proceedings for recovery, including interest and legal costs.`,
  },
  {
    id: 'hotel-complaint',
    title: 'Hotel Complaint Letter',
    icon: '🏨',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'hotelName', label: 'Hotel Name', type: 'text' as const, required: true },
      { key: 'bookingRef', label: 'Booking Reference', type: 'text' as const },
      { key: 'checkInDate', label: 'Check-in Date', type: 'date' as const },
      { key: 'roomNo', label: 'Room Number', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
      { key: 'resolution', label: 'Resolution Expected', type: 'textarea' as const },
    ],
    bodyTemplate: `I am writing to formally complain about my stay at {{hotelName}} (Booking Ref: {{bookingRef}}).

Check-in Date: {{checkInDate}}
Room No: {{roomNo}}

{{description}}

Resolution Expected:
{{resolution}}

I request immediate attention and appropriate compensation. If unresolved, I shall share my experience on public review platforms and approach consumer protection authorities.`,
  },
  {
    id: 'feedback-service-provider',
    title: 'Feedback to Service Provider',
    icon: '💬',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'serviceName', label: 'Service Name / Type', type: 'text' as const, required: true },
      { key: 'accountId', label: 'Account / Customer ID', type: 'text' as const },
      { key: 'feedbackType', label: 'Feedback Type', type: 'select' as const, options: [
        { label: 'Poor Service Quality', value: 'Poor Service Quality' },
        { label: 'Billing Issue', value: 'Billing Issue' },
        { label: 'Staff Behavior', value: 'Staff Behavior' },
        { label: 'Service Downtime', value: 'Service Downtime' },
        { label: 'Suggestion / Improvement', value: 'Suggestion / Improvement' },
      ]},
      { key: 'description', label: 'Feedback Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to provide formal feedback regarding {{serviceName}} (Account: {{accountId}}).

Feedback Type: {{feedbackType}}

{{description}}

I hope this feedback will be taken constructively and the necessary improvements will be implemented. I look forward to a better service experience in the future.`,
  },

  // ═══════════════════════════════════════════
  // WORK FROM HOME / CORPORATE COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'wfh-vpn-issue',
    title: 'VPN / Connectivity Issue',
    icon: '🌐',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'issueType', label: 'Issue Type', type: 'select' as const, required: true, options: [
        { label: 'VPN Disconnects Frequently', value: 'VPN Disconnects Frequently' },
        { label: 'Slow Connection Speed', value: 'Slow Connection Speed' },
        { label: 'Unable to Connect', value: 'Unable to Connect' },
        { label: 'Server Timeout', value: 'Server Timeout' },
      ]},
      { key: 'since', label: 'Issue Since (Date)', type: 'date' as const, required: true },
      { key: 'description', label: 'Detailed Description', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a VPN/connectivity issue that is affecting my remote work.

Employee ID: {{employeeId}}
Issue Type: {{issueType}}
Issue Since: {{since}}

{{description}}

This issue is severely impacting my productivity. I request the IT team to investigate and resolve this at the earliest.`,
  },
  {
    id: 'wfh-overwork',
    title: 'Over-working / Work-Life Balance',
    icon: '⚖️',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'department', label: 'Department', type: 'text' as const, required: true },
      { key: 'avgHours', label: 'Average Daily Working Hours', type: 'text' as const, required: true },
      { key: 'since', label: 'Issue Since', type: 'date' as const, required: true },
      { key: 'description', label: 'Detailed Description', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally report a work-life balance concern regarding excessive working hours during remote work.

Employee ID: {{employeeId}}
Department: {{department}}
Average Daily Working Hours: {{avgHours}}
Issue Since: {{since}}

{{description}}

I request management to review the workload distribution and ensure adherence to the standard 9-hour work policy.`,
  },
  {
    id: 'wfh-communication-gap',
    title: 'Communication & Coordination Gap',
    icon: '📡',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'department', label: 'Department', type: 'text' as const, required: true },
      { key: 'affectedTeam', label: 'Affected Team / Person', type: 'text' as const, required: true },
      { key: 'description', label: 'Detailed Description', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a communication and coordination gap that is affecting team efficiency during remote work.

Employee ID: {{employeeId}}
Department: {{department}}
Affected Team / Person: {{affectedTeam}}

{{description}}

I request management to address this gap and establish better communication protocols for remote teams.`,
  },
  {
    id: 'wfh-digital-fatigue',
    title: 'Digital Fatigue & Mental Wellbeing',
    icon: '🧠',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'department', label: 'Department', type: 'text' as const, required: true },
      { key: 'symptoms', label: 'Symptoms / Issues Faced', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Additional Details & Suggestions', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report concerns regarding digital fatigue and mental wellbeing due to prolonged remote work.

Employee ID: {{employeeId}}
Department: {{department}}

Symptoms / Issues:
{{symptoms}}

Additional Details:
{{description}}

I request the organization to consider wellness programs, screen-time breaks, and mental health support for remote employees.`,
  },
  {
    id: 'wfh-pending-reimbursement',
    title: 'Pending Reimbursement Complaint',
    icon: '💸',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'claimId', label: 'Claim / Reference ID', type: 'text' as const, required: true },
      { key: 'amount', label: 'Pending Amount', type: 'text' as const, required: true },
      { key: 'submittedDate', label: 'Claim Submitted On', type: 'date' as const, required: true },
      { key: 'description', label: 'Detailed Description', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to follow up on my pending reimbursement claim that has not been processed despite approval.

Employee ID: {{employeeId}}
Claim / Reference ID: {{claimId}}
Pending Amount: {{amount}}
Claim Submitted On: {{submittedDate}}

{{description}}

I request the finance department to process this reimbursement at the earliest.`,
  },
  {
    id: 'wfh-software-license',
    title: 'Software License Expiry',
    icon: '📋',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'softwareName', label: 'Software Name', type: 'text' as const, required: true },
      { key: 'expiryDate', label: 'Expiry Date', type: 'date' as const, required: true },
      { key: 'description', label: 'Impact on Work', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report an expired/expiring software license that is essential for my daily work.

Employee ID: {{employeeId}}
Software Name: {{softwareName}}
Expiry Date: {{expiryDate}}

Impact on Work:
{{description}}

I request the IT department to renew the license immediately to avoid further work disruption.`,
  },
  {
    id: 'wfh-data-security',
    title: 'Data Security / Privacy Concern',
    icon: '🛡️',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'incidentType', label: 'Incident Type', type: 'select' as const, required: true, options: [
        { label: 'Phishing Email/Link', value: 'Phishing Email/Link' },
        { label: 'Suspicious Activity', value: 'Suspicious Activity' },
        { label: 'Unauthorized Access', value: 'Unauthorized Access' },
        { label: 'Data Leak Concern', value: 'Data Leak Concern' },
      ]},
      { key: 'incidentDate', label: 'Incident Date', type: 'date' as const, required: true },
      { key: 'description', label: 'Detailed Description', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a data security/privacy concern that requires immediate attention.

Employee ID: {{employeeId}}
Incident Type: {{incidentType}}
Incident Date: {{incidentDate}}

{{description}}

I request the security team to investigate this matter urgently and take preventive measures.`,
  },

  // ═══════════════════════════════════════════
  // BANKING / FINANCIAL (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'unauthorized-transaction',
    title: 'Unauthorized Bank Transaction Complaint',
    icon: '🚫',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text' as const, required: true },
      { key: 'transactionDate', label: 'Transaction Date', type: 'date' as const, required: true },
      { key: 'transactionAmount', label: 'Transaction Amount', type: 'text' as const, required: true },
      { key: 'transactionRef', label: 'Transaction Reference / ID', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report an unauthorized transaction on my bank account (Account No: {{accountNo}}).

Transaction Date: {{transactionDate}}
Transaction Amount: {{transactionAmount}}
Transaction Reference: {{transactionRef}}

{{description}}

I did not authorize this transaction and request an immediate investigation, reversal of the amount, and blocking of further unauthorized access. If unresolved within 7 days, I shall escalate to the Banking Ombudsman.`,
  },
  {
    id: 'incorrect-bank-charges',
    title: 'Incorrect Bank Charges Complaint',
    icon: '💰',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text' as const, required: true },
      { key: 'chargeDate', label: 'Date of Charge', type: 'date' as const },
      { key: 'chargeAmount', label: 'Incorrect Charge Amount', type: 'text' as const, required: true },
      { key: 'chargeType', label: 'Type of Charge', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to dispute incorrect charges applied to my bank account (Account No: {{accountNo}}).

Date of Charge: {{chargeDate}}
Charge Amount: {{chargeAmount}}
Type of Charge: {{chargeType}}

{{description}}

I request immediate reversal of the incorrect charges and a detailed explanation. If unresolved, I shall approach the Banking Ombudsman.`,
  },
  {
    id: 'delayed-bank-transfer',
    title: 'Delayed Bank Transfer Complaint',
    icon: '⏳',
    category: 'Bank / Financial',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text' as const, required: true },
      { key: 'transferDate', label: 'Transfer Date', type: 'date' as const, required: true },
      { key: 'transferAmount', label: 'Transfer Amount', type: 'text' as const, required: true },
      { key: 'transferRef', label: 'Transfer Reference / UTR', type: 'text' as const },
      { key: 'beneficiaryDetails', label: 'Beneficiary Details', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about a delayed bank transfer from my account (Account No: {{accountNo}}).

Transfer Date: {{transferDate}}
Transfer Amount: {{transferAmount}}
Reference / UTR: {{transferRef}}
Beneficiary: {{beneficiaryDetails}}

{{description}}

The amount has been debited but not credited to the beneficiary. I request immediate resolution and crediting of funds. If unresolved, I shall escalate to the Banking Ombudsman.`,
  },

  // ═══════════════════════════════════════════
  // E-COMMERCE / DELIVERY (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'refund-not-received',
    title: 'Refund Not Received Complaint',
    icon: '💸',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'orderId', label: 'Order ID', type: 'text' as const, required: true },
      { key: 'orderDate', label: 'Order Date', type: 'date' as const },
      { key: 'refundAmount', label: 'Refund Amount', type: 'text' as const, required: true },
      { key: 'returnDate', label: 'Return / Cancellation Date', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding my pending refund for Order ID: {{orderId}} placed on {{orderDate}}.

Refund Amount: {{refundAmount}}
Return / Cancellation Date: {{returnDate}}

{{description}}

Despite the return/cancellation being processed, I have not received the refund. I request immediate processing. If unresolved within 7 days, I will file a complaint with the Consumer Forum.`,
  },
  {
    id: 'wrong-product-delivered',
    title: 'Wrong Product Delivered Complaint',
    icon: '🔄',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'orderId', label: 'Order ID', type: 'text' as const, required: true },
      { key: 'orderDate', label: 'Order Date', type: 'date' as const },
      { key: 'orderedProduct', label: 'Product Ordered', type: 'text' as const, required: true },
      { key: 'receivedProduct', label: 'Product Received', type: 'text' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding Order ID: {{orderId}} placed on {{orderDate}}.

Product Ordered: {{orderedProduct}}
Product Received: {{receivedProduct}}

{{description}}

I received a completely different product than what I ordered. I request an immediate replacement with the correct product or a full refund. If unresolved, I will approach the Consumer Forum.`,
  },
  {
    id: 'damaged-product',
    title: 'Damaged Product Complaint',
    icon: '📦',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'orderId', label: 'Order ID', type: 'text' as const, required: true },
      { key: 'orderDate', label: 'Order Date', type: 'date' as const },
      { key: 'product', label: 'Product Name', type: 'text' as const, required: true },
      { key: 'damageDescription', label: 'Damage Description', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Additional Details', type: 'textarea' as const },
    ],
    bodyTemplate: `I am writing regarding Order ID: {{orderId}} placed on {{orderDate}} for {{product}}.

The product was received in a damaged condition:
{{damageDescription}}

{{description}}

I request an immediate replacement or full refund. If unresolved, I will file a complaint with the Consumer Forum.`,
  },
  {
    id: 'package-lost-courier',
    title: 'Package Lost by Courier Complaint',
    icon: '🔍',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'trackingNo', label: 'Tracking / AWB Number', type: 'text' as const, required: true },
      { key: 'orderId', label: 'Order ID', type: 'text' as const },
      { key: 'shipDate', label: 'Shipping Date', type: 'date' as const },
      { key: 'packageValue', label: 'Package Value', type: 'text' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report a lost package (Tracking No: {{trackingNo}}, Order ID: {{orderId}}).

Shipping Date: {{shipDate}}
Package Value: {{packageValue}}

{{description}}

The package has not been delivered and tracking shows no updates. I request immediate investigation and full compensation for the lost package.`,
  },

  // ═══════════════════════════════════════════
  // TELECOM / INTERNET (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'slow-internet',
    title: 'Slow Internet Complaint',
    icon: '🐌',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountId', label: 'Account / Customer ID', type: 'text' as const, required: true },
      { key: 'plan', label: 'Current Plan / Speed', type: 'text' as const, required: true },
      { key: 'actualSpeed', label: 'Actual Speed Received', type: 'text' as const },
      { key: 'since', label: 'Issue Since', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about consistently slow internet speeds (Account: {{accountId}}).

Subscribed Plan / Speed: {{plan}}
Actual Speed Received: {{actualSpeed}}
Issue Since: {{since}}

{{description}}

I am paying for a service that is not being delivered as promised. I request immediate resolution or plan adjustment. If unresolved, I shall escalate to TRAI.`,
  },
  {
    id: 'excess-billing-telecom',
    title: 'Excess Billing Complaint',
    icon: '📱',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'accountId', label: 'Account / Customer ID', type: 'text' as const, required: true },
      { key: 'billDate', label: 'Bill Date', type: 'date' as const },
      { key: 'billedAmount', label: 'Billed Amount', type: 'text' as const, required: true },
      { key: 'expectedAmount', label: 'Expected Amount', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to dispute excess billing on my telecom/internet account (Account: {{accountId}}).

Bill Date: {{billDate}}
Billed Amount: {{billedAmount}}
Expected Amount: {{expectedAmount}}

{{description}}

I request an itemized bill and immediate correction of the excess charges. If unresolved, I shall approach TRAI and consumer protection authorities.`,
  },
  {
    id: 'spam-calls',
    title: 'Spam Call / Telemarketing Complaint',
    icon: '📞',
    category: 'Service Provider',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'mobileNo', label: 'Your Mobile Number', type: 'text' as const, required: true },
      { key: 'spamNumbers', label: 'Spam Numbers (comma separated)', type: 'textarea' as const },
      { key: 'frequency', label: 'Frequency of Calls', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about persistent spam calls and telemarketing messages on my number {{mobileNo}}.

Spam Numbers: {{spamNumbers}}
Frequency: {{frequency}}

{{description}}

Despite being registered on DND (Do Not Disturb), I continue to receive these unsolicited calls. I request immediate action against the violating parties as per TRAI regulations.`,
  },

  // ═══════════════════════════════════════════
  // HOUSING / PROPERTY (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'property-maintenance',
    title: 'Property Maintenance Complaint',
    icon: '🔧',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea' as const, required: true },
      { key: 'maintenanceIssue', label: 'Maintenance Issue', type: 'text' as const, required: true },
      { key: 'reportedDate', label: 'First Reported Date', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about unresolved maintenance issues at:

{{propertyAddress}}

Maintenance Issue: {{maintenanceIssue}}
First Reported On: {{reportedDate}}

{{description}}

Despite repeated requests, the maintenance issue has not been addressed. I request immediate repair/action. If unresolved, I shall seek legal remedies.`,
  },
  {
    id: 'security-deposit-refund',
    title: 'Security Deposit Refund Complaint',
    icon: '🔐',
    category: 'Housing / Property',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea' as const, required: true },
      { key: 'depositAmount', label: 'Security Deposit Amount', type: 'text' as const, required: true },
      { key: 'vacatingDate', label: 'Date of Vacating', type: 'date' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to request the refund of my security deposit for the property at:

{{propertyAddress}}

Security Deposit Amount: {{depositAmount}}
Date of Vacating: {{vacatingDate}}

{{description}}

I vacated the property in good condition and have fulfilled all obligations. I request immediate refund of my security deposit. If not refunded within 15 days, I shall pursue legal action.`,
  },

  // ═══════════════════════════════════════════
  // TRAVEL / TRANSPORT (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'flight-delay',
    title: 'Flight Delay Complaint',
    icon: '⏰',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'bookingRef', label: 'Booking Reference / PNR', type: 'text' as const, required: true },
      { key: 'flightNo', label: 'Flight Number', type: 'text' as const, required: true },
      { key: 'travelDate', label: 'Date of Travel', type: 'date' as const, required: true },
      { key: 'scheduledTime', label: 'Scheduled Departure Time', type: 'text' as const },
      { key: 'actualTime', label: 'Actual Departure Time', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to complain about a significant flight delay (Booking: {{bookingRef}}, Flight: {{flightNo}}, Date: {{travelDate}}).

Scheduled Departure: {{scheduledTime}}
Actual Departure: {{actualTime}}

{{description}}

I request compensation as per DGCA regulations and applicable airline policies. If unresolved, I shall approach the aviation regulator.`,
  },
  {
    id: 'lost-baggage',
    title: 'Lost Baggage Complaint',
    icon: '🧳',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'bookingRef', label: 'Booking Reference / PNR', type: 'text' as const, required: true },
      { key: 'flightNo', label: 'Flight Number', type: 'text' as const, required: true },
      { key: 'travelDate', label: 'Date of Travel', type: 'date' as const, required: true },
      { key: 'baggageTag', label: 'Baggage Tag Number', type: 'text' as const },
      { key: 'baggageValue', label: 'Estimated Baggage Value', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to report lost baggage (Booking: {{bookingRef}}, Flight: {{flightNo}}, Date: {{travelDate}}).

Baggage Tag: {{baggageTag}}
Estimated Value: {{baggageValue}}

{{description}}

My baggage has not been returned despite multiple follow-ups. I request immediate tracking and return of my baggage, or full compensation for the loss.`,
  },
  {
    id: 'ticket-refund',
    title: 'Ticket Refund Complaint',
    icon: '🎫',
    category: 'Travel',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'bookingRef', label: 'Booking Reference / PNR', type: 'text' as const, required: true },
      { key: 'travelDate', label: 'Date of Travel', type: 'date' as const },
      { key: 'ticketAmount', label: 'Ticket Amount', type: 'text' as const, required: true },
      { key: 'cancellationDate', label: 'Cancellation Date', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding my pending ticket refund (Booking: {{bookingRef}}).

Date of Travel: {{travelDate}}
Ticket Amount: {{ticketAmount}}
Cancellation Date: {{cancellationDate}}

{{description}}

Despite the cancellation being processed, I have not received the refund. I request immediate processing of the refund as per the applicable refund policy.`,
  },

  // ═══════════════════════════════════════════
  // HEALTHCARE (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'medical-negligence',
    title: 'Medical Negligence Complaint',
    icon: '⚕️',
    category: 'Health / Hospital',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'patientName', label: 'Patient Name', type: 'text' as const, required: true },
      { key: 'hospitalName', label: 'Hospital Name', type: 'text' as const, required: true },
      { key: 'doctorName', label: 'Treating Doctor', type: 'text' as const },
      { key: 'treatmentDate', label: 'Date of Treatment', type: 'date' as const, required: true },
      { key: 'negligenceDetails', label: 'Negligence Details', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Impact & Damages', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to file a formal complaint of medical negligence at {{hospitalName}}.

Patient: {{patientName}}
Treating Doctor: {{doctorName}}
Date of Treatment: {{treatmentDate}}

Negligence Details:
{{negligenceDetails}}

Impact & Damages:
{{description}}

I request a thorough investigation and appropriate action against the responsible parties. I reserve the right to approach the Medical Council, Consumer Forum, and legal authorities.`,
  },
  {
    id: 'insurance-claim-delay',
    title: 'Insurance Claim Delay Complaint',
    icon: '📋',
    category: 'Health / Hospital',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'policyNo', label: 'Policy Number', type: 'text' as const, required: true },
      { key: 'claimNo', label: 'Claim Number', type: 'text' as const, required: true },
      { key: 'claimDate', label: 'Claim Filing Date', type: 'date' as const, required: true },
      { key: 'claimAmount', label: 'Claim Amount', type: 'text' as const, required: true },
      { key: 'hospitalName', label: 'Hospital Name', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing regarding the delay in processing my insurance claim (Policy No: {{policyNo}}, Claim No: {{claimNo}}).

Claim Filing Date: {{claimDate}}
Claim Amount: {{claimAmount}}
Hospital: {{hospitalName}}

{{description}}

It has been an unreasonable amount of time since I filed my claim. I request immediate processing and settlement. If unresolved, I shall approach the Insurance Ombudsman.`,
  },

  // ═══════════════════════════════════════════
  // WORKPLACE (NEW)
  // ═══════════════════════════════════════════
  {
    id: 'unfair-termination',
    title: 'Unfair Termination Complaint',
    icon: '🚷',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'department', label: 'Department', type: 'text' as const, required: true },
      { key: 'designation', label: 'Designation', type: 'text' as const, required: true },
      { key: 'terminationDate', label: 'Termination Date', type: 'date' as const, required: true },
      { key: 'yearsOfService', label: 'Years of Service', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally challenge my termination which I believe was unfair and unjustified.

Employee ID: {{employeeId}}
Department: {{department}}
Designation: {{designation}}
Termination Date: {{terminationDate}}
Years of Service: {{yearsOfService}}

{{description}}

I request a review of the termination decision and reinstatement or appropriate compensation. If unresolved, I shall approach the Labour Commissioner and pursue legal remedies.`,
  },
  {
    id: 'workplace-discrimination',
    title: 'Workplace Discrimination Complaint',
    icon: '⚖️',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'department', label: 'Department', type: 'text' as const, required: true },
      { key: 'discriminationType', label: 'Type of Discrimination', type: 'select' as const, required: true, options: [
        { label: 'Gender Discrimination', value: 'Gender Discrimination' },
        { label: 'Racial / Ethnic Discrimination', value: 'Racial / Ethnic Discrimination' },
        { label: 'Age Discrimination', value: 'Age Discrimination' },
        { label: 'Religious Discrimination', value: 'Religious Discrimination' },
        { label: 'Disability Discrimination', value: 'Disability Discrimination' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'personsInvolved', label: 'Person(s) Involved', type: 'textarea' as const, required: true },
      { key: 'description', label: 'Incident Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally report workplace discrimination.

Employee ID: {{employeeId}}
Department: {{department}}
Type of Discrimination: {{discriminationType}}

Person(s) Involved:
{{personsInvolved}}

Incident Details:
{{description}}

I request a thorough investigation and appropriate action as per company policy and applicable anti-discrimination laws.`,
  },
  {
    id: 'unsafe-work-environment',
    title: 'Unsafe Work Environment Complaint',
    icon: '⚠️',
    category: 'Work From Home / Corporate',
    fields: [...senderNameOnly, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' as const, required: true },
      { key: 'department', label: 'Department', type: 'text' as const, required: true },
      { key: 'location', label: 'Location / Work Area', type: 'text' as const, required: true },
      { key: 'hazardType', label: 'Type of Hazard', type: 'text' as const, required: true },
      { key: 'reportedDate', label: 'First Reported Date', type: 'date' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally report unsafe working conditions that pose a risk to employee health and safety.

Employee ID: {{employeeId}}
Department: {{department}}
Location / Work Area: {{location}}
Type of Hazard: {{hazardType}}
First Reported On: {{reportedDate}}

{{description}}

I request immediate corrective action to ensure a safe work environment as per occupational safety laws and company policy. If unresolved, I shall report to the relevant safety authorities.`,
  },

  // ═══════════════════════════════════════════
  // ADVOCATE / LEGAL COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'consumer-court-complaint',
    title: 'Consumer Court Complaint',
    icon: '🏛️',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'opposingParty', label: 'Opposing Party / Seller Name', type: 'text' as const, required: true },
      { key: 'productService', label: 'Product / Service', type: 'text' as const, required: true },
      { key: 'purchaseDate', label: 'Date of Purchase', type: 'date' as const },
      { key: 'amount', label: 'Amount Paid', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
      { key: 'reliefSought', label: 'Relief / Compensation Sought', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this consumer complaint against {{opposingParty}} regarding deficiency in goods/services.

Product / Service: {{productService}}
Date of Purchase: {{purchaseDate}}
Amount Paid: {{amount}}

Complaint Details:
{{description}}

Relief / Compensation Sought:
{{reliefSought}}

I have all relevant bills, receipts and correspondence as evidence. It is therefore prayed that the complaint be allowed and appropriate relief along with costs be granted.`,
  },
  {
    id: 'criminal-complaint',
    title: 'Criminal Complaint',
    icon: '🚔',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'accusedName', label: 'Accused Name', type: 'text' as const, required: true },
      { key: 'accusedAddress', label: 'Accused Address', type: 'textarea' as const },
      { key: 'incidentDate', label: 'Date of Incident', type: 'date' as const, required: true },
      { key: 'incidentPlace', label: 'Place of Incident', type: 'text' as const, required: true },
      { key: 'offence', label: 'Nature of Offence', type: 'text' as const, required: true },
      { key: 'description', label: 'Detailed Account', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this criminal complaint against {{accusedName}}, residing at {{accusedAddress}}.

Date of Incident: {{incidentDate}}
Place of Incident: {{incidentPlace}}
Nature of Offence: {{offence}}

Detailed Account:
{{description}}

I request that an FIR/case be registered, a thorough investigation be conducted and the accused be prosecuted in accordance with law. I am ready to support my complaint with evidence and witnesses.`,
  },
  {
    id: 'civil-complaint',
    title: 'Civil Complaint',
    icon: '⚖️',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'opposingParty', label: 'Opposing Party Name', type: 'text' as const, required: true },
      { key: 'opposingAddress', label: 'Opposing Party Address', type: 'textarea' as const },
      { key: 'natureOfDispute', label: 'Nature of Dispute', type: 'text' as const, required: true },
      { key: 'amountInvolved', label: 'Amount / Value Involved', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
      { key: 'reliefSought', label: 'Relief Sought', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this civil complaint against {{opposingParty}} of {{opposingAddress}}.

Nature of Dispute: {{natureOfDispute}}
Amount / Value Involved: {{amountInvolved}}

Complaint Details:
{{description}}

Relief Sought:
{{reliefSought}}

I have all supporting documents and evidence. It is therefore prayed that appropriate civil relief along with costs be granted in the interest of justice.`,
  },
  {
    id: 'high-court-petition',
    title: 'High Court Petition',
    icon: '🏛️',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'petitionType', label: 'Type of Petition', type: 'text' as const, required: true, placeholder: 'Writ / Civil / Criminal' },
      { key: 'respondent', label: 'Respondent(s)', type: 'text' as const, required: true },
      { key: 'impugnedOrder', label: 'Impugned Order / Action', type: 'textarea' as const },
      { key: 'grounds', label: 'Grounds of Petition', type: 'textarea' as const, required: true },
      { key: 'reliefSought', label: 'Prayer / Relief Sought', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this {{petitionType}} petition before the Hon'ble High Court against {{respondent}}.

Impugned Order / Action:
{{impugnedOrder}}

Grounds of Petition:
{{grounds}}

Prayer / Relief Sought:
{{reliefSought}}

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to grant the above relief and pass such further orders as may be deemed fit and proper in the interest of justice.`,
  },
  {
    id: 'cheating-fraud-complaint',
    title: 'Cheating/Fraud Complaint',
    icon: '🔍',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'accusedName', label: 'Accused Name', type: 'text' as const, required: true },
      { key: 'accusedAddress', label: 'Accused Address / Contact', type: 'textarea' as const },
      { key: 'incidentDate', label: 'Date of Fraud', type: 'date' as const, required: true },
      { key: 'amountLost', label: 'Amount Lost / Defrauded', type: 'text' as const },
      { key: 'description', label: 'How the Fraud was Committed', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this complaint regarding cheating and fraud committed against me by {{accusedName}}.

Accused Address / Contact: {{accusedAddress}}
Date of Fraud: {{incidentDate}}
Amount Lost: {{amountLost}}

How the Fraud was Committed:
{{description}}

I request that an FIR be registered, an investigation conducted, the accused be prosecuted and my money be recovered. I am ready to provide all evidence including transaction records and communication proof.`,
  },
  {
    id: 'domestic-violence-complaint',
    title: 'Domestic Violence Complaint',
    icon: '🆘',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'respondentName', label: 'Respondent Name', type: 'text' as const, required: true },
      { key: 'relationship', label: 'Relationship with Respondent', type: 'text' as const, required: true },
      { key: 'incidents', label: 'Description of Incidents', type: 'textarea' as const, required: true },
      { key: 'lastIncidentDate', label: 'Date of Last Incident', type: 'date' as const },
      { key: 'reliefSought', label: 'Relief / Protection Sought', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this complaint of domestic violence against {{respondentName}} ({{relationship}}).

Description of Incidents:
{{incidents}}

Date of Last Incident: {{lastIncidentDate}}

Relief / Protection Sought:
{{reliefSought}}

I request immediate protection orders, residence orders and any other relief permissible under applicable domestic violence laws. The matter is urgent and requires immediate intervention to ensure my safety and well-being.`,
  },
  {
    id: 'harassment-complaint',
    title: 'Harassment Complaint',
    icon: '😤',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'accusedName', label: 'Person(s) Involved', type: 'text' as const, required: true },
      { key: 'harassmentType', label: 'Type of Harassment', type: 'select' as const, options: [
        { label: 'Physical', value: 'Physical' },
        { label: 'Verbal', value: 'Verbal' },
        { label: 'Online / Cyber', value: 'Online / Cyber' },
        { label: 'Sexual', value: 'Sexual' },
        { label: 'Mental / Emotional', value: 'Mental / Emotional' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'location', label: 'Location of Harassment', type: 'text' as const },
      { key: 'description', label: 'Detailed Account', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this complaint regarding harassment caused to me by {{accusedName}}.

Type of Harassment: {{harassmentType}}
Location: {{location}}

Detailed Account:
{{description}}

I request immediate action against the accused and protection for myself. I am ready to support my complaint with evidence including messages, screenshots, witnesses and any other proof available.`,
  },
  {
    id: 'property-encroachment',
    title: 'Property Encroachment Complaint',
    icon: '🏘️',
    category: 'Advocate / Legal',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'My Property Address', type: 'textarea' as const, required: true },
      { key: 'encroacherName', label: 'Encroacher Name', type: 'text' as const, required: true },
      { key: 'encroachmentType', label: 'Type of Encroachment', type: 'text' as const, required: true },
      { key: 'encroachmentDate', label: 'Approximate Date of Encroachment', type: 'date' as const },
      { key: 'description', label: 'Details of Encroachment', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this complaint regarding illegal encroachment on my property by {{encroacherName}}.

My Property Address:
{{propertyAddress}}

Type of Encroachment: {{encroachmentType}}
Approximate Date: {{encroachmentDate}}

Details of Encroachment:
{{description}}

I request immediate action to remove the encroachment and restore peaceful possession of my property. I have title documents and supporting evidence ready for verification.`,
  },

  // ═══════════════════════════════════════════
  // CA / FINANCE COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'income-tax-complaint',
    title: 'Income Tax Complaint',
    icon: '📨',
    category: 'CA / Finance',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'panNumber', label: 'PAN / Tax ID', type: 'text' as const, required: true },
      { key: 'assessmentYear', label: 'Assessment / Tax Year', type: 'text' as const, required: true },
      { key: 'issueType', label: 'Nature of Issue', type: 'text' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally lodge a complaint with the Income Tax / Tax Department regarding the following matter.

PAN / Tax ID: {{panNumber}}
Assessment / Tax Year: {{assessmentYear}}
Nature of Issue: {{issueType}}

Complaint Details:
{{description}}

I request immediate investigation and resolution. All supporting documents are available and shall be furnished as required.`,
  },
  {
    id: 'gst-complaint',
    title: 'GST Complaint',
    icon: '🧾',
    category: 'CA / Finance',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'gstin', label: 'GSTIN / Tax Number', type: 'text' as const, required: true },
      { key: 'businessName', label: 'Business Name', type: 'text' as const, required: true },
      { key: 'issueType', label: 'Nature of Issue', type: 'text' as const, required: true },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to lodge a complaint with the GST / Sales Tax authority regarding the following matter.

GSTIN: {{gstin}}
Business Name: {{businessName}}
Nature of Issue: {{issueType}}

Complaint Details:
{{description}}

I request immediate investigation and corrective action. Supporting documents and invoices are enclosed/will be furnished as required.`,
  },
  {
    id: 'complaint-against-ca',
    title: 'Complaint Against CA (ICAI)',
    icon: '🏛️',
    category: 'CA / Finance',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'caName', label: 'Name of CA / Accountant', type: 'text' as const, required: true },
      { key: 'membershipNumber', label: 'Membership / License Number', type: 'text' as const },
      { key: 'firmName', label: 'Firm Name', type: 'text' as const },
      { key: 'engagementType', label: 'Nature of Engagement', type: 'text' as const, required: true },
      { key: 'feesPaid', label: 'Fees Paid', type: 'text' as const },
      { key: 'description', label: 'Details of Misconduct / Negligence', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this complaint against {{caName}} (Membership/License No: {{membershipNumber}}) of {{firmName}}.

Nature of Engagement: {{engagementType}}
Fees Paid: {{feesPaid}}

Details of Misconduct / Negligence:
{{description}}

I request a thorough investigation, disciplinary action against the said professional and refund/compensation as may be appropriate. All correspondence and supporting documents are available.`,
  },
  {
    id: 'bank-fraud-complaint',
    title: 'Bank Fraud Complaint',
    icon: '🏦',
    category: 'CA / Finance',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'bankName', label: 'Bank Name', type: 'text' as const, required: true },
      { key: 'accountNumber', label: 'Account Number', type: 'text' as const, required: true },
      { key: 'fraudDate', label: 'Date of Fraud', type: 'date' as const, required: true },
      { key: 'amountLost', label: 'Amount Lost', type: 'text' as const, required: true },
      { key: 'description', label: 'Description of Fraud', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally report a fraud committed in respect of my bank account.

Bank Name: {{bankName}}
Account Number: {{accountNumber}}
Date of Fraud: {{fraudDate}}
Amount Lost: {{amountLost}}

Description of Fraud:
{{description}}

I request an immediate investigation, blocking of further transactions and reversal of the fraudulent amount. If unresolved, I shall escalate to the Banking Ombudsman / regulatory authority.`,
  },
  {
    id: 'investment-fraud',
    title: 'Investment Fraud Complaint',
    icon: '💸',
    category: 'CA / Finance',
    fields: [...senderWithAddress, ...recipientFields,
      { key: 'firmName', label: 'Investment Firm / Advisor Name', type: 'text' as const, required: true },
      { key: 'investmentType', label: 'Type of Investment', type: 'text' as const, required: true },
      { key: 'investmentDate', label: 'Date of Investment', type: 'date' as const },
      { key: 'amountInvested', label: 'Amount Invested', type: 'text' as const, required: true },
      { key: 'description', label: 'Details of Fraud', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am filing this complaint regarding fraud in respect of investments made with {{firmName}}.

Type of Investment: {{investmentType}}
Date of Investment: {{investmentDate}}
Amount Invested: {{amountInvested}}

Details of Fraud:
{{description}}

I request immediate investigation, freezing of the firm's accounts and recovery of my invested amount. All transaction records and communications are available.`,
  },
  {
    id: 'epf-pf-complaint',
    title: 'EPF/PF Complaint',
    icon: '👷',
    category: 'CA / Finance',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'pfNumber', label: 'PF / UAN Number', type: 'text' as const, required: true },
      { key: 'employerName', label: 'Employer Name', type: 'text' as const, required: true },
      { key: 'issueType', label: 'Nature of Issue', type: 'text' as const, required: true, placeholder: 'Non-deposit / Withdrawal delay' },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to lodge a complaint regarding my Provident Fund / Retirement Fund account.

PF / UAN Number: {{pfNumber}}
Employer: {{employerName}}
Nature of Issue: {{issueType}}

Complaint Details:
{{description}}

I request immediate investigation and corrective action. Kindly direct the employer/concerned office to remit/release the dues at the earliest.`,
  },
  {
    id: 'insurance-claim-complaint',
    title: 'Insurance Claim Complaint',
    icon: '🛡️',
    category: 'CA / Finance',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'policyNumber', label: 'Policy Number', type: 'text' as const, required: true },
      { key: 'insurerName', label: 'Insurance Company', type: 'text' as const, required: true },
      { key: 'claimNumber', label: 'Claim Number', type: 'text' as const },
      { key: 'claimDate', label: 'Date of Claim', type: 'date' as const },
      { key: 'claimAmount', label: 'Claim Amount', type: 'text' as const },
      { key: 'description', label: 'Reason for Complaint', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally complain regarding my insurance claim.

Insurance Company: {{insurerName}}
Policy Number: {{policyNumber}}
Claim Number: {{claimNumber}}
Date of Claim: {{claimDate}}
Claim Amount: {{claimAmount}}

Reason for Complaint:
{{description}}

I request immediate processing and settlement of my claim. If unresolved, I shall escalate the matter to the Insurance Ombudsman / regulatory authority.`,
  },
  {
    id: 'credit-card-fraud',
    title: 'Credit Card Fraud Complaint',
    icon: '💳',
    category: 'CA / Finance',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'cardLast4', label: 'Card Number (Last 4 Digits)', type: 'text' as const, required: true },
      { key: 'bankName', label: 'Issuing Bank', type: 'text' as const, required: true },
      { key: 'fraudDate', label: 'Date of Fraud', type: 'date' as const, required: true },
      { key: 'amount', label: 'Amount Charged', type: 'text' as const, required: true },
      { key: 'merchant', label: 'Merchant / Transaction Description', type: 'text' as const },
      { key: 'description', label: 'Details of Fraud', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am reporting a fraudulent transaction on my credit card.

Card Number (Last 4 Digits): {{cardLast4}}
Issuing Bank: {{bankName}}
Date of Fraud: {{fraudDate}}
Amount Charged: {{amount}}
Merchant / Description: {{merchant}}

Details of Fraud:
{{description}}

I have not authorized this transaction. I request you to immediately block the card, reverse the fraudulent charge and conduct a full investigation. Kindly issue a replacement card and confirm action taken.`,
  },

  // ═══════════════════════════════════════════
  // POSTAL / COURIER COMPLAINTS
  // ═══════════════════════════════════════════
  {
    id: 'lost-parcel-complaint',
    title: 'Lost Parcel Complaint',
    icon: '📦',
    category: 'Postal / Courier',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'trackingNumber', label: 'Tracking / Consignment Number', type: 'text' as const, required: true },
      { key: 'shipmentDate', label: 'Date of Shipment', type: 'date' as const, required: true },
      { key: 'fromAddress', label: 'Sender Address', type: 'textarea' as const },
      { key: 'toAddress', label: 'Delivery Address', type: 'textarea' as const, required: true },
      { key: 'value', label: 'Declared Value of Parcel', type: 'text' as const },
      { key: 'description', label: 'Contents and Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to lodge a complaint regarding a parcel that has been lost in transit.

Tracking / Consignment Number: {{trackingNumber}}
Date of Shipment: {{shipmentDate}}
Sender Address:
{{fromAddress}}

Delivery Address:
{{toAddress}}

Declared Value: {{value}}

Contents and Details:
{{description}}

I request an immediate investigation, tracing of the parcel and full compensation as per the courier/postal policy. Kindly confirm the action taken at the earliest.`,
  },
  {
    id: 'courier-delay-complaint',
    title: 'Courier Delay Complaint',
    icon: '🚚',
    category: 'Postal / Courier',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'trackingNumber', label: 'Tracking / Consignment Number', type: 'text' as const, required: true },
      { key: 'shipmentDate', label: 'Date of Shipment', type: 'date' as const, required: true },
      { key: 'expectedDelivery', label: 'Expected Delivery Date', type: 'date' as const, required: true },
      { key: 'currentStatus', label: 'Current Status', type: 'text' as const },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to formally complain about the inordinate delay in delivery of my courier shipment.

Tracking / Consignment Number: {{trackingNumber}}
Date of Shipment: {{shipmentDate}}
Expected Delivery Date: {{expectedDelivery}}
Current Status: {{currentStatus}}

Complaint Details:
{{description}}

The delay has caused me significant inconvenience and loss. I request immediate delivery, status confirmation and appropriate compensation as per your service guarantee.`,
  },
  {
    id: 'speed-post-complaint',
    title: 'Speed Post Complaint',
    icon: '📮',
    category: 'Postal / Courier',
    fields: [...senderWithPhone, ...recipientFields,
      { key: 'trackingNumber', label: 'Speed Post / Tracking Number', type: 'text' as const, required: true },
      { key: 'bookingDate', label: 'Date of Booking', type: 'date' as const, required: true },
      { key: 'bookingPostOffice', label: 'Booking Post Office', type: 'text' as const },
      { key: 'destinationAddress', label: 'Destination Address', type: 'textarea' as const, required: true },
      { key: 'issueType', label: 'Nature of Issue', type: 'text' as const, required: true, placeholder: 'Delay / Loss / Damage' },
      { key: 'description', label: 'Complaint Details', type: 'textarea' as const, required: true },
    ],
    bodyTemplate: `I am writing to lodge a complaint regarding a Speed Post / Express Mail consignment.

Tracking Number: {{trackingNumber}}
Date of Booking: {{bookingDate}}
Booking Post Office: {{bookingPostOffice}}
Destination Address:
{{destinationAddress}}

Nature of Issue: {{issueType}}

Complaint Details:
{{description}}

I request immediate investigation and resolution along with appropriate compensation as per postal rules. Kindly confirm the action taken at the earliest.`,
  },
];
