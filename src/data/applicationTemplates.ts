export interface ApplicationTemplate {
  id: string;
  title: string;
  icon: string;
  category: string;
  fields: TemplateField[];
  bodyTemplate: string;
}

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'textarea' | 'select' | 'id-type';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

const senderNameOnly: TemplateField[] = [
  { key: 'senderName', label: 'Your Full Name', type: 'text', placeholder: 'John Doe', required: true },
];

const senderWithContact: TemplateField[] = [
  { key: 'senderName', label: 'Your Full Name', type: 'text', placeholder: 'John Doe', required: true },
  { key: 'senderPhone', label: 'Phone Number', type: 'text', placeholder: '+1 234 567 890' },
  { key: 'senderEmail', label: 'Email Address', type: 'text', placeholder: 'john@example.com' },
];

const senderWithAddress: TemplateField[] = [
  { key: 'senderName', label: 'Your Full Name', type: 'text', placeholder: 'John Doe', required: true },
  { key: 'senderAddress', label: 'Your Address', type: 'textarea', placeholder: 'Street, City, State, ZIP' },
  { key: 'senderPhone', label: 'Phone Number', type: 'text', placeholder: '+1 234 567 890' },
  { key: 'senderEmail', label: 'Email Address', type: 'text', placeholder: 'john@example.com' },
];

const senderWithId: TemplateField[] = [
  { key: 'senderName', label: 'Your Full Name', type: 'text', placeholder: 'John Doe', required: true },
  { key: 'senderAddress', label: 'Your Address', type: 'textarea', placeholder: 'Street, City, State, ZIP' },
  { key: 'senderPhone', label: 'Phone Number', type: 'text', placeholder: '+1 234 567 890' },
  { key: 'senderEmail', label: 'Email Address', type: 'text', placeholder: 'john@example.com' },
  { key: 'idType', label: 'ID Type', type: 'id-type' },
  { key: 'idNumber', label: 'ID Number', type: 'text', placeholder: 'Enter your ID number' },
];

const recipientFields: TemplateField[] = [
  { key: 'recipientName', label: 'Recipient Name / Designation', type: 'text', placeholder: 'The Manager / The Director', required: true },
  { key: 'recipientOrg', label: 'Organization / Institution', type: 'text', placeholder: 'ABC Company Ltd.', required: true },
  { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Street, City, State, ZIP' },
];

const schoolRecipientFields: TemplateField[] = [
  { key: 'recipientName', label: 'Recipient Name / Designation', type: 'text', placeholder: 'The Principal / The Head Master', required: true },
  { key: 'recipientOrg', label: 'Organization / Institution', type: 'text', placeholder: 'ABC School / College', required: true },
  { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Street, City, State, ZIP' },
];

const officeRecipientFields: TemplateField[] = [
  { key: 'recipientName', label: 'Recipient Name / Designation', type: 'text', placeholder: 'The Manager / The HR Head', required: true },
  { key: 'recipientOrg', label: 'Organization / Institution', type: 'text', placeholder: 'ABC Company Ltd.', required: true },
  { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Street, City, State, ZIP' },
];

const govtRecipientFields: TemplateField[] = [
  { key: 'recipientName', label: 'Recipient Name / Designation', type: 'text', placeholder: 'The District Collector / The Commissioner', required: true },
  { key: 'recipientOrg', label: 'Organization / Institution', type: 'text', placeholder: 'District Administration / Govt. Office', required: true },
  { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Street, City, State, ZIP' },
];

const bankRecipientFields: TemplateField[] = [
  { key: 'recipientName', label: 'Recipient Name / Designation', type: 'text', placeholder: 'The Branch Manager', required: true },
  { key: 'recipientOrg', label: 'Organization / Institution', type: 'text', placeholder: 'State Bank / HDFC Bank', required: true },
  { key: 'recipientAddress', label: 'Recipient Address', type: 'textarea', placeholder: 'Branch Address, City, State, ZIP' },
];

export const ID_TYPES = [
  { label: 'Aadhaar (India)', value: 'aadhaar' },
  { label: 'Passport', value: 'passport' },
  { label: 'National ID', value: 'national_id' },
  { label: 'Social Security Number (US)', value: 'ssn' },
  { label: 'Driving License', value: 'driving_license' },
  { label: 'Other Government ID', value: 'other' },
];

export const applicationTemplates: ApplicationTemplate[] = [
  // ═══════════════════════════════════════════
  // SCHOOL / COLLEGE APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'leave-school',
    title: 'Leave Application (School)',
    icon: '🏫',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'studentName', label: 'Student Name', type: 'text', required: true },
      { key: 'class', label: 'Class / Grade', type: 'text', required: true },
      { key: 'section', label: 'Section', type: 'text' },
      { key: 'fromDate', label: 'From Date', type: 'date' },
      { key: 'toDate', label: 'To Date', type: 'date' },
      { key: 'reason', label: 'Reason for Leave', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request leave for my ward/self from {{fromDate}} to {{toDate}}.

Student Details:
- Name: {{studentName}}
- Class: {{class}}
- Section: {{section}}

Reason for Leave:
{{reason}}

I kindly request you to grant the leave. I assure you that the student will complete all missed assignments and classwork upon return.`,
  },
  {
    id: 'leave-college',
    title: 'Leave Application (College)',
    icon: '🎓',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Program', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number', type: 'text' },
      { key: 'semester', label: 'Semester / Year', type: 'text' },
      { key: 'fromDate', label: 'From Date', type: 'date' },
      { key: 'toDate', label: 'To Date', type: 'date' },
      { key: 'reason', label: 'Reason for Leave', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am a student of {{course}}, Semester/Year: {{semester}}, Roll No: {{rollNo}}. I am writing to request leave from {{fromDate}} to {{toDate}}.

Reason:
{{reason}}

I shall ensure that all academic work is completed on time. Kindly grant the leave.`,
  },
  {
    id: 'bonafide',
    title: 'Bonafide Certificate Application',
    icon: '📜',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'institution', label: 'Institution Name', type: 'text', required: true },
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number / Student ID', type: 'text' },
      { key: 'purpose', label: 'Purpose of Certificate', type: 'text', placeholder: 'Bank account, scholarship...', required: true },
    ],
    bodyTemplate: `I am currently enrolled as a student in {{course}} at {{institution}}, Roll No: {{rollNo}}.

I require a Bonafide Certificate for the following purpose: {{purpose}}.

I kindly request you to issue the certificate at the earliest. I shall be grateful for your prompt assistance.`,
  },
  {
    id: 'character',
    title: 'Character Certificate Application',
    icon: '⭐',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'institution', label: 'Institution Name', type: 'text', required: true },
      { key: 'duration', label: 'Duration of Association', type: 'text', placeholder: '2020-2024' },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I have been associated with {{institution}} during the period of {{duration}}. During this time, I have maintained good conduct and discipline.

I require a Character Certificate for: {{purpose}}.

I kindly request you to issue the certificate. I shall be obliged for your cooperation.`,
  },
  {
    id: 'transfer-cert',
    title: 'Transfer Certificate Application',
    icon: '🔄',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'institution', label: 'Current Institution', type: 'text', required: true },
      { key: 'newInstitution', label: 'New Institution', type: 'text' },
      { key: 'course', label: 'Current Course / Class', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Transfer', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am currently studying in {{course}} at {{institution}}. Due to the following reason, I need to transfer:

{{reason}}

I request you to kindly issue my Transfer Certificate so that I may proceed with my admission at {{newInstitution}}.

I have cleared all dues and have no pending obligations with the institution.`,
  },
  {
    id: 'fee-concession',
    title: 'Fee Concession Application',
    icon: '💸',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number', type: 'text' },
      { key: 'reason', label: 'Reason for Fee Concession', type: 'textarea', required: true },
      { key: 'amount', label: 'Concession Amount Requested', type: 'text' },
    ],
    bodyTemplate: `I am a student of {{course}}, Roll No: {{rollNo}}. I am writing to request a fee concession due to the following reasons:

{{reason}}

I kindly request you to grant a concession of {{amount}} in my fees. I shall be grateful for your kind consideration and support.`,
  },
  {
    id: 'library-card',
    title: 'Library Card Application',
    icon: '📚',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number / Student ID', type: 'text' },
      { key: 'reason', label: 'Reason (New / Lost / Renewal)', type: 'select', options: [
        { label: 'New Library Card', value: 'new' },
        { label: 'Lost Card Replacement', value: 'lost' },
        { label: 'Card Renewal', value: 'renewal' },
      ]},
    ],
    bodyTemplate: `I am a student of {{course}}, Roll No: {{rollNo}}. I am writing to request a {{reason}} for library access.

I assure you that I will follow all library rules and regulations. Kindly process my request at the earliest.`,
  },
  {
    id: 'scholarship',
    title: 'Scholarship Application',
    icon: '🏅',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'scholarshipName', label: 'Scholarship Name', type: 'text', required: true },
      { key: 'percentage', label: 'Academic Percentage / GPA', type: 'text' },
      { key: 'familyIncome', label: 'Family Annual Income', type: 'text' },
      { key: 'reason', label: 'Why You Deserve This Scholarship', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am a student of {{course}} and wish to apply for the {{scholarshipName}} scholarship.

My academic record: {{percentage}}
Family Annual Income: {{familyIncome}}

{{reason}}

I kindly request you to consider my application for the scholarship. I assure you that I will maintain excellent academic performance.`,
  },
  {
    id: 'id-card',
    title: 'ID Card Application',
    icon: '🪪',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number', type: 'text' },
      { key: 'reason', label: 'Reason (New / Lost / Damaged)', type: 'select', options: [
        { label: 'New ID Card', value: 'new' },
        { label: 'Lost ID Card', value: 'lost' },
        { label: 'Damaged ID Card', value: 'damaged' },
      ]},
    ],
    bodyTemplate: `I am a student of {{course}}, Roll No: {{rollNo}}. I am writing to request a {{reason}} for identification purposes.

I shall comply with all procedures and provide necessary photographs and documents. Kindly process my request at the earliest.`,
  },
  {
    id: 'migration-cert',
    title: 'Migration Certificate Application',
    icon: '✈️',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'institution', label: 'Current Institution', type: 'text', required: true },
      { key: 'course', label: 'Course Completed', type: 'text', required: true },
      { key: 'newInstitution', label: 'New Institution / University', type: 'text' },
      { key: 'reason', label: 'Reason for Migration', type: 'textarea', required: true },
    ],
    bodyTemplate: `I have completed {{course}} at {{institution}}. I am writing to request a Migration Certificate for the purpose of seeking admission at {{newInstitution}}.

Reason: {{reason}}

I have cleared all dues and fulfilled all academic obligations. Kindly issue the migration certificate at the earliest.`,
  },
  {
    id: 'duplicate-marksheet',
    title: 'Duplicate Marksheet Application',
    icon: '📄',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Examination', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number', type: 'text', required: true },
      { key: 'year', label: 'Year of Examination', type: 'text', required: true },
      { key: 'reason', label: 'Reason (Lost / Damaged)', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request a duplicate marksheet for {{course}}, Year: {{year}}, Roll No: {{rollNo}}.

Reason:
{{reason}}

I am willing to pay the required fee and submit any necessary documents. Kindly process my request at the earliest.`,
  },
  {
    id: 'hostel-leave',
    title: 'Hostel Leave Application',
    icon: '🏠',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'roomNo', label: 'Room Number', type: 'text' },
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'fromDate', label: 'From Date', type: 'date', required: true },
      { key: 'toDate', label: 'To Date', type: 'date', required: true },
      { key: 'destination', label: 'Destination', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Leave', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am a hostel resident in Room No: {{roomNo}}, studying {{course}}. I request leave from {{fromDate}} to {{toDate}}.

Destination: {{destination}}

Reason:
{{reason}}

I shall return to the hostel on time. Kindly grant the leave.`,
  },

  // ═══════════════════════════════════════════
  // OFFICE / JOB APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'job',
    title: 'Job Application Letter',
    icon: '💼',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'position', label: 'Position Applied For', type: 'text', required: true },
      { key: 'experience', label: 'Years of Experience', type: 'text' },
      { key: 'qualifications', label: 'Key Qualifications', type: 'textarea', required: true },
      { key: 'source', label: 'How did you hear about this position?', type: 'text' },
    ],
    bodyTemplate: `I am writing to express my keen interest in the position of {{position}} at {{recipientOrg}}, as advertised {{source}}.

With {{experience}} of professional experience, I believe I am well-suited for this role. My key qualifications include:

{{qualifications}}

I am confident that my skills and experience make me a strong candidate. I have attached my resume for your review and would welcome the opportunity to discuss how my background aligns with your requirements.

Thank you for considering my application.`,
  },
  {
    id: 'internship',
    title: 'Internship Application',
    icon: '🎯',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'position', label: 'Internship Role', type: 'text', required: true },
      { key: 'course', label: 'Current Course / University', type: 'text', required: true },
      { key: 'duration', label: 'Preferred Duration', type: 'text', placeholder: '3 months' },
      { key: 'skills', label: 'Relevant Skills', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am a student of {{course}} and writing to apply for the {{position}} internship at {{recipientOrg}}.

I would like to intern for a duration of {{duration}}.

My relevant skills include:
{{skills}}

I am eager to learn and contribute meaningfully to your organization. I am available to start at your earliest convenience.

Thank you for your consideration.`,
  },
  {
    id: 'leave-employee',
    title: 'Leave Application (Employee)',
    icon: '📋',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'leaveType', label: 'Leave Type', type: 'select', options: [
        { label: 'Sick Leave', value: 'Sick Leave' },
        { label: 'Casual Leave', value: 'Casual Leave' },
        { label: 'Earned Leave', value: 'Earned Leave' },
        { label: 'Maternity/Paternity Leave', value: 'Maternity/Paternity Leave' },
        { label: 'Emergency Leave', value: 'Emergency Leave' },
      ]},
      { key: 'fromDate', label: 'From Date', type: 'date', required: true },
      { key: 'toDate', label: 'To Date', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Leave', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request {{leaveType}} from {{fromDate}} to {{toDate}}.

Employee ID: {{employeeId}}
Department: {{department}}

Reason:
{{reason}}

I will ensure all pending work is completed before my leave and will arrange for a smooth handover of responsibilities.

Kindly approve my leave application.`,
  },
  {
    id: 'resignation',
    title: 'Resignation Letter',
    icon: '📝',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'lastDate', label: 'Proposed Last Working Day', type: 'date', required: true },
      { key: 'reason', label: 'Reason (Optional)', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to formally notify you of my resignation from the position of {{designation}} in the {{department}} department at {{recipientOrg}}.

My proposed last working day will be {{lastDate}}, in accordance with the notice period requirements.

{{reason}}

I want to express my sincere gratitude for the opportunities provided during my tenure. I am committed to ensuring a smooth transition.

Thank you for your understanding and support.`,
  },
  {
    id: 'relieving-letter',
    title: 'Relieving Letter Request',
    icon: '✉️',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'lastDate', label: 'Last Working Day', type: 'date', required: true },
      { key: 'resignationDate', label: 'Resignation Submission Date', type: 'date' },
    ],
    bodyTemplate: `I resigned from my position as {{designation}} in the {{department}} department on {{resignationDate}}, and my last working day was {{lastDate}}.

I have completed all handover formalities and cleared all dues. I kindly request you to issue my relieving letter at the earliest so that I may proceed with my future endeavors.

Thank you for your cooperation.`,
  },
  {
    id: 'salary-increase',
    title: 'Salary Increase Request',
    icon: '💰',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'tenure', label: 'Years at Company', type: 'text' },
      { key: 'achievements', label: 'Key Achievements', type: 'textarea', required: true },
      { key: 'requestedAmount', label: 'Requested Increment', type: 'text' },
    ],
    bodyTemplate: `I have been working as {{designation}} in the {{department}} department for {{tenure}}.

During my tenure, I have contributed significantly:
{{achievements}}

Considering my contributions and current market standards, I kindly request a salary revision of {{requestedAmount}}.

I look forward to your positive consideration.`,
  },
  {
    id: 'experience-cert',
    title: 'Experience Certificate Request',
    icon: '🏆',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'joiningDate', label: 'Joining Date', type: 'date', required: true },
      { key: 'lastDate', label: 'Last Working Day', type: 'date', required: true },
    ],
    bodyTemplate: `I worked as {{designation}} in the {{department}} department at {{recipientOrg}} from {{joiningDate}} to {{lastDate}}.

I have completed all formalities and request you to issue my Experience Certificate at the earliest. This certificate is required for my future career pursuits.

Thank you for your prompt action.`,
  },
  {
    id: 'noc',
    title: 'NOC Request Letter',
    icon: '✅',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'purpose', label: 'Purpose of NOC', type: 'textarea', required: true },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to request a No Objection Certificate (NOC) for the following purpose:

{{purpose}}

{{details}}

I confirm that I have fulfilled all necessary obligations. I kindly request you to issue the NOC at the earliest convenience.

Thank you for your cooperation.`,
  },
  {
    id: 'dept-transfer',
    title: 'Department Transfer Request',
    icon: '🔀',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'currentDept', label: 'Current Department', type: 'text', required: true },
      { key: 'targetDept', label: 'Desired Department', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Transfer', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am working as {{designation}} in the {{currentDept}} department. I wish to request a transfer to the {{targetDept}} department.

Reason:
{{reason}}

I believe this transfer will benefit both my professional growth and the organization. I am willing to go through any evaluation process required.

Thank you for your consideration.`,
  },
  {
    id: 'wfh',
    title: 'Work From Home Request',
    icon: '🏡',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'fromDate', label: 'From Date', type: 'date', required: true },
      { key: 'toDate', label: 'To Date', type: 'date', required: true },
      { key: 'reason', label: 'Reason', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request permission to work from home from {{fromDate}} to {{toDate}}.

Designation: {{designation}}
Department: {{department}}

Reason:
{{reason}}

I assure you that my productivity will not be affected. I will be available on all communication channels during work hours.

Kindly approve my request.`,
  },

  // ═══════════════════════════════════════════
  // GOVERNMENT / LEGAL APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'income-cert',
    title: 'Income Certificate Application',
    icon: '💵',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'occupation', label: 'Occupation', type: 'text', required: true },
      { key: 'annualIncome', label: 'Annual Income', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request an Income Certificate for: {{purpose}}.

My details:
- Occupation: {{occupation}}
- Annual Income: {{annualIncome}}

I hereby declare that the information provided is true and correct to the best of my knowledge. Kindly issue the income certificate at the earliest.`,
  },
  {
    id: 'address-proof',
    title: 'Address Proof Application',
    icon: '📍',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'currentAddress', label: 'Current Residential Address', type: 'textarea', required: true },
      { key: 'residingSince', label: 'Residing Since', type: 'text' },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request an Address Proof Certificate for: {{purpose}}.

My residential details:
- Address: {{currentAddress}}
- Residing Since: {{residingSince}}

I declare that the above information is accurate. I am ready to provide any supporting documents. Kindly issue the certificate at the earliest.`,
  },
  {
    id: 'caste-cert',
    title: 'Caste Certificate Application',
    icon: '📑',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'caste', label: 'Caste', type: 'text', required: true },
      { key: 'subCaste', label: 'Sub-Caste', type: 'text' },
      { key: 'fatherName', label: 'Father\'s Name', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request a Caste Certificate for: {{purpose}}.

My details:
- Caste: {{caste}}
- Sub-Caste: {{subCaste}}
- Father's Name: {{fatherName}}

I declare that the information provided is true and correct. Kindly issue the caste certificate at the earliest.`,
  },
  {
    id: 'domicile-cert',
    title: 'Domicile Certificate Application',
    icon: '🏛️',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'state', label: 'State / Province', type: 'text', required: true },
      { key: 'residingSince', label: 'Residing Since', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request a Domicile Certificate for: {{purpose}}.

I have been a permanent resident of {{state}} since {{residingSince}}.

I declare that the above information is correct. Kindly issue the domicile certificate at the earliest.`,
  },
  {
    id: 'passport-request',
    title: 'Passport Application Request',
    icon: '🛂',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'applicationType', label: 'Application Type', type: 'select', options: [
        { label: 'New Passport', value: 'New Passport' },
        { label: 'Passport Renewal', value: 'Passport Renewal' },
        { label: 'Tatkal (Urgent)', value: 'Tatkal Passport' },
      ]},
      { key: 'purpose', label: 'Purpose of Travel', type: 'text', required: true },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to request processing of my {{applicationType}} application.

Purpose: {{purpose}}

{{details}}

I have enclosed all required documents. Kindly process my application at the earliest.`,
  },
  {
    id: 'police-verification',
    title: 'Police Verification Request',
    icon: '🔍',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
      { key: 'details', label: 'Details', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request police verification for: {{purpose}}.

{{details}}

I have not been involved in any criminal activities and have a clean record. I am ready to provide any additional information as required. Kindly process the verification at the earliest.`,
  },
  {
    id: 'rti',
    title: 'RTI Application',
    icon: '📢',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'subject', label: 'Subject of RTI', type: 'text', required: true },
      { key: 'information', label: 'Information Sought', type: 'textarea', required: true },
      { key: 'period', label: 'Period of Information', type: 'text' },
    ],
    bodyTemplate: `Under the Right to Information Act, I am seeking the following information:

Subject: {{subject}}
Period: {{period}}

Information Sought:
{{information}}

I have paid the prescribed fee. Kindly provide the information within the stipulated time period as per the RTI Act.`,
  },
  {
    id: 'pension',
    title: 'Pension Request Application',
    icon: '👴',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'pensionType', label: 'Pension Type', type: 'select', options: [
        { label: 'Old Age Pension', value: 'Old Age Pension' },
        { label: 'Widow Pension', value: 'Widow Pension' },
        { label: 'Disability Pension', value: 'Disability Pension' },
        { label: 'Government Employee Pension', value: 'Government Pension' },
      ]},
      { key: 'retirementDate', label: 'Retirement / Eligibility Date', type: 'date' },
      { key: 'details', label: 'Additional Details', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to apply for {{pensionType}}.

Retirement/Eligibility Date: {{retirementDate}}

{{details}}

I have enclosed all required documents. Kindly process my pension application and initiate the disbursement at the earliest.`,
  },
  {
    id: 'property-registration',
    title: 'Property Registration Application',
    icon: '🏘️',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'propertyType', label: 'Property Type', type: 'select', options: [
        { label: 'Residential', value: 'Residential' },
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Agricultural', value: 'Agricultural' },
        { label: 'Industrial', value: 'Industrial' },
      ]},
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
      { key: 'details', label: 'Registration Details', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request registration of my {{propertyType}} property located at:

{{propertyAddress}}

Details:
{{details}}

I have enclosed all required documents including sale deed, identity proof, and property documents. Kindly process the registration at the earliest.`,
  },
  {
    id: 'voter-id-correction',
    title: 'Voter ID Correction Application',
    icon: '🗳️',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'voterId', label: 'Voter ID Number', type: 'text', required: true },
      { key: 'correctionType', label: 'Correction Required', type: 'select', options: [
        { label: 'Name Correction', value: 'Name Correction' },
        { label: 'Address Correction', value: 'Address Correction' },
        { label: 'Date of Birth Correction', value: 'DOB Correction' },
        { label: 'Photo Update', value: 'Photo Update' },
      ]},
      { key: 'details', label: 'Correction Details', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request a {{correctionType}} in my Voter ID (No: {{voterId}}).

Details of correction required:
{{details}}

I have enclosed supporting documents. Kindly process the correction at the earliest.`,
  },

  // ═══════════════════════════════════════════
  // BANK APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'bank-account-open',
    title: 'Bank Account Opening Request',
    icon: '🏦',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountType', label: 'Account Type', type: 'select', options: [
        { label: 'Savings Account', value: 'Savings Account' },
        { label: 'Current Account', value: 'Current Account' },
        { label: 'Fixed Deposit', value: 'Fixed Deposit' },
        { label: 'Recurring Deposit', value: 'Recurring Deposit' },
      ]},
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I wish to open a {{accountType}} at your {{branch}} branch.

{{details}}

I have enclosed the required documents (identity proof, address proof, photographs). Kindly process my account opening request.`,
  },
  {
    id: 'bank-account-close',
    title: 'Bank Account Closure Request',
    icon: '🔐',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'reason', label: 'Reason for Closure', type: 'textarea', required: true },
      { key: 'transferAccount', label: 'Transfer Balance to Account No.', type: 'text' },
    ],
    bodyTemplate: `I wish to close my account (No: {{accountNo}}) at your {{branch}} branch.

Reason: {{reason}}

Please transfer the remaining balance to Account No: {{transferAccount}}.

I have enclosed all required documents. Kindly process the closure at the earliest.`,
  },
  {
    id: 'atm-card-request',
    title: 'ATM Card Request',
    icon: '💳',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'cardType', label: 'Card Type', type: 'select', options: [
        { label: 'New ATM/Debit Card', value: 'New Card' },
        { label: 'Card Replacement', value: 'Replacement' },
        { label: 'Card Upgrade', value: 'Upgrade' },
      ]},
    ],
    bodyTemplate: `I wish to request a {{cardType}} for my account (No: {{accountNo}}) at your {{branch}} branch.

Kindly issue the card at the earliest. I shall collect it from the branch or request delivery to my registered address.`,
  },
  {
    id: 'debit-card-replace',
    title: 'Debit Card Replacement',
    icon: '🔄',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'reason', label: 'Reason (Lost / Stolen / Damaged / Expired)', type: 'select', options: [
        { label: 'Lost', value: 'Lost' },
        { label: 'Stolen', value: 'Stolen' },
        { label: 'Damaged', value: 'Damaged' },
        { label: 'Expired', value: 'Expired' },
      ]},
      { key: 'lastFourDigits', label: 'Last 4 Digits of Old Card', type: 'text' },
    ],
    bodyTemplate: `I wish to request a replacement for my debit card (last 4 digits: {{lastFourDigits}}) linked to account (No: {{accountNo}}).

Reason: {{reason}}

I have blocked the old card for security. Kindly issue a replacement card at the earliest.`,
  },
  {
    id: 'cheque-book',
    title: 'Cheque Book Request',
    icon: '📒',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'leaves', label: 'Number of Leaves', type: 'select', options: [
        { label: '10 Leaves', value: '10' },
        { label: '25 Leaves', value: '25' },
        { label: '50 Leaves', value: '50' },
      ]},
    ],
    bodyTemplate: `I wish to request a cheque book of {{leaves}} leaves for my account (No: {{accountNo}}) at your {{branch}} branch.

Kindly issue the cheque book at the earliest.`,
  },
  {
    id: 'loan-application',
    title: 'Loan Application',
    icon: '🏧',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text' },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'loanType', label: 'Loan Type', type: 'select', options: [
        { label: 'Home Loan', value: 'Home Loan' },
        { label: 'Personal Loan', value: 'Personal Loan' },
        { label: 'Education Loan', value: 'Education Loan' },
        { label: 'Vehicle Loan', value: 'Vehicle Loan' },
        { label: 'Business Loan', value: 'Business Loan' },
      ]},
      { key: 'amount', label: 'Loan Amount', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'textarea', required: true },
    ],
    bodyTemplate: `I wish to apply for a {{loanType}} of {{amount}} from your {{branch}} branch.

Account No: {{accountNo}}

Purpose:
{{purpose}}

I have enclosed all required documents (income proof, identity proof, address proof). Kindly process my loan application at the earliest.`,
  },
  {
    id: 'loan-closure',
    title: 'Loan Closure Request',
    icon: '🎉',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Loan Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'loanType', label: 'Loan Type', type: 'text', required: true },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I wish to close my {{loanType}} (Loan Account No: {{accountNo}}) at your {{branch}} branch.

{{details}}

I have repaid all dues and request you to issue the loan closure certificate and release any collateral documents at the earliest.`,
  },
  {
    id: 'nominee-addition',
    title: 'Nominee Addition Request',
    icon: '👥',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'nomineeName', label: 'Nominee Full Name', type: 'text', required: true },
      { key: 'nomineeRelation', label: 'Relationship', type: 'text', required: true },
    ],
    bodyTemplate: `I wish to add/update the nominee for my account (No: {{accountNo}}) at your {{branch}} branch.

Nominee Details:
- Name: {{nomineeName}}
- Relationship: {{nomineeRelation}}

I have enclosed the required documents. Kindly update the nominee details at the earliest.`,
  },
  {
    id: 'bank-address-update',
    title: 'Bank Address Update Request',
    icon: '📫',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'newAddress', label: 'New Address', type: 'textarea', required: true },
    ],
    bodyTemplate: `I wish to update the address on my account (No: {{accountNo}}) at your {{branch}} branch.

New Address:
{{newAddress}}

I have enclosed address proof documents. Kindly update my records at the earliest.`,
  },
  {
    id: 'bank-mobile-update',
    title: 'Mobile Number Update Request',
    icon: '📱',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'oldMobile', label: 'Old Mobile Number', type: 'text' },
      { key: 'newMobile', label: 'New Mobile Number', type: 'text', required: true },
    ],
    bodyTemplate: `I wish to update the registered mobile number on my account (No: {{accountNo}}) at your {{branch}} branch.

Old Mobile: {{oldMobile}}
New Mobile: {{newMobile}}

Kindly update the mobile number for SMS alerts and OTP services at the earliest.`,
  },

  // ═══════════════════════════════════════════
  // ADDITIONAL SCHOOL / COLLEGE APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'exam-revaluation',
    title: 'Exam Re-evaluation Application',
    icon: '📝',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number', type: 'text', required: true },
      { key: 'examName', label: 'Examination Name', type: 'text', required: true },
      { key: 'subject', label: 'Subject for Re-evaluation', type: 'text', required: true },
      { key: 'reason', label: 'Reason', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am a student of {{course}}, Roll No: {{rollNo}}. I am writing to request re-evaluation of my {{examName}} answer sheet for the subject: {{subject}}.

Reason:
{{reason}}

I am willing to pay the prescribed re-evaluation fee. Kindly process my request at the earliest.`,
  },
  {
    id: 'admission-application',
    title: 'Admission Application',
    icon: '🎒',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'institution', label: 'Institution Name', type: 'text', required: true },
      { key: 'course', label: 'Course / Class Applied For', type: 'text', required: true },
      { key: 'previousInstitution', label: 'Previous Institution', type: 'text' },
      { key: 'percentage', label: 'Previous Percentage / GPA', type: 'text' },
      { key: 'reason', label: 'Why This Institution', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to apply for admission in {{course}} at {{institution}}.

Previous Institution: {{previousInstitution}}
Academic Record: {{percentage}}

{{reason}}

I have enclosed all required documents and certificates. Kindly consider my application for admission.`,
  },
  {
    id: 'sports-certificate',
    title: 'Sports Certificate Application',
    icon: '🏅',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'sport', label: 'Sport / Activity', type: 'text', required: true },
      { key: 'achievement', label: 'Achievement / Level', type: 'text', required: true },
      { key: 'eventDate', label: 'Event Date', type: 'date' },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am a student of {{course}}. I participated in {{sport}} and achieved {{achievement}} on {{eventDate}}.

I require a Sports Certificate for: {{purpose}}.

Kindly issue the certificate at the earliest. I can provide event participation proof if needed.`,
  },
  {
    id: 'late-fee-waiver',
    title: 'Late Fee Waiver Application',
    icon: '⏰',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number', type: 'text' },
      { key: 'feeAmount', label: 'Late Fee Amount', type: 'text' },
      { key: 'reason', label: 'Reason for Late Payment', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am a student of {{course}}, Roll No: {{rollNo}}. I was unable to pay my fees on time and a late fee of {{feeAmount}} has been imposed.

Reason for delay:
{{reason}}

I sincerely apologize for the delay and request you to kindly waive the late fee. I assure that future payments will be made on time.`,
  },
  {
    id: 'gap-certificate',
    title: 'Gap Certificate Application',
    icon: '📃',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'lastCourse', label: 'Last Course Attended', type: 'text', required: true },
      { key: 'lastInstitution', label: 'Last Institution', type: 'text', required: true },
      { key: 'gapFrom', label: 'Gap From (Year)', type: 'text', required: true },
      { key: 'gapTo', label: 'Gap To (Year)', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Gap', type: 'textarea', required: true },
    ],
    bodyTemplate: `I completed {{lastCourse}} from {{lastInstitution}}. There has been a gap in my education from {{gapFrom}} to {{gapTo}}.

Reason for Gap:
{{reason}}

I declare that during this gap period, I was not involved in any criminal activity. Kindly issue the gap certificate for my further education.`,
  },
  {
    id: 'medical-certificate-request',
    title: 'Medical Certificate Request',
    icon: '🏥',
    category: 'School / College',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Class', type: 'text', required: true },
      { key: 'fromDate', label: 'Absent From', type: 'date', required: true },
      { key: 'toDate', label: 'Absent To', type: 'date', required: true },
      { key: 'illness', label: 'Nature of Illness', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text' },
    ],
    bodyTemplate: `I am a student of {{course}}. I was absent from {{fromDate}} to {{toDate}} due to {{illness}}.

Purpose of certificate: {{purpose}}

I have attached the medical reports. Kindly issue the medical certificate so that my absence can be marked as authorized.`,
  },

  // ═══════════════════════════════════════════
  // ADDITIONAL OFFICE / JOB APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'recommendation-letter',
    title: 'Recommendation Letter Request',
    icon: '📨',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'tenure', label: 'Tenure / Duration', type: 'text' },
      { key: 'purpose', label: 'Purpose of Recommendation', type: 'text', required: true },
    ],
    bodyTemplate: `I have been working as {{designation}} in the {{department}} department for {{tenure}}.

I am requesting a letter of recommendation for: {{purpose}}.

I believe my contributions and performance during my tenure would support a positive recommendation. I would be grateful for your kind assistance.`,
  },
  {
    id: 'salary-certificate',
    title: 'Salary Certificate Request',
    icon: '💵',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am working as {{designation}} (Employee ID: {{employeeId}}) at {{recipientOrg}}.

I require a Salary Certificate for: {{purpose}}.

Kindly issue the certificate mentioning my current salary details at the earliest.`,
  },
  {
    id: 'joining-report',
    title: 'Joining Report Letter',
    icon: '📋',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'joiningDate', label: 'Date of Joining', type: 'date', required: true },
      { key: 'offerLetterDate', label: 'Offer Letter Date', type: 'date' },
    ],
    bodyTemplate: `I am writing to report that I have joined as {{designation}} in the {{department}} department on {{joiningDate}}, in accordance with the offer letter dated {{offerLetterDate}}.

I am ready to take on my responsibilities and look forward to contributing to the organization.

Kindly acknowledge my joining and complete the necessary formalities.`,
  },
  {
    id: 'promotion-request',
    title: 'Promotion Request Letter',
    icon: '📈',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'currentDesignation', label: 'Current Designation', type: 'text', required: true },
      { key: 'desiredDesignation', label: 'Desired Designation', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'tenure', label: 'Years in Current Role', type: 'text' },
      { key: 'achievements', label: 'Key Achievements', type: 'textarea', required: true },
    ],
    bodyTemplate: `I have been serving as {{currentDesignation}} in the {{department}} department for {{tenure}}.

During my tenure, I have made significant contributions:
{{achievements}}

I believe I am ready for the role of {{desiredDesignation}} and kindly request your consideration for a promotion.

Thank you for your support and guidance.`,
  },
  {
    id: 'advance-salary',
    title: 'Advance Salary Request',
    icon: '💳',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text', required: true },
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'amount', label: 'Advance Amount Requested', type: 'text', required: true },
      { key: 'reason', label: 'Reason', type: 'textarea', required: true },
      { key: 'repaymentPlan', label: 'Repayment Plan', type: 'text' },
    ],
    bodyTemplate: `I am working as {{designation}} (Employee ID: {{employeeId}}) at {{recipientOrg}}.

I am requesting an advance salary of {{amount}} due to the following reason:

{{reason}}

Repayment Plan: {{repaymentPlan}}

I assure you that the advance will be repaid as per the agreed terms. Kindly approve my request.`,
  },
  {
    id: 'gate-pass',
    title: 'Gate Pass Application',
    icon: '🚪',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Designation', type: 'text', required: true },
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'date', label: 'Date Required', type: 'date', required: true },
      { key: 'time', label: 'Time (From - To)', type: 'text', required: true },
      { key: 'reason', label: 'Reason', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am working as {{designation}} (Employee ID: {{employeeId}}) in the {{department}} department.

I request a gate pass for {{date}} during {{time}}.

Reason:
{{reason}}

I shall return to the office on time. Kindly approve the gate pass.`,
  },
  {
    id: 'permission-letter',
    title: 'Permission Letter',
    icon: '✋',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Designation', type: 'text' },
      { key: 'permissionFor', label: 'Permission For', type: 'text', required: true },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'details', label: 'Details', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request permission for: {{permissionFor}} on {{date}}.

Details:
{{details}}

I assure you that this will not affect my work responsibilities. Kindly grant the permission.`,
  },
  {
    id: 'apology-letter',
    title: 'Apology Letter (Professional)',
    icon: '🙏',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Your Designation', type: 'text' },
      { key: 'incidentDate', label: 'Date of Incident', type: 'date' },
      { key: 'description', label: 'What Happened', type: 'textarea', required: true },
      { key: 'corrective', label: 'Corrective Action Taken', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to sincerely apologize for the incident that occurred on {{incidentDate}}.

What happened:
{{description}}

Corrective action:
{{corrective}}

I take full responsibility and assure you that such an incident will not recur. I value my position and the trust placed in me.`,
  },
  {
    id: 'no-due-certificate',
    title: 'No Due Certificate Request',
    icon: '✅',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Designation', type: 'text', required: true },
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'lastDate', label: 'Last Working Day', type: 'date', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I worked as {{designation}} (Employee ID: {{employeeId}}) at {{recipientOrg}}. My last working day was {{lastDate}}.

I have cleared all pending dues and returned all company property. I require a No Due Certificate for: {{purpose}}.

Kindly verify and issue the certificate at the earliest.`,
  },
  {
    id: 'medical-leave',
    title: 'Medical Leave Application',
    icon: '🏥',
    category: 'Office / Job',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'designation', label: 'Designation', type: 'text', required: true },
      { key: 'employeeId', label: 'Employee ID', type: 'text' },
      { key: 'fromDate', label: 'From Date', type: 'date', required: true },
      { key: 'toDate', label: 'To Date', type: 'date', required: true },
      { key: 'illness', label: 'Nature of Illness', type: 'text', required: true },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to request medical leave from {{fromDate}} to {{toDate}}.

Employee ID: {{employeeId}}
Designation: {{designation}}
Nature of Illness: {{illness}}

{{details}}

I have attached the medical certificate from my doctor. I shall resume duties as soon as I recover. Kindly approve my medical leave.`,
  },

  // ═══════════════════════════════════════════
  // ADDITIONAL GOVERNMENT / LEGAL APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'birth-certificate',
    title: 'Birth Certificate Application',
    icon: '👶',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'childName', label: 'Child\'s Name', type: 'text', required: true },
      { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
      { key: 'placeOfBirth', label: 'Place of Birth', type: 'text', required: true },
      { key: 'fatherName', label: 'Father\'s Name', type: 'text', required: true },
      { key: 'motherName', label: 'Mother\'s Name', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request a Birth Certificate for:

Child's Name: {{childName}}
Date of Birth: {{dateOfBirth}}
Place of Birth: {{placeOfBirth}}
Father's Name: {{fatherName}}
Mother's Name: {{motherName}}

Purpose: {{purpose}}

I have enclosed the required documents. Kindly issue the birth certificate at the earliest.`,
  },
  {
    id: 'death-certificate',
    title: 'Death Certificate Application',
    icon: '🕊️',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'deceasedName', label: 'Name of Deceased', type: 'text', required: true },
      { key: 'dateOfDeath', label: 'Date of Death', type: 'date', required: true },
      { key: 'placeOfDeath', label: 'Place of Death', type: 'text', required: true },
      { key: 'relationship', label: 'Your Relationship', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request a Death Certificate for:

Name of Deceased: {{deceasedName}}
Date of Death: {{dateOfDeath}}
Place of Death: {{placeOfDeath}}
Relationship: {{relationship}}

Purpose: {{purpose}}

I have enclosed the required documents. Kindly issue the death certificate at the earliest.`,
  },
  {
    id: 'marriage-certificate',
    title: 'Marriage Certificate Application',
    icon: '💍',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'spouseName', label: 'Spouse Name', type: 'text', required: true },
      { key: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
      { key: 'marriagePlace', label: 'Place of Marriage', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to apply for a Marriage Certificate.

Spouse Name: {{spouseName}}
Date of Marriage: {{marriageDate}}
Place of Marriage: {{marriagePlace}}

Purpose: {{purpose}}

I have enclosed all required documents including marriage photographs, witnesses' details, and identity proofs. Kindly process the application.`,
  },
  {
    id: 'name-change',
    title: 'Name Change Application',
    icon: '✏️',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'oldName', label: 'Old / Current Name', type: 'text', required: true },
      { key: 'newName', label: 'New / Desired Name', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Change', type: 'textarea', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text' },
    ],
    bodyTemplate: `I am writing to request a change of my name from {{oldName}} to {{newName}}.

Reason:
{{reason}}

Purpose: {{purpose}}

I have published the name change notice in the newspaper as required and have enclosed all supporting documents. Kindly process the name change at the earliest.`,
  },
  {
    id: 'ration-card',
    title: 'Ration Card Application',
    icon: '🍚',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'applicationType', label: 'Type', type: 'select', options: [
        { label: 'New Ration Card', value: 'New Ration Card' },
        { label: 'Duplicate Ration Card', value: 'Duplicate Ration Card' },
        { label: 'Correction in Ration Card', value: 'Correction' },
        { label: 'Transfer of Ration Card', value: 'Transfer' },
      ]},
      { key: 'familyMembers', label: 'Number of Family Members', type: 'text', required: true },
      { key: 'annualIncome', label: 'Annual Income', type: 'text' },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to apply for {{applicationType}}.

Family Members: {{familyMembers}}
Annual Income: {{annualIncome}}

{{details}}

I have enclosed all required documents. Kindly process my application at the earliest.`,
  },
  {
    id: 'driving-license',
    title: 'Driving License Application',
    icon: '🚗',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'applicationType', label: 'Type', type: 'select', options: [
        { label: 'New License', value: 'New License' },
        { label: 'License Renewal', value: 'Renewal' },
        { label: 'Duplicate License', value: 'Duplicate' },
        { label: 'International Driving Permit', value: 'International Permit' },
        { label: 'Address Change', value: 'Address Change' },
      ]},
      { key: 'vehicleType', label: 'Vehicle Type', type: 'text' },
      { key: 'existingLicenseNo', label: 'Existing License No. (if any)', type: 'text' },
      { key: 'details', label: 'Additional Details', type: 'textarea' },
    ],
    bodyTemplate: `I am writing to apply for {{applicationType}} for driving license.

Vehicle Type: {{vehicleType}}
Existing License No: {{existingLicenseNo}}

{{details}}

I have enclosed all required documents. Kindly process my application at the earliest.`,
  },
  {
    id: 'fir-copy',
    title: 'FIR Copy Request',
    icon: '🚔',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'firNo', label: 'FIR Number', type: 'text', required: true },
      { key: 'firDate', label: 'FIR Date', type: 'date', required: true },
      { key: 'policeStation', label: 'Police Station', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to request a certified copy of FIR No: {{firNo}}, dated {{firDate}}, registered at {{policeStation}}.

Purpose: {{purpose}}

I am the complainant / party involved in this case. Kindly provide the FIR copy at the earliest.`,
  },
  {
    id: 'senior-citizen-card',
    title: 'Senior Citizen Card Application',
    icon: '👴',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
      { key: 'age', label: 'Current Age', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text' },
    ],
    bodyTemplate: `I am writing to apply for a Senior Citizen Card.

Date of Birth: {{dateOfBirth}}
Current Age: {{age}}

I have enclosed age proof, identity proof, address proof, and photographs. Kindly issue the Senior Citizen Card so I may avail the benefits and concessions available.`,
  },
  {
    id: 'disability-certificate',
    title: 'Disability Certificate Application',
    icon: '♿',
    category: 'Government / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'disabilityType', label: 'Type of Disability', type: 'text', required: true },
      { key: 'percentage', label: 'Disability Percentage (if known)', type: 'text' },
      { key: 'hospitalName', label: 'Hospital / Medical Authority', type: 'text' },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am writing to apply for a Disability Certificate.

Type of Disability: {{disabilityType}}
Disability Percentage: {{percentage}}
Medical Authority: {{hospitalName}}

Purpose: {{purpose}}

I have enclosed the medical reports and documents. Kindly arrange for the medical board examination and issue the disability certificate.`,
  },

  // ═══════════════════════════════════════════
  // ADDITIONAL BANKING APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'fixed-deposit',
    title: 'Fixed Deposit Application',
    icon: '🏧',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Savings Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'amount', label: 'FD Amount', type: 'text', required: true },
      { key: 'tenure', label: 'Tenure (Months/Years)', type: 'text', required: true },
      { key: 'nomineName', label: 'Nominee Name', type: 'text' },
    ],
    bodyTemplate: `I wish to open a Fixed Deposit of {{amount}} for a tenure of {{tenure}} from my savings account (No: {{accountNo}}) at your {{branch}} branch.

Nominee: {{nomineName}}

Kindly debit the amount from my savings account and issue the FD receipt at the earliest.`,
  },
  {
    id: 'locker-application',
    title: 'Bank Locker Application',
    icon: '🔒',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'lockerSize', label: 'Locker Size Preferred', type: 'select', options: [
        { label: 'Small', value: 'Small' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Large', value: 'Large' },
      ]},
    ],
    bodyTemplate: `I am an account holder (No: {{accountNo}}) at your {{branch}} branch. I wish to apply for a {{lockerSize}} size bank locker.

I am willing to pay the annual rental charges and maintain the required minimum balance. Kindly allot a locker at the earliest.`,
  },
  {
    id: 'internet-banking',
    title: 'Internet Banking Application',
    icon: '💻',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'serviceType', label: 'Service Type', type: 'select', options: [
        { label: 'New Internet Banking', value: 'New Registration' },
        { label: 'Password Reset', value: 'Password Reset' },
        { label: 'Upgrade to Full Access', value: 'Upgrade' },
        { label: 'Deactivation', value: 'Deactivation' },
      ]},
    ],
    bodyTemplate: `I am an account holder (No: {{accountNo}}) at your {{branch}} branch. I wish to apply for {{serviceType}} of Internet Banking services.

Kindly process my request and provide the necessary credentials at the earliest.`,
  },
  {
    id: 'credit-card-application',
    title: 'Credit Card Application',
    icon: '💳',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'cardType', label: 'Card Type', type: 'text', placeholder: 'Platinum, Gold, Classic...' },
      { key: 'annualIncome', label: 'Annual Income', type: 'text', required: true },
    ],
    bodyTemplate: `I am an account holder (No: {{accountNo}}) at your {{branch}} branch. I wish to apply for a {{cardType}} Credit Card.

Annual Income: {{annualIncome}}

I have enclosed income proof and identity documents. Kindly process my credit card application at the earliest.`,
  },
  {
    id: 'bank-statement',
    title: 'Bank Statement Request',
    icon: '📊',
    category: 'Banking',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNo', label: 'Account Number', type: 'text', required: true },
      { key: 'branch', label: 'Branch Name', type: 'text' },
      { key: 'fromDate', label: 'Statement From Date', type: 'date', required: true },
      { key: 'toDate', label: 'Statement To Date', type: 'date', required: true },
      { key: 'purpose', label: 'Purpose', type: 'text', required: true },
    ],
    bodyTemplate: `I am an account holder (No: {{accountNo}}) at your {{branch}} branch. I require a bank statement from {{fromDate}} to {{toDate}}.

Purpose: {{purpose}}

Kindly issue the certified bank statement at the earliest.`,
  },

  // ═══════════════════════════════════════════
  // WORK FROM HOME / CORPORATE
  // ═══════════════════════════════════════════
  {
    id: 'wfh-remote-allowance',
    title: 'Remote Work Allowance',
    icon: '💰',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'allowanceType', label: 'Allowance Type', type: 'select', required: true, options: [
        { label: 'Internet Bill', value: 'Internet Bill' },
        { label: 'Electricity Bill', value: 'Electricity Bill' },
        { label: 'Both', value: 'Both' },
      ]},
      { key: 'amount', label: 'Claimed Amount', type: 'text', required: true },
      { key: 'period', label: 'Billing Period', type: 'text', placeholder: 'e.g. Jan 2025 - Mar 2025', required: true },
      { key: 'reason', label: 'Justification', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request reimbursement for remote work expenses incurred during the period {{period}}.

Employee ID: {{employeeId}}
Department: {{department}}
Allowance Type: {{allowanceType}}
Claimed Amount: {{amount}}

Justification:
{{reason}}

I have attached the relevant bills/receipts for your reference. Kindly process the reimbursement at the earliest.`,
  },
  {
    id: 'wfh-equipment-request',
    title: 'Home Office Equipment Request',
    icon: '🖥️',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'equipment', label: 'Equipment Required', type: 'select', required: true, options: [
        { label: 'Ergonomic Chair', value: 'Ergonomic Chair' },
        { label: 'Standing Desk', value: 'Standing Desk' },
        { label: 'External Monitor', value: 'External Monitor' },
        { label: 'Keyboard & Mouse', value: 'Keyboard & Mouse' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'reason', label: 'Reason / Health Justification', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request home office equipment to improve my remote work productivity and ergonomic setup.

Employee ID: {{employeeId}}
Department: {{department}}
Equipment Required: {{equipment}}

Reason:
{{reason}}

I assure you this equipment will be used solely for official work purposes and returned upon request. Kindly approve this request.`,
  },
  {
    id: 'wfh-vpn-access',
    title: 'VPN & Secure Access Request',
    icon: '🔐',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'accessType', label: 'Access Type', type: 'select', required: true, options: [
        { label: 'VPN Access', value: 'VPN Access' },
        { label: 'Server Access', value: 'Server Access' },
        { label: 'Database Access', value: 'Database Access' },
        { label: 'Cloud Platform Access', value: 'Cloud Platform Access' },
      ]},
      { key: 'reason', label: 'Purpose / Justification', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am requesting secure remote access to company resources for my work-from-home setup.

Employee ID: {{employeeId}}
Department: {{department}}
Access Type Requested: {{accessType}}

Purpose:
{{reason}}

I understand and agree to comply with all company IT security policies. Kindly grant the requested access at the earliest.`,
  },
  {
    id: 'wfh-flexible-hours',
    title: 'Flexible Work Hours Application',
    icon: '⏰',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'currentShift', label: 'Current Shift Timing', type: 'text', required: true },
      { key: 'requestedShift', label: 'Requested Shift Timing', type: 'text', required: true },
      { key: 'fromDate', label: 'Effective From', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Change', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request a change in my work hours to better accommodate my remote working arrangement.

Employee ID: {{employeeId}}
Department: {{department}}
Current Shift: {{currentShift}}
Requested Shift: {{requestedShift}}
Effective From: {{fromDate}}

Reason:
{{reason}}

I assure you that my productivity and availability for team collaboration will not be affected. Kindly consider my request.`,
  },
  {
    id: 'wfh-laptop-upgrade',
    title: 'Laptop / Hardware Upgrade',
    icon: '💻',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'currentDevice', label: 'Current Device Details', type: 'text', required: true },
      { key: 'upgradeType', label: 'Upgrade Required', type: 'select', required: true, options: [
        { label: 'New Laptop', value: 'New Laptop' },
        { label: 'RAM Upgrade', value: 'RAM Upgrade' },
        { label: 'SSD Upgrade', value: 'SSD Upgrade' },
        { label: 'Battery Replacement', value: 'Battery Replacement' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'reason', label: 'Justification', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am requesting an upgrade to my work device to maintain productivity in my remote work setup.

Employee ID: {{employeeId}}
Department: {{department}}
Current Device: {{currentDevice}}
Upgrade Required: {{upgradeType}}

Justification:
{{reason}}

The current hardware limitations are affecting my work efficiency. Kindly approve this upgrade request.`,
  },
  {
    id: 'wfh-meeting-booking',
    title: 'Virtual Meeting / Webinar Booking',
    icon: '📹',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'eventTitle', label: 'Event / Meeting Title', type: 'text', required: true },
      { key: 'eventDate', label: 'Preferred Date', type: 'date', required: true },
      { key: 'duration', label: 'Duration (Hours)', type: 'text', required: true },
      { key: 'attendees', label: 'Expected Attendees', type: 'text' },
      { key: 'reason', label: 'Purpose / Agenda', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request a virtual meeting/webinar slot for a corporate event.

Employee ID: {{employeeId}}
Department: {{department}}
Event Title: {{eventTitle}}
Preferred Date: {{eventDate}}
Duration: {{duration}} hours
Expected Attendees: {{attendees}}

Purpose:
{{reason}}

Kindly arrange the necessary platform access and send invitations to relevant participants.`,
  },
  {
    id: 'wfh-skill-grant',
    title: 'Skill Development Grant',
    icon: '🎓',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'courseName', label: 'Course / Certification Name', type: 'text', required: true },
      { key: 'provider', label: 'Course Provider / Platform', type: 'text', required: true },
      { key: 'amount', label: 'Course Fee', type: 'text', required: true },
      { key: 'reason', label: 'How This Benefits Your Role', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am requesting a skill development grant to pursue a professional certification/course that will enhance my contributions to the organization.

Employee ID: {{employeeId}}
Department: {{department}}
Course Name: {{courseName}}
Provider: {{provider}}
Course Fee: {{amount}}

Relevance to My Role:
{{reason}}

I assure you that the skills gained will directly benefit my work performance and team productivity. Kindly approve this grant.`,
  },
  {
    id: 'wfh-coworking-space',
    title: 'Co-working Space Membership',
    icon: '🏢',
    category: 'Work From Home / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'spaceName', label: 'Preferred Co-working Space', type: 'text', required: true },
      { key: 'location', label: 'Location', type: 'text', required: true },
      { key: 'fromDate', label: 'From Date', type: 'date', required: true },
      { key: 'toDate', label: 'To Date', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Request', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am requesting a temporary co-working space membership for improved remote work productivity.

Employee ID: {{employeeId}}
Department: {{department}}
Preferred Space: {{spaceName}}
Location: {{location}}
Period: {{fromDate}} to {{toDate}}

Reason:
{{reason}}

I believe a dedicated workspace will significantly improve my focus and output. Kindly consider this request.`,
  },

  // ═══════════════════════════════════════════
  // GLOBAL USE — WORKPLACE / CORPORATE
  // ═══════════════════════════════════════════
  {
    id: 'employment-verification',
    title: 'Employment Verification Request',
    icon: '💼',
    category: 'Workplace / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'designation', label: 'Designation', type: 'text', required: true },
      { key: 'joiningDate', label: 'Date of Joining', type: 'date', required: true },
      { key: 'purpose', label: 'Purpose of Verification', type: 'textarea', required: true, placeholder: 'e.g., Visa application, loan processing, rental agreement' },
    ],
    bodyTemplate: `I am writing to request an Employment Verification Letter for official purposes.

Employee Details:
- Employee ID: {{employeeId}}
- Department: {{department}}
- Designation: {{designation}}
- Date of Joining: {{joiningDate}}

Purpose of Verification:
{{purpose}}

I kindly request you to issue the employment verification letter at the earliest convenience. I am willing to provide any additional documentation if required.`,
  },
  {
    id: 'promotion-request',
    title: 'Promotion Request Application',
    icon: '💼',
    category: 'Workplace / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'currentDesignation', label: 'Current Designation', type: 'text', required: true },
      { key: 'desiredDesignation', label: 'Desired Designation', type: 'text', required: true },
      { key: 'yearsOfService', label: 'Years of Service', type: 'text', required: true },
      { key: 'achievements', label: 'Key Achievements', type: 'textarea', required: true },
      { key: 'reason', label: 'Reason for Request', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to formally request consideration for a promotion from my current position.

Employee Details:
- Employee ID: {{employeeId}}
- Department: {{department}}
- Current Designation: {{currentDesignation}}
- Desired Designation: {{desiredDesignation}}
- Years of Service: {{yearsOfService}}

Key Achievements:
{{achievements}}

Reason for Request:
{{reason}}

I am committed to contributing to the organization's growth and believe this promotion would allow me to take on greater responsibilities. I look forward to your favorable consideration.`,
  },
  {
    id: 'project-deadline-extension',
    title: 'Project Deadline Extension Request',
    icon: '💼',
    category: 'Workplace / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'projectName', label: 'Project Name', type: 'text', required: true },
      { key: 'currentDeadline', label: 'Current Deadline', type: 'date', required: true },
      { key: 'requestedDeadline', label: 'Requested New Deadline', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Extension', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request an extension for the project deadline.

Employee ID: {{employeeId}}
Department: {{department}}
Project Name: {{projectName}}
Current Deadline: {{currentDeadline}}
Requested New Deadline: {{requestedDeadline}}

Reason for Extension:
{{reason}}

I assure you that the project will be completed with the highest quality within the extended timeframe. Kindly approve this request.`,
  },
  {
    id: 'work-schedule-change',
    title: 'Work Schedule Change Request',
    icon: '💼',
    category: 'Workplace / Corporate',
    fields: [
      ...senderWithContact, ...officeRecipientFields,
      { key: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'currentSchedule', label: 'Current Work Schedule', type: 'text', required: true, placeholder: 'e.g., 9 AM - 6 PM, Mon-Fri' },
      { key: 'requestedSchedule', label: 'Requested Schedule', type: 'text', required: true, placeholder: 'e.g., 10 AM - 7 PM, Mon-Fri' },
      { key: 'effectiveDate', label: 'Effective From', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Change', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request a change in my work schedule.

Employee ID: {{employeeId}}
Department: {{department}}
Current Schedule: {{currentSchedule}}
Requested Schedule: {{requestedSchedule}}
Effective From: {{effectiveDate}}

Reason:
{{reason}}

I assure you that this change will not affect my productivity or team commitments. Kindly consider my request.`,
  },

  // ═══════════════════════════════════════════
  // GLOBAL USE — EDUCATION
  // ═══════════════════════════════════════════
  {
    id: 'transcript-request',
    title: 'Transcript Request Application',
    icon: '🏫',
    category: 'Education',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Program', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number / Student ID', type: 'text', required: true },
      { key: 'yearOfPassing', label: 'Year of Passing', type: 'text', required: true },
      { key: 'copies', label: 'Number of Copies Required', type: 'text', required: true, placeholder: 'e.g., 2' },
      { key: 'purpose', label: 'Purpose of Transcript', type: 'textarea', required: true, placeholder: 'e.g., Higher studies abroad, job application' },
    ],
    bodyTemplate: `I am writing to request an official academic transcript.

Student Details:
- Course/Program: {{course}}
- Roll Number/Student ID: {{rollNo}}
- Year of Passing: {{yearOfPassing}}
- Number of Copies Required: {{copies}}

Purpose:
{{purpose}}

I kindly request you to issue the transcript at the earliest. I am willing to pay any applicable fees. Please let me know if any additional documents are needed.`,
  },
  {
    id: 'scholarship-request',
    title: 'Scholarship Request Application',
    icon: '🏫',
    category: 'Education',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Program', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number / Student ID', type: 'text', required: true },
      { key: 'semester', label: 'Semester / Year', type: 'text', required: true },
      { key: 'scholarshipName', label: 'Scholarship Name (if applicable)', type: 'text', placeholder: 'e.g., Merit Scholarship, Need-based Aid' },
      { key: 'academicPerformance', label: 'Academic Performance / GPA', type: 'text', required: true },
      { key: 'financialReason', label: 'Financial Background / Reason', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to apply for a scholarship to support my education.

Student Details:
- Course/Program: {{course}}
- Roll Number/Student ID: {{rollNo}}
- Semester/Year: {{semester}}
- Scholarship Applied For: {{scholarshipName}}
- Academic Performance/GPA: {{academicPerformance}}

Financial Background:
{{financialReason}}

I am dedicated to my studies and would greatly benefit from this financial support. I am prepared to submit any additional documentation as required. Kindly consider my application.`,
  },
  {
    id: 'course-withdrawal',
    title: 'Course Withdrawal Application',
    icon: '🏫',
    category: 'Education',
    fields: [
      ...senderNameOnly, ...schoolRecipientFields,
      { key: 'course', label: 'Course / Program', type: 'text', required: true },
      { key: 'rollNo', label: 'Roll Number / Student ID', type: 'text', required: true },
      { key: 'semester', label: 'Semester / Year', type: 'text', required: true },
      { key: 'courseToWithdraw', label: 'Course(s) to Withdraw', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Withdrawal', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to formally request withdrawal from the following course(s).

Student Details:
- Program: {{course}}
- Roll Number/Student ID: {{rollNo}}
- Semester/Year: {{semester}}

Course(s) to Withdraw:
{{courseToWithdraw}}

Reason:
{{reason}}

I understand the implications of course withdrawal on my academic record and am making this decision after careful consideration. Kindly process my request.`,
  },

  // ═══════════════════════════════════════════
  // GLOBAL USE — BANKING / FINANCE
  // ═══════════════════════════════════════════
  {
    id: 'bank-statement-request',
    title: 'Bank Statement Request Application',
    icon: '🏦',
    category: 'Banking / Finance',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNumber', label: 'Account Number', type: 'text', required: true },
      { key: 'accountType', label: 'Account Type', type: 'select', required: true, options: [
        { label: 'Savings Account', value: 'savings' },
        { label: 'Current Account', value: 'current' },
        { label: 'Fixed Deposit', value: 'fd' },
      ]},
      { key: 'fromDate', label: 'Statement From Date', type: 'date', required: true },
      { key: 'toDate', label: 'Statement To Date', type: 'date', required: true },
      { key: 'purpose', label: 'Purpose', type: 'textarea', required: true, placeholder: 'e.g., Visa application, tax filing, loan processing' },
    ],
    bodyTemplate: `I am writing to request a bank statement for my account.

Account Details:
- Account Number: {{accountNumber}}
- Account Type: {{accountType}}
- Statement Period: {{fromDate}} to {{toDate}}

Purpose:
{{purpose}}

Kindly issue the statement at the earliest convenience. I am available to visit the branch if required for verification.`,
  },
  {
    id: 'credit-limit-increase',
    title: 'Credit Limit Increase Request',
    icon: '🏦',
    category: 'Banking / Finance',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNumber', label: 'Account / Card Number (last 4 digits)', type: 'text', required: true },
      { key: 'currentLimit', label: 'Current Credit Limit', type: 'text', required: true },
      { key: 'requestedLimit', label: 'Requested Credit Limit', type: 'text', required: true },
      { key: 'reason', label: 'Reason for Increase', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request an increase in my credit limit.

Account/Card Details:
- Account/Card Number (last 4 digits): {{accountNumber}}
- Current Credit Limit: {{currentLimit}}
- Requested Credit Limit: {{requestedLimit}}

Reason:
{{reason}}

I have maintained a good repayment history and believe the increase is justified. Kindly process my request and let me know if any additional documents are needed.`,
  },
  {
    id: 'account-closure',
    title: 'Account Closure Request',
    icon: '🏦',
    category: 'Banking / Finance',
    fields: [
      ...senderWithId, ...bankRecipientFields,
      { key: 'accountNumber', label: 'Account Number', type: 'text', required: true },
      { key: 'accountType', label: 'Account Type', type: 'select', required: true, options: [
        { label: 'Savings Account', value: 'savings' },
        { label: 'Current Account', value: 'current' },
        { label: 'Fixed Deposit', value: 'fd' },
      ]},
      { key: 'reason', label: 'Reason for Closure', type: 'textarea', required: true },
      { key: 'transferAccount', label: 'Transfer Remaining Balance To (Account No.)', type: 'text', placeholder: 'Account number for balance transfer' },
    ],
    bodyTemplate: `I am writing to request the closure of my bank account.

Account Details:
- Account Number: {{accountNumber}}
- Account Type: {{accountType}}

Reason for Closure:
{{reason}}

Please transfer the remaining balance to: {{transferAccount}}

I request you to process the closure at the earliest and confirm once completed. I am available for any verification required.`,
  },

  // ═══════════════════════════════════════════
  // GLOBAL USE — HOUSING / PROPERTY
  // ═══════════════════════════════════════════
  {
    id: 'rental-agreement-renewal',
    title: 'Rental Agreement Renewal Request',
    icon: '🏠',
    category: 'Housing / Property',
    fields: [
      ...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
      { key: 'currentLeaseEnd', label: 'Current Lease End Date', type: 'date', required: true },
      { key: 'renewalPeriod', label: 'Desired Renewal Period', type: 'text', required: true, placeholder: 'e.g., 12 months' },
      { key: 'proposedTerms', label: 'Proposed Terms / Changes (if any)', type: 'textarea', placeholder: 'e.g., Same rent, minor repairs needed' },
    ],
    bodyTemplate: `I am writing to request the renewal of my rental agreement.

Property Address:
{{propertyAddress}}

Current Lease End Date: {{currentLeaseEnd}}
Desired Renewal Period: {{renewalPeriod}}

Proposed Terms/Changes:
{{proposedTerms}}

I have been a responsible tenant and would like to continue the tenancy. Kindly let me know the next steps for renewal.`,
  },
  {
    id: 'property-maintenance',
    title: 'Property Maintenance Request',
    icon: '🏠',
    category: 'Housing / Property',
    fields: [
      ...senderWithAddress, ...recipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
      { key: 'unitNumber', label: 'Unit / Flat Number', type: 'text' },
      { key: 'issueType', label: 'Type of Issue', type: 'select', required: true, options: [
        { label: 'Plumbing', value: 'plumbing' },
        { label: 'Electrical', value: 'electrical' },
        { label: 'Structural', value: 'structural' },
        { label: 'Pest Control', value: 'pest_control' },
        { label: 'Other', value: 'other' },
      ]},
      { key: 'issueDescription', label: 'Detailed Description of Issue', type: 'textarea', required: true },
      { key: 'urgency', label: 'Urgency Level', type: 'select', required: true, options: [
        { label: 'Emergency', value: 'emergency' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Normal', value: 'normal' },
      ]},
    ],
    bodyTemplate: `I am writing to report a maintenance issue at the property.

Property Details:
- Address: {{propertyAddress}}
- Unit/Flat Number: {{unitNumber}}

Issue Details:
- Type: {{issueType}}
- Urgency: {{urgency}}

Description:
{{issueDescription}}

I request you to arrange for the necessary repairs at the earliest. I am available to provide access to the property for inspection and repairs.`,
  },

  // ═══════════════════════════════════════════
  // GLOBAL USE — LEGAL / PERSONAL
  // ═══════════════════════════════════════════
  {
    id: 'affidavit-request',
    title: 'Affidavit Request Application',
    icon: '📑',
    category: 'Legal / Personal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'affidavitType', label: 'Type of Affidavit', type: 'select', required: true, options: [
        { label: 'Name Change', value: 'name_change' },
        { label: 'Address Proof', value: 'address_proof' },
        { label: 'Date of Birth Correction', value: 'dob_correction' },
        { label: 'Income Declaration', value: 'income' },
        { label: 'General Purpose', value: 'general' },
      ]},
      { key: 'purpose', label: 'Purpose of Affidavit', type: 'textarea', required: true },
      { key: 'details', label: 'Relevant Details / Facts', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request the preparation/attestation of an affidavit.

Affidavit Type: {{affidavitType}}

Purpose:
{{purpose}}

Relevant Details:
{{details}}

I hereby declare that all information provided is true and correct to the best of my knowledge. Kindly process this request at the earliest.`,
  },
  {
    id: 'document-verification',
    title: 'Document Verification Request',
    icon: '📑',
    category: 'Legal / Personal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'documentType', label: 'Document Type', type: 'text', required: true, placeholder: 'e.g., Degree Certificate, Birth Certificate' },
      { key: 'documentNumber', label: 'Document Number / Reference', type: 'text', required: true },
      { key: 'issuingAuthority', label: 'Issuing Authority', type: 'text', required: true },
      { key: 'purpose', label: 'Purpose of Verification', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request verification of the following document.

Document Details:
- Document Type: {{documentType}}
- Document Number/Reference: {{documentNumber}}
- Issuing Authority: {{issuingAuthority}}

Purpose of Verification:
{{purpose}}

I am enclosing copies of the relevant document for your reference. Kindly verify and issue the confirmation at the earliest. I am available for any further clarification.`,
  },

  // ═══════════════════════════════════════════
  // GLOBAL USE — TRAVEL / IMMIGRATION
  // ═══════════════════════════════════════════
  {
    id: 'visa-appointment-request',
    title: 'Visa Appointment Request Letter',
    icon: '🌐',
    category: 'Travel / Immigration',
    fields: [
      ...senderWithAddress, ...recipientFields,
      { key: 'passportNumber', label: 'Passport Number', type: 'text', required: true },
      { key: 'visaType', label: 'Visa Type', type: 'select', required: true, options: [
        { label: 'Tourist Visa', value: 'tourist' },
        { label: 'Business Visa', value: 'business' },
        { label: 'Student Visa', value: 'student' },
        { label: 'Work Visa', value: 'work' },
        { label: 'Transit Visa', value: 'transit' },
      ]},
      { key: 'destinationCountry', label: 'Destination Country', type: 'text', required: true },
      { key: 'travelDate', label: 'Planned Travel Date', type: 'date', required: true },
      { key: 'purpose', label: 'Purpose of Travel', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request a visa appointment for travel to {{destinationCountry}}.

Applicant Details:
- Passport Number: {{passportNumber}}
- Visa Type: {{visaType}}
- Destination Country: {{destinationCountry}}
- Planned Travel Date: {{travelDate}}

Purpose of Travel:
{{purpose}}

I have all necessary documents ready for submission and request an appointment at the earliest available date. Kindly let me know the required steps.`,
  },
  {
    id: 'travel-authorization',
    title: 'Travel Authorization Request',
    icon: '🌐',
    category: 'Travel / Immigration',
    fields: [
      ...senderWithAddress, ...recipientFields,
      { key: 'employeeId', label: 'Employee ID (if applicable)', type: 'text' },
      { key: 'destination', label: 'Destination', type: 'text', required: true },
      { key: 'departureDate', label: 'Departure Date', type: 'date', required: true },
      { key: 'returnDate', label: 'Return Date', type: 'date', required: true },
      { key: 'purpose', label: 'Purpose of Travel', type: 'textarea', required: true },
      { key: 'estimatedCost', label: 'Estimated Travel Cost', type: 'text', placeholder: 'e.g., $2,000' },
    ],
    bodyTemplate: `I am writing to request authorization for official/personal travel.

Travel Details:
- Employee ID: {{employeeId}}
- Destination: {{destination}}
- Departure Date: {{departureDate}}
- Return Date: {{returnDate}}
- Estimated Cost: {{estimatedCost}}

Purpose:
{{purpose}}

I request your approval for this travel. All expenses will be documented and submitted as per company/organization policy. Kindly grant the authorization.`,
  },

  // ═══════════════════════════════════════════
  // ADVOCATE / LEGAL APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'bail-application',
    title: 'Bail Application',
    icon: '⚖️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'caseNumber', label: 'Case / FIR Number', type: 'text', required: true },
      { key: 'court', label: 'Court / Police Station', type: 'text', required: true },
      { key: 'offence', label: 'Alleged Offence / Section', type: 'text', required: true },
      { key: 'arrestDate', label: 'Date of Arrest / Custody', type: 'date' },
      { key: 'grounds', label: 'Grounds for Bail', type: 'textarea', required: true },
    ],
    bodyTemplate: `I, the applicant, am submitting this bail application in connection with the following matter.

Case / FIR Number: {{caseNumber}}
Court / Police Station: {{court}}
Alleged Offence / Section: {{offence}}
Date of Arrest / Custody: {{arrestDate}}

Grounds for Bail:
{{grounds}}

I undertake to abide by all conditions imposed by the Hon'ble Court, cooperate fully with the investigation, attend all hearings and not tamper with evidence or witnesses. It is therefore most respectfully prayed that bail be granted in the interest of justice.`,
  },
  {
    id: 'anticipatory-bail',
    title: 'Anticipatory Bail Application',
    icon: '🛡️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'firNumber', label: 'FIR / Case Number (if any)', type: 'text' },
      { key: 'policeStation', label: 'Police Station', type: 'text', required: true },
      { key: 'apprehendedOffence', label: 'Apprehended Offence / Section', type: 'text', required: true },
      { key: 'reasonsApprehension', label: 'Reasons for Apprehension of Arrest', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this application for anticipatory bail as I have reasonable apprehension of arrest in the following matter.

FIR / Case Number: {{firNumber}}
Police Station: {{policeStation}}
Apprehended Offence / Section: {{apprehendedOffence}}

Reasons for Apprehension:
{{reasonsApprehension}}

I am a law-abiding citizen with deep roots in society, no prior criminal antecedents, and I undertake to fully cooperate with the investigation. It is therefore prayed that anticipatory bail be granted in the interest of justice.`,
  },
  {
    id: 'legal-notice',
    title: 'Legal Notice',
    icon: '📜',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...recipientFields,
      { key: 'subject', label: 'Subject of Notice', type: 'text', required: true },
      { key: 'facts', label: 'Facts of the Case', type: 'textarea', required: true },
      { key: 'demand', label: 'Demand / Relief Sought', type: 'textarea', required: true },
      { key: 'complianceDays', label: 'Compliance Period (Days)', type: 'text', placeholder: 'e.g., 15' },
    ],
    bodyTemplate: `Through this legal notice, I hereby call upon you in respect of the following matter.

Subject: {{subject}}

Facts of the Case:
{{facts}}

Demand / Relief Sought:
{{demand}}

You are hereby called upon to comply with the above demand within {{complianceDays}} days from the receipt of this notice, failing which appropriate civil and/or criminal proceedings shall be initiated against you at your sole risk, cost and consequences.`,
  },
  {
    id: 'vakalatnama',
    title: 'Vakalatnama',
    icon: '📋',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress,
      { key: 'advocateName', label: 'Advocate Name', type: 'text', required: true },
      { key: 'advocateAddress', label: 'Advocate Office Address', type: 'textarea' },
      { key: 'caseNumber', label: 'Case / Matter Number', type: 'text' },
      { key: 'court', label: 'Court / Forum', type: 'text', required: true },
      { key: 'matter', label: 'Subject Matter of Case', type: 'textarea', required: true },
    ],
    bodyTemplate: `I hereby appoint and authorize {{advocateName}}, Advocate, having office at {{advocateAddress}}, to act, appear and plead on my behalf in the following matter.

Case / Matter Number: {{caseNumber}}
Court / Forum: {{court}}

Subject Matter:
{{matter}}

The said Advocate is authorized to file pleadings, applications, affidavits, and to compromise, withdraw or refer the matter to arbitration, and to do all such acts as may be necessary for the conduct of the said case. I confirm and ratify all acts done by the Advocate in pursuance of this Vakalatnama.`,
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    icon: '✍️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithId,
      { key: 'attorneyName', label: 'Attorney (Holder) Full Name', type: 'text', required: true },
      { key: 'attorneyAddress', label: 'Attorney Address', type: 'textarea', required: true },
      { key: 'poaType', label: 'Type of Power of Attorney', type: 'select', options: [
        { label: 'General Power of Attorney', value: 'General' },
        { label: 'Special Power of Attorney', value: 'Special' },
      ]},
      { key: 'powers', label: 'Powers Granted', type: 'textarea', required: true },
      { key: 'validity', label: 'Validity Period', type: 'text', placeholder: 'e.g., Until revoked / 2 years' },
    ],
    bodyTemplate: `I, {{senderName}}, do hereby nominate, constitute and appoint {{attorneyName}}, residing at {{attorneyAddress}}, as my true and lawful attorney ({{poaType}} Power of Attorney) to act on my behalf.

Powers Granted:
{{powers}}

Validity: {{validity}}

I hereby agree to ratify and confirm all acts, deeds and things lawfully done by my said attorney in exercise of the powers conferred herein, as if done by me personally. This Power of Attorney shall remain in full force until expressly revoked by me in writing.`,
  },
  {
    id: 'affidavit-application',
    title: 'Affidavit Application',
    icon: '📑',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'affidavitPurpose', label: 'Purpose of Affidavit', type: 'text', required: true },
      { key: 'facts', label: 'Facts to be Sworn', type: 'textarea', required: true },
      { key: 'place', label: 'Place of Swearing', type: 'text' },
    ],
    bodyTemplate: `I, {{senderName}}, do hereby solemnly affirm and declare on oath as under, in support of the following purpose: {{affidavitPurpose}}.

Facts:
{{facts}}

I solemnly state that the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.

Sworn at {{place}} on the date mentioned above.`,
  },
  {
    id: 'court-petition',
    title: 'Court Petition',
    icon: '🏛️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'court', label: 'Court / Tribunal', type: 'text', required: true },
      { key: 'petitionType', label: 'Type of Petition', type: 'text', placeholder: 'e.g., Writ, Civil, Criminal', required: true },
      { key: 'opposingParty', label: 'Opposing Party / Respondent', type: 'text' },
      { key: 'facts', label: 'Brief Facts', type: 'textarea', required: true },
      { key: 'prayer', label: 'Prayer / Relief Sought', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this {{petitionType}} petition before the {{court}} against {{opposingParty}}.

Brief Facts:
{{facts}}

Prayer / Relief Sought:
{{prayer}}

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to grant the above relief and pass such further orders as may be deemed fit and proper in the interest of justice.`,
  },
  {
    id: 'stay-order-application',
    title: 'Stay Order Application',
    icon: '⏸️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'caseNumber', label: 'Case / Matter Number', type: 'text', required: true },
      { key: 'court', label: 'Court / Authority', type: 'text', required: true },
      { key: 'orderToStay', label: 'Order / Action to be Stayed', type: 'textarea', required: true },
      { key: 'grounds', label: 'Grounds for Stay', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this application seeking a stay order in the following matter.

Case / Matter Number: {{caseNumber}}
Court / Authority: {{court}}

Order / Action Sought to be Stayed:
{{orderToStay}}

Grounds for Stay:
{{grounds}}

If the impugned order/action is not stayed, the applicant shall suffer irreparable loss and injury which cannot be compensated in monetary terms. The balance of convenience also lies in favour of the applicant. It is therefore prayed that the said order/action be stayed pending final disposal of the matter.`,
  },
  {
    id: 'civil-suit-application',
    title: 'Civil Suit Application',
    icon: '⚖️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'court', label: 'Court of Filing', type: 'text', required: true },
      { key: 'defendantName', label: 'Defendant Name', type: 'text', required: true },
      { key: 'defendantAddress', label: 'Defendant Address', type: 'textarea' },
      { key: 'suitValue', label: 'Suit Value / Claim Amount', type: 'text' },
      { key: 'causeOfAction', label: 'Cause of Action', type: 'textarea', required: true },
      { key: 'reliefSought', label: 'Relief Sought', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this civil suit before the {{court}} against the defendant {{defendantName}}, residing at {{defendantAddress}}.

Suit Value / Claim Amount: {{suitValue}}

Cause of Action:
{{causeOfAction}}

Relief Sought:
{{reliefSought}}

It is therefore most respectfully prayed that this Hon'ble Court may be pleased to decree the suit in favour of the plaintiff and grant the above relief along with costs of the suit.`,
  },
  {
    id: 'divorce-petition',
    title: 'Divorce Petition',
    icon: '💔',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'court', label: 'Family Court', type: 'text', required: true },
      { key: 'spouseName', label: "Spouse's Full Name", type: 'text', required: true },
      { key: 'marriageDate', label: 'Date of Marriage', type: 'date', required: true },
      { key: 'marriagePlace', label: 'Place of Marriage', type: 'text' },
      { key: 'separationDate', label: 'Date of Separation', type: 'date' },
      { key: 'grounds', label: 'Grounds for Divorce', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this petition for dissolution of marriage before the {{court}}.

Petitioner: {{senderName}}
Respondent (Spouse): {{spouseName}}
Date of Marriage: {{marriageDate}}
Place of Marriage: {{marriagePlace}}
Date of Separation: {{separationDate}}

Grounds for Divorce:
{{grounds}}

It is therefore most respectfully prayed that the marriage between the parties be dissolved by a decree of divorce and any other relief as deemed fit may be granted in the interest of justice.`,
  },
  {
    id: 'property-dispute-application',
    title: 'Property Dispute Application',
    icon: '🏘️',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea', required: true },
      { key: 'opposingParty', label: 'Opposing Party Name', type: 'text', required: true },
      { key: 'natureOfDispute', label: 'Nature of Dispute', type: 'text', required: true },
      { key: 'facts', label: 'Brief Facts', type: 'textarea', required: true },
      { key: 'reliefSought', label: 'Relief Sought', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this application regarding a property dispute concerning the property described below.

Property Address:
{{propertyAddress}}

Opposing Party: {{opposingParty}}
Nature of Dispute: {{natureOfDispute}}

Brief Facts:
{{facts}}

Relief Sought:
{{reliefSought}}

I have all relevant title documents and supporting evidence in my possession. It is therefore prayed that appropriate relief may be granted in the interest of justice.`,
  },
  {
    id: 'custody-application',
    title: 'Custody Application',
    icon: '👨‍👧',
    category: 'Advocate / Legal',
    fields: [
      ...senderWithAddress, ...govtRecipientFields,
      { key: 'court', label: 'Family Court', type: 'text', required: true },
      { key: 'childName', label: "Child's Name", type: 'text', required: true },
      { key: 'childAge', label: "Child's Age", type: 'text', required: true },
      { key: 'otherParent', label: "Other Parent's Name", type: 'text', required: true },
      { key: 'custodyType', label: 'Type of Custody Sought', type: 'select', options: [
        { label: 'Sole Custody', value: 'Sole Custody' },
        { label: 'Joint Custody', value: 'Joint Custody' },
        { label: 'Visitation Rights', value: 'Visitation Rights' },
      ]},
      { key: 'grounds', label: 'Grounds / Welfare of Child', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am filing this application before the {{court}} seeking {{custodyType}} of the minor child named below.

Child's Name: {{childName}}
Child's Age: {{childAge}}
Other Parent: {{otherParent}}

Grounds and Welfare of the Child:
{{grounds}}

The welfare of the minor child is paramount and granting custody as prayed for is in the best interest of the child. It is therefore most respectfully prayed that the application be allowed and appropriate orders may be passed.`,
  },

  // ═══════════════════════════════════════════
  // CA / FINANCE APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'itr-filing-request',
    title: 'ITR Filing Request',
    icon: '💰',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...recipientFields,
      { key: 'panNumber', label: 'PAN / Tax ID Number', type: 'text', required: true },
      { key: 'assessmentYear', label: 'Assessment / Tax Year', type: 'text', required: true, placeholder: 'e.g., 2024-25' },
      { key: 'incomeSource', label: 'Source of Income', type: 'text', placeholder: 'Salary / Business / Other' },
      { key: 'totalIncome', label: 'Estimated Total Income', type: 'text' },
      { key: 'remarks', label: 'Additional Remarks', type: 'textarea' },
    ],
    bodyTemplate: `I would like to engage your services for filing my Income Tax Return for the assessment/tax year {{assessmentYear}}.

PAN / Tax ID: {{panNumber}}
Source of Income: {{incomeSource}}
Estimated Total Income: {{totalIncome}}

Additional Remarks:
{{remarks}}

I shall provide all necessary documents including Form 16 / W-2, bank statements, investment proofs and other supporting records as required. Kindly confirm your fees and process at the earliest.`,
  },
  {
    id: 'gst-registration',
    title: 'GST Registration Application',
    icon: '🧾',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'businessName', label: 'Business / Trade Name', type: 'text', required: true },
      { key: 'businessType', label: 'Type of Business', type: 'select', options: [
        { label: 'Proprietorship', value: 'Proprietorship' },
        { label: 'Partnership', value: 'Partnership' },
        { label: 'LLP', value: 'LLP' },
        { label: 'Private Limited', value: 'Private Limited' },
        { label: 'Other', value: 'Other' },
      ]},
      { key: 'businessAddress', label: 'Principal Business Address', type: 'textarea', required: true },
      { key: 'natureOfBusiness', label: 'Nature of Business / Goods or Services', type: 'textarea', required: true },
      { key: 'turnover', label: 'Estimated Annual Turnover', type: 'text' },
    ],
    bodyTemplate: `I am applying for GST / Sales Tax registration for the business detailed below.

Business Name: {{businessName}}
Type of Business: {{businessType}}
Principal Business Address:
{{businessAddress}}

Nature of Business:
{{natureOfBusiness}}

Estimated Annual Turnover: {{turnover}}

Kindly process the registration and issue the GSTIN / registration certificate. All required KYC documents, address proof and bank details are enclosed/will be furnished as per checklist.`,
  },
  {
    id: 'tds-refund',
    title: 'TDS Refund Application',
    icon: '💵',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'panNumber', label: 'PAN / Tax ID', type: 'text', required: true },
      { key: 'assessmentYear', label: 'Assessment / Tax Year', type: 'text', required: true },
      { key: 'tdsAmount', label: 'TDS Deducted Amount', type: 'text', required: true },
      { key: 'refundAmount', label: 'Refund Claimed', type: 'text', required: true },
      { key: 'bankAccount', label: 'Bank Account Number for Refund', type: 'text' },
      { key: 'ifscSwift', label: 'IFSC / SWIFT Code', type: 'text' },
      { key: 'reason', label: 'Reason for Refund', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am applying for refund of excess Tax Deducted at Source (TDS) for the assessment/tax year {{assessmentYear}}.

PAN / Tax ID: {{panNumber}}
Total TDS Deducted: {{tdsAmount}}
Refund Claimed: {{refundAmount}}
Bank Account: {{bankAccount}}
IFSC / SWIFT: {{ifscSwift}}

Reason for Refund:
{{reason}}

Kindly process the refund and credit the amount to the above-mentioned bank account at the earliest. All supporting documents including TDS certificates and ITR acknowledgement are enclosed.`,
  },
  {
    id: 'income-tax-notice-reply',
    title: 'Income Tax Notice Reply',
    icon: '📨',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'panNumber', label: 'PAN / Tax ID', type: 'text', required: true },
      { key: 'noticeNumber', label: 'Notice Reference Number', type: 'text', required: true },
      { key: 'noticeDate', label: 'Notice Date', type: 'date', required: true },
      { key: 'assessmentYear', label: 'Assessment / Tax Year', type: 'text', required: true },
      { key: 'reply', label: 'Reply / Explanation', type: 'textarea', required: true },
    ],
    bodyTemplate: `With reference to the notice bearing No. {{noticeNumber}} dated {{noticeDate}} issued in respect of assessment/tax year {{assessmentYear}}, I am submitting my reply herewith.

PAN / Tax ID: {{panNumber}}

Reply / Explanation:
{{reply}}

I have furnished true and complete information to the best of my knowledge. All supporting documents are enclosed for your kind perusal. Kindly consider this reply and drop the proceedings.`,
  },
  {
    id: 'audit-report-request',
    title: 'Audit Report Request',
    icon: '📊',
    category: 'CA / Finance',
    fields: [
      ...senderWithContact, ...recipientFields,
      { key: 'companyName', label: 'Company / Firm Name', type: 'text', required: true },
      { key: 'financialYear', label: 'Financial Year', type: 'text', required: true, placeholder: 'e.g., 2024-25' },
      { key: 'auditType', label: 'Type of Audit', type: 'select', options: [
        { label: 'Statutory Audit', value: 'Statutory Audit' },
        { label: 'Tax Audit', value: 'Tax Audit' },
        { label: 'Internal Audit', value: 'Internal Audit' },
        { label: 'GST Audit', value: 'GST Audit' },
      ]},
      { key: 'purpose', label: 'Purpose of Audit Report', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am writing to request preparation and issuance of the audit report for the entity detailed below.

Company / Firm: {{companyName}}
Financial Year: {{financialYear}}
Type of Audit: {{auditType}}

Purpose:
{{purpose}}

All books of accounts, vouchers, bank statements and supporting documents are ready for verification. Kindly confirm the timeline and fees and commence the audit at the earliest.`,
  },
  {
    id: 'pan-card-application',
    title: 'PAN Card Application',
    icon: '🪪',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'fatherName', label: "Father's Name", type: 'text' },
      { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { key: 'applicationType', label: 'Application Type', type: 'select', options: [
        { label: 'New PAN Card', value: 'New PAN Card' },
        { label: 'Reprint / Duplicate PAN', value: 'Reprint PAN' },
        { label: 'Correction in PAN', value: 'Correction in PAN' },
      ]},
      { key: 'reason', label: 'Purpose / Reason', type: 'textarea' },
    ],
    bodyTemplate: `I am applying for a Permanent Account Number (PAN) / Tax ID as per details below.

Applicant: {{senderName}}
Father's Name: {{fatherName}}
Date of Birth: {{dob}}
Application Type: {{applicationType}}

Purpose / Reason:
{{reason}}

All required documents including identity proof, address proof and date of birth proof are enclosed. Kindly process the application and dispatch the PAN card to the address given above.`,
  },
  {
    id: 'tax-exemption',
    title: 'Tax Exemption Application',
    icon: '💸',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'panNumber', label: 'PAN / Tax ID', type: 'text', required: true },
      { key: 'assessmentYear', label: 'Assessment / Tax Year', type: 'text', required: true },
      { key: 'exemptionType', label: 'Type of Exemption Claimed', type: 'text', required: true, placeholder: 'e.g., 80C, HRA, Donations' },
      { key: 'exemptionAmount', label: 'Exemption Amount Claimed', type: 'text' },
      { key: 'reason', label: 'Justification / Reason', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am applying for tax exemption for the assessment/tax year {{assessmentYear}} as per details below.

PAN / Tax ID: {{panNumber}}
Type of Exemption: {{exemptionType}}
Amount Claimed: {{exemptionAmount}}

Justification:
{{reason}}

All supporting documents including investment proofs and receipts are enclosed. Kindly grant the exemption as claimed.`,
  },
  {
    id: 'gst-return-filing',
    title: 'GST Return Filing Request',
    icon: '🧾',
    category: 'CA / Finance',
    fields: [
      ...senderWithContact, ...recipientFields,
      { key: 'gstin', label: 'GSTIN / Sales Tax Number', type: 'text', required: true },
      { key: 'businessName', label: 'Business Name', type: 'text', required: true },
      { key: 'returnPeriod', label: 'Return Period (Month/Quarter)', type: 'text', required: true },
      { key: 'returnType', label: 'Type of Return', type: 'text', placeholder: 'e.g., GSTR-1, GSTR-3B' },
      { key: 'remarks', label: 'Additional Remarks', type: 'textarea' },
    ],
    bodyTemplate: `I would like to engage your services for filing the GST / Sales Tax return as detailed below.

GSTIN / Tax No: {{gstin}}
Business Name: {{businessName}}
Return Period: {{returnPeriod}}
Type of Return: {{returnType}}

Remarks:
{{remarks}}

All sales/purchase invoices, expense bills and bank statements will be shared. Kindly confirm the fees and timeline for filing.`,
  },
  {
    id: 'company-registration',
    title: 'Company Registration Request',
    icon: '🏢',
    category: 'CA / Finance',
    fields: [
      ...senderWithContact, ...govtRecipientFields,
      { key: 'proposedName', label: 'Proposed Company Name', type: 'text', required: true },
      { key: 'companyType', label: 'Type of Company', type: 'select', options: [
        { label: 'Private Limited', value: 'Private Limited' },
        { label: 'Public Limited', value: 'Public Limited' },
        { label: 'LLP', value: 'LLP' },
        { label: 'OPC (One Person Company)', value: 'OPC' },
        { label: 'LLC', value: 'LLC' },
      ]},
      { key: 'registeredAddress', label: 'Registered Office Address', type: 'textarea', required: true },
      { key: 'businessActivity', label: 'Main Business Activity', type: 'textarea', required: true },
      { key: 'capital', label: 'Authorized Capital', type: 'text' },
    ],
    bodyTemplate: `I would like to apply for incorporation/registration of the company detailed below.

Proposed Name: {{proposedName}}
Type of Company: {{companyType}}
Authorized Capital: {{capital}}

Registered Office Address:
{{registeredAddress}}

Main Business Activity:
{{businessActivity}}

Kindly initiate the name approval, drafting of MOA/AOA, DSC/DIN and incorporation filings. All KYC documents of directors/promoters and address proofs will be provided as per checklist.`,
  },
  {
    id: 'msme-registration',
    title: 'MSME Registration Application',
    icon: '🏭',
    category: 'CA / Finance',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'businessName', label: 'Business / Enterprise Name', type: 'text', required: true },
      { key: 'businessAddress', label: 'Business Address', type: 'textarea', required: true },
      { key: 'enterpriseType', label: 'Type of Enterprise', type: 'select', options: [
        { label: 'Micro', value: 'Micro' },
        { label: 'Small', value: 'Small' },
        { label: 'Medium', value: 'Medium' },
      ]},
      { key: 'investment', label: 'Investment in Plant & Machinery', type: 'text' },
      { key: 'turnover', label: 'Annual Turnover', type: 'text' },
      { key: 'natureOfBusiness', label: 'Nature of Business', type: 'textarea', required: true },
    ],
    bodyTemplate: `I am applying for MSME / Small Business registration for the enterprise detailed below.

Business Name: {{businessName}}
Type of Enterprise: {{enterpriseType}}
Investment: {{investment}}
Annual Turnover: {{turnover}}

Business Address:
{{businessAddress}}

Nature of Business:
{{natureOfBusiness}}

Kindly process the registration and issue the MSME / Udyam certificate. All required documents are enclosed.`,
  },

  // ═══════════════════════════════════════════
  // POSTAL / COURIER APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'address-change-postal',
    title: 'Address Change Request',
    icon: '📮',
    category: 'Postal / Courier',
    fields: [
      ...senderWithId, ...recipientFields,
      { key: 'oldAddress', label: 'Old Address', type: 'textarea', required: true },
      { key: 'newAddress', label: 'New Address', type: 'textarea', required: true },
      { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
      { key: 'reason', label: 'Reason for Change', type: 'textarea' },
    ],
    bodyTemplate: `I would like to update my address in your postal/courier records as per details below.

Old Address:
{{oldAddress}}

New Address:
{{newAddress}}

Effective Date: {{effectiveDate}}

Reason for Change:
{{reason}}

Kindly redirect all future mail/parcels to the new address and update the records accordingly. Necessary identity and address proof documents are enclosed.`,
  },

  // ═══════════════════════════════════════════
  // STARTUP / BUSINESS APPLICATIONS
  // ═══════════════════════════════════════════
  {
    id: 'startup-registration',
    title: 'Startup Registration Request',
    icon: '🚀',
    category: 'Startup / Business',
    fields: [
      ...senderWithContact, ...govtRecipientFields,
      { key: 'startupName', label: 'Startup Name', type: 'text', required: true },
      { key: 'incorporationDate', label: 'Date of Incorporation', type: 'date' },
      { key: 'sector', label: 'Industry / Sector', type: 'text', required: true },
      { key: 'startupAddress', label: 'Registered Address', type: 'textarea', required: true },
      { key: 'productService', label: 'Product / Service Offered', type: 'textarea', required: true },
      { key: 'innovation', label: 'Innovation / Uniqueness', type: 'textarea' },
    ],
    bodyTemplate: `I would like to apply for recognition/registration as a startup for the entity detailed below.

Startup Name: {{startupName}}
Date of Incorporation: {{incorporationDate}}
Industry / Sector: {{sector}}

Registered Address:
{{startupAddress}}

Product / Service:
{{productService}}

Innovation / Uniqueness:
{{innovation}}

Kindly process the application and issue the startup recognition certificate. All required documents including incorporation proof, pitch deck and director KYC are enclosed.`,
  },
  {
    id: 'business-license',
    title: 'Business License Application',
    icon: '📋',
    category: 'Startup / Business',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'businessName', label: 'Business Name', type: 'text', required: true },
      { key: 'businessAddress', label: 'Business Address', type: 'textarea', required: true },
      { key: 'businessType', label: 'Type of Business', type: 'text', required: true },
      { key: 'natureOfActivity', label: 'Nature of Activity', type: 'textarea', required: true },
      { key: 'numberOfEmployees', label: 'Number of Employees', type: 'text' },
    ],
    bodyTemplate: `I am applying for a business license to operate the business detailed below.

Business Name: {{businessName}}
Type of Business: {{businessType}}
Number of Employees: {{numberOfEmployees}}

Business Address:
{{businessAddress}}

Nature of Activity:
{{natureOfActivity}}

Kindly process the application and grant the business license at the earliest. All KYC documents, premises proof and applicable fees are enclosed/will be paid as required.`,
  },
  {
    id: 'trade-license',
    title: 'Trade License Request',
    icon: '🏪',
    category: 'Startup / Business',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'tradeName', label: 'Trade / Shop Name', type: 'text', required: true },
      { key: 'tradeAddress', label: 'Trade Premises Address', type: 'textarea', required: true },
      { key: 'tradeCategory', label: 'Trade Category / Goods Sold', type: 'text', required: true },
      { key: 'commencementDate', label: 'Date of Commencement', type: 'date' },
      { key: 'remarks', label: 'Additional Remarks', type: 'textarea' },
    ],
    bodyTemplate: `I am applying for a trade license to carry on the trade detailed below.

Trade / Shop Name: {{tradeName}}
Trade Category: {{tradeCategory}}
Date of Commencement: {{commencementDate}}

Trade Premises Address:
{{tradeAddress}}

Remarks:
{{remarks}}

Kindly issue the trade license at the earliest. All required documents including premises ownership/rent proof and identity proof are enclosed.`,
  },
  {
    id: 'shop-act-application',
    title: 'Shop Act Application',
    icon: '🏬',
    category: 'Startup / Business',
    fields: [
      ...senderWithId, ...govtRecipientFields,
      { key: 'shopName', label: 'Shop / Establishment Name', type: 'text', required: true },
      { key: 'shopAddress', label: 'Shop Address', type: 'textarea', required: true },
      { key: 'natureOfBusiness', label: 'Nature of Business', type: 'text', required: true },
      { key: 'employees', label: 'Number of Employees', type: 'text' },
      { key: 'workingHours', label: 'Working Hours', type: 'text', placeholder: 'e.g., 10 AM - 9 PM' },
      { key: 'commencementDate', label: 'Date of Commencement', type: 'date' },
    ],
    bodyTemplate: `I am applying for registration under the Shops and Establishments Act for the establishment detailed below.

Shop Name: {{shopName}}
Nature of Business: {{natureOfBusiness}}
Number of Employees: {{employees}}
Working Hours: {{workingHours}}
Date of Commencement: {{commencementDate}}

Shop Address:
{{shopAddress}}

Kindly process the application and issue the registration certificate. All required documents and applicable fees are enclosed.`,
  },
];
