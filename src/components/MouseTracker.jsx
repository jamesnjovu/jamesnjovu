import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../utils/animations';

/**
 * Custom cursor: a trailing ring with a dot at its centre.
 *
 * Position is driven imperatively through gsap.quickTo — the pointer never
 * touches React state, so moving the mouse costs no re-renders. The cursor
 * "mode" is resolved on pointerover (which only fires when the hovered element
 * actually changes) rather than on every mousemove.
 */
const MouseTracker = () => {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const modeRef = useRef('default');

  // Only run on non-touch, desktop-width devices that want motion.
  useEffect(() => {
    const evaluate = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmall = window.innerWidth < 768;
      setEnabled(!isTouch && !isSmall && !prefersReducedMotion());
    };

    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('custom-cursor');
    return () => document.body.classList.remove('custom-cursor');
  }, [enabled]);

  useGSAP(
    () => {
      if (!enabled || !ringRef.current || !dotRef.current) return;

      const ring = ringRef.current;
      const dot = dotRef.current;

      // The dot tracks the pointer almost exactly; the ring lags behind it,
      // which is what gives the cursor its weight.
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
      const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2' });
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2' });

      const MODES = {
        default: { scale: 1, borderWidth: 2, opacity: 0.85 },
        interactive: { scale: 1.9, borderWidth: 1.5, opacity: 1 },
        text: { scale: 0.7, borderWidth: 1, opacity: 0.7 },
        image: { scale: 1.5, borderWidth: 2, opacity: 1 },
      };

      const applyMode = (mode) => {
        if (modeRef.current === mode) return;
        modeRef.current = mode;
        gsap.to(ring, { ...MODES[mode], duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { scale: mode === 'interactive' ? 0.4 : 1, duration: 0.3, ease: 'power2.out' });
      };

      const resolveMode = (target) => {
        if (!(target instanceof Element)) return 'default';
        if (target.closest('a, button, input[type="submit"], .cursor-pointer')) return 'interactive';
        if (target.closest('img, .project-image')) return 'image';
        if (target.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote')) return 'text';
        return 'default';
      };

      const onMove = (e) => {
        ringX(e.clientX);
        ringY(e.clientY);
        dotX(e.clientX);
        dotY(e.clientY);
      };

      // pointerover only fires when the hovered element changes — far cheaper
      // than inspecting the DOM on every mousemove.
      const onOver = (e) => applyMode(resolveMode(e.target));
      const onEnter = () => gsap.to([ring, dot], { autoAlpha: 1, duration: 0.25 });
      const onLeave = () => gsap.to([ring, dot], { autoAlpha: 0, duration: 0.25 });

      document.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('pointerover', onOver, { passive: true });
      document.addEventListener('mouseenter', onEnter);
      document.addEventListener('mouseleave', onLeave);

      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('pointerover', onOver);
        document.removeEventListener('mouseenter', onEnter);
        document.removeEventListener('mouseleave', onLeave);
      };
    },
    { dependencies: [enabled] }
  );

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-500/70 opacity-0 mix-blend-difference will-change-transform"
        style={{ marginLeft: '-20px', marginTop: '-20px' }}
      ></div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary-600 opacity-0 will-change-transform"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      ></div>

      <style>
        {`
          body.custom-cursor,
          body.custom-cursor a,
          body.custom-cursor button,
          body.custom-cursor input[type="submit"],
          body.custom-cursor .cursor-pointer {
            cursor: none !important;
          }
        `}
      </style>
    </>
  );
};

export default MouseTracker;
