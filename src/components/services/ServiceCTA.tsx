import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ServicePageData } from "@/data/service-pages";

export function ServiceCTA({ page }: { page: ServicePageData }) {
  return (
    <section className={`service-cta service-cta--${page.variant}`}>
      <div className="container service-cta__inner service-reveal">
        <p className="eyebrow eyebrow--light">A focused conversation</p>
        <h2>Bring the right information to the table.</h2>
        <p>
          Tell us what you are considering. We will help you understand the relevant next steps and shape an engagement around your requirements.
        </p>
        <Link className="button button--gold" href="/contact">
          Start a confidential conversation <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </section>
  );
}
