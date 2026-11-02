import type { Metadata } from "next";
import { AboutPreview, ApproachSection, BranchesSection, InsightsSection, OfficesSection, TeamSection, TrustStrip, WhyChooseUsSection } from "@/components/home/HomeSections";
import { ContactExperience } from "@/components/home/ContactExperience";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Abhishek Tiwari & Company | Accounting, Tax & Business Advisory",
  description: "Accounting, taxation and business advisory support for people and organisations ready to move with confidence.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <AboutPreview />
        <ServicesShowcase />
        <WhyChooseUsSection />
        <TeamSection />
        <BranchesSection />
        <OfficesSection />
        <ApproachSection />
        <InsightsSection />
        <ContactExperience />
      </main>
      <Footer />
    </>
  );
}
