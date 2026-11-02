"use client";

import { gsap } from "gsap";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import { services } from "@/data/site";

type Props = {
  open: boolean;
  pathname: string;
  onClose: () => void;
  onExited: () => void;
};

export function ServicesMobileSheet({ open, pathname, onClose, onExited }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("services-sheet-open");
    document.body.classList.add("services-sheet-open");
    return () => {
      document.documentElement.classList.remove("services-sheet-open");
      document.body.classList.remove("services-sheet-open");
    };
  }, [open]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const backdrop = dialog.querySelector<HTMLElement>(".services-sheet__backdrop");
    const panel = dialog.querySelector<HTMLElement>(".services-sheet__panel");
    if (!backdrop || !panel) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      hasOpenedRef.current = true;
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(panel, { yPercent: 105 });
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      timeline.to(backdrop, { opacity: 1, duration: reducedMotion ? 0 : 0.22 })
        .to(panel, { yPercent: 0, duration: reducedMotion ? 0 : 0.58, ease: "power4.out" }, 0)
        .add(() => closeRef.current?.focus());
      return () => { timeline.kill(); };
    }

    if (!hasOpenedRef.current) return;
    const timeline = gsap.timeline({ defaults: { overwrite: "auto" }, onComplete: onExited });
    timeline.to(panel, { yPercent: 105, duration: reducedMotion ? 0 : 0.34, ease: "power3.in" }, 0)
      .to(backdrop, { opacity: 0, duration: reducedMotion ? 0 : 0.22 }, 0.12);
    return () => { timeline.kill(); };
  }, [onExited, open]);

  return createPortal(
    <div className="services-sheet" ref={dialogRef} role="presentation">
      <button className="services-sheet__backdrop" aria-label="Close services menu" onClick={onClose} type="button" />
      <section className="services-sheet__panel" role="dialog" aria-modal="true" aria-label="Services menu">
        <div className="services-sheet__handle" aria-hidden="true" />
        <div className="services-sheet__topline">
          <p><span>07</span> Services</p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close services menu"><X aria-hidden="true" size={19} /></button>
        </div>
        <nav aria-label="Service pages">
          {services.map((service) => {
            const href = `/services/${service.slug}`;
            const isCurrent = pathname === href;
            const label = service.title
              .replace(" Services", "")
              .replace(" & Assurance", " & Assurance")
              .replace("Corporate & Secretarial", "Corporate & Secretarial");
            return (
              <Link className={isCurrent ? "is-current" : ""} href={href} key={service.slug} onClick={onClose} aria-current={isCurrent ? "page" : undefined}>
                <span>{service.number}</span>
                <strong>{label}</strong>
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
            );
          })}
        </nav>
      </section>
    </div>
    , document.body
  );
}
