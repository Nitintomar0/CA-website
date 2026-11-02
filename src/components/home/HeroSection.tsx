"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const slides = [
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=88", alt: "A considered modern office interior" },
  { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2400&q=88", alt: "Professionals in a business consultation" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=88", alt: "Professional reviewing business documents" },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  const hero = heroRef.current;
  const imageStage = slidesRef.current;

  if (!hero || !imageStage) return;

  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const slideLayers = gsap.utils.toArray<HTMLElement>(
      ".hero__slide",
      imageStage
    );

    gsap.set(slideLayers, {
      autoAlpha: 0,
      scale: 1.04,
    });

    gsap.set(slideLayers[0], {
      autoAlpha: 1,
      scale: 1,
    });

    if (reducedMotion) return;

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero__overlay", {
        opacity: 0,
        duration: 0.6,
      })
      .from(
        ".hero__eyebrow",
        {
          y: 14,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.22"
      )
      .from(
        ".hero__line",
        {
          yPercent: 108,
          duration: 0.78,
          stagger: 0.1,
        },
        "-=0.08"
      )
      .from(
        ".hero__copy",
        {
          y: 18,
          opacity: 0,
          duration: 0.48,
        },
        "-=0.36"
      )
      .from(
        ".hero__cta",
        {
          y: 14,
          opacity: 0,
          duration: 0.42,
        },
        "-=0.24"
      );

    let currentSlide = 0;

    const cycle = gsap.delayedCall(5, function transitionSlide() {
      const nextSlide = (currentSlide + 1) % slideLayers.length;

      gsap.timeline({
        onComplete: () => {
          currentSlide = nextSlide;
          cycle.restart(true);
        },
      })
        .set(slideLayers[nextSlide], { scale: 1.045 })
        .to(
          slideLayers[currentSlide],
          {
            autoAlpha: 0,
            scale: 1.015,
            duration: 1.1,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          slideLayers[nextSlide],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0
        );
    });
  }, hero);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 0px)", () => {
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      pin: hero,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });
  });

  return () => {
    mm.revert();
    context.revert();
  };
}, []);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero__slides" ref={slidesRef} aria-hidden="true">
        {slides.map((slide, index) => (
          <div className="hero__slide" key={slide.src}>
            <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" />
          </div>
        ))}
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__title-wrap">
          <p className="eyebrow eyebrow--light hero__eyebrow">Accounting · Taxation · Assurance · Advisory</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__clip"><span className="hero__line">Clarity in Every Number.</span></span>
            <span className="hero__clip"><span className="hero__line hero__line--gold">Confidence in Every Decision.</span></span>
          </h1>
        </div>
        <div className="hero__aside">
          <p className="hero__copy">Accounting, taxation, assurance and business advisory shaped around the needs of your business.</p>
          <Link className="hero__cta" href="/contact">
            <span className="hero__cta-label" aria-hidden="true"><span>Get in Touch</span><span>Get in Touch</span></span>
            <span className="hero__cta-icon" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.7} /></span>
            <span className="hero__cta-sr">Get in Touch</span>
          </Link>
        </div>
      </div>
      <a className="hero__scroll" href="#about"><span>Scroll to explore</span><ArrowDown aria-hidden="true" size={15} /></a>
    </section>
  );
}
