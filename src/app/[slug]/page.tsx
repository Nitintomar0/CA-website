import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { firm, routeLabels } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return Object.keys(routeLabels).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = routeLabels[slug];
  return page ? { title: page.title, description: page.description } : {};
}

export default async function PlaceholderPage({ params }: Props) {
  const { slug } = await params;
  const page = routeLabels[slug];
  if (!page) notFound();
  return (
    <>
      <Header />
      <main id="main-content" className="route-page">
        <section className="route-page__hero"><div className="container"><p className="eyebrow eyebrow--light">{firm.name}</p><h1>{page.title}</h1><p>{page.description}</p></div></section>
        <section className="route-page__content"><div className="container"><p className="eyebrow">The perspective</p><h2 className="section-heading">Clear thinking begins with the right information.</h2><p className="body-copy">This section is structured for approved firm-specific content. It is intentionally free of invented history, claims, figures or regulatory updates, while keeping the route useful and ready for the next editorial pass.</p><Link className="text-button" href="/"><ArrowLeft aria-hidden="true" size={17} /> Return to homepage</Link></div></section>
      </main>
      <Footer />
    </>
  );
}
