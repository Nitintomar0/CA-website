import type { LucideIcon } from "lucide-react";
import { Compass, Handshake, ShieldCheck } from "lucide-react";

export const aboutImages = {
  hero: "/about/story-hero.webp",
heroDetail: "/about/story-detail.webp",
  mission: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=86",
  vision: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=86",
  assurance: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=86",
  place: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=86",
} as const;

export type AboutPrinciple = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

export const aboutPrinciples: AboutPrinciple[] = [
  {
    title: "Our Mission",
    description: "To help clients move forward with proactive advice, responsive service and professional relationships built to last.",
    Icon: Handshake,
  },
  {
    title: "Our Vision",
    description: "To deliver dependable tax, business and advisory support that makes changing requirements easier to navigate.",
    Icon: Compass,
  },
  {
    title: "Our Philosophy",
    description: "Integrity, teamwork and personal attention guide every conversation, with transparency at every step.",
    Icon: ShieldCheck,
  },
];

// These labels deliberately contain no dates or historical claims. Replace them with
// approved firm milestones once the founding and growth chronology is confirmed.
export const journeyMilestones = [
  {
    label: "Founding chapter",
    year: "2023",
    title: "A considered beginning",
    description: "The firm’s founding detail and date are awaiting confirmation for publication.",
    image: aboutImages.assurance,
  },
  {
    label: "Practice focus",
    year: "2024",
    title: "Built around clear advice",
    description: "A timeline note for the approved story of the practice and the work it set out to do.",
    image: aboutImages.mission,
  },
  {
    label: "Growing relationships",
    year: "2025",
    title: "Support that stays close",
    description: "A reserved space for a verified milestone about the clients and relationships that shaped the firm.",
    image: aboutImages.vision,
  },
  {
    label: "The work ahead",
    year: "2026",
    title: "Ready for what is next",
    description: "The next confirmed chapter can be added here without changing the timeline’s editorial structure.",
    image: aboutImages.place,
  },
] as const;
