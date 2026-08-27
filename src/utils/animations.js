import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, useGSAP);

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

/**
 * Line-by-line masked reveal for a heading. The lines are clipped by their own
 * wrapper, so each one rises out of a hard edge rather than fading in place.
 *
 * **The split is reverted the moment the animation ends**, not on unmount.
 * SplitText rewrites the element into per-line wrappers with overflow clipped,
 * and leaving that in place for the life of the page has costs beyond the
 * animation: the clip cuts descenders (the j in "Njovu" loses its tail),
 * selecting the text yields fragments, and the wrappers do not reflow on
 * resize the way the original element does. Reverting hands the real element
 * back the instant it is no longer needed.
 */
export const revealHeading = (element, options = {}) => {
  const { stagger = 0.08, delay = 0, duration = 0.9 } = options;
  if (!element) return null;

  if (prefersReducedMotion()) return null;

  const split = new SplitText(element, { type: 'lines', mask: 'lines' });

  let reverted = false;
  const revertSplit = () => {
    if (reverted) return;
    reverted = true;
    split.revert();
  };

  const tween = gsap.fromTo(
    split.lines,
    { yPercent: 105 },
    { yPercent: 0, duration, delay, stagger, ease: 'expo.out', onComplete: revertSplit }
  );

  // Still exposed so an unmount mid-animation cleans up too.
  tween.revertSplit = revertSplit;
  return tween;
};

// Dev-only handle so animations can be inspected from the console.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin, useGSAP };
