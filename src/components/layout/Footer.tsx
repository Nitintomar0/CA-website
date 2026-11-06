
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aboutLinks, firm, headOffices, services } from "@/data/site";

const marqueeItems = [
  "TRUST",
  "INTEGRITY",
  "EXCELLENCE",
  "CLARITY",
  "ACCOUNTABILITY",
];

export function Footer() {
  return (
    <footer className="vra-footer">
      <div className="vra-footer__ambient" aria-hidden="true" />

      <div className="container vra-footer__container">

        {/* Brand statement */}
        <section className="vra-footer__intro">
          <div className="vra-footer__eyebrow">
            <span />
            THE VRA PHILOSOPHY
          </div>

          <h2 className="vra-footer__headline">
            Clarity in numbers.
            <br />
            <span>Confidence in every decision.</span>
          </h2>

          <p className="vra-footer__intro-copy">
            Thoughtful financial expertise. Meaningful relationships.
            A clearer way forward for your business.
          </p>
        </section>

        {/* Infinite marquee */}
        <div className="vra-footer__marquee" aria-label="Trust, integrity, excellence, clarity and accountability">
          <div className="vra-footer__marquee-track">
            {[0, 1].map((copy) => (
              <div className="vra-footer__marquee-group" key={copy} aria-hidden={copy === 1}>
                {marqueeItems.map((item) => (
                  <span className="vra-footer__marquee-item" key={item}>
                    {item}
                    <i>✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Glass contact panel */}
        <section className="vra-footer__contact">
          <div className="vra-footer__contact-glow" aria-hidden="true" />

          <div className="vra-footer__contact-content">
            <span className="vra-footer__label">
              A BETTER WAY FORWARD STARTS HERE
            </span>

            <h2>
              Let's make your
              <br />
              next move <em>count.</em>
            </h2>

            <p>
              Have a financial, taxation or business advisory requirement?
              Let's start a conversation.
            </p>
          </div>

          <Link href="/contact" className="vra-footer__contact-button">
            <span>Start a conversation</span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </section>

        {/* Footer navigation */}
        <section className="vra-footer__links">

          <div className="vra-footer__brand">
            <Link href="/" className="vra-footer__logo">
              <Image
                src={firm.logo}
                alt="VRA Associates"
                width={1898}
                height={829}
              />
            </Link>

            <p>
              Accounting, taxation, assurance and business advisory
              shaped around clearer decisions and lasting relationships.
            </p>

            <span className="vra-footer__brand-caption">
              CHARTERED ACCOUNTANTS
              <i />
              TAXATION
              <i />
              ADVISORY
            </span>
          </div>

          <div className="vra-footer__column">
            <span className="vra-footer__label">EXPLORE</span>
            <Link href="/">Home</Link>
            <Link href="/news">News & Insights</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="vra-footer__column">
            <span className="vra-footer__label">THE FIRM</span>
            {aboutLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="vra-footer__column vra-footer__expertise">
            <span className="vra-footer__label">OUR EXPERTISE</span>
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                {service.title}
                <MoveUpRight size={13} aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="vra-footer__offices">
            <span className="vra-footer__label">OUR LOCATIONS</span>

            {headOffices.map((office) => (
              <div className="vra-footer__office" key={office.label}>
                <h3>
                  {office.label.replace("Head Office — ", "")}
                </h3>
                <p>{office.address}</p>
              </div>
            ))}
          </div>

        </section>

        {/* Bottom bar */}
        <div className="vra-footer__bottom">
          <Link href="/" className="vra-footer__bottom-mark" aria-label="VRA Associates home">
            VRA<span>.</span>
          </Link>

          <p>
            © 2026 {firm.name}. All rights reserved.
          </p>

          <span className="vra-footer__signature">
            BUILT ON TRUST. GUIDED BY CLARITY.
          </span>

          <div className="vra-footer__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
