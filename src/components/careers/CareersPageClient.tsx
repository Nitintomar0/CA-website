"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, ArrowUpRight, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, Landmark, Scale, ShieldCheck, WalletCards } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { CareerApplicationForm } from "./CareerApplicationForm";

const values = [
  ["01", "Professional learning", "Build familiarity with the disciplines, questions and standards that underpin considered advisory work."],
  ["02", "Collaborative working", "Make room for clear communication, thoughtful review and the exchange of practical perspective."],
  ["03", "Practical exposure", "Engage with work that calls for care, judgement and an understanding of real business context."],
  ["04", "Ethical practice", "Keep integrity, confidentiality and professional responsibility close to every decision."],
];

const practiceAreas = [
  [WalletCards, "Accounting & Bookkeeping", "A professional interest in accurate records, reporting foundations and day-to-day financial clarity."],
  [Landmark, "Direct Tax Advisory", "An interest in careful tax analysis, planning conversations and responsible compliance work."],
  [Scale, "GST & Indirect Tax", "A focus on indirect-tax questions, documentation and the detail behind informed decisions."],
  [ShieldCheck, "Audit & Assurance", "A foundation for people drawn to evidence, process and a clear view of financial information."],
  [BriefcaseBusiness, "Corporate & Secretarial Compliance", "An area for those interested in company records, governance matters and statutory discipline."],
  [ChartNoAxesCombined, "Risk & Business Advisory", "A route for practical thinkers who want to explore risk, controls and business context."],
  [BookOpen, "Financial Reporting", "An interest in reporting judgement, clarity of presentation and reliable financial communication."],
];

export function CareersPageClient() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();
    let titleSplit: SplitText | null = null;
    const context = gsap.context(() => {
      const title = root.querySelector<HTMLElement>(".careers-hero h1");
      if (title) {
        titleSplit = SplitText.create(title, { type: "words", wordsClass: "careers-hero__word" });
        gsap.fromTo(titleSplit.words, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.86, stagger: 0.07, ease: "power4.out", delay: 0.1 });
      }
      const visual = root.querySelector<HTMLElement>(".careers-hero__visual");
      if (visual) gsap.fromTo(visual, { clipPath: "inset(0 0 100% 0)", scale: 1.035 }, { clipPath: "inset(0)", scale: 1, duration: 1.05, ease: "power4.out" });
      media.add("(min-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>(".careers-reveal", root).forEach((element) => gsap.fromTo(element, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
        const values = gsap.utils.toArray<HTMLElement>(".career-value", root);
        if (values.length) gsap.fromTo(values, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.66, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: values[0].parentElement, start: "top 86%", once: true } });
        const practices = gsap.utils.toArray<HTMLElement>(".career-practice", root);
        if (practices.length) gsap.fromTo(practices, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: practices[0].parentElement, start: "top 86%", once: true } });
      });
    }, root);
    return () => { titleSplit?.revert(); media.revert(); context.revert(); };
  }, []);

  return (
    <main ref={rootRef} id="main-content" className="careers-page">
      <section className="careers-hero" aria-labelledby="careers-title">
        <div className="container careers-hero__grid">
          <div className="careers-hero__copy">
            <p className="careers-hero__label"><span>ATC</span> Careers &amp; professional life</p>
            <h1 id="careers-title">Build Your Future With Us.</h1>
            <p>Explore professional opportunities and share your aspirations with Abhishek Tiwari &amp; Company.</p>
            <a className="careers-hero__cta" href="#career-application">Explore opportunities <ArrowDown aria-hidden="true" size={17} /></a>
          </div>
          <div className="careers-hero__visual" aria-hidden="true"><Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=88" alt="" fill priority sizes="(max-width: 899px) 100vw, 50vw" /><span>FUTURE<br />IN FOCUS</span></div>
        </div>
      </section>

      <section className="career-values section-padding" aria-labelledby="career-values-title">
        <div className="container career-values__layout">
          <div className="career-values__intro careers-reveal"><p className="eyebrow">A considered practice</p><h2 id="career-values-title" className="section-heading">The work is where a professional future takes shape.</h2><p>An environment we aim to foster is one of practical thinking, collaborative review and sound professional judgement.</p><small>Professional themes shown here are subject to client confirmation. Current roles, responsibilities and working arrangements are discussed directly with candidates.</small></div>
          <div className="career-values__list">{values.map(([number, title, copy]) => <article className="career-value" key={title}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight aria-hidden="true" size={18} /></article>)}</div>
        </div>
      </section>

      <section className="career-practices" aria-labelledby="career-practices-title">
        <div className="container"><div className="career-practices__heading careers-reveal"><div><p className="eyebrow eyebrow--light">Professional interests</p><h2 id="career-practices-title" className="section-heading section-heading--light">Where would you like to make your contribution?</h2></div><p>This is a guide to areas of professional interest, not a list of confirmed vacancies.</p></div><div className="career-practices__grid">{practiceAreas.map(([Icon, title, copy]) => { const PracticeIcon = Icon as typeof WalletCards; return <article className="career-practice" key={title as string}><PracticeIcon aria-hidden="true" size={23} strokeWidth={1.35} /><span>{String(title)}</span><p>{String(copy)}</p><i>↗</i></article>; })}</div></div>
      </section>

      <section id="career-application" className="career-application section-padding" aria-labelledby="career-application-title">
        <div className="container career-application__layout">
          <div className="career-application__aside careers-reveal"><p className="eyebrow">Start here</p><h2 id="career-application-title" className="section-heading">Your next professional conversation.</h2><p>Use this form to prepare a complete expression of interest. It is not connected to a submission service yet, so your information stays in this browser until a secure workflow is approved.</p><div><span>01</span><p>We will only publish current application instructions once a verified submission channel is in place.</p></div></div>
          <CareerApplicationForm />
        </div>
      </section>
    </main>
  );
}
