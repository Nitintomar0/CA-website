export const newsCategories = [
  "All Updates",
  "Taxation",
  "GST",
  "Audit & Assurance",
  "Corporate Law",
  "Business Advisory",
  "Industry Updates",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type NewsArticle = {
  slug: string;
  title: string;
  category: Exclude<NewsCategory, "All Updates">;
  publishedAt?: string;
  excerpt: string;
  content: NewsBlock[];
  coverImage: string;
  imageAlt: string;
  readingTime?: number;
  featured?: boolean;
  isPublished: boolean;
  sources?: { label: string; href: string }[];
};

/*
 * Only approved, published editorial content belongs in this list. It is
 * deliberately empty until firm-authored content and publication information
 * are supplied. Drafts may use `isPublished: false`; public views consume the
 * filtered helpers below and will never display them.
 */
export const newsArticles: NewsArticle[] = [
  {
    slug: "nri-finance-income-tax-rules-before-leaving-india",
    title: "NRI to Know Finance and Income Tax Rules Before Leaving India",
    category: "Taxation",
    excerpt:
      "Leaving India permanently or for an extended period involves important income-tax, banking and FEMA considerations. Understand your residential status, Indian-source income, tax obligations and essential financial steps before moving abroad.",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Financial documents and accounting paperwork on a desk",
    featured: true,
    isPublished: true,

    content: [
      {
        type: "paragraph",
        text:
          "Leaving India whether permanently or for a long period abroad brings many challenges. Among the most important are your obligations under Indian Income Tax and foreign exchange laws. Failing to understand these can lead to unexpected tax demand and penalties, difficulties with your investments, bank accounts, or legal compliance. Use this checklist to make sure you cover everything and get answers to questions like “What are NRI taxation rules before leaving India?”, “What are the financial checklist for Indians moving abroad?” and “What are the FEMA rules for NRIs?”",
      },

      {
        type: "heading",
        level: 2,
        text: "What This Post Covers",
      },
      {
        type: "list",
        items: [
          "How your residential status is determined, and why it matters.",
          "What income remains taxable in India when abroad.",
          "Key compliance steps covering bank accounts, PAN/Aadhaar and investment status.",
          "Double taxation and tax treaties.",
          "FEMA and RBI rules.",
          "What to do in the exit year.",
        ],
      },

      {
        type: "heading",
        level: 2,
        text: "1. Residential Status: What It Means, and How to Determine It",
      },
      {
        type: "paragraph",
        text:
          "Why this matters: Your residential status under Section 6 of the Income-Tax Act affects which income is taxable in India and how much tax you must pay.",
      },
      {
        type: "heading",
        level: 3,
        text: "Categories under Indian Law",
      },
      {
        type: "list",
        items: [
          "Resident.",
          "Resident but Not Ordinarily Resident (RNOR).",
          "Non-Resident (NRI).",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "How Rules Work (Section 6, Income-Tax Act)",
      },
      {
        type: "paragraph",
        text: "Some key criteria:",
      },
      {
        type: "list",
        items: [
          "If you stay in India 182 days or more in the previous financial year, you are a resident.",
          "Alternatively, if you stay 60 days or more in that year and 365 days or more during the 4 immediately preceding years.",
          "But for Indian citizens or persons of Indian origin with income (other than foreign sources) greater than ₹15 lakh, the “60 days + 4 years” rule is relaxed: the period of 60 days is replaced by 120 days.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Special Cases",
      },
      {
        type: "list",
        items: [
          "If you leave as crew of an Indian ship or for employment outside India.",
          "The concept of deemed resident if certain income thresholds are exceeded and conditions are met.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Why It Matters",
      },
      {
        type: "list",
        items: [
          "A resident is taxed on global income (income earned in India + outside India) unless specific exemptions apply.",
          "An NRI is taxed only on income earned or received in India.",
          "An RNOR has an intermediate position: some foreign income may be taxable depending on how and where it was earned.",
        ],
      },
      {
        type: "paragraph",
        text:
          "For instance, suppose you were an Indian resident in FY 2025 and during FY 2026 you stay in India for 190 days before leaving abroad for employment. In this situation, you will still be treated as a Resident in India (since your stay exceeds 182 days). As a result, both your Indian and foreign income will be taxable in India.",
      },
      {
        type: "paragraph",
        text:
          "Ideally, you should plan your date of departure in such a way that you qualify as an NRI in that year. This ensures that only your Indian-sourced income is taxed in India, while your foreign salary remains taxable abroad. Otherwise, you can still claim relief under the Double Taxation Avoidance Agreement (DTAA) by filing Form 67 to claim foreign tax credit. However, this increases compliance requirements unnecessarily.",
      },

      {
        type: "heading",
        level: 2,
        text: "2. Income Still Taxable After Leaving",
      },
      {
        type: "paragraph",
        text:
          "Even after you become an NRI, you’ll often have Indian-sourced income that remains taxable. These may include:",
      },
      {
        type: "list",
        items: [
          "Rental income from property located in India.",
          "Interest on deposits in India, especially from NRO accounts.",
          "Dividends from Indian companies.",
          "Capital gains on sale of shares, property etc. in India.",
          "Salary (if employment was in India or for services rendered in India).",
        ],
      },
      {
        type: "paragraph",
        text:
          "You must continue filing income tax returns in India if your Indian income exceeds the basic exemption limit or there is another requirement (e.g. to claim a refund of TDS etc.).",
      },
      {
        type: "paragraph",
        text:
          "It is recommendation to show the interest earned from NRE Deposits in ITR as Exempt Income in Schedule EI.",
      },

      {
        type: "heading",
        level: 2,
        text: "3. Double Taxation Avoidance Agreement (DTAA)",
      },
      {
        type: "paragraph",
        text:
          "If you relocate abroad, you may get taxed in both the country you reside in and in India. DTAA treaties help avoid or reduce double taxation.",
      },
      {
        type: "heading",
        level: 3,
        text: "What DTAA Offers",
      },
      {
        type: "list",
        items: [
          "Reduced withholding tax rates on income such as interest, dividends, royalties etc.",
          "Credit for tax paid abroad against tax liability in India.",
          "Rules to decide which country taxes what kind of income (source vs residence).",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Finding the DTAA",
      },
      {
        type: "paragraph",
        text:
          "The Government of India maintains a list of DTAA treaties. Also check bilateral treaties if you know your destination country.",
      },
      {
        type: "paragraph",
        text:
          "Example: India-USA DTAA: many NRIs use the US treaty to minimize double tax.",
      },

      {
        type: "heading",
        level: 2,
        text: "4. Bank Accounts, Investments & Financial Instruments",
      },
      {
        type: "paragraph",
        text: "Before leaving, you’ll need to do some housekeeping:",
      },
      {
        type: "list",
        items: [
          "Convert your domestic savings accounts: resident ordinary savings must be converted to NRO (Non-Resident Ordinary) when you become an NRI. You may also open an NRE (Non-Resident External) account for your foreign earnings to be remitted into India.",
          "Inform your bank and financial institutions of your change in residential status.",
          "Update brokers, mutual funds and insurance policies about your NRI status. Some investments (e.g. PPF, NSC, etc.) may have restrictions for NRIs.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Consequences of NOT Converting",
      },
      {
        type: "heading",
        level: 3,
        text: "a) Regulatory Violation (FEMA)",
      },
      {
        type: "paragraph",
        text:
          "Maintaining a resident savings account after becoming NRI is a violation of FEMA regulations. RBI mandates conversion to NRO, failing which the account is treated as illegal.",
      },
      {
        type: "heading",
        level: 3,
        text: "b) Penalties from RBI / FEMA",
      },
      {
        type: "paragraph",
        text:
          "FEMA imposes penalties up to 3 times the amount involved or ₹2 lakhs, whichever is higher. Additional penalty of ₹5,000 per day can apply till the violation continues.",
      },
      {
        type: "heading",
        level: 3,
        text: "c) Tax Implications",
      },
      {
        type: "paragraph",
        text:
          "Interest earned on a resident savings account (kept wrongly) will be taxable in India (not exempt like NRE) and if you wrongly enjoyed benefits (like Section 80TTA deduction or exemption), the IT department can question it.",
      },
      {
        type: "heading",
        level: 3,
        text: "d) Banking Restrictions",
      },
      {
        type: "paragraph",
        text:
          "Banks, if they discover non-compliance, may freeze the account until it is regularized. Remittances abroad may face scrutiny under money laundering checks.",
      },
      {
        type: "heading",
        level: 3,
        text: "e) Practical Risks",
      },
      {
        type: "paragraph",
        text:
          "Any high-value transactions in such an account may attract notices from Income Tax or Enforcement Directorate (ED). It can complicate things if you need to repatriate funds abroad later.",
      },

      {
        type: "heading",
        level: 2,
        text: "5. PAN, Aadhaar & Filing Obligations",
      },
      {
        type: "list",
        items: [
          "Make sure your PAN is active and up to date. If you change your status (resident → non-resident), you may need to declare that.",
          "Aadhaar-PAN linking requirements should be satisfied, if applicable.",
          "File your Income Tax Return (ITR) for the year you leave (exit year) carefully, disclosing Indian income earned in that year, any foreign income (if you are resident for part of year), and assets/financial interests outside India (if required).",
          "Even after you become NRI, you might need to file if Indian income or source meets thresholds.",
        ],
      },

      {
        type: "heading",
        level: 2,
        text: "6. Tax Deduction at Source (TDS), Refunds, and Compliance",
      },
      {
        type: "list",
        items: [
          "NRIs often face higher rates of TDS on interest, rent and dividends.",
          "Be sure to keep TDS certificates, proof of foreign tax paid, etc., as you may claim refunds or credit later.",
          "File correct forms and comply with disclosure requirements.",
        ],
      },
      {
        type: "paragraph",
        text:
          "There is most common thing that every landlord and tenant must know that TDS on Rent paid to NRI landlord. Key provision is that paying rent to an NRI is not the same as paying rent to a resident landlord. The Income Tax Act has stricter rules to ensure proper tax collection.",
      },
      {
        type: "heading",
        level: 3,
        text: "Legal Provision",
      },
      {
        type: "paragraph",
        text:
          "As per Section 195, any payment to a Non-Resident (including rent) is subject to TDS, regardless of the amount.",
      },
      {
        type: "heading",
        level: 3,
        text: "TDS Rate",
      },
      {
        type: "list",
        items: [
          "30% (basic rate) + surcharge + 4% cess.",
          "Effective rate: 31.2% – 42.7% depending on the NRI’s income slab.",
          "No threshold exemption like the ₹50,000/month limit available for resident landlords.",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Tenant’s Responsibilities",
      },
      {
        type: "list",
        items: [
          "Deduct TDS before paying rent to the NRI.",
          "Deposit TDS with the Government by the 7th of next month.",
          "File Form 15CA. The article describes this as mandatory for all remittances.",
          "File Form 15CB (CA certificate) if annual rent exceeds ₹5 lakh.",
          "File TDS return in Form 27Q quarterly (not Form 26QB).",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "DTAA Benefit",
      },
      {
        type: "paragraph",
        text:
          "If the NRI resides in a country with a Double Tax Avoidance Agreement (DTAA), TDS may be reduced (usually 10–15%). To claim this, the landlord must provide a Tax Residency Certificate (TRC) and declaration.",
      },

      {
        type: "heading",
        level: 2,
        text: "7. FEMA / RBI / Foreign Exchange Rules",
      },
      {
        type: "paragraph",
        text:
          "Financial transactions across borders are governed under FEMA (Foreign Exchange Management Act). Some things to check:",
      },
      {
        type: "list",
        items: [
          "Sale proceeds of Indian property must be repatriated only via NRO/NRE channels and after obtaining tax clearance.",
          "Gifts and remittances you receive or send have caps or rules.",
          "Investments abroad, especially business or professional establishment outside India, may have additional disclosures.",
        ],
      },

      {
        type: "heading",
        level: 2,
        text: "8. The Exit Year — Special Considerations",
      },
      {
        type: "paragraph",
        text:
          "The financial year in which you leave India (exit year) often involves both resident status for part of the year and non-resident status. You must:",
      },
      {
        type: "list",
        items: [
          "Determine your residential status for that previous (financial) year under Section 6.",
          "Declare all income (Indian + foreign) as per your status.",
          "File ITR correctly with proper disclosures.",
        ],
      },
      {
        type: "paragraph",
        text:
          "Getting the timing right is crucial, because your last few days in India or first few abroad can affect your liability.",
      },

      {
        type: "heading",
        level: 2,
        text: "Final Thoughts",
      },
      {
        type: "paragraph",
        text:
          "Moving abroad is a big life event. Alongside all the logistics, visa, housing and language, our tax and financial obligations to India deserve full attention. By taking time before leaving to understand your status, convert banking/investments, and align with DTAA or FEMA requirements, you can avoid surprises: large tax demand, blocked funds, or legal non-compliance.",
      },
      {
        type: "paragraph",
        text:
          "If all this seems overwhelming, it’s wise to consult a Chartered Accountant or tax professional who handles NRI matters. They can help with your specific facts (income sources, destination country, assets abroad etc.) so you can optimize tax liability while staying fully compliant.",
      },

      {
        type: "callout",
        title: "Disclaimer",
        text:
          "The information provided in this post/article is for general guidance and informational purposes only. While we are qualified Chartered Accountants, the views expressed here are my personal interpretations based on the laws and recent updates. This should not be construed as a substitute for professional advice tailored to your specific situation. Readers are advised to consult a qualified tax professional or legal advisor before taking any decision based on this content. I shall not be held liable for any loss or damage arising from the use of this information.",
      },
    ],

    sources: [
      {
        label: "Income Tax India — Official Website",
        href: "https://www.incometax.gov.in/",
      },
      {
        label: "Income Tax India — DTAA Information",
        href: "https://incometaxindia.gov.in/Pages/international-taxation/dtaa.aspx",
      },
    ],
  },
];

export function getPublishedArticles() {
  return newsArticles.filter((article) => article.isPublished);
}

export function getPublishedArticle(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function formatPublicationDate(value?: string) {
  if (!value) return "Publication date to be confirmed";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function getReadingTime(article: NewsArticle) {
  const words = article.content.flatMap((block) => {
    if (block.type === "list") return block.items;
    if (block.type === "callout") return [block.title, block.text];
    return [block.text];
  }).join(" ").trim().split(/\s+/).filter(Boolean).length;

  return words ? Math.max(1, Math.ceil(words / 220)) : undefined;
}
