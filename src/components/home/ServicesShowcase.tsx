"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { services } from "@/data/site";

export function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  
useLayoutEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger);

  const media = gsap.matchMedia();

  media.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".service-feature",
        section
      );

      if (window.innerWidth >= 900) {
        // Desktop: cards rotate and move into place.
        cards.forEach((card, index) => {
          gsap.set(card, {
            transformOrigin: "center center",
            zIndex: index + 1,
          });

          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              xPercent: 35,
              yPercent: 25,
              rotation: -12,
              scale: 0.88,
            },
            {
              autoAlpha: 1,
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 60%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      } else {
        // Mobile/tablet: simple reveal, no 3D tilt.
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 28,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power1.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }

      ScrollTrigger.refresh();
    }
  );

  return () => {
    media.revert();
  };
}, []);


  return (
    <section className="services" id="services" ref={sectionRef} aria-labelledby="services-title">
      <div className="container services__layout">
        <div className="services__intro">
          <p className="eyebrow eyebrow--light">Our expertise</p>
          <h2 className="section-heading section-heading--light" id="services-title">Expertise that keeps pace with your ambition.</h2>
          <p>Connected accounting, compliance and advisory support for considered business decisions.</p>
          <div className="services__meter" aria-hidden="true"><span /> <small>01 — 07</small></div>
        </div>
        <div className="services__cards">
          {services.map((service) => (
            <article className="service-feature" key={service.slug}>
              <div className="service-feature__image">
                <Image src={service.image} alt="" fill sizes="(max-width: 899px) 100vw, 52vw" />
              </div>
              <div className="service-feature__content">
                <span>{service.number}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={`/services/${service.slug}`}>Explore Service <ArrowUpRight aria-hidden="true" size={17} /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
