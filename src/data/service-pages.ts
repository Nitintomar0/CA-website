export type ServiceModule = {
  title: string;
  description: string;
  items?: string[];
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceFAQItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroImage: string;
  imageAlt: string;
  variant: "accounting" | "registration" | "indirect-tax" | "direct-tax" | "audit" | "risk" | "corporate";
  overview: string;
  modules: ServiceModule[];
  process: ServiceProcessStep[];
  benefits: string[];
  faq: ServiceFAQItem[];
  note?: string;
};

export const servicePages: Record<string, ServicePageData> = {
  "accounting-bookkeeping": {
    slug: "accounting-bookkeeping",
    eyebrow: "Financial operations",
    title: "Accounting & Bookkeeping Services",
    lead: "A clear, well-maintained financial record gives management the context to act with confidence.",
    heroImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Financial planning documents and calculator on a desk",
    variant: "accounting",
    overview: "Our accounting support is designed around the rhythm of your business. From routine bookkeeping and reconciliations to management reporting and payroll coordination, we help organise information into dependable records and practical financial insight. The precise scope is agreed after understanding your systems, team and reporting needs.",
    modules: [
      {
        title: "Accounting outsourcing in India",
        description: "A structured extension of your finance function for bookkeeping, reconciliations, ledger review and financial reporting. We work with the records and reporting cadence that fit your organisation.",
      },
      {
        title: "Virtual CFO services",
        description: "Senior financial perspective for owners and leadership teams that need sharper visibility over cash movement, operating performance, reporting discipline and the decisions ahead.",
      },
      {
        title: "MIS implementation & review",
        description: "Management information is most useful when it is timely and understood. We help define reporting views, review key variances and establish a clearer rhythm for management review.",
      },
      {
        title: "Payroll administration",
        description: "A dependable payroll workflow that supports employee communication, statutory deduction tracking and coordinated reporting without treating payroll as an afterthought.",
      },
    ],
    process: [
      { title: "Understand the operating rhythm", description: "Review the current records, source documents, systems and reporting priorities." },
      { title: "Agree the reporting framework", description: "Set responsibilities, review points and the information management needs." },
      { title: "Maintain & review", description: "Keep records orderly and surface the questions that need management attention." },
    ],
    benefits: [
      "Monthly payroll preparation and coordinated payroll records.",
      "Statutory deduction tracking, including Income Tax, Provident Fund and Professional Tax compliance support.",
      "Form 16 and quarterly e-TDS assistance, with TDS deposit support as scoped.",
      "Employee payroll issue resolution and reconciliation of statutory deductions.",
      "A more consistent view of the information behind financial decisions.",
    ],
    faq: [
      { question: "Can the engagement include only bookkeeping?", answer: "Yes. The work can be scoped around bookkeeping alone or expanded to include reporting, payroll coordination and management review according to your requirements." },
      { question: "What is covered by a Virtual CFO engagement?", answer: "The role is agreed around your decision-making needs. It can include financial reporting review, cash-flow visibility, management discussion and support for a more disciplined finance process." },
      { question: "Can payroll support be aligned to our existing HR process?", answer: "Yes. Before work begins, the team can map the hand-offs, attendance inputs, approvals and output requirements that are relevant to your current process." },
    ],
  },
  "company-registration": {
    slug: "company-registration",
    eyebrow: "Business formation",
    title: "Company Registration in India",
    lead: "A considered start for founders choosing the structure and compliance path that fits the venture they are building.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Contemporary office building representing business incorporation",
    variant: "registration",
    overview: "We support founders and teams in Noida and across India with a structured company-registration process. The most suitable entity depends on ownership, capital, governance, funding plans and the nature of the proposed activity. We explain the paperwork and the sequence clearly before an application is prepared.",
    modules: [
      { title: "Private limited company", description: "A familiar corporate structure for ventures seeking a separate legal entity, defined shareholding and a formal governance framework." },
      { title: "Limited liability partnership", description: "A partnership-led structure that can suit professional practices and businesses seeking operational flexibility with limited liability." },
      { title: "One person company", description: "A route for an eligible sole founder who wants a separate corporate form while operating with a single member." },
      { title: "Public limited company", description: "A broader corporate structure with distinct governance and compliance considerations that should be evaluated for the intended business model." },
      { title: "Section 8 company", description: "A not-for-profit company form for eligible charitable or social-purpose objects, subject to the applicable legal framework and approvals." },
    ],
    process: [
      { title: "Structure conversation", description: "Discuss ownership, objects, founder roles and the practical considerations that inform entity selection." },
      { title: "Name & identity preparation", description: "Prepare the required name application and obtain the relevant digital and director identification credentials." },
      { title: "Constitution documents", description: "Draft the MOA and AOA or the appropriate partnership documents for the selected form." },
      { title: "Incorporation filing", description: "Submit the incorporation application and respond to process requirements as they arise." },
      { title: "Post-incorporation direction", description: "Provide guidance for PAN, TAN, bank-account and GST registration steps where applicable." },
    ],
    benefits: [
      "MCA name approval application support.",
      "Digital Signature Certificate and Director Identification Number process support, where applicable.",
      "MOA and AOA drafting for company incorporations.",
      "Company PAN and TAN application coordination.",
      "Certificate of Incorporation follow-through, plus bank-account and GST-registration guidance where relevant.",
    ],
    faq: [
      { question: "Which entity type is right for my business?", answer: "That depends on your ownership plan, proposed activity, funding expectations and governance preferences. A consultation helps identify the relevant options without assuming one structure suits every venture." },
      { question: "Does registration include every future compliance requirement?", answer: "Registration is the starting point. Ongoing filings, tax registrations and sector-specific permissions depend on the entity and its activities, and should be separately planned." },
      { question: "Can you help if the proposed name needs to change?", answer: "If a name application requires a revised approach, the next steps can be discussed based on the applicable MCA process and the available alternatives." },
    ],
    note: "Registration requirements and approvals depend on the selected entity, proposed objects and the information provided. The applicable process is confirmed before filing.",
  },
  "indirect-tax-advisory": {
    slug: "indirect-tax-advisory",
    eyebrow: "GST consultancy",
    title: "Indirect Tax Advisory — GST Consultancy",
    lead: "Practical GST guidance that connects transactions, documentation and filing responsibilities to day-to-day operations.",
    heroImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Business professionals reviewing compliance documents",
    variant: "indirect-tax",
    overview: "Indirect-tax questions are often operational questions: how supplies are structured, what contracts say, how invoices move and whether input records support the position taken. Our work brings these threads together so that GST compliance and advisory are approached with a clearer working record.",
    modules: [
      { title: "Tax advisory", description: "Review GST implications of proposed transactions, operating models, contracts and agreements. Advice is framed around the facts available and the specific question under consideration." },
      { title: "Tax compliances", description: "Support GST registration, return preparation and filing, reconciliation of relevant information, and statutory applications as appropriate to the engagement." },
      { title: "Assessment & litigation", description: "Assist with assessment preparation, documentation review, tax representation and litigation support in coordination with the client and, where needed, legal counsel." },
      { title: "GST refund filings", description: "Help organise refund documentation, review the supporting record and prepare or assist with the applicable filing process." },
    ],
    process: [
      { title: "Map the transaction", description: "Identify the supplies, parties, agreements and documents relevant to the GST question." },
      { title: "Check the compliance record", description: "Review registrations, invoices, returns and Input Tax Credit support in the scope agreed." },
      { title: "Prepare the response", description: "Create a filing, application, representation or advisory note with the required supporting information." },
      { title: "Keep the next cycle clear", description: "Surface process improvements and record-keeping actions for the team to consider." },
    ],
    benefits: [
      "GST implication review before important commercial decisions are implemented.",
      "Contract and agreement review from an indirect-tax perspective.",
      "Input Tax Credit verification within the agreed scope of records and transactions.",
      "Support for registration, return preparation, filings and statutory applications.",
      "Assessment, representation, litigation and refund documentation support as required.",
    ],
    faq: [
      { question: "Can you review a transaction before we finalise it?", answer: "Yes. Early review can help identify the GST questions, documentation and internal information that merit attention before a commercial arrangement is finalised." },
      { question: "Is Input Tax Credit verification part of a return engagement?", answer: "The level of verification is agreed as part of the scope. A return filing process and a more detailed ITC review involve different work and should be defined clearly." },
      { question: "Can you assist with GST notices?", answer: "We can review the notice, help organise relevant documents and provide support with representations within the agreed engagement. Matters may also require coordination with legal counsel." },
    ],
  },
  "direct-tax-advisory": {
    slug: "direct-tax-advisory",
    eyebrow: "Income & international tax",
    title: "Direct Tax Advisory — Income Tax & International Taxation",
    lead: "Tax advice that is grounded in the facts, reporting responsibilities and cross-border context of the people and businesses we support.",
    heroImage: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Financial documents with calculator and pen",
    variant: "direct-tax",
    overview: "Direct-tax matters can span personal and corporate filings, advance-tax planning, assessment responses and the complexities of cross-border transactions. We help clients approach these matters with a well-organised record and a clear view of the work that needs attention.",
    modules: [
      { title: "Tax advisory & planning", description: "Practical guidance for individual and corporate income-tax considerations, with planning discussions informed by the relevant facts, records and applicable law." },
      { title: "Tax compliances", description: "Assistance with income-tax returns for individuals, companies, firms, NGOs and societies, as well as non-resident return requirements and advance-tax coordination where applicable." },
      { title: "Assessment & litigation", description: "Preparation support for assessments, notices, replies and litigation-related information, coordinated with the client and relevant advisers." },
      { title: "International taxation", description: "Support for cross-border tax questions, transfer-pricing considerations, corporate taxation and the information required for international transactions." },
      { title: "Section 195 & Form 15CA/CB", description: "Support for foreign-remittance reviews and the applicable CA certification process, based on the transaction documents and facts presented." },
    ],
    process: [
      { title: "Frame the facts", description: "Establish the taxpayer, transaction, reporting period and records that shape the question." },
      { title: "Review tax positions", description: "Examine the relevant return, withholding, advance-tax or cross-border considerations." },
      { title: "Prepare the required work", description: "Coordinate filings, certifications, replies or advisory outputs in the agreed scope." },
    ],
    benefits: [
      "A considered view across individual, business and non-resident income-tax matters.",
      "Support for advance tax, return preparation and corporate-tax compliance.",
      "Documentation-led assistance for assessments, notices and dispute-related work.",
      "International-tax and transfer-pricing considerations placed in the correct commercial context.",
      "Support for foreign remittances and applicable Form 15CA/15CB certification processes.",
    ],
    faq: [
      { question: "Can you support both personal and company returns?", answer: "Yes. The engagement can cover individual and entity-level tax compliance, with the exact returns, records and responsibilities agreed in advance." },
      { question: "When should a cross-border payment be reviewed?", answer: "It is prudent to review the documents and tax considerations before a remittance is initiated, particularly where withholding or certification questions may arise." },
      { question: "Do you provide litigation support?", answer: "We assist with preparing records, factual submissions and tax working papers. The appropriate approach for a matter may also involve coordination with legal counsel." },
    ],
    note: "Tax positions and certification requirements depend on current law and the complete facts of each matter. Advice is provided after reviewing the relevant documentation.",
  },
  "auditing-assurance": {
    slug: "auditing-assurance",
    eyebrow: "Audit & assurance",
    title: "Auditing & Assurance Services",
    lead: "A disciplined review process that helps bring structure, evidence and useful perspective to financial and operational information.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Professional reviewing financial report at a desk",
    variant: "audit",
    overview: "Audit work is most valuable when it is well-planned, evidence-led and communicated clearly. We support organisations with statutory, tax, internal, management and special-purpose audit work, with the precise applicability and scope established before the engagement begins.",
    modules: [
      { title: "Statutory audit", description: "Financial-statement audit work undertaken according to the applicable reporting and regulatory framework for the entity and engagement." },
      { title: "Tax audit", description: "Support for the tax-audit process, including information preparation and reporting work where the relevant provisions apply." },
      { title: "Internal audit", description: "Risk-focused review of internal processes, controls and operating practices to identify areas that merit management attention." },
      { title: "Management audit", description: "An operational lens on decision processes, management practices and the information used to guide performance." },
      { title: "Special purpose & forensic audits", description: "Focused review assignments, including forensic examination support, designed around a defined purpose, records and terms of reference." },
    ],
    process: [
      { title: "Plan the review", description: "Clarify objectives, material areas, records, timelines and the engagement framework." },
      { title: "Examine the evidence", description: "Review documents, reconciliations, controls and explanations relevant to the audit scope." },
      { title: "Discuss observations", description: "Share significant matters with management so factual context can be considered." },
      { title: "Report with clarity", description: "Deliver the agreed audit output and practical observations for the next stage of action." },
    ],
    benefits: [
      "Structured review of financial records and relevant internal controls.",
      "An evidence-led process with clearly defined scope and documentation needs.",
      "Practical observations that can support process improvement discussions.",
      "Support across statutory, tax, internal, management and special-purpose assignments.",
      "A clear audit trail for the work agreed with the organisation.",
    ],
    faq: [
      { question: "How do you determine audit scope?", answer: "The scope is based on the engagement type, relevant requirements, material areas and the records available. It is documented before substantive work begins." },
      { question: "Can internal audit cover a specific process?", answer: "Yes. Internal audit work can be designed around a focused process, location, control environment or risk question where that is the most useful approach." },
      { question: "Are forensic assignments the same as statutory audit?", answer: "No. A forensic or special-purpose review has a defined objective and terms of reference that differ from an audit of financial statements." },
    ],
  },
  "risk-business-advisory": {
    slug: "risk-business-advisory",
    eyebrow: "Strategic risk & growth",
    title: "Risk Advisory & Business Advisory Services",
    lead: "A proactive way to see operating risk, improve the systems behind decisions and put business information to work.",
    heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Business team collaborating in a strategic workshop",
    variant: "risk",
    overview: "Risk management is not only about finding what went wrong. It is about understanding how people, information and controls work together before issues become costly. Our advisory work connects risk-based review, process improvement and business-performance thinking to the realities of management decisions.",
    modules: [
      { title: "Internal audits & control review", description: "Risk-based review of internal controls, process adherence and areas where the operating model may benefit from greater visibility or consistency." },
      { title: "SOP development & review", description: "Design or refresh standard operating procedures so essential tasks, approvals, documentation and ownership are easier to understand and follow." },
      { title: "Enterprise & fraud risk management", description: "Support with enterprise-risk mapping, fraud-risk assessment, control gaps and the priorities that management may need to address." },
      { title: "Process improvement & cost control", description: "Use process observations and financial information to examine bottlenecks, cost drivers, working capital and opportunities for improvement." },
      { title: "Investigations & decision support", description: "Forensic accounting support, transaction tracing, investigation reporting and performance diagnostics for matters requiring a careful evidence-led approach." },
    ],
    process: [
      { title: "See the operating picture", description: "Understand the process, decision owners, data flows and business priorities." },
      { title: "Find the pressure points", description: "Identify control gaps, risk exposures, performance questions and areas for deeper review." },
      { title: "Build a practical response", description: "Prioritise actions, SOPs, controls or analysis that can support better execution." },
      { title: "Measure what changes", description: "Support management with clear follow-through and business-performance information." },
    ],
    benefits: [
      "A proactive, risk-based perspective rather than a purely reactive review.",
      "Internal-control reviews and SOP development tailored to operational reality.",
      "Enterprise and fraud-risk assessments that highlight areas requiring attention.",
      "Process improvement, working-capital and profitability analysis for management discussion.",
      "Forensic accounting, transaction tracing and investigation reporting support when required.",
    ],
    faq: [
      { question: "Is risk advisory only for large organisations?", answer: "No. The scale and complexity of the work can be adapted to the business. The aim is to focus attention on the processes and decisions that matter most." },
      { question: "Can you develop SOPs from scratch?", answer: "Yes. The work can begin with process conversations and observation, then translate the agreed workflow, controls and ownership into useful operating documents." },
      { question: "What happens in a forensic review?", answer: "The scope and terms of reference are defined first. The work may include document review, transaction tracing and a factual report based on the evidence examined." },
    ],
  },
  "corporate-secretarial": {
    slug: "corporate-secretarial",
    eyebrow: "Governance & FEMA",
    title: "Corporate, Secretarial & FEMA Compliance Services",
    lead: "Clear, organised support for the records, filings and governance processes that sit behind a well-run company.",
    heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88",
    imageAlt: "Professional corporate office interior",
    variant: "corporate",
    overview: "Corporate compliance needs disciplined records and a reliable process for change. We support companies through incorporation, ROC work, board and shareholder documentation, director compliance, share transactions, closure matters and FEMA-related questions, with the required filings and approvals evaluated for the facts of each case.",
    modules: [
      { title: "Incorporation & company structuring", description: "Support with company formation and structuring considerations, including the core records and governance documents that establish the organisation." },
      { title: "ROC filings & annual compliance", description: "Assistance with ROC forms, annual filing processes and the supporting information required for Companies Act compliance." },
      { title: "Board, shareholder & statutory records", description: "Prepare or support notices, agendas, resolutions and minutes, alongside statutory registers and records that require ongoing attention." },
      { title: "Corporate changes & closure", description: "Support for director appointments or resignations, Director KYC and DIN compliance, share transactions, corporate changes and closure or winding-up processes." },
      { title: "FEMA, FDI & RBI consultation", description: "Guidance and documentation support for FEMA advisory, FDI reporting, FC-GPR, FC-TRS, foreign-company office registration, RBI approvals, compounding applications, ECB and foreign-remittance compliance." },
    ],
    process: [
      { title: "Review the corporate record", description: "Understand the company structure, current filings, records and proposed action." },
      { title: "Prepare the governance trail", description: "Organise resolutions, supporting documents, registers and approvals relevant to the matter." },
      { title: "Coordinate filings & responses", description: "Assist with ROC, FEMA or RBI-related submissions as applicable to the facts and scope." },
      { title: "Maintain the compliance view", description: "Identify recurring records and future actions that management should keep visible." },
    ],
    benefits: [
      "A more organised approach to Companies Act and ROC compliance records.",
      "Support for notices, agendas, resolutions, minutes and statutory registers.",
      "Help with Director KYC, DIN compliance, appointments, resignations and share transactions.",
      "Structured support for FDI reporting, FC-GPR, FC-TRS, ECB and foreign-remittance matters.",
      "Clear coordination around RBI approvals, consultations and applicable compounding processes.",
    ],
    faq: [
      { question: "Can you assist with ongoing ROC compliance?", answer: "Yes. Ongoing support can be scoped around annual filings, event-based forms and the corporate records that need to be maintained through the year." },
      { question: "When should FEMA or FDI advice be sought?", answer: "It is best to seek advice before a cross-border investment, share transfer, remittance or structural change is executed so that the documentation and reporting path can be assessed." },
      { question: "Can you support a director change or share transaction?", answer: "We can help identify the relevant corporate documents, filings and compliance steps, based on the transaction and the company’s records." },
    ],
    note: "Corporate, FEMA and RBI-related obligations depend on the entity, transaction and applicable regulations. The required filing or approval path is confirmed after review.",
  },
};
