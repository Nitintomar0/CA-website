"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const contactImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=85",
];

export function ContactExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let splitText: SplitText | null = null;
    let rotationFrame = 0;

    const originalRotate = stage.style.getPropertyValue("rotate");

    // Calculate circular rotation directly from the page scroll position.
    // This keeps the rotation independent of other ScrollTrigger animations.
    const updateRotation = () => {
      if (rotationFrame) {
        window.cancelAnimationFrame(rotationFrame);
      }

      rotationFrame = window.requestAnimationFrame(() => {
        rotationFrame = 0;

        const sectionRect = section.getBoundingClientRect();

        const totalDistance =
          window.innerHeight + sectionRect.height;

        const progress = Math.min(
          1,
          Math.max(
            0,
            (window.innerHeight - sectionRect.top) /
              Math.max(totalDistance, 1)
          )
        );

        const rotation = progress * 360;

        // Use the individual CSS rotate property so existing transforms
        // and GSAP animations remain untouched.
        stage.style.setProperty("rotate", `${rotation}deg`);
      });
    };

    window.addEventListener("scroll", updateRotation, {
      passive: true,
    });

    window.addEventListener("resize", updateRotation);

    // Recalculate if page layout changes, including About page pin spacing.
    const resizeObserver = new ResizeObserver(updateRotation);
    resizeObserver.observe(section);
    resizeObserver.observe(document.documentElement);

    updateRotation();

    const context = gsap.context(() => {
      const eyebrow = section.querySelector(
        ".contact-cta-v3__eyebrow"
      );

      const heading = section.querySelector(
        ".contact-cta-v3__content h2"
      );

      const button = section.querySelector(
        ".contact-cta-v3__button"
      );

      if (!eyebrow || !heading || !button) return;

      splitText = SplitText.create(heading, {
        type: "chars",
        charsClass: "contact-cta-v3__char",
      });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      intro.fromTo(
        eyebrow,
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );

      intro.fromTo(
        splitText.chars,
        {
          autoAlpha: 0,
          y: 50,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: {
            amount: 0.5,
          },
          ease: "power2.out",
        },
        0.15
      );

      intro.fromTo(
        button,
        {
          autoAlpha: 0,
          y: 50,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        0.71
      );
    }, section);

    return () => {
      window.removeEventListener("scroll", updateRotation);
      window.removeEventListener("resize", updateRotation);

      resizeObserver.disconnect();

      if (rotationFrame) {
        window.cancelAnimationFrame(rotationFrame);
      }

      splitText?.revert();
      context.revert();

      // Restore the original CSS value during component cleanup.
      if (originalRotate) {
        stage.style.setProperty("rotate", originalRotate);
      } else {
        stage.style.removeProperty("rotate");
      }
    };
  }, []);

  return (
    <section
      className="contact-cta-v3"
      ref={sectionRef}
      aria-labelledby="contact-cta-v3-title"
    >
      {/* Circular image stage */}
      <div
        className="contact-cta-v3__circle-wrap"
        aria-hidden="true"
      >
        <div
          className="contact-cta-v3__stage"
          ref={stageRef}
        >
          {contactImages.map((src, index) => (
            <div
              className={`contact-cta-v3__photo contact-cta-v3__photo--${index + 1}`}
              key={src}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="219px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay */}
      <div
        className="contact-cta-v3__shade"
        aria-hidden="true"
      />

      {/* Centre content */}
      <div className="contact-cta-v3__content">
        <p className="contact-cta-v3__eyebrow">
          <span />
          CONTACT US
        </p>

        <h2 id="contact-cta-v3-title">
          <span>YOUR NEXT BUSINESS</span>
          <span>DECISION AWAITS</span>
        </h2>

        <Link
          href="/contact"
          className="contact-cta-v3__button"
        >
          <span>Get In Touch</span>

          <span className="contact-cta-v3__button-icon">
            <ArrowUpRight
              size={19}
              strokeWidth={1.6}
            />
          </span>
        </Link>
      </div>
    </section>
  );
}