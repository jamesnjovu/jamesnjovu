import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { gsap, useGSAP, MOTION, revealHeading, prefersReducedMotion } from '../utils/animations';
import { profile, builtWith } from '../content';
import PaymentFlow from './PaymentFlow';
import Portrait from '../assets/james-profile.jpg';

const HexIcon = (props) => (
  <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M256 24L48 136v240l208 112 208-112V136L256 24zm0 54.4l160 86.2v66.9l-160-86.2-160 86.2v-66.9l160-86.2zm-160 189l160 86.2 160-86.2v66.9l-160 86.2-160-86.2v-66.9z" />
  </svg>
);

const Hero = () => {
  const root = useRef(null);
  const nameRef = useRef(null);
  const ctaRef = useRef(null);
  const cueRef = useRef(null);
  const years = new Date().getFullYear() - profile.startYear;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const headline = revealHeading(nameRef.current, { delay: 0.1 });

      gsap
        .timeline({ defaults: { ease: MOTION.ease } })
        .fromTo('.hero-eyebrow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(
          '.hero-item',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.45
        );

      // The cue has done its job the moment the reader takes the hint.
      gsap.to(cueRef.current, {
        opacity: 0,
        y: 8,
        ease: 'none',
        scrollTrigger: { start: 0, end: 220, scrub: true },
      });

      // The CTA leans toward the pointer, then springs back on exit.
      const cta = ctaRef.current;
      if (cta && window.matchMedia('(hover: hover)').matches) {
        const xTo = gsap.quickTo(cta, 'x', { duration: 0.4, ease: 'power3' });
        const yTo = gsap.quickTo(cta, 'y', { duration: 0.4, ease: 'power3' });

        const onMove = (e) => {
          const r = cta.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const onLeave = () => {
          gsap.to(cta, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        };

        cta.addEventListener('mousemove', onMove);
        cta.addEventListener('mouseleave', onLeave);
        return () => {
          cta.removeEventListener('mousemove', onMove);
          cta.removeEventListener('mouseleave', onLeave);
          headline?.revertSplit?.();
        };
      }

      return () => headline?.revertSplit?.();
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-14 pt-20"
    >
      <div className="shell">
        <div className="flex items-start justify-between gap-8">
          <div className="min-w-0">
            <p className="eyebrow hero-eyebrow">
              {profile.role} · {profile.location}
            </p>
            <h1 ref={nameRef} className="mt-3 text-3xl sm:text-4xl">
              {profile.name}
            </h1>
          </div>

          <img
            src={Portrait}
            alt=""
            width="72"
            height="72"
            className="hero-item hidden shrink-0 rounded-full border border-line object-cover sm:block"
            style={{ height: '72px', width: '72px' }}
          />
        </div>

        <p className="hero-item mt-5 max-w-prose text-base text-ink-muted sm:text-lg">{profile.summary}</p>

        <dl className="hero-item mt-6 flex flex-wrap gap-x-10 gap-y-3">
          <div>
            <dt className="text-xs text-ink-subtle">Experience</dt>
            <dd className="mono mt-0.5 text-base text-ink">{years} years</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-subtle">Focus</dt>
            <dd className="mt-0.5 text-base text-ink">Elixir / Phoenix</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-subtle">Published packages</dt>
            <dd className="mono mt-0.5 text-base text-ink">5</dd>
          </div>
        </dl>

        <div className="hero-item mt-7 flex flex-wrap items-center gap-3">
          <a ref={ctaRef} href="#contact" className="btn btn-primary">
            Get in touch
            <FaArrowRight size={12} aria-hidden="true" />
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Résumé
          </a>

          <div className="ml-auto flex items-center gap-1">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile">
              <FaGithub size={17} aria-hidden="true" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile">
              <FaLinkedin size={17} aria-hidden="true" />
            </a>
            <a href={profile.links.hex} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Hex.pm packages">
              <HexIcon width="17" height="17" />
            </a>
          </div>
        </div>

        <div className="hero-item mt-8">
          <PaymentFlow pinSelector="#top" />
        </div>

        <p className="hero-item mt-3 text-xs text-ink-subtle">
          This page is the demo: {builtWith.join(', ')} — the hero is pinned with ScrollTrigger and the
          transaction above is <span className="text-ink">scrubbed by your scroll</span>, built with{' '}
          <code className="mono">gsap.matchMedia</code> and animated custom properties.{' '}
          <a
            href="https://github.com/jamesnjovu/jamesnjovu"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            Read the source
          </a>
          .
        </p>
      </div>

      <div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1.5 text-ink-subtle"
      >
        <span className="eyebrow">Scroll to follow the payment</span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
};

export default Hero;
