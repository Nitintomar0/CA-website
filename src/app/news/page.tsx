import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsPageClient } from "@/components/news/NewsPageClient";
import { getPublishedArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Firm-approved perspectives, regulatory developments and business insights from Abhishek Tiwari & Company.",
};

export default function NewsPage() {
  return <><Header /><NewsPageClient articles={getPublishedArticles()} /><Footer /></>;
}
