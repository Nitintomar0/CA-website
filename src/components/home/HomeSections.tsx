import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { headOffices, partners } from "@/data/site";
import BranchesSectionClient from "./BranchesSectionClient";

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Professional services overview">
      <div className="container trust-strip__inner">
        <p>Measured work. Clear thinking. A reliable view forward.</p>
        <div><span>Accounting</span><span>Taxation</span><span>Assurance</span><span>Advisory</span></div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="about section-padding" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__visual">
          <Image src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1500&q=86" alt="Modern office designed for focused professional work" fill sizes="(max-width: 899px) 100vw, 48vw" />
          <span>Clarity,<br />considered.</span>
        </div>
        <div className="about__content">
          <p className="eyebrow">About the firm</p>
          <h2 className="section-heading" id="about-title">A Trusted Partner Beyond the Numbers.</h2>
          <p className="body-copy">We bring accounting, taxation, assurance and business advisory into a single, considered conversation—so the work is not only complete, but genuinely useful to the decisions in front of you.</p>
          <p className="about__detail">Careful analysis is only the start. What matters is translating it into a clear next step.</p>
          <Link className="text-button" href="/about">Discover Our Firm <ArrowUpRight aria-hidden="true" size={17} /></Link>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const principles = [
    ["01", "Integrity", "A professional approach rooted in care, discretion and responsibility."],
    ["02", "Attention to detail", "Disciplined work on the details that shape the larger picture."],
    ["03", "Clear communication", "Complex obligations explained in a way that supports confident action."],
    ["04", "Confidentiality", "A considered, respectful approach to the information entrusted to us."],
    ["05", "Business-focused guidance", "Advice grounded in the reality, direction and priorities of your work."],
    ["06", "Long-term relationships", "Professional support designed to stay useful as your needs evolve."],
  ];
  return (
    <section className="principles" aria-labelledby="principles-title">
      <div className="container principles__grid">
        <div className="principles__intro">
          <p className="eyebrow eyebrow--light">Why choose us</p>
          <h2 className="section-heading section-heading--light" id="principles-title">A professional relationship built on clarity.</h2>
          <p>Technical care works best when paired with a genuine understanding of the people and businesses it serves.</p>
        </div>
        <div className="principles__list">
          {principles.map(([number, title, copy]) => <article className="principle" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight aria-hidden="true" size={18} /></article>)}
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="team section-padding" aria-labelledby="team-title">
      <div className="container">
        <div className="team__heading"><p className="eyebrow">Founding partners</p><h2 className="section-heading" id="team-title">The People Behind the Perspective</h2><p className="body-copy">A leadership team bringing distinct focus across assurance, taxation and business advisory.</p></div>
        <div className="partner-grid">
          {partners.map((partner, index) => <article className="partner-card" key={partner.name}>
            <div className={`partner-card__portrait partner-card__portrait--${index + 1}`} aria-label={`Portrait placeholder for ${partner.name}`}><span>{partner.initials}</span><small>Portrait field</small></div>
            <div className="partner-card__body"><p>Founder Partner</p><h3>{partner.name}</h3><span className="partner-card__role">{partner.role}</span><div className="partner-card__meta"><span>{partner.experience}<small>Experience</small></span><span>{partner.qualifications.join(" · ")}<small>Qualifications</small></span></div></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}

export function BranchesSection() {
  return <BranchesSectionClient />;
}

export function OfficesSection() {
  return (
    <section className="offices section-padding" aria-labelledby="offices-title">
      <div className="container"><div className="section-intro"><div><p className="eyebrow">Head offices</p><h2 className="section-heading" id="offices-title">A considered place to begin.</h2></div><p className="body-copy">Visit us at either office for a focused conversation about the work in front of you.</p></div>
        <div className="office-grid">{headOffices.map((office) => <article className="office-card" key={office.label}><div className="office-card__image"><Image src={office.image} alt="Professional office architecture" fill sizes="(max-width: 899px) 100vw, 50vw" /></div><div className="office-card__body"><p>{office.label}</p><h3>{office.address}</h3><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`} target="_blank" rel="noreferrer">Get Directions <ArrowUpRight aria-hidden="true" size={17} /></a></div></article>)}</div>
      </div>
    </section>
  );
}

export function ApproachSection() {
  const steps = [["01", "Understand", "Start with the context, priorities and objective."], ["02", "Assess", "Review the relevant information and practical requirements."], ["03", "Advise", "Set out options and next steps with clarity."], ["04", "Execute", "Deliver the agreed work with care and momentum."]];
  return <section className="approach section-padding" aria-labelledby="approach-title"><div className="container"><div className="section-intro"><div><p className="eyebrow">Our approach</p><h2 className="section-heading" id="approach-title">Good advice has a clear sequence.</h2></div><p className="body-copy">A simple process that keeps the work purposeful and the conversation open.</p></div><ol className="approach__steps">{steps.map(([number, title, copy]) => <li key={number}><span>{number}</span><Check aria-hidden="true" size={18} /><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>;
}

export function InsightsSection() {
  const articles = [["Practice note", "Keeping business information decision-ready", "An editable preview for a future firm-authored article."], ["Perspective", "Making room for better questions", "An editable preview for a future firm-authored article."], ["Guide", "A considered start to business structure", "An editable preview for a future firm-authored article."]];
  return <section className="insights section-padding" id="insights" aria-labelledby="insights-title"><div className="container"><div className="section-intro"><div><p className="eyebrow">News & insights</p><h2 className="section-heading" id="insights-title">Ideas for the work ahead.</h2></div><p className="body-copy">Configurable editorial previews for future firm-authored insight.</p></div><div className="insights__grid">{articles.map(([category, title, copy], index) => <article className="insight" key={title}><div className={`insight__visual insight__visual--${index + 1}`}><span>0{index + 1}</span></div><div className="insight__body"><p>{category}</p><h3>{title}</h3><span>{copy}</span><Link href="/news">Read Article <ArrowUpRight aria-hidden="true" size={16} /></Link></div></article>)}</div><Link className="text-button insights__more" href="/news">View All Insights <ArrowRight aria-hidden="true" size={17} /></Link></div></section>;
}

