"use client";

import { gsap } from "gsap";
import { BriefcaseBusiness, ContactRound, Home, Lightbulb, UserRound, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ServicesMobileSheet } from "@/components/services/ServicesMobileSheet";

const BAR_HEIGHT = 76;
const CORNER_RADIUS = 20;
const END_PADDING = 28;
const NOTCH_HALF_WIDTH = 42;
const NOTCH_DEPTH = 34;
const ICON_RISE = 40;
const SPRING: [number, number] = [210, 0.62];

const items: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "Home", href: "/", Icon: Home },
  { label: "About", href: "/about", Icon: UserRound },
  { label: "Services", href: "/services", Icon: BriefcaseBusiness },
  { label: "Insights", href: "/news", Icon: Lightbulb },
  { label: "Contact", href: "/contact", Icon: ContactRound },
];

function itemIsActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/about") return pathname === "/about";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function outline(width: number, center: number, half: number, depth: number) {
  const boundedHalf = Math.max(8, Math.min(half, center - CORNER_RADIUS, width - CORNER_RADIUS - center));
  const left = center - boundedHalf;
  const right = center + boundedHalf;
  const value = (number: number) => number.toFixed(2);

  return `M0 ${CORNER_RADIUS}Q0 0 ${CORNER_RADIUS} 0L${value(left)} 0`
    + `C${value(left + boundedHalf * 0.42)} 0 ${value(center - boundedHalf * 0.64)} ${value(depth)} ${value(center)} ${value(depth)}`
    + `C${value(center + boundedHalf * 0.64)} ${value(depth)} ${value(right - boundedHalf * 0.42)} 0 ${value(right)} 0`
    + `L${width - CORNER_RADIUS} 0Q${width} 0 ${width} ${CORNER_RADIUS}L${width} ${BAR_HEIGHT - CORNER_RADIUS}Q${width} ${BAR_HEIGHT} ${width - CORNER_RADIUS} ${BAR_HEIGHT}L${CORNER_RADIUS} ${BAR_HEIGHT}Q0 ${BAR_HEIGHT} 0 ${BAR_HEIGHT - CORNER_RADIUS}Z`;
}

export function MobileNotchedNavigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const shapeRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const tabsRef = useRef<Array<HTMLElement | null>>([]);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const chooseRef = useRef<(index: number, first?: boolean) => void>(() => undefined);
  const activeIndex = Math.max(0, items.findIndex((item) => itemIsActive(item.href, pathname)));
  const initialIndexRef = useRef(activeIndex);
  const [sheetMounted, setSheetMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const shape = shapeRef.current;
    const path = pathRef.current;
    const bubble = bubbleRef.current;
    const label = labelRef.current;
    if (!nav || !shape || !path || !bubble || !label) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { center: 0, velocity: 0, target: 0, open: reducedMotion ? 1 : 0 };
    const tabs = tabsRef.current;
    let width = 0;
    let centers: number[] = [];
    let current = initialIndexRef.current;
    let previousKey = "";

    const place = () => {
      width = nav.clientWidth;
      if (!width) return;
      centers = items.map((_, index) => END_PADDING + ((width - END_PADDING * 2) * (index + 0.5)) / items.length);
      tabs.forEach((tab, index) => {
        if (tab) tab.style.left = `${centers[index]}px`;
      });
      shape.setAttribute("viewBox", `0 0 ${width} ${BAR_HEIGHT}`);
    };

    const draw = () => {
      if (!width) return;
      const speed = reducedMotion ? 0 : Math.abs(state.velocity);
      const key = `${state.center.toFixed(2)} ${speed.toFixed(0)} ${state.open.toFixed(3)} ${width}`;
      if (key === previousKey) return;
      previousKey = key;
      const half = NOTCH_HALF_WIDTH + Math.min(26, speed * 0.03);
      const dip = Math.min(13, speed * 0.012);
      const squash = Math.min(0.2, speed * 0.00034);

      path.setAttribute("d", outline(width, state.center, half, NOTCH_DEPTH * state.open));
      bubble.style.transform = `translate(${state.center.toFixed(2)}px, ${(dip + (1 - state.open) * -50).toFixed(2)}px) scale(${(1 + squash).toFixed(3)}, ${(1 / (1 + squash)).toFixed(3)})`;
      label.style.transform = `translateX(${state.center.toFixed(2)}px)`;
    };

    const ticker = (_time: number, delta: number) => {
      const elapsed = Math.min(delta, 50) / 1000;
      if (reducedMotion) {
        state.center = state.target;
        state.velocity = 0;
      } else {
        const damping = 2 * Math.sqrt(SPRING[0]) * SPRING[1];
        const steps = Math.max(1, Math.ceil(elapsed / 0.004));
        for (let step = 0; step < steps; step += 1) {
          const timeStep = elapsed / steps;
          state.velocity += ((state.target - state.center) * SPRING[0] - state.velocity * damping) * timeStep;
          state.center += state.velocity * timeStep;
        }
      }
      draw();
    };

    const iconMove = (index: number) => {
      const icon = tabs[index]?.querySelector("svg");
      if (!icon || reducedMotion) return;
      const moves = [
        () => gsap.timeline().to(icon, { scaleX: 1.18, scaleY: 0.82, duration: 0.1, transformOrigin: "50% 100%" }).to(icon, { y: -6, scaleX: 0.92, scaleY: 1.1, duration: 0.16, ease: "power2.out" }).to(icon, { y: 0, scaleX: 1, scaleY: 1, duration: 0.4, ease: "bounce.out" }),
        () => gsap.timeline().to(icon, { rotation: -18, duration: 0.14, ease: "power2.out", transformOrigin: "45% 45%" }).to(icon, { rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" }),
        () => gsap.fromTo(icon, { rotation: 0 }, { rotation: 180, duration: 0.6, ease: "back.out(2)", transformOrigin: "50% 50%" }),
        () => gsap.timeline().to(icon, { scale: 1.25, duration: 0.12, ease: "power2.out", transformOrigin: "50% 60%" }).to(icon, { scale: 0.92, duration: 0.12 }).to(icon, { scale: 1.1, duration: 0.12 }).to(icon, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }),
        () => gsap.timeline().to(icon, { y: 3, rotation: 6, duration: 0.14, ease: "power2.out", transformOrigin: "50% 100%" }).to(icon, { y: -2, rotation: -4, duration: 0.16 }).to(icon, { y: 0, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" }),
      ];
      moves[index % moves.length]();
    };

    const choose = (index: number, first = false) => {
      if (index === current && !first) return;
      const old = current;
      current = index;
      state.target = centers[index] ?? 0;
      tabs.forEach((tab, tabIndex) => {
        tab?.classList.toggle("mobile-tab--active", tabIndex === index);
        if (tabIndex === index) tab?.setAttribute("aria-current", "page");
        else tab?.removeAttribute("aria-current");
      });

      if (first || reducedMotion) {
        state.center = state.target;
        tabs.forEach((tab, tabIndex) => gsap.set(tab, { y: tabIndex === index ? -ICON_RISE : 0 }));
        label.textContent = items[index].label;
        draw();
        return;
      }

      gsap.to(tabs[old], { y: 0, duration: 0.42, ease: "power3.inOut", overwrite: "auto" });
      const distance = Math.abs((centers[index] ?? 0) - (centers[old] ?? 0));
      gsap.to(tabs[index], {
        y: -ICON_RISE,
        duration: 0.55,
        ease: "back.out(2.2)",
        delay: Math.min(0.32, 0.08 + distance / 900),
        overwrite: "auto",
        onComplete: () => iconMove(index),
      });
      gsap.timeline()
        .to(label, { opacity: 0, y: 6, duration: 0.15, ease: "power2.in", overwrite: "auto" })
        .call(() => { label.textContent = items[index].label; })
        .to(label, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, "+=0.12");
    };

    const resizeObserver = new ResizeObserver(() => {
      place();
      state.target = centers[current] ?? 0;
      state.center = state.target;
      state.velocity = 0;
      previousKey = "";
      draw();
    });

    chooseRef.current = choose;
    place();
    choose(current, true);
    gsap.ticker.add(ticker);
    resizeObserver.observe(nav);

    if (!reducedMotion) {
      gsap.timeline()
        .from(nav, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", clearProps: "transform,opacity" }, 0)
        .from(tabs.filter((_, index) => index !== current), { y: 14, opacity: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.05, clearProps: "opacity" }, 0.3)
        .from(label, { opacity: 0, duration: 0.4 }, 0.8)
        .to(state, { open: 1, duration: 0.8, ease: "elastic.out(1, 0.55)" }, 0.35)
        .add(() => iconMove(current), 0.9);
    }

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(ticker);
      gsap.killTweensOf([nav, label, state, ...tabs.filter(Boolean)]);
    };

  }, []);

  useLayoutEffect(() => {
    chooseRef.current(activeIndex);
  }, [activeIndex]);

  const openServices = useCallback(() => {
    chooseRef.current(2);
    setSheetMounted(true);
    requestAnimationFrame(() => setSheetOpen(true));
  }, []);

  const closeServices = useCallback(() => {
    setSheetOpen(false);
    chooseRef.current(activeIndex);
  }, [activeIndex]);

  const unmountServices = useCallback(() => {
    setSheetMounted(false);
    servicesTriggerRef.current?.focus();
  }, []);

  return (
    <nav className="mobile-tabbar" aria-label="Quick navigation" ref={navRef}>
      <svg className="mobile-tabbar__shape" ref={shapeRef} viewBox={`0 0 1 ${BAR_HEIGHT}`} aria-hidden="true">
        <path ref={pathRef} />
      </svg>
      <span className="mobile-tabbar__bubble" ref={bubbleRef} aria-hidden="true" />
      <span className="mobile-tabbar__label" ref={labelRef} aria-hidden="true" />
      {items.map(({ label, href, Icon }, index) => {
        const active = index === activeIndex;
        if (label === "Services") {
          return (
            <button
              className={`mobile-tab ${active ? "mobile-tab--active" : ""}`}
              type="button"
              key={href}
              ref={(element) => { tabsRef.current[index] = element; servicesTriggerRef.current = element; }}
              aria-current={active ? "page" : undefined}
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              onClick={openServices}
              onKeyDown={(event) => {
                let nextIndex: number | null = null;
                if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
                if (event.key === "ArrowLeft") nextIndex = (index - 1 + items.length) % items.length;
                if (event.key === "Home") nextIndex = 0;
                if (event.key === "End") nextIndex = items.length - 1;
                if (nextIndex === null) return;
                event.preventDefault();
                tabsRef.current[nextIndex]?.focus();
              }}
            >
              <Icon aria-hidden="true" size={26} strokeWidth={2} />
              <span className="mobile-tab__sr">Services</span>
            </button>
          );
        }
        return (
          <Link
            className={`mobile-tab ${active ? "mobile-tab--active" : ""}`}
            href={href}
            key={href}
            ref={(element) => { tabsRef.current[index] = element; }}
            aria-current={active ? "page" : undefined}
            onClick={() => chooseRef.current(index)}
            onKeyDown={(event) => {
              let nextIndex: number | null = null;
              if (event.key === "ArrowRight") nextIndex = (index + 1) % items.length;
              if (event.key === "ArrowLeft") nextIndex = (index - 1 + items.length) % items.length;
              if (event.key === "Home") nextIndex = 0;
              if (event.key === "End") nextIndex = items.length - 1;
              if (nextIndex === null) return;
              event.preventDefault();
              tabsRef.current[nextIndex]?.focus();
            }}
          >
            <Icon aria-hidden="true" size={26} strokeWidth={2} />
            <span className="mobile-tab__sr">{label}</span>
          </Link>
        );
      })}
      {sheetMounted ? <ServicesMobileSheet open={sheetOpen} pathname={pathname} onClose={closeServices} onExited={unmountServices} /> : null}
    </nav>
  );
}
