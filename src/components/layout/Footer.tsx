
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aboutLinks, firm, headOffices, services } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">

        <div className="footer-top">
          <div className="footer-brand">
            <Link className="wordmark wordmark--footer" href="/">
              <Image
                src={firm.logo}
                alt="Abhishek Tiwari & Company, Chartered Accountants"
                width={1898}
                height={829}
              />
            </Link>

            <p>
              Accounting, taxation, assurance and business advisory
              shaped around clearer decisions and lasting relationships.
            </p>

            <span className="footer-brand__meta">
              CHARTERED ACCOUNTANTS
              <i />
              TAXATION
              <i />
              ADVISORY
            </span>
          </div>

          <div className="footer-contact">
            <p className="footer-label">LET&apos;S CONNECT</p>

            <h2>
              Have something important
              to discuss?
            </h2>

            <Link href="/contact" className="footer-contact__link">
              <span>Start a conversation</span>
              <ArrowUpRight aria-hidden="true" size={19} />
            </Link>

            <p className="footer-contact__detail">
              {firm.contactLabel}
            </p>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-links">

          <div className="footer-nav-column">
            <p className="footer-label">EXPLORE</p>
            <Link href="/">Home</Link>
            <Link href="/news">News & Insights</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-nav-column">
            <p className="footer-label">THE FIRM</p>
            {aboutLinks.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-services">
            <p className="footer-label">OUR EXPERTISE</p>
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                {service.title}
                <ArrowUpRight aria-hidden="true" size={12} />
              </Link>
            ))}
          </div>

          <div className="footer-offices">
            <p className="footer-label">OUR LOCATIONS</p>

            {headOffices.map((office) => (
              <div key={office.label}>
                <strong>
                  {office.label.replace("Head Office — ", "")}
                </strong>
                <p>{office.address}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © 2026 {firm.name}.
            All rights reserved.
          </p>

          <span className="footer-bottom__signature">
            BUILT ON TRUST. GUIDED BY CLARITY.
          </span>

          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
