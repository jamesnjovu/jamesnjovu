import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Motion tokens. Deliberately restrained: short distances, quick durations,
 * one easing curve. Motion here orients the reader; it is not a performance.
 */
export const MOTION = {
  duration: 0.5,
  ease: 'power2.out',
  stagger: 0.06,
  distance: 14,
  start: 'top 88%',
};

/** Respect the OS "reduce motion" setting. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal elements as they scroll into view.
 *
 * Always fromTo, never from: ScrollTrigger.refresh() — which fires on load and
 * resize as well as on explicit calls — invalidates its animations, and an
 * invalidated from() tween re-reads its END value from the live DOM. Since
 * immediateRender has already applied the start state by then, GSAP would
 * record opacity 0 as the end value and "complete" into invisibility. Stating
 * both ends explicitly is immune to that.
 */
export const reveal = (targets, options = {}) => {
  const {
    trigger,
    start = MOTION.start,
    stagger = MOTION.stagger,
    duration = MOTION.duration,
    delay = 0,
    y = MOTION.distance,
  } = options;

  const list = gsap.utils.toArray(targets);
  if (!list.length || prefersReducedMotion()) return null;

  return gsap.fromTo(
    list,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: MOTION.ease,
      scrollTrigger: { trigger: trigger || list[0], start, once: true },
    }
  );
};

export { gsap, ScrollTrigger, useGSAP };
