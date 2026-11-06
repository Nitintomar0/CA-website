
"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
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

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ServicesDropdown({
  open,
  isActive,
  onToggle,
  onOpen,
  onClose,
  children,
}: {
  open: boolean;
  isActive: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`nav-dropdown ${open ? "is-open" : ""}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        className={`nav-link nav-dropdown__trigger ${
          isActive ? "is-current" : ""
        }`}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-mega-menu"
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        onFocus={onOpen}
      >
        <span>Services</span>
        <ChevronDown
          aria-hidden="true"
          size={15}
          strokeWidth={1.7}
          className="nav-dropdown__chevron"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="services-mega-menu"
            className="nav-mega-panel"
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 7, scale: 0.99 }}
            transition={{
              duration: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="menu"
            onClick={onClose}
          >
            <div className="nav-mega-panel__intro">
              <p className="nav-mega-panel__eyebrow">
                VRA ASSOCIATES
                <span />
                OUR EXPERTISE
              </p>

              <h2>
                Professional
                <br />
                services, thoughtfully
                <br />
                delivered.
              </h2>

              <p className="nav-mega-panel__description">
                Explore our professional capabilities and find
                the right support for your financial and business
                requirements.
              </p>

              <Link
                href="/services"
                className="nav-mega-panel__all"
              >
                Explore all services
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="nav-mega-panel__content">
              <p className="nav-mega-panel__content-label">
                AREAS OF EXPERTISE
              </p>

              <div className="nav-mega-panel__links">
                {children}
              </div>
            </div>
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
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      closeOnOutsidePointer
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeOnOutsidePointer
      );
    };
  }, []);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header
      ref={headerRef}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenu(null);
          setIsMobileOpen(false);
        }
      }}
      className={`site-header ${
        isScrolled
          ? "site-header--scrolled"
          : "site-header--at-top"
      }`}
    >
      <div className="container site-header__inner">

        {/* Existing brand logo */}
        <Link
          className="wordmark"
          href="/"
          aria-label={`${firm.name} home`}
        >
          <Image
            src={firm.logo}
            alt="VRA Associates, Chartered Accountants"
            width={1898}
            height={829}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
          onClick={() => setOpenMenu(null)}
        >
          <Link
            href="/"
            className={`nav-link ${
              isActivePath(pathname, "/") ? "is-current" : ""
            }`}
            aria-current={
              pathname === "/" ? "page" : undefined
            }
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`nav-link ${
              isActivePath(pathname, "/about")
                ? "is-current"
                : ""
            }`}
            aria-current={
              isActivePath(pathname, "/about")
                ? "page"
                : undefined
            }
          >
            About
          </Link>

          <ServicesDropdown
            open={openMenu === "services"}
            isActive={isServicesActive}
            onToggle={() =>
              setOpenMenu(
                openMenu === "services" ? null : "services"
              )
            }
            onOpen={() => setOpenMenu("services")}
            onClose={() => setOpenMenu(null)}
          >
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
                role="menuitem"
                className={`nav-mega-panel__service ${
                  pathname === `/services/${service.slug}`
                    ? "is-current"
                    : ""
                }`}
                aria-current={
                  pathname === `/services/${service.slug}`
                    ? "page"
                    : undefined
                }
              >
                <span className="nav-mega-panel__number">
                  {service.number}
                </span>

                <span className="nav-mega-panel__service-title">
                  {service.title}
                </span>

                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="nav-mega-panel__service-arrow"
                />
              </Link>
            ))}
          </ServicesDropdown>

          {primaryLinks.slice(1).map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                className={`nav-link ${
                  active ? "is-current" : ""
                }`}
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header actions */}
        <div className="site-header__actions">
          <a
            className="mobile-phone"
            href={`tel:${firm.contactPhone}`}
          >
            {firm.contactPhone}
          </a>

          <Link
            className="button button--small button--nav"
            href="/contact"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight
              size={16}
              aria-hidden="true"
            />
          </Link>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => {
              setIsMobileOpen((current) => !current);
              setOpenMenu(null);
            }}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMobileOpen ? "Close menu" : "Open menu"
            }
          >
            {isMobileOpen ? (
              <X size={23} strokeWidth={1.7} />
            ) : (
              <Menu size={23} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isMobileOpen ? (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="container mobile-menu__inner"
              onClick={() => setIsMobileOpen(false)}
            >
              <Link href="/" className="mobile-menu__link">
                <span>01</span>
                Home
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/about"
                className="mobile-menu__link"
              >
                <span>02</span>
                About
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/services"
                className="mobile-menu__link"
              >
                <span>03</span>
                Services
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/news"
                className="mobile-menu__link"
              >
                <span>04</span>
                News & Insights
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/careers"
                className="mobile-menu__link"
              >
                <span>05</span>
                Careers
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="mobile-menu__link"
              >
                <span>06</span>
                Contact
                <ArrowUpRight size={17} />
              </Link>

              <Link
                className="button button--mobile-menu"
                href="/contact"
              >
                LET&apos;S TALK
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
