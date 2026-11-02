import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ServicePageClient } from "@/components/services/ServicePageClient";
import { servicePages } from "@/data/service-pages";
import { services } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const page = servicePages[slug];
  return service && page ? { title: page.title, description: page.lead } : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  if (!services.some((item) => item.slug === slug) || !servicePages[slug]) notFound();
  return (
    <>
      <Header />
      <ServicePageClient slug={slug} />
      <Footer />
    </>
  );
}
