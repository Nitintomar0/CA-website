import type { Metadata } from "next";
import { CareersPageClient } from "@/components/careers/CareersPageClient";
import { ContactExperience } from "@/components/home/ContactExperience";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore professional interests and prepare an expression of interest with Abhishek Tiwari & Company.",
};

export default function CareersPage() {
  return <><Header /><CareersPageClient /><ContactExperience /><Footer /></>;
}
