import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../utils/animations';

/**
 * The page's background: a fine grid, two accent glows and a grain pass, in one
 * fixed layer behind everything.
 *
 * The glows drift very slowly — slow enough that it registers as depth rather
 * than as animation — and hold still entirely under prefers-reduced-motion.
 */
const Backdrop = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.to('.backdrop-glow-a', {
        xPercent: 6,
        yPercent: 8,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to('.backdrop-glow-b', {
        xPercent: -8,
        yPercent: -6,
        duration: 22,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root }
  );

  return (
    <div className="backdrop" ref={root} aria-hidden="true">
      <div className="backdrop-glow backdrop-glow-a" />
      <div className="backdrop-glow backdrop-glow-b" />
      <div className="backdrop-grid" />
      <div className="backdrop-noise" />
    </div>
  );
};

export default Backdrop;
