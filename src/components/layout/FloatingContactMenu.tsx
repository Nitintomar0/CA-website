"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { Mail, Phone, Plus } from "lucide-react";
import { firm } from "@/data/site";

type ExtendedFirmContact = typeof firm & {
  contactEmail?: string;
  email?: string;
};

export function FloatingContactMenu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);

  const contact = firm as ExtendedFirmContact;
  const phone = firm.contactPhone;
  const phoneDigits = phone.replace(/\D/g, "");
  const whatsappNumber =
    phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

  const emailAddress = (
    contact.contactEmail ??
    contact.email ??
    ""
  ).trim();

  const whatsappMessage = encodeURIComponent(
    "Hello VRA Associates, I would like to enquire about your services.",
  );

  const closeMenu = useCallback(() => {
    if (!isOpenRef.current) return;

    isOpenRef.current = false;
    setIsOpen(false);
    timelineRef.current?.timeScale(1).reverse();
  }, []);

  const toggleMenu = () => {
    if (isOpenRef.current) {
      closeMenu();
      return;
    }

    isOpenRef.current = true;
    setIsOpen(true);
    timelineRef.current?.timeScale(1).play();
  };

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || !plusRef.current) return;

    const context = gsap.context(() => {
      const items = Array.from(
        root.querySelectorAll<HTMLAnchorElement>(
          ".vra-contact-fab__item",
        ),
      );

      const plus = plusRef.current;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.set(items, {
        x: 0,
        y: 0,
        scale: 0,
        autoAlpha: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(plus, {
        rotation: 0,
        transformOrigin: "50% 50%",
      });

      const radius = 116;
      const startAngle = 180;
      const endAngle = 270;
      const angleStep =
        (endAngle - startAngle) / (items.length - 1);

      const timeline = gsap.timeline({ paused: true });

      items.forEach((item, index) => {
        const angle =
          ((startAngle + angleStep * index) * Math.PI) / 180;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        timeline.to(
          item,
          {
            x,
            y,
            scale: 1,
            autoAlpha: 1,
            duration: reducedMotion ? 0.2 : 0.65,
            ease: reducedMotion
              ? "power2.out"
              : "elastic.out(1, 0.5)",
          },
          index * (reducedMotion ? 0 : 0.055),
        );
      });

      timeline.to(
        plus,
        {
          rotation: 135,
          duration: reducedMotion ? 0.2 : 0.35,
          ease: "back.out(1.7)",
        },
        0,
      );

      timelineRef.current = timeline;
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      context.revert();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        rootRef.current &&
        !rootRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
      );
    };
  }, [closeMenu]);

  return (
    <div
      ref={rootRef}
      className={`vra-contact-fab ${isOpen ? "is-open" : ""}`}
    >
      {/* CALL */}
<a
  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
  className="vra-contact-fab__item vra-contact-fab__item--call"
  aria-label="Call VRA Associates"
  title="Call"
  onClick={closeMenu}
>
  <Phone size={23} strokeWidth={1.8} aria-hidden="true" />
</a>

{/* WHATSAPP */}
<a
  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
  target="_blank"
  rel="noopener noreferrer"
  className="vra-contact-fab__item vra-contact-fab__item--whatsapp"
  aria-label="Chat with VRA Associates on WhatsApp"
  title="WhatsApp"
  onClick={closeMenu}
>
  <svg
    viewBox="0 0 24 24"
    width="25"
    height="25"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.01 0C5.39 0 0 5.39 0 12.01c0 2.12.56 4.19 1.62 6.01L0 24l6.15-1.61a12 12 0 0 0 5.86 1.49h.01C18.64 23.88 24 18.52 24 11.9c0-3.17-1.24-6.15-3.48-8.4A11.93 11.93 0 0 0 12.01 0Zm-.01 21.83h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.65.96.97-3.56-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.9-9.95 9.9Zm5.51-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
</a>

{/* EMAIL */}
<a
  href={
    emailAddress
      ? `mailto:${emailAddress}?subject=Enquiry%20for%20VRA%20Associates`
      : "/contact"
  }
  className="vra-contact-fab__item vra-contact-fab__item--mail"
  aria-label="Email VRA Associates"
  title="Email"
  onClick={closeMenu}
>
  <Mail size={23} strokeWidth={1.8} aria-hidden="true" />
</a>

      {/* MAIN TOGGLE */}
      <button
        type="button"
        className="vra-contact-fab__toggle"
        onClick={toggleMenu}
        aria-label={
          isOpen ? "Close contact options" : "Open contact options"
        }
        aria-expanded={isOpen}
      >
        <span className="vra-contact-fab__toggle-ring" />
        <Plus
          ref={plusRef}
          size={27}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}