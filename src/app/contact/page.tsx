import type { Metadata } from "next";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { ContactHero } from "@/components/contact/ContactHero";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { firm, headOffices } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a confidential conversation with Abhishek Tiwari & Company.",
};

export default function ContactPage() {
  const primaryOffice = headOffices[0];
  const mapQuery = encodeURIComponent(primaryOffice.address);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <>
      <Header />
      <main id="main-content" className="contact-page">
        <ContactHero />
        <section className="contact-details" aria-labelledby="contact-details-title">
          <div className="container contact-details__grid">
            <div>
              <p className="eyebrow">Direct contact</p>
              <h2 id="contact-details-title" className="section-heading">The details for a considered first step.</h2>
            </div>
            <div className="contact-details__cards">
              <a className="contact-details__card" href={`tel:${firm.contactPhone}`}>
                <Phone aria-hidden="true" size={20} />
                <span>Phone</span>
                <strong>{firm.contactPhone}</strong>
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
              {headOffices.map((office) => (
                <a className="contact-details__card contact-details__card--office" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`} target="_blank" rel="noreferrer" key={office.label}>
                  <MapPin aria-hidden="true" size={20} />
                  <span>{office.label}</span>
                  <strong>{office.address}</strong>
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <section id="contact-enquiry" className="contact-page__body">
          <div className="container contact-page__grid">
            <div className="contact-page__form-intro"><p className="eyebrow">Enquiry</p><h2 className="section-heading">How can we help?</h2><p>Share the outline of what you would like to discuss. Secure delivery will be connected before this form is used to send enquiries.</p></div>
            <EnquiryForm />
          </div>
        </section>
        <section className="contact-map" aria-labelledby="contact-map-title">
          <div className="container contact-map__heading">
            <div><p className="eyebrow eyebrow--light">Office location</p><h2 id="contact-map-title">Find our Noida office.</h2></div>
            <div><p>{primaryOffice.address}</p><a href={directionsUrl} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight aria-hidden="true" size={17} /></a></div>
          </div>
          <div className="container contact-map__frame">
            <iframe title={`${primaryOffice.label} location`} src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
        <section className="contact-closing">
          <div className="container contact-closing__inner"><p className="eyebrow eyebrow--light">Prefer to speak first?</p><h2>Start with a confidential call.</h2><a className="button button--gold" href={`tel:${firm.contactPhone}`}>Call {firm.contactPhone} <Phone aria-hidden="true" size={16} /></a></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
