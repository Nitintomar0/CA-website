"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ServicePageData } from "@/data/service-pages";
import type { Service } from "@/data/site";

type Props = {
  service: Service;
  page: ServicePageData;
};

export function ServiceHero({ service, page }: Props) {
  return (
    <section className={`service-hero service-hero--${page.variant}`} aria-labelledby="service-title">
      <div className="service-hero__grid" aria-hidden="true" />
      <div className="container service-hero__inner">
        <div className="service-hero__copy">
          <p className="service-hero__eyebrow service-hero__reveal">
            <span>{service.number}</span>
            {page.eyebrow}
          </p>
          <h1 id="service-title" className="service-hero__title">
            {page.title}
          </h1>
          <p className="service-hero__lead service-hero__reveal">{page.lead}</p>
          <div className="service-hero__actions service-hero__reveal">
            <Link className="button button--gold" href="/contact">
              Discuss your requirements <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
            <a className="service-hero__scroll-link" href="#service-overview">
              Explore the service <ArrowDownRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>

        <div className="service-hero__media service-hero__reveal">
          <div className="service-hero__image-stage service-parallax">
            <Image
              src={page.heroImage}
              alt={page.imageAlt}
              fill
              priority
              sizes="(max-width: 899px) 100vw, 47vw"
            />
          </div>
          <span className="service-hero__media-label" aria-hidden="true">
            {page.variant === "direct-tax" ? "TAX / 04" : `${service.number} / 07`}
          </span>
        </div>
      </div>
    </section>
  );
}
