import {
  BarChart3,
  Building2,
  BriefcaseBusiness,
  Calculator,
  FileCheck2,
  Landmark,
  Scale,
  type LucideIcon,
} from "lucide-react";

export const firm = {
  name: "Abhishek Tiwari & Company",
  descriptor: "Chartered Accountants",
  logo: "/abhishek.png",
  contactLabel: "Start a confidential conversation",
  contactPhone: "7042218423",
};

export const aboutLinks = [
  { label: "About the Firm", href: "/about" },
];

export type Service = {
  number: string;
  title: string;
  description: string;
  slug: string;
  Icon: LucideIcon;
  tone: "ivory" | "navy" | "gold";
  image: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Accounting & Bookkeeping Services",
    description: "A composed view of the information that keeps day-to-day decisions clear.",
    slug: "accounting-bookkeeping",
    Icon: Calculator,
    tone: "ivory",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "Company Registration",
    description: "A considered starting point for businesses taking their next formal step.",
    slug: "company-registration",
    Icon: Building2,
    tone: "gold",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "Indirect Tax Advisory",
    description: "Practical guidance for requirements that move with your operations.",
    slug: "indirect-tax-advisory",
    Icon: Landmark,
    tone: "navy",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "04",
    title: "Direct Tax Advisory",
    description: "Clear perspective for personal and business tax considerations.",
    slug: "direct-tax-advisory",
    Icon: Scale,
    tone: "ivory",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "05",
    title: "Auditing & Assurance",
    description: "Rigorous review with communication that stays direct and useful.",
    slug: "auditing-assurance",
    Icon: FileCheck2,
    tone: "navy",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "06",
    title: "Risk & Business Advisory",
    description: "Structured thinking for the decisions and risks shaping your business.",
    slug: "risk-business-advisory",
    Icon: BarChart3,
    tone: "gold",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "07",
    title: "Corporate & Secretarial Services",
    description: "Steady governance support for responsibilities that deserve attention.",
    slug: "corporate-secretarial",
    Icon: BriefcaseBusiness,
    tone: "ivory",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  },
];

export const partners = [
  {
    initials: "AT",
    name: "CA Abhishek Tiwari",
    qualifications: ["B.Com (Hons.)", "FCA", "DISA", "FEMA"],
    role: "Founder Partner & Head of Auditing and Assurance",
    experience: "6+ years",
  },
  {
    initials: "VT",
    name: "CA Varun Tiwari",
    qualifications: ["B.Com (Hons.)", "FCA", "ACS", "FEMA"],
    role: "Founder Partner & Head of Taxation & Strategy",
    experience: "6+ years",
  },
  {
    initials: "CR",
    name: "CA Raunak",
    qualifications: ["B.Com (Hons.)", "FCA", "DISA"],
    role: "Founder Partner & Head of Business Advisory and Growth Consulting",
    experience: "6+ years",
  },
] as const;

export const branches = [
  { state: "Jharkhand", city: "Ranchi" },
  { state: "Bihar", city: "Gaya" },
  { state: "Rajasthan", city: "Jaipur" },
  { state: "Tamil Nadu", city: "Chennai" },
  { state: "Madhya Pradesh", city: "Ujjain" },
] as const;

export const headOffices = [
  {
    label: "Head Office — Noida",
    address: "D-100 Section-2, Gautam Buddha Nagar, Noida, UP 201301",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  },
  {
    label: "Head Office — Greater Noida West",
    address: "Fusion Ufaria Mall, 11th floor, Office no. 1133, Gautam Buddha Nagar, Greater Noida West, UP 201306",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
  },
] as const;

export const routeLabels: Record<string, { title: string; description: string }> = {
  about: {
    title: "About the Firm",
    description: "A practice shaped around thoughtful accounting, taxation, assurance and business advisory.",
  },
  services: {
    title: "Services",
    description: "Explore the practice areas designed for accounting, tax, assurance, and business needs.",
  },
  news: {
    title: "News & Insights",
    description: "A considered space for future firm-authored perspectives, guides and practice notes.",
  },
  careers: {
    title: "Careers",
    description: "A space for future opportunities to work with a thoughtful, professionally focused team.",
  },
  contact: {
    title: "Contact",
    description: "Begin a confidential conversation about the work in front of you.",
  },
  privacy: {
    title: "Privacy Policy",
    description: "A firm-specific privacy policy will be published before launch.",
  },
  disclaimer: {
    title: "Disclaimer",
    description: "A firm-specific legal disclaimer will be published before launch.",
  },
};
