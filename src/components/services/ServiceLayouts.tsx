import { ArrowDownRight, Check, FileText, Landmark, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { ServicePageData } from "@/data/service-pages";
import type { Service } from "@/data/site";

type LayoutProps = {
  service: Service;
  page: ServicePageData;
};

function Overview({ page, label = "The brief" }: Pick<LayoutProps, "page"> & { label?: string }) {
  return (
    <section id="service-overview" className="service-overview section-padding">
      <div className="container service-overview__grid service-reveal">
        <p className="eyebrow">{label}</p>
        <div>
          <h2 className="section-heading">Work that starts with the full picture.</h2>
          <p>{page.overview}</p>
        </div>
      </div>
    </section>
  );
}

function Note({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <aside className="service-note container service-reveal">
      <ShieldCheck aria-hidden="true" size={18} />
      <p>{text}</p>
    </aside>
  );
}

function Benefits({ items, title = "What a well-run process can support." }: { items: string[]; title?: string }) {
  return (
    <section className="service-benefits section-padding">
      <div className="container service-benefits__grid">
        <div className="service-benefits__heading service-reveal">
          <p className="eyebrow">In focus</p>
          <h2 className="section-heading">{title}</h2>
        </div>
        <ul className="service-benefits__list service-reveal">
          {items.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
              <Check aria-hidden="true" size={17} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process({ page, className = "" }: Pick<LayoutProps, "page"> & { className?: string }) {
  return (
    <section className={`service-process section-padding ${className}`}>
      <div className="container">
        <div className="service-process__heading service-reveal">
          <p className="eyebrow">How we work</p>
          <h2 className="section-heading">A clear path through the detail.</h2>
        </div>
        <ol className="service-process__steps service-stagger">
          {page.process.map((step, index) => (
            <li className="service-card" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AccountingLayout({ page }: LayoutProps) {
  const [outsourcing, virtualCfo, mis, payroll] = page.modules;
  return (
    <>
      <Overview page={page} label="Accounting, made useful" />
      <section className="accounting-ledger section-padding">
        <div className="container accounting-ledger__grid">
          <article className="accounting-ledger__statement service-reveal">
            <span>01 / Financial operations</span>
            <h2>{outsourcing.title}</h2>
            <p>{outsourcing.description}</p>
            <div className="accounting-ledger__rule" />
            <small>ORDERED RECORDS · CLEARER REVIEW · CONFIDENT DECISIONS</small>
          </article>
          <article className="accounting-ledger__cfo service-card service-reveal">
            <span>02 / Leadership lens</span>
            <h3>{virtualCfo.title}</h3>
            <p>{virtualCfo.description}</p>
            <Sparkles aria-hidden="true" size={24} />
          </article>
          <article className="accounting-ledger__mis service-card service-reveal">
            <span>03 / Reporting rhythm</span>
            <h3>{mis.title}</h3>
            <p>{mis.description}</p>
            <div className="accounting-ledger__bars" aria-hidden="true"><i /><i /><i /><i /></div>
          </article>
        </div>
      </section>
      <section className="accounting-payroll section-padding">
        <div className="container accounting-payroll__grid">
          <div className="accounting-payroll__heading service-reveal">
            <p className="eyebrow eyebrow--light">Payroll, with care</p>
            <h2>{payroll.title}</h2>
            <p>{payroll.description}</p>
          </div>
          <ul className="accounting-payroll__list service-stagger">
            {page.benefits.slice(0, 4).map((item, index) => <li className="service-card" key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
          </ul>
        </div>
      </section>
      <Process page={page} className="service-process--ledger" />
      <Benefits items={page.benefits.slice(4)} title="Professional support, in practical terms." />
    </>
  );
}

export function RegistrationLayout({ page }: LayoutProps) {
  return (
    <>
      <Overview page={page} label="Choose the right foundation" />
      <section className="registration-types section-padding">
        <div className="container">
          <div className="registration-types__heading service-reveal">
            <p className="eyebrow">Entity structures</p>
            <h2 className="section-heading">Build the structure around the business.</h2>
          </div>
          <div className="registration-types__grid service-stagger">
            {page.modules.map((module, index) => (
              <article className="registration-type service-card" key={module.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <ArrowDownRight aria-hidden="true" size={20} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="registration-journey section-padding">
        <div className="container">
          <div className="registration-journey__heading service-reveal">
            <p className="eyebrow eyebrow--light">Incorporation journey</p>
            <h2>From first conversation to the next operational step.</h2>
          </div>
          <ol className="registration-journey__steps service-stagger">
            {page.process.map((step, index) => (
              <li className="service-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Benefits items={page.benefits} title="The registration package can include." />
      <Note text={page.note} />
    </>
  );
}

export function IndirectTaxLayout({ page }: LayoutProps) {
  return (
    <>
      <section id="service-overview" className="indirect-tax-intro section-padding">
        <div className="container indirect-tax-intro__grid">
          <p className="eyebrow service-reveal">GST, connected</p>
          <div className="service-reveal"><span className="indirect-tax-intro__gst">GST</span><h2>{page.overview}</h2></div>
        </div>
      </section>
      <section className="indirect-tax-modules section-padding">
        <div className="container indirect-tax-modules__grid service-stagger">
          {page.modules.map((module, index) => (
            <article className="indirect-tax-module service-card" key={module.title}>
              <div><span>{String(index + 1).padStart(2, "0")}</span><Landmark aria-hidden="true" size={22} /></div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </section>
      <Process page={page} className="service-process--compliance" />
      <Benefits items={page.benefits} title="Compliance that stays connected to the work." />
    </>
  );
}

export function DirectTaxLayout({ page }: LayoutProps) {
  return (
    <>
      <section id="service-overview" className="direct-tax-intro section-padding">
        <div className="container direct-tax-intro__grid">
          <div className="direct-tax-intro__label service-reveal"><Scale aria-hidden="true" size={26} /><span>INCOME TAX<br />INTERNATIONAL TAX</span></div>
          <div className="service-reveal"><p className="eyebrow eyebrow--light">Tax, in context</p><h2>{page.overview}</h2></div>
        </div>
      </section>
      <section className="direct-tax-modules section-padding">
        <div className="container">
          <div className="direct-tax-modules__header service-reveal"><p className="eyebrow">The work in view</p><span>04 SERVICE MODULES + CERTIFICATION SUPPORT</span></div>
          <div className="direct-tax-modules__grid service-stagger">
            {page.modules.map((module, index) => (
              <article className="direct-tax-module service-card" key={module.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="direct-tax-remittance service-reveal">
        <div className="container"><FileText aria-hidden="true" size={27} /><div><p className="eyebrow eyebrow--light">Certification route</p><h2>Section 195 and Form 15CA/CB support begins with a careful review of the proposed remittance.</h2></div></div>
      </section>
      <Benefits items={page.benefits} title="A considered tax position needs the right record." />
      <Note text={page.note} />
    </>
  );
}

export function AuditLayout({ page }: LayoutProps) {
  return (
    <>
      <Overview page={page} label="The assurance view" />
      <section className="audit-categories section-padding">
        <div className="container audit-categories__grid">
          <div className="audit-categories__heading service-reveal"><p className="eyebrow">Engagement types</p><h2 className="section-heading">A review designed for its intended purpose.</h2><div aria-hidden="true" className="audit-categories__stamp">REVIEWED</div></div>
          <div className="audit-categories__list service-stagger">
            {page.modules.map((module, index) => <article className="audit-category service-card" key={module.title}><span>A.{String(index + 1).padStart(2, "0")}</span><div><h3>{module.title}</h3><p>{module.description}</p></div></article>)}
          </div>
        </div>
      </section>
      <Process page={page} className="service-process--audit" />
      <Benefits items={page.benefits} title="The value of a disciplined review." />
    </>
  );
}

export function RiskLayout({ page }: LayoutProps) {
  return (
    <>
      <section id="service-overview" className="risk-intro section-padding">
        <div className="container risk-intro__grid">
          <div className="risk-intro__shape service-parallax" aria-hidden="true"><i /><i /><i /></div>
          <div className="service-reveal"><p className="eyebrow">Proactive, not reactive</p><h2 className="section-heading">{page.overview}</h2></div>
        </div>
      </section>
      <section className="risk-lens section-padding">
        <div className="container">
          <div className="risk-lens__header service-reveal"><span>RISK × OPERATIONS × DECISIONS</span><h2>Find the points where practical change can make a difference.</h2></div>
          <div className="risk-lens__grid service-stagger">
            {page.modules.map((module, index) => <article className="risk-lens__card service-card" key={module.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{module.title}</h3><p>{module.description}</p></article>)}
          </div>
        </div>
      </section>
      <Process page={page} className="service-process--risk" />
      <Benefits items={page.benefits} title="A business case for better visibility." />
    </>
  );
}

export function CorporateLayout({ page }: LayoutProps) {
  return (
    <>
      <section id="service-overview" className="corporate-intro section-padding">
        <div className="container corporate-intro__grid">
          <div className="corporate-intro__seal service-reveal" aria-hidden="true">ATC<br /><span>GOVERNANCE</span></div>
          <div className="service-reveal"><p className="eyebrow">The governance record</p><h2>{page.overview}</h2></div>
        </div>
      </section>
      <section className="corporate-dossiers section-padding">
        <div className="container corporate-dossiers__grid service-stagger">
          {page.modules.map((module, index) => <article className="corporate-dossier service-card" key={module.title}><span>FILE / {String(index + 1).padStart(2, "0")}</span><h3>{module.title}</h3><p>{module.description}</p><FileText aria-hidden="true" size={21} /></article>)}
        </div>
      </section>
      <section className="corporate-journey section-padding">
        <div className="container corporate-journey__grid"><div className="service-reveal"><p className="eyebrow eyebrow--light">A compliance journey</p><h2>Records, approvals and filings working together.</h2></div><ol className="service-stagger">{page.process.map((step, index) => <li className="service-card" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></div>
      </section>
      <Benefits items={page.benefits} title="Governance support with the record in view." />
      <Note text={page.note} />
    </>
  );
}
