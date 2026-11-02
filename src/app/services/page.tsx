import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Accounting, taxation, assurance and advisory services from Abhishek Tiwari & Company.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="service-index">
        <section className="service-index__hero"><div className="container"><p className="eyebrow eyebrow--light">Our expertise</p><h1>Clear support for the work behind every decision.</h1><p>A connected suite of professional services, designed around the practical requirements and direction of your business.</p></div></section>
        <section className="service-index__list"><div className="container">{services.map((service) => <article key={service.slug}><span>{service.number}</span><div><h2>{service.title}</h2><p>{service.description}</p></div><Link href={`/services/${service.slug}`}>Explore Service <ArrowUpRight aria-hidden="true" size={18} /></Link></article>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
