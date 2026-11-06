
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

type SocialAccount = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string | null;
};

const socialAccounts: SocialAccount[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Professional insights, firm updates and perspectives.",
    image: "/socials/linkedin.png",
    href: null,
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "A closer look at our people, work and milestones.",
    image: "/socials/instagram.png",
    href: null,
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Stay connected with our latest announcements.",
    image: "/socials/facebook.svg",
    href: null,
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Insights, guidance and financial knowledge.",
    image: "/socials/youtube.svg",
    href: null,
  },
];

export function SocialAccountsSection() {
  return (
    <section
      id="social-accounts"
      className="vra-social-section"
      aria-labelledby="vra-social-heading"
    >
      <div className="container vra-social__container">
        <div className="vra-social__intro">
          <span className="vra-social__eyebrow">
            <i />
            STAY CONNECTED WITH VRA
          </span>

          <h2 id="vra-social-heading">
            The conversation
            <br />
            <em>continues.</em>
          </h2>

          <p>
            Follow our journey for professional insights, important updates
            and perspectives that move businesses forward.
          </p>
        </div>

        <div className="vra-social__list">
          {socialAccounts.map((account, index) => (
            <SocialLink
              key={account.id}
              account={account}
              index={index}
            />
          ))}
        </div>

        <div className="vra-social__bottom-line">
          <span>CONNECT WITH VRA ASSOCIATES</span>
          <span>TRUST. INTEGRITY. EXCELLENCE.</span>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  account,
  index,
}: {
  account: SocialAccount;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Original portfolio spring-based mouse tracking.
  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  const left = useTransform(
    mouseX,
    [0.5, -0.5],
    ["60%", "70%"]
  );

  const top = useTransform(
    mouseY,
    [0.5, -0.5],
    ["40%", "60%"]
  );

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.a
      ref={ref}
      href={account.href ?? undefined}
      target={account.href ? "_blank" : undefined}
      rel={account.href ? "noopener noreferrer" : undefined}
      aria-label={`${account.name}: ${account.description}`}
      aria-disabled={!account.href}
      onMouseMove={handleMove}
      initial="initial"
      whileHover="whileHover"
      className={`vra-social__item ${
        account.href ? "" : "vra-social__item--pending"
      }`}
      style={{ cursor: account.href ? "pointer" : "default" }}
    >
      <div className="vra-social__item-copy">
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="vra-social__name"
        >
          {Array.from(account.name).map((letter, i) => (
            <motion.span
              key={`${account.id}-${i}`}
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="vra-social__letter"
              aria-hidden="true"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>

        <span className="vra-social__description">
          {account.description}
        </span>
      </div>

      {/* Actual portfolio social image with the original hover animation */}
      <motion.div
        aria-hidden="true"
        className="vra-social__preview"
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: {
            scale: 0,
            rotate: "-12deg",
          },
          whileHover: {
            scale: 1,
            rotate: "12deg",
          },
        }}
        transition={{ type: "spring" }}
      >
        <motion.img
          src={account.image}
          alt=""
          draggable={false}
          className="vra-social__preview-image"
        />
      </motion.div>

      {/* Original spring arrow entrance */}
      <motion.div
        aria-hidden="true"
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="vra-social__arrow"
      >
        <ArrowRight />
      </motion.div>

      <span className="vra-social__index" aria-hidden="true">
        0{index + 1}
      </span>
    </motion.a>
  );
}
