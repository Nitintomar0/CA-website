"use client";

import { gsap } from "gsap";
import { Minus, Plus } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { ServiceFAQItem } from "@/data/service-pages";

type Props = {
  items: ServiceFAQItem[];
  title?: string;
};

export function ServiceFAQ({ items, title = "Questions, clearly answered." }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const answersRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    answersRef.current.forEach((answer, index) => {
      if (!answer) return;
      const isOpen = index === openIndex;
      gsap.killTweensOf(answer);
      gsap.set(answer, { overflow: "hidden" });
      gsap.to(answer, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: reduceMotion ? 0 : 0.42,
        ease: "power3.inOut",
      });
    });
  }, [openIndex]);

  return (
    <section className="service-faq section-padding" aria-labelledby="service-faq-title">
      <div className="container service-faq__grid">
        <div className="service-faq__heading service-reveal">
          <p className="eyebrow">Useful context</p>
          <h2 id="service-faq-title" className="section-heading">{title}</h2>
          <p>Every engagement is tailored to the facts at hand. These answers explain how we approach the conversation.</p>
        </div>
        <div className="service-faq__items service-reveal">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `service-faq-answer-${index}`;
            return (
              <article className={`service-faq__item ${isOpen ? "is-open" : ""}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    {isOpen ? <Minus aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
                  </button>
                </h3>
                <div
                  id={answerId}
                  className="service-faq__answer"
                  ref={(element) => { answersRef.current[index] = element; }}
                  style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
