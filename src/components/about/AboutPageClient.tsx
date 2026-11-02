"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import {
  aboutImages,
  aboutPrinciples,
  journeyMilestones,
} from "@/data/about";

import "./AboutPage.css";

const caFaqItems = [
  {
    question: "What services does your Chartered Accountancy firm provide?",
    answer:
      "We can discuss accounting and bookkeeping, income tax, GST compliance, audit and assurance, regulatory compliance and financial advisory services. The exact scope will depend on your requirements and the firm's service offerings.",
  },
  {
    question: "Do you assist with income tax returns and tax planning?",
    answer:
      "Yes, income tax return preparation and tax-planning requirements can be discussed with our team. We review your financial information and applicable requirements before suggesting an appropriate approach.",
  },
  {
    question: "Can you help with GST registration and compliance?",
    answer:
      "We can assess your GST requirements and discuss support for registration, return filing, documentation and ongoing compliance, depending on your business and engagement scope.",
  },
  {
    question: "Do you provide audit and financial reporting services?",
    answer:
      "We can discuss audit requirements, financial statements and reporting support based on your entity type, applicable regulations and the scope of professional engagement.",
  },
  {
    question: "What documents should I bring for my first consultation?",
    answer:
      "Depending on your requirement, useful documents may include PAN details, business registration information, previous tax returns, financial statements, bank records, GST records and relevant notices.",
  },
  {
    question: "How can I book a consultation with your team?",
    answer:
      "You can contact our team through the website to explain your requirements. We will discuss the nature of the engagement, required documents, next steps and applicable professional fees.",
  },
] as const;



type CAPracticeIconType = "tax" | "gst" | "audit" | "accounts";

const caPracticeAreas: {
  label: string;
  title: string;
  description: string;
  icon: CAPracticeIconType;
}[] = [
  {
    label: "DIRECT TAX & PLANNING",
    title: "Taxation & Tax Planning",
    description:
      "Thoughtful guidance on income-tax matters, return preparation and tax planning based on individual and business requirements.",
    icon: "tax",
  },
  {
    label: "GST & REGULATORY",
    title: "GST & Indirect Tax",
    description:
      "Support with GST registration, return filing, reconciliations and ongoing indirect-tax compliance requirements.",
    icon: "gst",
  },
  {
    label: "INDEPENDENT ASSURANCE",
    title: "Audit & Assurance",
    description:
      "A structured approach to financial verification, audit procedures and clear reporting within the applicable professional scope.",
    icon: "audit",
  },
  {
    label: "FINANCIAL MANAGEMENT",
    title: "Accounting & Financial Reporting",
    description:
      "Reliable accounting records, financial statements and practical financial reporting to support informed business decisions.",
    icon: "accounts",
  },
];

function CAPracticeIcon({
  icon,
}: {
  icon: CAPracticeIconType;
}) {
  return (
    <svg
      className="ca-practice-icon"
      viewBox="0 0 121 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {icon === "tax" && (
        <>
          <path
            d="M43 6H66L78 18V51H43V6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M66 6V18H78M51 27H70M51 34H70"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text
            x="60.5"
            y="47"
            textAnchor="middle"
            fontSize="14"
            fill="currentColor"
          >
            ₹
          </text>
        </>
      )}

      {icon === "gst" && (
        <>
          <rect
            x="43"
            y="5"
            width="35"
            height="47"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M43 17H78M50 11H71M50 25H71M50 32H71"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M51 42L56 47L69 35"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {icon === "audit" && (
        <>
          <path
            d="M60.5 5L79 13V26C79 37 71 46 60.5 52C50 46 42 37 42 26V13L60.5 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M51 28L58 35L71 21"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {icon === "accounts" && (
        <>
          <path
            d="M42 49H80M44 49V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="51" y="30" width="7" height="19" stroke="currentColor" strokeWidth="1.5" />
          <rect x="63" y="22" width="7" height="27" stroke="currentColor" strokeWidth="1.5" />
          <rect x="75" y="12" width="7" height="37" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}


export function AboutPageClient() {
  const [activePrinciple, setActivePrinciple] = useState(2);


const [activeFaq, setActiveFaq] = useState<number | null>(null);

const faqAnswerRefs = useRef<(HTMLDivElement | null)[]>([]);

const toggleFaq = (index: number) => {
  const isAlreadyOpen = activeFaq === index;

  // Close the currently open answer.
  if (activeFaq !== null) {
    const previousAnswer = faqAnswerRefs.current[activeFaq];

    if (previousAnswer) {
      gsap.killTweensOf(previousAnswer);

      gsap.to(previousAnswer, {
        height: 0,
        duration: 0.48,
        ease: "power3.inOut",
      });

      const previousText = previousAnswer.querySelector(
        ".ca-faq-answer"
      );

      if (previousText) {
        gsap.killTweensOf(previousText);

        gsap.to(previousText, {
          autoAlpha: 0,
          y: -5,
          duration: 0.22,
          ease: "power2.out",
        });
      }
    }
  }

  // Open the selected answer.
  if (!isAlreadyOpen) {
    const nextAnswer = faqAnswerRefs.current[index];

    if (nextAnswer) {
      gsap.killTweensOf(nextAnswer);

      const answerText = nextAnswer.querySelector(
        ".ca-faq-answer"
      );

      if (answerText) {
        gsap.killTweensOf(answerText);
      }

      gsap.set(nextAnswer, {
        height: 0,
        overflow: "hidden",
      });

      gsap.to(nextAnswer, {
        height: "auto",
        duration: 0.68,
        ease: "power3.inOut",
      });

      if (answerText) {
        gsap.fromTo(
          answerText,
          {
            autoAlpha: 0,
            y: 12,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            delay: 0.12,
            ease: "power2.out",
          }
        );
      }
    }
  }

  setActiveFaq(isAlreadyOpen ? null : index);
};


  const rootRef = useRef<HTMLDivElement>(null);

  const journeyStageRef = useRef<HTMLDivElement>(null);

const journeyDesktopViewportRef = useRef<HTMLDivElement>(null);

const journeyDesktopTrackRef = useRef<HTMLDivElement>(null);


  // Calculate the next two milestone years from the existing timeline.
  const lastMilestone = journeyMilestones[
    journeyMilestones.length - 1
  ] as (typeof journeyMilestones)[number] & {
    year?: string | number;
  };

  const lastYear = Number(lastMilestone?.year);

  const nextYear = Number.isFinite(lastYear)
    ? lastYear + 1
    : 2027;

  // Two additional forward-looking milestones.
  const journeyTimeline = [
    ...journeyMilestones,

    {
      year: String(nextYear),
      label: "FUTURE FOCUS",
      title: "Stronger Financial Clarity",
      image: aboutImages.mission,
      description:
        "A forward-looking focus on financial insight, thoughtful planning and dependable support for growing businesses.",
    },

    {
      year: String(nextYear + 1),
      label: "THE NEXT CHAPTER",
      title: "Confidence for What Comes Next",
      image: aboutImages.vision,
      description:
        "Continuing to simplify accounting, taxation and compliance decisions as client needs evolve.",
    },
  ];


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 1. Story heading entrance
gsap.from(".storyHeading h1, .storyHeading .storyWord", {
  y: 70,
  autoAlpha: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".story",
    start: "top 80%",
    once: true,
  },
});

// 2. Main story image
gsap.from(".storyMedia", {
  y: 70,
  autoAlpha: 0,
  scale: 0.97,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".storyMedia",
    start: "top 85%",
    once: true,
  },
});

// 3. Floating image
gsap.from(".storyMediaDetail", {
  x: 45,
  autoAlpha: 0,
  duration: 1.1,
  delay: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".storyMedia",
    start: "top 80%",
    once: true,
  },
});

// 4. About label
gsap.from(".introductionHead .kicker", {
  y: 20,
  autoAlpha: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".introductionHead",
    start: "top 85%",
    once: true,
  },
});

// 5. Word-by-word scroll reveal
const heading = root.querySelector(
  "#introduction-title"
) as HTMLElement | null;

if (heading) {
  const originalText = heading.textContent?.trim() ?? "";

  const split = new SplitText(heading, {
    type: "words",
    wordsClass: "about-reveal-word",
  });

  heading.setAttribute("aria-label", originalText);

  gsap.set(split.words, {
    opacity: 0.15,
    y: 22,
  });

  gsap.to(split.words, {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      end: "bottom 45%",
      scrub: 1,
    },
  });
}

// 6. Mission, Vision and Philosophy cards
gsap.from(".principle", {
  y: 45,
  autoAlpha: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".principlesLayout",
    start: "top 82%",
    once: true,
  },
});

// 7. Side images
gsap.from(".sideImageLeft", {
  x: -40,
  autoAlpha: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".principlesLayout",
    start: "top 80%",
    once: true,
  },
});

gsap.from(".sideImageRight", {
  x: 40,
  autoAlpha: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".principlesLayout",
    start: "top 80%",
    once: true,
  },
});

// 8. Journey heading
gsap.from(".journeyHead > *", {
  y: 35,
  autoAlpha: 0,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".journeyHead",
    start: "top 85%",
    once: true,
  },
});

// 9. Journey timeline cards
gsap.from(".journeyDesktopCard", {
  autoAlpha: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".journeyDesktopViewport",
    start: "top 90%",
    once: true,
  },
});


// 10. CA Practice section heading reveal
gsap.from(".ca-practice-heading > *", {
  y: 40,
  autoAlpha: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ca-practice-section",
    start: "top 80%",
    once: true,
  },
});

// 11. Practice cards staggered reveal
gsap.from(".ca-practice-card", {
  y: 55,
  autoAlpha: 0,
  duration: 1,
  stagger: 0.16,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ca-practice-grid",
    start: "top 82%",
    once: true,
  },
});



// 10. FAQ heading entrance
gsap.from(".ca-faq-heading", {
  y: 45,
  autoAlpha: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ca-faq",
    start: "top 80%",
    once: true,
  },
});

// 11. Expert consultation card entrance
gsap.from(".ca-faq-expert-card", {
  y: 45,
  autoAlpha: 0,
  duration: 1,
  delay: 0.12,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ca-faq",
    start: "top 80%",
    once: true,
  },
});

// 12. FAQ questions staggered entrance
gsap.from(".ca-faq-item", {
  y: 30,
  autoAlpha: 0,
  duration: 0.85,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".ca-faq-list",
    start: "top 85%",
    once: true,
  },
});

    }, root);

    // Desktop: pinned horizontal journey
const desktopMedia = gsap.matchMedia();


desktopMedia.add("(min-width: 900px)", () => {
  const stage = journeyStageRef.current;
  const viewport = journeyDesktopViewportRef.current;
  const track = journeyDesktopTrackRef.current;

  if (!stage || !viewport || !track) return;

  const getDistance = () =>
    Math.max(0, track.scrollWidth - viewport.clientWidth);

  const tween = gsap.to(track, {
    x: () => -getDistance(),
    ease: "none",

    scrollTrigger: {
      trigger: viewport,
      start: "top top+=88",
      end: () => `+=${getDistance()}`,
      scrub: 1,
      pin: viewport,
      
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const refreshId = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    cancelAnimationFrame(refreshId);
    tween.scrollTrigger?.kill();
    tween.kill();
  };
});


return () => {
  desktopMedia.revert();
  ctx.revert();
};
  }, []);

  return (
    <div className="about-page" ref={rootRef}>
      
<section className="story" aria-labelledby="story-title">
  <div className="storyHeading">
    <h1 id="story-title">Our</h1>
    <span aria-hidden="true" />
    <div className="storyWord">Story</div>
  </div>

  <div className="storyMedia">
    <Image
      src={aboutImages.hero}
      alt="Modern minimalist glass-fronted building"
      fill
      priority
      sizes="100vw"
      className="storyMainImage"
    />

    <div className="storyMediaDetail" aria-hidden="true">
      <Image
        src={aboutImages.heroDetail}
        alt=""
        fill
        sizes="(max-width: 700px) 48vw, 28vw"
      />
    </div>
  </div>
</section>


      <section className="introduction" aria-labelledby="introduction-title">
        <div className="introductionHead">
          <p className="kicker">About</p>
          <h2 id="introduction-title">Professional support that brings perspective to every decision.</h2>
        </div>

        <div className="principlesLayout">
          <figure className="sideImage sideImageLeft">
            <Image src={aboutImages.mission} alt="Professionals collaborating around a table" fill sizes="(max-width: 899px) 100vw, 28vw" />
          </figure>

          <div className="principles" aria-label="Mission, vision and philosophy">
            {aboutPrinciples.map(({ title, description, Icon }, index) => {
              const active = index === activePrinciple;
              return (
                <button
                  className={`principle ${active ? "principleActive" : ""}`}
                  key={title}
                  type="button"
                  onClick={() => setActivePrinciple(index)}
                  aria-pressed={active}
                >
                  <span className="principleTitle"><Icon aria-hidden="true" size={27} strokeWidth={1.5} />{title}</span>
                  <span className="principleDescription">{description}</span>
                  <span className="principleAction" aria-hidden="true">{active ? "−" : "+"}</span>
                </button>
              );
            })}
          </div>

          <figure className="sideImage sideImageRight">
            <Image src={aboutImages.vision} alt="A bright modern workplace with space for focused work" fill sizes="(max-width: 899px) 100vw, 28vw" />
          </figure>
        </div>
      </section>
      {/* CA Expertise Marquee */}
<section className="ca-expertise" aria-label="Our professional expertise">
  <h2 className="ca-expertise-title">
    Expertise That Inspires Confidence
  </h2>

  <div className="ca-marquee">
    <div className="ca-marquee-track">
      {[0, 1].map((group) => (
        <div
          className="ca-marquee-group"
          key={group}
          aria-hidden={group === 1 ? "true" : undefined}
        >
          {[
            "Accounting & Bookkeeping",
            "GST & Taxation",
            "Audit & Assurance",
            "Financial Reporting",
            "Corporate Compliance",
            "Business Advisory",
          ].map((item) => (
            <span className="ca-marquee-item" key={item}>
              <span className="ca-marquee-symbol">✦</span>
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>

      
<section className="journey" aria-labelledby="journey-title">

  <div className="journeyStage" ref={journeyStageRef}>

    {/* Journey heading */}
    <div className="journeyHead">
      <p className="kicker">Journey</p>
      <h2 id="journey-title">Our Journey</h2>
    </div>

    {/* DESKTOP HORIZONTAL TIMELINE */}
    <div
      className="journeyDesktopViewport"
      ref={journeyDesktopViewportRef}
    >
      <div
        className="journeyDesktopTrack"
        ref={journeyDesktopTrackRef}
      >

        <div
          className="journeyDesktopRail"
          aria-hidden="true"
        />

        {journeyTimeline.map((milestone, index) => {

          const year =
  "year" in milestone && milestone.year != null
    ? String(milestone.year)
    : String(index + 1);

          const cardSide =
            index % 2 === 0 ? "bottom" : "top";

          return (
            <article
              className="journeyDesktopItem"
              data-card-side={cardSide}
              key={milestone.title}
            >
              <span
                className="journeyDesktopStem"
                aria-hidden="true"
              />

              <span
                className="journeyDesktopDot"
                aria-hidden="true"
              />

              <span className="journeyDesktopYear">
                {year}
              </span>

              <div className="journeyDesktopCard">

                <p className="journeyDesktopLabel">
                  {milestone.label}
                </p>

                <h3>{milestone.title}</h3>

                <div className="journeyDesktopImage">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    sizes="(max-width: 1200px) 36vw, 500px"
                  />
                </div>

                <p className="journeyDesktopDescription">
                  {milestone.description}
                </p>

              </div>
            </article>
          );
        })}

      </div>
    </div>

    {/* MOBILE INFINITE MARQUEE */}
    <div
      className="journeyMobileViewport"
      aria-label="Our company journey"
    >
      <div className="journeyMobileTrack">

        {[0, 1].map((copyIndex) => (
          <div
            className="journeyMobileGroup"
            key={copyIndex}
            aria-hidden={copyIndex === 1 ? true : undefined}
          >

            {journeyTimeline.map((milestone, index) => {

              const year =
  "year" in milestone && milestone.year != null
    ? String(milestone.year)
    : String(index + 1);

              return (
                <article
                  className="journeyMobileItem"
                  key={`${copyIndex}-${milestone.title}`}
                >

                  <div className="journeyMobileMarker">

                    <span className="journeyMobileStem" />

                    <span className="journeyMobileDot" />

                    <span className="journeyMobileYear">
                      {year}
                    </span>

                  </div>

                  <div className="journeyMobileCard">

                    <p className="journeyMobileLabel">
                      {milestone.label}
                    </p>

                    <h3>{milestone.title}</h3>

                    <div className="journeyMobileImage">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        sizes="78vw"
                      />
                    </div>

                    <p className="journeyMobileDescription">
                      {milestone.description}
                    </p>

                  </div>

                </article>
              );
            })}

          </div>
        ))}

      </div>
    </div>

  </div>

</section>




{/* =========================================
    CA PROFESSIONAL EXPERTISE SECTION
========================================= */}

<section
  className="ca-practice-section"
  aria-labelledby="ca-practice-title"
>
  <div className="ca-practice-container">

    {/* Section heading */}

    <div className="ca-practice-heading">

      <div className="ca-practice-badge">
        <span className="ca-practice-diamond" />
        <p>CA Practice Areas</p>
      </div>

      <h2 id="ca-practice-title">
        Our Professional Expertise
      </h2>

    </div>

    {/* Expertise cards */}

    <div className="ca-practice-grid">

      {caPracticeAreas.map((area, index) => (

        <article
          className="ca-practice-card"
          key={area.title}
        >

          <div className="ca-practice-card-top">

            <span className="ca-practice-number">
              0{index + 1}
            </span>

            <span className="ca-practice-label">
              {area.label}
            </span>

          </div>

          <CAPracticeIcon icon={area.icon} />

          <div className="ca-practice-card-content">

            <h3>{area.title}</h3>

            <p>{area.description}</p>

          </div>

        </article>

      ))}

    </div>

  </div>
</section>


{/* =====================================
    CA FAQ SECTION
===================================== */}

<section className="ca-faq" aria-labelledby="ca-faq-title">

  <div className="ca-faq-container">

    <div className="ca-faq-grid">

      {/* LEFT COLUMN */}

      <div className="ca-faq-left">

        <div className="ca-faq-heading">

          <p className="kicker">FAQ</p>

          <h2 id="ca-faq-title">
            Question &amp;
            <br />
            Answer
          </h2>

        </div>

        {/* EXPERT CONTACT CARD */}

        <div className="ca-faq-expert-card">

          <Image
            src="https://cdn.prod.website-files.com/6a9ea08c02c28ae8aa38c434/6aa2639cedc164171323bd7f_Image%20(Design%20yours)%20(11).webp"
            alt="Professional portrait for consultation"
            width={56}
            height={56}
            unoptimized
            className="ca-faq-avatar"
          />

          <div className="ca-faq-expert-row">

            <div className="ca-faq-expert-copy">

              <p>Let&apos;s help you</p>

              <p>Talk to a CA Expert</p>

            </div>

            <Link
              href="/contact"
              className="ca-faq-expert-link"
              aria-label="Contact our CA expert"
            >

              <span className="ca-faq-arrow-window">

                <span className="ca-faq-arrow-track">

                  {[0, 1].map((item) => (
                    <svg
                      key={item}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M18.5 12H5M13 6C13 6 19 10.4 19 12S13 18 13 18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}

                </span>

              </span>

            </Link>

          </div>

        </div>

      </div>

      {/* RIGHT COLUMN — FAQ ACCORDION */}

      <div className="ca-faq-list">

        {caFaqItems.map((item, index) => {

          const isOpen = activeFaq === index;

          return (

            <article
              className={`ca-faq-item ${isOpen ? "is-open" : ""}`}
              key={item.question}
            >

              <button
                type="button"
                className="ca-faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`ca-faq-answer-${index}`}
              >

                <span className="ca-faq-question-text">
                  {item.question}
                </span>

                <span
                  className="ca-faq-icon"
                  aria-hidden="true"
                >

                  <span className="ca-faq-icon-horizontal" />

                  <span className="ca-faq-icon-vertical" />

                </span>

              </button>

              <div
                id={`ca-faq-answer-${index}`}
                className="ca-faq-answer-wrap"
                ref={(element) => {
                  faqAnswerRefs.current[index] = element;
                }}
                role="region"
                aria-labelledby={`ca-faq-question-${index}`}
                aria-hidden={!isOpen}
              >

                <p
                  id={`ca-faq-question-${index}`}
                  className="ca-faq-answer"
                >
                  {item.answer}
                </p>

              </div>

            </article>

          );

        })}

      </div>

    </div>

  </div>

</section>


    </div>
  );
}
