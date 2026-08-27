import { useRef } from 'react';
import { gsap, ScrollTrigger, MotionPathPlugin, useGSAP, prefersReducedMotion } from '../utils/animations';
import { paymentFlow } from '../content';

/**
 * The hero's working diagram: a mobile-money collection moving through the
 * stages ex_mtn_momo and ex_mpesa actually implement.
 *
 * On a desktop viewport the hero pins and this timeline is **scrubbed by
 * scroll**, so scrolling the page is what advances the transaction — the
 * reader controls the payment rather than watching it. Below that breakpoint
 * pinning fights the address bar, so it falls back to an autoplaying loop.
 *
 * Layout is a row on wide screens and a column on narrow ones, so the timeline
 * is built inside gsap.matchMedia() and travels the connectors on the matching
 * axis. Under prefers-reduced-motion it renders the settled end state and
 * nothing moves.
 */
/*
 * `pinSelector` is a selector, not a ref: a child's layout effect runs before
 * React attaches the parent's ref, so a ref passed down from the hero is still
 * null here and the pin would silently land on this figure instead.
 */
const PaymentFlow = ({ pinSelector }) => {
  const root = useRef(null);
  const captionRef = useRef(null);
  const settled = prefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Resolved with document.querySelector, not handed to GSAP as a selector
      // string: useGSAP's `scope` would confine that lookup to this figure.
      const pinEl = (pinSelector && document.querySelector(pinSelector)) || root.current;

      const mm = gsap.matchMedia();

      // Lays the four stages onto `tl`, whichever way it is being driven.
      const buildStages = (tl, axis) => {
        const nodes = gsap.utils.toArray('.flow-node');
        const fills = gsap.utils.toArray('.flow-fill');
        const packet = root.current.querySelector('.flow-packet');
        const track = root.current.querySelector('.flow-track-area');

        gsap.set(fills, { transformOrigin: axis === 'x' ? 'left center' : 'center top' });

        // MotionPath waypoints: each stage's centre, measured in the track's own
        // coordinate space, with a control point lifted off the straight line so
        // the packet arcs between stages instead of sliding along the connector.
        // Measured rather than hard-coded, so it follows the row/column layout
        // and any reflow ScrollTrigger refreshes through.
        const waypoints = () => {
          const base = track.getBoundingClientRect();
          return nodes.map((node) => {
            const r = node.getBoundingClientRect();
            return {
              x: r.left - base.left + r.width / 2 - packet.offsetWidth / 2,
              y: r.top - base.top + r.height / 2 - packet.offsetHeight / 2,
            };
          });
        };

        const hop = (from, to) => {
          const lift = axis === 'x' ? -22 : 0;
          const sideways = axis === 'x' ? 0 : 26;
          return [
            from,
            { x: (from.x + to.x) / 2 + sideways, y: (from.y + to.y) / 2 + lift },
            to,
          ];
        };

        const start = waypoints()[0];
        gsap.set(packet, { x: start.x, y: start.y, opacity: 0 });

        paymentFlow.forEach((step, i) => {
          tl.fromTo(
            nodes[i],
            { '--flow-on': 0 },
            {
              '--flow-on': 1,
              duration: 0.35,
              ease: 'power2.out',
              onStart: () => setCaption(step.caption),
              // Scrubbing backwards has to restore the previous stage's text.
              onReverseComplete: () => setCaption(paymentFlow[Math.max(i - 1, 0)].caption),
            },
            i === 0 ? 0 : '>'
          ).fromTo(
            nodes[i].querySelector('.flow-pulse'),
            { scale: 0.9, opacity: 0.6 },
            { scale: 1.35, opacity: 0, duration: 0.9, ease: 'power2.out' },
            '<'
          );

          if (i < paymentFlow.length - 1) {
            tl.fromTo(
              fills[i],
              { scaleX: axis === 'x' ? 0 : 1, scaleY: axis === 'x' ? 1 : 0 },
              axis === 'x'
                ? { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }
                : { scaleY: 1, duration: 0.5, ease: 'power2.inOut' },
              '>-0.1'
            )
              .to(
                packet,
                {
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power1.inOut',
                  motionPath: {
                    // Re-measured at run time so a resize cannot strand the arc.
                    path: () => hop(waypoints()[i], waypoints()[i + 1]),
                    curviness: 1.4,
                  },
                },
                '<'
              )
              .to(packet, { opacity: 0, duration: 0.16 }, '>-0.06');
          }
        });

        return tl;
      };

      const setCaption = (text) => {
        if (captionRef.current) captionRef.current.textContent = text;
      };

      // Desktop: the hero pins and scroll drives the transaction.
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            start: 'top top',
            end: '+=140%',
            pin: true,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        });

        buildStages(tl, 'x');
        return () => tl.kill();
      });

      // Narrow screens: pinning fights the mobile address bar, so it plays itself.
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.4,
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'resume pause resume pause',
          },
        });

        buildStages(tl, 'y');
        tl.to({}, { duration: 1 }).to(
          [...gsap.utils.toArray('.flow-node'), ...gsap.utils.toArray('.flow-fill')],
          { '--flow-on': 0, scaleY: (i, t) => (t.classList.contains('flow-fill') ? 0 : 1), duration: 0.4 }
        );

        return () => tl.kill();
      });

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: root, dependencies: [] }
  );

  return (
    <figure ref={root} className="flow-panel">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="eyebrow">Mobile money collection</span>
        <span className="flex items-center gap-1.5 text-xs text-ink-subtle">
          <span className="flow-live" aria-hidden="true" />
          live flow
        </span>
      </figcaption>

      <div className="px-4 py-6">
        <div className="flow-track-area">
          <span className="flow-packet" aria-hidden="true" />
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
                </div>
              )}
            </li>
          ))}
          </ol>
        </div>

        <p ref={captionRef} className="mono mt-6 text-xs text-ink-subtle" aria-hidden="true">
          {paymentFlow[settled ? paymentFlow.length - 1 : 0].caption}
        </p>

        <p className="sr-only">
          A diagram of a mobile money collection moving through four stages: mobile app, Phoenix API,
          MoMo gateway, and ledger settlement.
        </p>
      </div>
    </figure>
  );
};

export default PaymentFlow;
