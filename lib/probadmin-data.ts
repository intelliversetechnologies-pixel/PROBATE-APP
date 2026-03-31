import {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Landmark,
  Scale,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react'

export const probateStats = [
  {
    label: 'Active Probate Files',
    value: '48',
    note: 'Across intake, court, KYC, and transmission desks',
    icon: FileCheck2,
    color: 'bg-blue-50 text-blue-700',
  },
  {
    label: 'Alleged Deceased Requests',
    value: '11',
    note: 'Awaiting codification or account numbering on Estock',
    icon: Clock3,
    color: 'bg-amber-50 text-amber-700',
  },
  {
    label: 'Ready For Final Transmission',
    value: '7',
    note: 'Approved by bank, court, KYC, and compliance',
    icon: CheckCircle2,
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Exceptions Requiring Feedback',
    value: '5',
    note: 'Returned with reasons to client, proxy, or internal owner',
    icon: AlertTriangle,
    color: 'bg-rose-50 text-rose-700',
  },
]

export const workflowSteps = [
  { name: 'Client / Proxy Intake', completed: 48 },
  { name: 'Alleged Deceased / Codification', completed: 36 },
  { name: 'Bank Confirmation', completed: 29 },
  { name: 'Lawyer / Court Reconfirmation', completed: 21 },
  { name: 'KYC & Address Verification', completed: 18 },
  { name: 'Compliance & Final Transmission', completed: 12 },
]

export const stakeholderQueues = [
  {
    title: 'Bank Confirmation Queue',
    owner: 'BC Central Admin',
    count: 6,
    detail: 'OTP approval pending from higher bank officers',
    icon: Building2,
  },
  {
    title: 'Court / Lawyer Queue',
    owner: 'External Legal Stakeholders',
    count: 4,
    detail: 'Awaiting stamped LA / Will confirmation uploads',
    icon: Scale,
  },
  {
    title: 'KYC Queue',
    owner: 'Integrated KYC Environment',
    count: 9,
    detail: 'Identity, address, and personality verification in progress',
    icon: UserRoundCheck,
  },
  {
    title: 'Compliance Queue',
    owner: 'FRISOPS Compliance',
    count: 3,
    detail: 'Estock / EDAS validation before final approval',
    icon: ShieldCheck,
  },
]

export const probateCases = [
  {
    id: 'PHC/B20026/FRISLPB/100007',
    deceased: 'Late Chief Emmanuel Adeyemi',
    requestType: 'Letters of Administration',
    intakeChannel: 'Onsite Visit',
    gateway: 'FRISOPS DCP',
    proxyType: 'Law Firm',
    proxyName: 'Adewale & Co. Chambers',
    clientLead: 'Mrs. Bola Adeyemi',
    nin: '22345678901',
    dateCreated: '2026-03-04',
    dateOfDeath: '2025-11-18',
    status: 'Awaiting Court Confirmation',
    stage: 'Lawyer and court reconfirmation',
    progress: 62,
    bankStatus: 'Approved',
    courtStatus: 'Pending',
    kycStatus: 'Queued',
    complianceStatus: 'Not Started',
    paymentStatus: 'Paid',
    estateValue: 'NGN 18,400,000',
    codified: true,
    allegedDeceasedLinked: true,
    requiredMeeting: 'Physical with biometrics',
    nextAction: 'Law firm to upload court-stamped confirmation page',
  },
  {
    id: 'LAG/PB/FRISLPB/100014',
    deceased: 'Late Mrs. Comfort Nwosu',
    requestType: 'Alleged Deceased',
    intakeChannel: 'Legal Firm',
    gateway: 'Probadmin Portal',
    proxyType: 'Law Firm',
    proxyName: 'Nwosu Legal Advisory',
    clientLead: 'Mr. Samuel Nwosu',
    nin: '33456789012',
    dateCreated: '2026-03-09',
    dateOfDeath: '2026-01-08',
    status: 'Awaiting Codification',
    stage: 'Generate unique code and bind account numbers',
    progress: 24,
    bankStatus: 'Not Triggered',
    courtStatus: 'Not Triggered',
    kycStatus: 'NIN auto-verifying',
    complianceStatus: 'Not Started',
    paymentStatus: 'Estimate Shared',
    estateValue: 'NGN 6,200,000',
    codified: false,
    allegedDeceasedLinked: false,
    requiredMeeting: 'Pending scheduling',
    nextAction: 'Probadmin officer to generate code and attach required transmission checklist',
  },
  {
    id: 'ABJ/CV/FRISLPB/100021',
    deceased: 'Late Dr. Amina Bello',
    requestType: 'Will Processing',
    intakeChannel: 'Online Portal',
    gateway: 'FRISL Website',
    proxyType: 'Self / Executors',
    proxyName: 'Executor Group',
    clientLead: 'Mr. Yusuf Bello',
    nin: '44567890123',
    dateCreated: '2026-02-28',
    dateOfDeath: '2025-12-12',
    status: 'Compliance Review',
    stage: 'Compliance validating Estock and EDAS after KYC',
    progress: 83,
    bankStatus: 'Approved',
    courtStatus: 'Approved',
    kycStatus: 'Passed',
    complianceStatus: 'In Review',
    paymentStatus: 'Paid',
    estateValue: 'NGN 42,000,000',
    codified: true,
    allegedDeceasedLinked: true,
    requiredMeeting: 'Virtual video session archived',
    nextAction: 'Compliance to approve or request clarification meeting',
  },
  {
    id: 'PHC/STB/FRISLPB/100033',
    deceased: 'Late Engr. Nkem Opara',
    requestType: 'Transmission via Stockbroker',
    intakeChannel: 'Stockbroker Onsite',
    gateway: 'Stockbroker Module',
    proxyType: 'Stockbroker',
    proxyName: 'Meridian Securities',
    clientLead: 'Mrs. Ifunanya Opara',
    nin: '55678901234',
    dateCreated: '2026-03-11',
    dateOfDeath: '2026-02-02',
    status: 'Pending Bank OTP Approval',
    stage: 'Bank compliance confirming banker signature',
    progress: 47,
    bankStatus: 'Higher Officer OTP Pending',
    courtStatus: 'Not Triggered',
    kycStatus: 'Not Started',
    complianceStatus: 'Not Started',
    paymentStatus: 'Payment Link Sent',
    estateValue: 'NGN 11,750,000',
    codified: true,
    allegedDeceasedLinked: true,
    requiredMeeting: 'Physical',
    nextAction: 'Bank preset approving officer to confirm signature and attach watermark',
  },
]

export const requiredDocumentPack = [
  'Bank certificate / alleged deceased form',
  'Court-issued control reference and probate tracking number',
  'Death certificate',
  'Letters of Administration or Will',
  'NIN / NIN slip for administrators, executors, and approved proxies',
  'Proxy authorization letter from stockbroker or law firm where applicable',
  'E-dividend form',
  'CSCS / dematerialization form where transmission requires it',
  'Relationship / interaction evidence when requested',
]

export const documentRegister = [
  {
    id: 1,
    caseId: 'PHC/B20026/FRISLPB/100007',
    name: 'Letters of Administration - Court Certified Copy',
    category: 'Probate Core',
    owner: 'Law Firm',
    uploadDate: '2026-03-07',
    status: 'Awaiting Court Feedback',
    watermark: 'view-only until court confirms',
  },
  {
    id: 2,
    caseId: 'PHC/B20026/FRISLPB/100007',
    name: 'Banker Confirmation Signature Page',
    category: 'Bank Confirmation',
    owner: 'BC Central Admin',
    uploadDate: '2026-03-10',
    status: 'Approved',
    watermark: 'approved by bank',
  },
  {
    id: 3,
    caseId: 'LAG/PB/FRISLPB/100014',
    name: 'Alleged Deceased Intake Form',
    category: 'Intake',
    owner: 'FRISOPS DCP',
    uploadDate: '2026-03-09',
    status: 'Needs Codification',
    watermark: 'pending account numbering',
  },
  {
    id: 4,
    caseId: 'ABJ/CV/FRISLPB/100021',
    name: 'KYC Address Verification Result',
    category: 'KYC',
    owner: 'KYC Team',
    uploadDate: '2026-03-06',
    status: 'Approved',
    watermark: 'ok',
  },
  {
    id: 5,
    caseId: 'PHC/STB/FRISLPB/100033',
    name: 'Stockbroker Authority Letter and ID',
    category: 'Proxy',
    owner: 'Meridian Securities',
    uploadDate: '2026-03-12',
    status: 'Under Review',
    watermark: 'pending proxy validation',
  },
]

export const approvalRequests = [
  {
    id: 1,
    caseId: 'PHC/B20026/FRISLPB/100007',
    type: 'Lawyer Reconfirmation',
    owner: 'Adewale & Co. Chambers',
    status: 'Pending',
    trigger: 'LA document sent for reconfirmation and court stamping',
    submittedDate: '2026-03-12',
  },
  {
    id: 2,
    caseId: 'PHC/STB/FRISLPB/100033',
    type: 'Bank OTP Approval',
    owner: 'Partner Bank Higher Officer',
    status: 'In Progress',
    trigger: 'Executor signature verified by bank compliance, waiting OTP',
    submittedDate: '2026-03-14',
  },
  {
    id: 3,
    caseId: 'ABJ/CV/FRISLPB/100021',
    type: 'Final Transmission Approval',
    owner: 'FRISL Higher Officer',
    status: 'Queued',
    trigger: 'Compliance has almost completed Estock / EDAS checks',
    submittedDate: '2026-03-16',
  },
]

export const complianceChecks = [
  {
    id: 1,
    caseId: 'ABJ/CV/FRISLPB/100021',
    checkType: 'EDAS and Estock compilation check',
    status: 'In Review',
    owner: 'Compliance Desk',
    lastChecked: '2026-03-18',
    note: 'Reviewing document pack against transmission instructions and control code',
  },
  {
    id: 2,
    caseId: 'PHC/B20026/FRISLPB/100007',
    checkType: 'Approved proxy and stakeholder governance check',
    status: 'Passed',
    owner: 'Probadmin Governance Engine',
    lastChecked: '2026-03-13',
    note: 'Law firm authority letter and NIN matched approved proxy records',
  },
  {
    id: 3,
    caseId: 'PHC/STB/FRISLPB/100033',
    checkType: 'E-dividend and CSCS mandatory forms',
    status: 'Attention Required',
    owner: 'Client Services Integration',
    lastChecked: '2026-03-15',
    note: 'CSCS form missing witness endorsement before final handoff',
  },
  {
    id: 4,
    caseId: 'LAG/PB/FRISLPB/100014',
    checkType: 'Codification lock and duplicate engagement scan',
    status: 'Pending',
    owner: 'Probadmin Officer',
    lastChecked: '2026-03-17',
    note: 'No duplicate alleged-deceased mark found, awaiting code generation',
  },
]

export const kycCases = [
  {
    id: 'PHC/B20026/FRISLPB/100007',
    deceased: 'Late Chief Emmanuel Adeyemi',
    claimant: 'Mrs. Bola Adeyemi',
    nin: '22345678901',
    status: 'Queued',
    identity: 'Passed',
    address: 'Pending',
    personality: 'Pending',
    verifiedBy: 'KYC Queue',
    verificationDate: '2026-03-18',
    note: 'Do not disclose field visit date to client or proxy',
  },
  {
    id: 'ABJ/CV/FRISLPB/100021',
    deceased: 'Late Dr. Amina Bello',
    claimant: 'Mr. Yusuf Bello',
    nin: '44567890123',
    status: 'Passed',
    identity: 'Passed',
    address: 'Passed',
    personality: 'Passed',
    verifiedBy: 'KYC Officer Hauwa Musa',
    verificationDate: '2026-03-15',
    note: 'Ready for compliance final review',
  },
  {
    id: 'PHC/STB/FRISLPB/100033',
    deceased: 'Late Engr. Nkem Opara',
    claimant: 'Mrs. Ifunanya Opara',
    nin: '55678901234',
    status: 'Blocked',
    identity: 'Passed',
    address: 'Failed',
    personality: 'Pending',
    verifiedBy: 'KYC Officer Daniel Obi',
    verificationDate: '2026-03-14',
    note: 'Address documents inconsistent with submitted proxy narrative',
  },
]

export const invoices = [
  {
    id: 'INV-PB-100007',
    caseId: 'PHC/B20026/FRISLPB/100007',
    title: 'Probadmin statutory fee and management fee',
    amount: 'NGN 97,500',
    status: 'Paid',
    channel: 'Paystack',
    issuedDate: '2026-03-08',
    note: 'Tied to control code and visible to finance, probate, and client dashboards',
  },
  {
    id: 'INV-PB-100014',
    caseId: 'LAG/PB/FRISLPB/100014',
    title: 'Alleged deceased preparation estimate',
    amount: 'NGN 18,000',
    status: 'Estimate Shared',
    channel: 'Portal estimate',
    issuedDate: '2026-03-09',
    note: 'Client informed amount may be recalculated at payment time based on stock value',
  },
  {
    id: 'INV-KYC-100021',
    caseId: 'ABJ/CV/FRISLPB/100021',
    title: 'KYC verification invoice',
    amount: 'NGN 14,500',
    status: 'Posted To Finance',
    channel: 'Internal charge',
    issuedDate: '2026-03-12',
    note: 'Live payment not required before KYC action continues',
  },
]

export const payments = [
  {
    id: 'TXN-PB-001',
    invoiceId: 'INV-PB-100007',
    amount: 'NGN 97,500',
    method: 'Paystack',
    reference: 'PSTK-20260308-2231',
    date: '2026-03-08',
    status: 'Receipt forwarded to finance and probate communities',
  },
  {
    id: 'TXN-PB-002',
    invoiceId: 'INV-PB-100033',
    amount: 'NGN 52,000',
    method: 'Finance counter upload',
    reference: 'FIN-20260314-009',
    date: '2026-03-14',
    status: 'Physical receipt uploaded by DCP',
  },
]

export const caseDetail = {
  id: 'PHC/B20026/FRISLPB/100007',
  deceasedName: 'Late Chief Emmanuel Adeyemi',
  requestType: 'Letters of Administration',
  intakeChannel: 'Onsite visit through FRISOPS DCP',
  proxy: 'Adewale & Co. Chambers acting for Mrs. Bola Adeyemi',
  courtReference: 'PHC/B20026',
  dateOfDeath: '2025-11-18',
  dateCreated: '2026-03-04',
  status: 'Awaiting Court Confirmation',
  progress: 62,
  codificationStatus: 'Codified and linked to alleged deceased account marker',
  nextAction: 'Receive lawyer or court confirmation so KYC and compliance can continue',
  documents: [
    { name: 'Bank certificate / alleged deceased form', status: 'Bound to control code', uploadDate: '2026-03-04' },
    { name: 'Letters of Administration', status: 'Sent to lawyer', uploadDate: '2026-03-07' },
    { name: 'Proxy authority letter and IDs', status: 'Approved', uploadDate: '2026-03-05' },
    { name: 'Payment receipt', status: 'Shared to finance and probate communities', uploadDate: '2026-03-08' },
  ],
  stakeholders: [
    { stage: 'DCP Intake and codification', status: 'Completed', owner: 'FRISOPS Treatment Officer', date: '2026-03-04' },
    { stage: 'Bank confirmation', status: 'Completed', owner: 'Bank higher officer via OTP', date: '2026-03-10' },
    { stage: 'Lawyer / court reconfirmation', status: 'In Progress', owner: 'Adewale & Co. Chambers', date: '2026-03-18' },
    { stage: 'KYC verification', status: 'Queued', owner: 'Integrated KYC Desk', date: null },
    { stage: 'Compliance and final transmission', status: 'Pending', owner: 'FRISL higher officer', date: null },
  ],
  timeline: [
    { action: 'Client intake completed with approved proxy details and NIN captured', date: '2026-03-04', actor: 'FRISOPS DCP' },
    { action: 'Unique control code generated and linked to account numbering workflow', date: '2026-03-04', actor: 'Probadmin Officer' },
    { action: 'Payment instructions and meeting notice sent to client and proxy', date: '2026-03-08', actor: 'Probate Desk' },
    { action: 'Bank confirmation returned OK with higher-officer OTP approval', date: '2026-03-10', actor: 'BC Central Admin' },
    { action: 'LA documents forwarded to lawyer for court reconfirmation', date: '2026-03-12', actor: 'Probate Desk' },
  ],
}

export const workflowGuardrails = [
  'Only approved proxies receive status feedback; courier or unauthorized third parties do not.',
  'KPI, audit, and feedback engines run for every action taken by humans or integrations.',
  'Signing and approval limits are role-based and can be bypassed only by super admin or HOD where justified.',
  'Meeting evidence may be physical, virtual, audio-visual, or biometric depending on the workflow stage.',
]

export const paymentChannels = [
  { label: 'Paystack / Remita', description: 'For statutory fees, management fees, and live payment links' },
  { label: 'Finance Counter Upload', description: 'For physical receipts uploaded back into the document file' },
  { label: 'Internal KYC Invoice', description: 'Raised to finance while KYC continues without waiting for live payment' },
]

export const overviewIcons = {
  bank: Landmark,
  legal: Scale,
  payment: Banknote,
  approval: BadgeCheck,
}

export const registrarFormSections = [
  {
    id: 'letters-of-administration',
    code: 'A',
    title: 'Registration of Letter of Administration/Probate',
    items: [
      'Two photocopies of Letters of Administration / Probate and the original for sighting.',
      'Two photocopies of death certificate and the original for sighting.',
      "Original banker’s confirmation of the Administrator(s) / Executor(s) signature. The banker’s confirmation should state the date the account was opened, bank account number(s), and be issued on a banker’s letterhead or signed printout with the signatory’s photograph and phone number.",
      'Completed request letter and one sealed copy of Letters of Administration / Probate.',
      'Original share certificate(s) / dividend warrant(s) for endorsement.',
      'Photocopy of gazette / newspaper publication.',
      'Physical presence of the administrator(s) / executor(s) with valid means of identification in our office.',
    ],
  },
  {
    id: 'change-of-name-marriage',
    code: 'B',
    title: 'Registration of Change of Name',
    items: [
      'Photocopy of marriage certificate and original for sighting.',
      'Original copy of sworn affidavit to the change of name.',
      "Original banker’s confirmation of your signature signed by two authorised bank signatories. The banker’s confirmation should state the date the account was opened, bank account number(s), and be issued on a banker’s letterhead or signed printout with the signatory’s photograph and phone number.",
      'Original share certificate(s) / dividend warrant(s) for endorsement.',
      'Newspaper publication.',
      'Valid means of identification.',
    ],
  },
  {
    id: 'company-change-of-name',
    code: 'C',
    title: 'Registration of Change of Name of Company',
    items: [
      'Photocopy of certificate of incorporation and original for sighting.',
      'Covering letter signed by two authorised officers.',
      'Any other relevant document.',
    ],
  },
] as const

export const transmissionRequirementSections = [
  {
    id: 'legal-documents',
    code: 'A',
    title: 'Legal Documents',
    items: [
      'Two photocopies of Letters of Administration / Probate and original for sighting.',
      'Two photocopies of death certificate and original for sighting.',
    ],
  },
  {
    id: 'bankers-confirmation',
    code: 'B',
    title: "Banker's Confirmation",
    items: [
      'Signed by two authorised bank officials.',
      'Account number must be clearly stated.',
      'Date account was opened must be included.',
      'Endorsed passport photograph must be attached.',
      'Disclaimer clauses are not acceptable.',
    ],
  },
  {
    id: 'other-requirements',
    code: 'C',
    title: 'Other Requirements',
    items: [
      'Completed transmission request form.',
      'Original share certificates / dividend warrants.',
      'Evidence of newspaper / gazette publication.',
      'Valid ID and physical presence of administrators.',
    ],
  },
] as const

export const transmissionFeeItems = [
  '1% (below N5,000,000)',
  '0.5% (above N5,000,000)',
  '7.5% VAT',
  'N12,000 LA Confirmation Fee',
] as const

export const premiumTransmissionSupport = [
  'Assistance in handling third-party documentation formalities.',
  'Assistance with Letters of Administration confirmation.',
  'Support with regularising share certificates after the LA process.',
  'Hands-on follow-up for dividend processing.',
  'Periodic updates on processing status through our e-notice platforms.',
] as const

export const premiumAdditionalSupport = [
  'Preparation of basic documentation such as affidavits, powers of attorney, and related support papers.',
  'General guidance on documentation requirements.',
  'Assistance with processing death certificate requests through the National Population Commission where required.',
] as const

export const premiumFinancingConditions = [
  'Client must authorise deduction of applicable costs from dividend proceeds.',
  'Where dividends are insufficient, recovery may be made from sale of shares.',
  'Terms shall be documented prior to commencement.',
] as const

export const premiumServiceFeeTerms = [
  'Service fee: 5% of total holding (negotiable).',
  'Applicable VAT applies.',
] as const

export const letterOfRequestDeclaration = [
  'I/We hereby declare that I/we am/are not Nigerian citizen(s) association within the meaning of the Nigeria Enterprises Promotion Decree 1972.',
  'I/We hereby declare that I/we am/are Nigerian citizen(s) association within the meaning of the Nigeria Enterprises Promotion Decree 1972 and that I/We am/are not acquiring the shares the subject of the transfer and the nominee of any person who is not a Nigerian citizen or association within the meaning of the said Decree.',
  'In consideration of this transfer being accepted by the Directors for registration, I/we undertake to advise the Directors forthwith upon my/our any one of us or any person for whom I/We am/are a nominee in respect of the said shares to be a Nigerian citizen(s) or association.',
] as const
