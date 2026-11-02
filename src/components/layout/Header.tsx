"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { firm, services } from "@/data/site";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

type MenuName = "services" | null;

function ServicesDropdown({
  open,
  onToggle,
  onOpen,
  onClose,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="nav-dropdown" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        className="nav-dropdown__trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(event) => { event.stopPropagation(); onToggle(); }}
        onFocus={onOpen}
        type="button"
      >
        Services
        <ChevronDown aria-hidden="true" size={14} strokeWidth={1.8} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="nav-dropdown__panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="menu"
            onClick={onClose}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  return (
    <header ref={headerRef} onKeyDown={(event) => { if (event.key === "Escape") setOpenMenu(null); }} className={`site-header ${isScrolled ? "site-header--scrolled" : "site-header--at-top"}`}>
      <div className="container site-header__inner">
        <Link className="wordmark" href="/" aria-label={`${firm.name} home`}>
          <Image src={firm.logo} alt="Abhishek Tiwari & Company, Chartered Accountants" width={1898} height={829} priority />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation" onClick={() => setOpenMenu(null)}>
          <Link href="/" className={pathname === "/" ? "is-current" : ""}>
            Home
          </Link>
          <Link href="/about" className={pathname === "/about" ? "is-current" : ""}>
            About
          </Link>
          <ServicesDropdown
            open={openMenu === "services"}
            onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
            onOpen={() => setOpenMenu("services")}
            onClose={() => setOpenMenu(null)}
          >
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                role="menuitem"
                className={`nav-dropdown__service ${pathname === `/services/${service.slug}` ? "is-current" : ""}`}
                aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
              >
                <span aria-hidden="true">{service.number}</span>
                <span>{service.title}</span>
              </Link>
            ))}
          </ServicesDropdown>
          {primaryLinks.slice(1).map((item) => (
            <Link className={pathname === item.href ? "is-current" : ""} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="mobile-phone" href={`tel:${firm.contactPhone}`}>{firm.contactPhone}</a>
          <Link className="button button--small button--nav" href="/contact">
            Book a Consultation
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="container mobile-menu__inner" onClick={() => setIsMobileOpen(false)}>
              <Link href="/">Home</Link>
              <Link href="/about">About the Firm</Link>
              <Link href="/services">Services</Link>
              <Link href="/news">News & Insights</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
              <Link className="button button--mobile-menu" href="/contact">
                Book a Consultation
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
