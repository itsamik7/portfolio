import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import Lenis from "lenis";
import { portfolio, imagePath, type Project } from "./content";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- shared bits ---------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({
  label,
  top,
  bottom,
}: {
  label: string;
  top: string;
  bottom?: string;
}) {
  return (
    <div className="section-head">
      <Reveal>
        <p className="section-label">{label}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="section-title">
          {top}
          {bottom && (
            <>
              <br />
              {bottom}
            </>
          )}
        </h2>
      </Reveal>
    </div>
  );
}

// Image with graceful fallback: if the file is missing from
// public/images/, show a tasteful placeholder with the project name.
function SmartImage({
  filename,
  alt,
  label,
  className,
  eager = false,
}: {
  filename: string;
  alt: string;
  label: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (!filename || failed) {
    return (
      <div className={`img-placeholder ${className ?? ""}`} role="img" aria-label={alt}>
        <span className="img-placeholder-name">{label}</span>
      </div>
    );
  }
  return (
    <img
      src={imagePath(filename)}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}

// Counts up a leading number ("300+", "~15%") when scrolled into view.
function CountUp({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const match = text.match(/^([^\d]*)(\d+)(.*)$/);

  useEffect(() => {
    if (!inView || !match || !ref.current) return;
    const target = parseInt(match[2], 10);
    if (reduce) {
      ref.current.textContent = text;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${match[1]}${Math.round(v)}${match[3]}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, text, match]);

  if (!match) return <span ref={ref}>{text}</span>;
  return (
    <span ref={ref} className="countup">
      {reduce ? text : `${match[1]}0${match[3]}`}
    </span>
  );
}

/* ---------- custom cursor (desktop only) ---------- */

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-cursor]");
      setLabel(el ? (el as HTMLElement).dataset.cursor || "" : "");
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className={`cursor ${label ? "cursor--label" : ""}`}
      style={{ left: sx, top: sy }}
      aria-hidden="true"
    >
      {label && <span className="cursor-text">{label}</span>}
    </motion.div>
  );
}

/* ---------- editorial marquee ---------- */

function Marquee() {
  const items = portfolio.marquee;
  return (
    <div className="marquee" aria-hidden="true" data-testid="marquee">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div className="marquee-half" key={half}>
            {items.map((t) => (
              <span className="marquee-item" key={`${half}-${t}`}>
                {t}
                <span className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- magnetic hover wrapper ---------- */

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ---------- navigation ---------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <nav className="nav-links" aria-label="Primary">
          {portfolio.nav.links.map((l) => (
            <a key={l.href} href={l.href} data-testid={`nav-link-${l.label.toLowerCase()}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta" data-testid="nav-cta">
          {portfolio.nav.cta}
        </a>
        <button
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          data-testid="nav-menu-button"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="mobile-menu"
          >
            <nav aria-label="Mobile">
              {portfolio.nav.links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="mobile-menu-cta"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
              >
                {portfolio.nav.cta} →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- 01 hero ---------- */

function Hero() {
  const reduce = useReducedMotion();
  const { hero, personal } = portfolio;
  const sectionRef = useRef<HTMLElement>(null);

  // scroll parallax: name drifts up, portrait sinks, hero fades out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yName = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  // 3D tilt on the portrait (desktop pointer only)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sTiltX = useSpring(tiltX, { stiffness: 120, damping: 16 });
  const sTiltY = useSpring(tiltY, { stiffness: 120, damping: 16 });

  const onTilt = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // signature on-load moment: masked line-by-line reveal with a slight rotation
  const line = (text: string, delay: number) => (
    <span className="hero-line-mask">
      <motion.span
        className="hero-line"
        initial={reduce ? { opacity: 0 } : { y: "112%", rotate: 3, opacity: 1 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section id="home" className="hero section--dark" ref={sectionRef}>
      <motion.div className="hero-grid" style={reduce ? undefined : { opacity: heroOpacity }}>
        <motion.div className="hero-text" style={reduce ? undefined : { y: yName }}>
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.label}
          </motion.p>
          <h1 className="hero-name">
            {line(personal.firstName, 0.25)}
            {line(personal.lastName, 0.42)}
          </h1>
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
          >
            {personal.role}
          </motion.p>
          <motion.p
            className="hero-headline"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          >
            “{hero.headline}”
          </motion.p>

          <motion.div
            className="hero-edu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <p className="hero-edu-school">{hero.education.school}</p>
            <p className="hero-edu-program">{hero.education.program}</p>
            <p className="hero-edu-meta">
              {hero.education.dates} · {hero.education.location}
            </p>
          </motion.div>

          <Magnetic>
            <motion.a
              href="#experience"
              className="btn-primary"
              data-cursor="EXPLORE"
              data-testid="hero-cta"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.8, ease: EASE }}
            >
              {hero.cta} <span className="btn-arrow">↓</span>
            </motion.a>
          </Magnetic>
        </motion.div>

        <div className="hero-portrait" onMouseMove={onTilt} onMouseLeave={resetTilt}>
          <motion.div
            className="hero-portrait-frame"
            style={{
              y: reduce ? 0 : yPortrait,
              rotateX: sTiltX,
              rotateY: sTiltY,
              transformPerspective: 900,
            }}
            initial={{ clipPath: reduce ? undefined : "inset(100% 0 0 0)", opacity: reduce ? 0 : 1 }}
            animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
            transition={{ delay: 0.55, duration: 1.2, ease: EASE }}
          >
            <SmartImage
              filename={hero.profileImage}
              alt="Portrait of Amitesh Kumar"
              label={personal.name}
              className="hero-portrait-img"
              eager
            />
          </motion.div>
          {hero.annotations.map((word, i) => (
            <motion.span
              key={word}
              className={`hero-note hero-note--${i}`}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.12, duration: 0.6, ease: EASE }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span>SCROLL</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}

/* ---------- 02 about ---------- */

function Orbit() {
  const { about, personal } = portfolio;
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 50, damping: 16 });
  const sry = useSpring(ry, { stiffness: 50, damping: 16 });
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };

  return (
    <div
      className="orbit-wrap"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div className="orbit" style={{ rotateX: srx, rotateY: sry }}>
        <div className="orbit-ring" />
        <div className="orbit-words">
          {about.cycle.map((word, i) => {
            const angle = i * (360 / about.cycle.length);
            return (
              <span
                key={word}
                className="orbit-word"
                style={{
                  transform: `rotate(${angle}deg) translateY(calc(var(--orbit-radius) * -1)) rotate(${-angle}deg)`,
                }}
              >
                <span className="orbit-word-inner">{word}</span>
              </span>
            );
          })}
        </div>
        <div className="orbit-center">{personal.initials}</div>
      </motion.div>
    </div>
  );
}

function About() {
  const { about } = portfolio;
  return (
    <section id="about" className="section section--light">
      <div className="container about-grid">
        <div>
          <SectionHead label={about.label} top={about.headlineTop} bottom={about.headlineBottom} />
          <Reveal delay={0.15}>
            <p className="about-text">{about.description}</p>
          </Reveal>
          <div className="manifesto" data-testid="manifesto">
            {about.manifesto.map((m, i) => (
              <Reveal key={m.n} delay={0.2 + i * 0.07}>
                <div className="manifesto-item">
                  <span className="manifesto-num">{m.n}</span>
                  <div>
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.2} className="about-orbit">
          <Orbit />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 04 experience ---------- */

function Experience() {
  const { experience } = portfolio;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="section section--light">
      <div className="container">
        <SectionHead
          label={experience.label}
          top={experience.headlineTop}
          bottom={experience.headlineBottom}
        />
        <div className="exp-list">
          {experience.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.company + item.role} delay={0.04 * i}>
                <div className={`exp-item ${isOpen ? "exp-item--open" : ""}`}>
                  <button
                    className="exp-header"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    data-testid={`exp-toggle-${i}`}
                  >
                    <div className="exp-header-main">
                      <h3 className="exp-company">{item.company}</h3>
                      <p className="exp-role">{item.role}</p>
                      <p className="exp-dates">
                        {item.dates} · {item.location}
                      </p>
                    </div>
                    <span
                      className={`exp-chevron ${isOpen ? "exp-chevron--open" : ""}`}
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="exp-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <div className="exp-body-inner">
                          {item.points && (
                            <ul className="exp-points">
                              {item.points.map((pt) => (
                                <li key={pt}>{pt}</li>
                              ))}
                            </ul>
                          )}
                          {item.focus && (
                            <div className="timeline-tags">
                              {item.focus.map((f) => (
                                <span key={f} className="tag tag--outline">
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.impact && (
                            <ul className="timeline-impact">
                              {item.impact.map((imp) => (
                                <li key={imp}>{imp}</li>
                              ))}
                            </ul>
                          )}
                          {item.link && (
                            <a
                              className="exp-link"
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid={`exp-link-${i}`}
                            >
                              Visit website ↗
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 ventures ---------- */

function Ventures() {
  const { ventures } = portfolio;
  const v = ventures.venture;
  return (
    <section id="ventures" className="section section--dark section--venture">
      <div className="container">
        <SectionHead label={ventures.label} top={ventures.headlineTop} bottom={ventures.headlineBottom} />
        <div className="venture-grid">
          <Reveal className="venture-media-wrap">
            <div className="venture-media">
              <SmartImage
                filename={v.image}
                alt={`${v.name} venture visual`}
                label={v.name}
                className="venture-img"
              />
              <span className="venture-note">{v.annotation}</span>
            </div>
          </Reveal>
          <div className="venture-content">
            <Reveal delay={0.1}>
              <p className="venture-role">
                {v.role} · {v.dates} · {v.location}
              </p>
              <h3 className="venture-name">{v.name}</h3>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="venture-facts">
                {v.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="venture-metrics">
                {v.metrics.map((m) => (
                  <div key={m.label} className="venture-metric">
                    <span className="venture-metric-value">
                      <CountUp text={m.value} />
                    </span>
                    <span className="venture-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- leadership ---------- */

function Leadership() {
  const { leadership } = portfolio;
  return (
    <section className="section section--dark section--leadership">
      <div className="container">
        <Reveal>
          <p className="section-label">{leadership.label}</p>
        </Reveal>
        <div className="leadership-grid">
          {leadership.items.map((l, i) => (
            <Reveal key={l.org} delay={0.08 * i}>
              <div className="leadership-item" data-testid={`leadership-item-${i}`}>
                <p className="leadership-meta">
                  {l.dates} · {l.location}
                </p>
                <h3 className="leadership-org">{l.org}</h3>
                <p className="leadership-role">{l.role}</p>
                <ul className="leadership-points">
                  {l.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 skills ---------- */

function Skills() {
  const { skills } = portfolio;
  return (
    <section className="section section--light">
      <div className="container">
        <SectionHead label={skills.label} top={skills.headlineTop} bottom={skills.headlineBottom} />
        <div className="skills-grid">
          <Reveal>
            <p className="skills-group-label">BUSINESS</p>
            <div className="skills-tags">
              {skills.business.map((s) => (
                <span key={s} className="tag" data-testid={`skill-business-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="skills-group-label">TECHNICAL</p>
            <div className="skills-tags">
              {skills.technical.map((s) => (
                <span key={s} className="tag" data-testid={`skill-technical-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 beyond work ---------- */

function Beyond() {
  const { beyond } = portfolio;
  return (
    <section className="section section--light section--beyond">
      <div className="container">
        <Reveal>
          <p className="section-label">{beyond.label}</p>
        </Reveal>
        <div className="beyond-row">
          {beyond.items.map((b, i) => (
            <Reveal key={b.title} delay={0.08 * i}>
              <div className="beyond-item">
                <span className="beyond-title">{b.title}</span>
                <span className="beyond-note">{b.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 contact + footer ---------- */

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

function Contact() {
  const { contact, personal, footer } = portfolio;
  return (
    <section id="contact" className="section section--dark section--contact">
      <div className="container">
        <Reveal>
          <p className="section-label">{contact.label}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="contact-title">
            {contact.headlineTop}
            <br />
            {contact.headlineBottom}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="contact-copy">{contact.copy}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="contact-icons">
            <a
              href={`mailto:${personal.email}`}
              className="contact-icon"
              aria-label={`Email ${personal.name}`}
              data-cursor="OPEN"
              data-testid="contact-email-link"
            >
              <span className="contact-icon-circle">
                <MailIcon />
              </span>
              <span className="contact-icon-label">EMAIL</span>
            </a>
            <a
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              className="contact-icon"
              aria-label={`Call ${personal.name}`}
              data-testid="contact-phone-link"
            >
              <span className="contact-icon-circle">
                <PhoneIcon />
              </span>
              <span className="contact-icon-label">PHONE</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon"
              aria-label={`${personal.name} on LinkedIn`}
              data-cursor="OPEN"
              data-testid="contact-linkedin-link"
            >
              <span className="contact-icon-circle">
                <LinkedInIcon />
              </span>
              <span className="contact-icon-label">LINKEDIN</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="contact-note">
            {contact.note.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </Reveal>

        <footer className="footer">
          <span className="footer-name">{footer.name}</span>
          <VisitorCounter />
          <div className="footer-links">
            <a href={`mailto:${personal.email}`} data-testid="footer-email-link">
              {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-linkedin-link"
            >
              {personal.linkedinLabel}
            </a>
          </div>
          <span className="footer-tagline">{footer.tagline}</span>
        </footer>
      </div>
    </section>
  );
}

/* ---------- visitor counter (GoatCounter) ---------- */

function VisitorCounter() {
  const site = portfolio.analytics.goatCounterSite;
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    if (!site) return;
    const origin = `https://${site}.goatcounter.com`;

    // pageview tracking script (contains no secret key)
    if (!document.querySelector("script[data-goatcounter]")) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://gc.zgo.at/count.js";
      script.dataset.goatcounter = `${origin}/count`;
      document.head.appendChild(script);
    }

    let cancelled = false;
    fetch(`${origin}/counter/TOTAL.json`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => !cancelled && setCount(d.count ?? null))
      .catch(() => !cancelled && setCount(null));
    return () => {
      cancelled = true;
    };
  }, [site]);

  if (!site || !count) return null;
  return (
    <span className="visitor-counter" data-testid="visitor-counter" aria-label={`Total visits: ${count}`}>
      VISITOR Nº {count}
    </span>
  );
}

/* ---------- app ---------- */

export default function App() {
  const reduce = useReducedMotion();

  // Lenis momentum scrolling — skipped entirely for reduced-motion users
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -70 } });
    return () => lenis.destroy();
  }, [reduce]);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Ventures />
        <Leadership />
        <Skills />
        <Beyond />
        <Contact />
      </main>
    </>
  );
}
