import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about/AboutPageClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactExperience } from "@/components/home/ContactExperience";

export const metadata: Metadata = {
  title: "About the Firm",
  description: "The story, working principles and future-facing approach behind Abhishek Tiwari & Company.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <AboutPageClient />
      </main>
      <ContactExperience />
      <Footer />
    </>
  );
}
