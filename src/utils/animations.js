import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Motion tokens — every animation on the site pulls its timing from here so the
 * whole page moves with one consistent rhythm.
 */
export const MOTION = {
  duration: 0.7,
  durationFast: 0.45,
  durationSlow: 1.1,
  ease: 'power3.out',
  easeSoft: 'power2.out',
  easeInOut: 'power2.inOut',
  stagger: 0.08,
  distance: 28,
  // Sections start animating once they are ~15% into the viewport.
  start: 'top 85%',
};

gsap.defaults({ duration: MOTION.duration, ease: MOTION.ease });

/** Respect the OS "reduce motion" setting. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveal one or more elements as they scroll into view.
 * Pass `from` to choose the direction the element travels from.
 */
export const revealOnScroll = (targets, options = {}) => {
  const {
    from = 'bottom',
    trigger,
    start = MOTION.start,
    stagger = MOTION.stagger,
    duration = MOTION.duration,
    delay = 0,
    distance = MOTION.distance,
    scale,
    once = true,
  } = options;

  const offsets = {
    bottom: { y: distance },
    top: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
    none: {},
  };

  return gsap.from(targets, {
    opacity: 0,
    ...offsets[from],
    ...(scale ? { scale } : {}),
    duration,
    delay,
    stagger,
    ease: MOTION.ease,
    scrollTrigger: {
      trigger: trigger || targets,
      start,
      once,
    },
  });
};

/**
 * Split a heading into lines/words and reveal them with a mask, which reads
 * considerably better than fading the whole block at once.
 */
export const revealHeading = (element, options = {}) => {
  const { type = 'words', stagger = 0.04, delay = 0, scrollTrigger } = options;
  if (!element) return null;

  const split = new SplitText(element, {
    type: `lines,${type}`,
    linesClass: 'split-line',
    mask: 'lines',
  });

  const tween = gsap.from(split[type], {
    yPercent: 110,
    opacity: 0,
    duration: MOTION.duration,
    ease: MOTION.ease,
    stagger,
    delay,
    ...(scrollTrigger ? { scrollTrigger } : {}),
  });

  // Hand back a revert so callers can clean the split markup up.
  tween.revertSplit = () => split.revert();
  return tween;
};

/** Count a number up to its final value while it scrolls into view. */
export const countUp = (element, endValue, options = {}) => {
  const { duration = 1.6, suffix = '', trigger, start = MOTION.start } = options;
  if (!element) return null;

  const counter = { value: 0 };
  return gsap.to(counter, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: { trigger: trigger || element, start, once: true },
    onUpdate: () => {
      element.textContent = `${Math.round(counter.value)}${suffix}`;
    },
  });
};

/** Drift an element against the scroll direction for depth. */
export const parallax = (element, options = {}) => {
  const { amount = 60, trigger, scrub = 1 } = options;
  if (!element) return null;

  return gsap.to(element, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  });
};

/** Grow a progress/skill bar to its target percentage. */
export const growBar = (element, percent, options = {}) => {
  const { trigger, delay = 0, duration = 1.2 } = options;
  if (!element) return null;

  return gsap.fromTo(
    element,
    { scaleX: 0 },
    {
      scaleX: percent / 100,
      transformOrigin: 'left center',
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: { trigger: trigger || element, start: MOTION.start, once: true },
    }
  );
};

// Dev-only handle so animations can be inspected/driven from the console.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

/** Refresh ScrollTrigger after layout-changing updates (filters, expanded cards). */
export const refreshScrollTriggers = () => ScrollTrigger.refresh();

export { gsap, ScrollTrigger, SplitText, useGSAP };
