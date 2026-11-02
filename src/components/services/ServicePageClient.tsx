"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";
import { ContactExperience } from "@/components/home/ContactExperience";
import { servicePages } from "@/data/service-pages";
import { services } from "@/data/site";
import { ServiceCTA } from "./ServiceCTA";
import { ServiceFAQ } from "./ServiceFAQ";
import { ServiceHero } from "./ServiceHero";
import {
  AccountingLayout,
  AuditLayout,
  CorporateLayout,
  DirectTaxLayout,
  IndirectTaxLayout,
  RegistrationLayout,
  RiskLayout,
} from "./ServiceLayouts";

function ServiceBody({ slug }: { slug: string }) {
  const page = servicePages[slug];
  const service = services.find((item) => item.slug === slug);
  if (!page || !service) return null;

  switch (page.variant) {
    case "accounting": return <AccountingLayout service={service} page={page} />;
    case "registration": return <RegistrationLayout service={service} page={page} />;
    case "indirect-tax": return <IndirectTaxLayout service={service} page={page} />;
    case "direct-tax": return <DirectTaxLayout service={service} page={page} />;
    case "audit": return <AuditLayout service={service} page={page} />;
    case "risk": return <RiskLayout service={service} page={page} />;
    case "corporate": return <CorporateLayout service={service} page={page} />;
  }
}

export function ServicePageClient({ slug }: { slug: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const page = servicePages[slug];
  const service = services.find((item) => item.slug === slug);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let headingSplit: SplitText | null = null;
    let refreshFrame = 0;
    const matchMedia = gsap.matchMedia();
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const images = Array.from(root.querySelectorAll("img"));
    const onImageReady = () => refresh();
    images.filter((image) => !image.complete).forEach((image) => {
      image.addEventListener("load", onImageReady, { once: true });
      image.addEventListener("error", onImageReady, { once: true });
    });

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(root);
    window.addEventListener("load", refresh, { once: true });
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) refresh();
    });

    const context = gsap.context(() => {
      const heroTitle = root.querySelector<HTMLElement>(".service-hero__title");
      const heroImageStage = root.querySelector<HTMLElement>(".service-hero__image-stage");
      const heroReveal = root.querySelectorAll<HTMLElement>(".service-hero__reveal");

      if (heroTitle) {
        headingSplit = SplitText.create(heroTitle, { type: "words", wordsClass: "service-hero__word" });
        gsap.fromTo(
          headingSplit.words,
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.055, ease: "power4.out", delay: 0.1 }
        );
      }

      gsap.fromTo(heroReveal, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out", delay: 0.34 });
      if (heroImageStage) {
        gsap.fromTo(heroImageStage, { clipPath: "inset(0 0 100% 0)", scale: 1.04 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.15, ease: "power4.out" });
      }

      const addReveals = (mobile = false) => {
        const reveals = gsap.utils.toArray<HTMLElement>(".service-reveal", root).filter((item) => !item.closest(".service-hero"));
        reveals.forEach((element) => {
          gsap.fromTo(element, { y: mobile ? 18 : 34, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: mobile ? 0.52 : 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: mobile ? "top 92%" : "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        });

        const staggerGroups = gsap.utils.toArray<HTMLElement>(".service-stagger", root);
        staggerGroups.forEach((group) => {
          const cards = gsap.utils.toArray<HTMLElement>(".service-card", group);
          if (!cards.length) return;
          gsap.fromTo(cards, { y: mobile ? 16 : 28, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: mobile ? 0.5 : 0.66,
            stagger: mobile ? 0.07 : 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: mobile ? "top 92%" : "top 86%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        });
      };

      matchMedia.add("(min-width: 900px)", () => {
        addReveals();

        const media = gsap.utils.toArray<HTMLElement>(".service-parallax", root);
        media.forEach((item) => {
          gsap.to(item, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
      });

      // Mobile uses short, normal reveal timelines only. There is no scroll pinning
      // or scrubbed motion to interrupt touch scrolling.
      matchMedia.add("(max-width: 899px)", () => addReveals(true));
      refresh();
    }, root);

    return () => {
      cancelAnimationFrame(refreshFrame);
      cancelled = true;
      resizeObserver.disconnect();
      window.removeEventListener("load", refresh);
      images.forEach((image) => {
        image.removeEventListener("load", onImageReady);
        image.removeEventListener("error", onImageReady);
      });
      headingSplit?.revert();
      matchMedia.revert();
      context.revert();
    };
  }, [slug]);

  if (!page || !service) return null;

  return (
    <main ref={rootRef} id="main-content" className={`service-experience service-experience--${page.variant}`}>
      <ServiceHero service={service} page={page} />
      <ServiceBody slug={slug} />
      <ServiceFAQ items={page.faq} />
      <ServiceCTA page={page} />
      <ContactExperience />
    </main>
  );
}
