"use client";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDownRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

export function ContactHero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(SplitText);
    let split: SplitText | null = null;
    const context = gsap.context(() => {
      const title = hero.querySelector<HTMLElement>(".contact-hero__title");
      const reveals = hero.querySelectorAll<HTMLElement>(".contact-hero__reveal");
      if (!title) return;

      split = SplitText.create(title, { type: "words", wordsClass: "contact-hero__word" });
      gsap.timeline()
        .fromTo(reveals, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }, 0)
        .fromTo(split.words, { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.055, ease: "power4.out" }, 0.08);
    }, hero);

    return () => {
      split?.revert();
      context.revert();
    };
  }, []);

  return (
    <section className="contact-hero" ref={heroRef} aria-labelledby="contact-title">
      <div className="contact-hero__grid" aria-hidden="true" />
      <div className="container contact-hero__inner">
        <p className="eyebrow eyebrow--light contact-hero__reveal">Contact</p>
        <h1 id="contact-title" className="contact-hero__title">Begin with a clear conversation.</h1>
        <p className="contact-hero__lead contact-hero__reveal">
          Tell us a little about the decision or requirement in front of you. We&apos;ll make space for the right next discussion.
        </p>
        <a className="button button--gold contact-hero__reveal" href="#contact-enquiry">
          Start an enquiry <ArrowDownRight aria-hidden="true" size={17} />
        </a>
      </div>
    </section>
  );
}
