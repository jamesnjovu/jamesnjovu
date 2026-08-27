import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../utils/animations';
import { paymentFlow } from '../content';

/**
 * The hero's working diagram: a mobile-money collection moving through the
 * stages ex_mtn_momo and ex_mpesa actually implement.
 *
 * The layout is a row on wider screens and a column on narrow ones, so the
 * timeline is built inside gsap.matchMedia() and travels the connectors on the
 * matching axis. It only runs while on screen, and under prefers-reduced-motion
 * it renders the settled end state with no animation at all.
 */
const PaymentFlow = () => {
  const root = useRef(null);
  const captionRef = useRef(null);
  // Under reduced motion the diagram renders in its settled state instead.
  const settled = prefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      const build = (axis) => {
        const nodes = gsap.utils.toArray('.flow-node');
        const fills = gsap.utils.toArray('.flow-fill');
        const dots = gsap.utils.toArray('.flow-dot');
        const travel = axis === 'x' ? { xPercent: 100 } : { yPercent: 100 };
        const rest = axis === 'x' ? { xPercent: 0 } : { yPercent: 0 };

        gsap.set(fills, { transformOrigin: axis === 'x' ? 'left center' : 'center top' });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.4,
          // Idle off screen rather than burning frames behind the fold.
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', toggleActions: 'resume pause resume pause' },
        });

        paymentFlow.forEach((step, i) => {
          tl.to(
            nodes[i],
            {
              duration: 0.35,
              ease: 'power2.out',
              onStart: () => {
                if (captionRef.current) captionRef.current.textContent = step.caption;
              },
            },
            i === 0 ? 0 : '>'
          )
            .fromTo(nodes[i], { '--flow-on': 0 }, { '--flow-on': 1, duration: 0.35, ease: 'power2.out' }, '<')
            .fromTo(
              nodes[i].querySelector('.flow-pulse'),
              { scale: 0.9, opacity: 0.6 },
              { scale: 1.35, opacity: 0, duration: 0.9, ease: 'power2.out' },
              '<'
            );

          // Hop to the next stage: fill the connector and send a packet along it.
          if (i < paymentFlow.length - 1) {
            tl.fromTo(fills[i], { scaleX: axis === 'x' ? 0 : 1, scaleY: axis === 'x' ? 1 : 0 },
              axis === 'x'
                ? { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }
                : { scaleY: 1, duration: 0.5, ease: 'power2.inOut' },
              '>-0.1'
            ).fromTo(
              dots[i],
              { ...rest, opacity: 0 },
              { ...travel, opacity: 1, duration: 0.5, ease: 'power2.inOut' },
              '<'
            ).to(dots[i], { opacity: 0, duration: 0.15 }, '>-0.05');
          }
        });

        // Hold on the settled state, then reset for the next pass.
        tl.to({}, { duration: 1 }).to([...nodes, ...fills], {
          '--flow-on': 0,
          scaleX: (i, t) => (t.classList.contains('flow-fill') && axis === 'x' ? 0 : 1),
          scaleY: (i, t) => (t.classList.contains('flow-fill') && axis === 'y' ? 0 : 1),
          duration: 0.4,
          ease: 'power2.in',
        });

        return () => tl.kill();
      };

      mm.add('(min-width: 640px)', () => build('x'));
      mm.add('(max-width: 639px)', () => build('y'));

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: root }
  );

  return (
    <figure ref={root} className="flow-panel mt-12">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="eyebrow">Mobile money collection</span>
        <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
          <span className="flow-live" aria-hidden="true" />
          live flow
        </span>
      </figcaption>

      <div className="px-4 py-6">
        <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
          {paymentFlow.map((step, i) => (
            <li key={step.key} className="contents">
              <div className="flow-node" data-settled={settled ? 'true' : undefined}>
                <span className="flow-pulse" aria-hidden="true" />
                <span className="relative">{step.label}</span>
              </div>

              {i < paymentFlow.length - 1 && (
                <div className="flow-link" aria-hidden="true">
                  <span className="flow-track" />
                  <span className="flow-fill" />
                  <span className="flow-dot" />
                </div>
              )}
            </li>
          ))}
        </ol>

        <p ref={captionRef} className="mono mt-6 text-xs text-ink-subtle" aria-hidden="true">
          {paymentFlow[paymentFlow.length - 1].caption}
        </p>

        {/* A stable description for assistive tech, since the caption above cycles. */}
        <p className="sr-only">
          A diagram of a mobile money collection moving through four stages: mobile app, Phoenix API,
          MoMo gateway, and ledger settlement.
        </p>
      </div>
    </figure>
  );
};

export default PaymentFlow;
