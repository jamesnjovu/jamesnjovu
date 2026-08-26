import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { useRef } from 'react';
import Profile from '../assets/james-profile.jpg';
import { gsap, useGSAP, MOTION, revealHeading, countUp, prefersReducedMotion } from '../utils/animations';

const About = () => {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2020;

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const roleRef = useRef(null);
  const summaryRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const portraitRef = useRef(null);
  const badgeRef = useRef(null);
  const glowRef = useRef(null);
  const statRefs = useRef([]);

  const stats = [
    { value: yearsOfExperience, suffix: '+', label: 'Years Experience' },
    { value: 20, suffix: '+', label: 'Projects Delivered' },
    { value: 6, suffix: '', label: 'Open-Source Projects' },
  ];

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const setStatsToFinal = () =>
        statRefs.current.forEach((el, i) => {
          if (el) el.textContent = `${stats[i].value}${stats[i].suffix}`;
        });

      if (reduced) {
        // Honour the OS setting: show the final state, skip the motion.
        setStatsToFinal();
        return;
      }

      // Hero entrance — one timeline so the sequence reads as a single motion.
      const tl = gsap.timeline({ defaults: { ease: MOTION.ease } });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: MOTION.durationSlow }
      )
        .add(revealHeading(roleRef.current, { type: 'words', stagger: 0.05 }), '-=0.75')
        .fromTo(summaryRef.current, { opacity: 0, y: MOTION.distance }, { opacity: 1, y: 0 }, '-=0.5')
        .fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1 },
          '-=0.45'
        )
        .fromTo(
          statsRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: MOTION.durationSlow, ease: 'power2.out' },
          0.15
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, ease: 'back.out(2)' },
          '-=0.4'
        );

      // Count the stats up once the entrance has settled.
      statRefs.current.forEach((el, i) => {
        countUp(el, stats[i].value, {
          suffix: stats[i].suffix,
          trigger: statsRef.current,
          duration: 1.4 + i * 0.15,
        });
      });

      // Ambient motion: the portrait breathes and the glow behind it pulses.
      gsap.to(portraitRef.current, {
        y: -14,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glowRef.current, {
        opacity: 0.35,
        scale: 1.06,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Portrait drifts slightly slower than the page for depth.
      gsap.to(portraitRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" className="min-h-screen flex items-center section-container" ref={sectionRef}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h1
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
          >
            Hi, I'm <span className="text-primary-600 dark:text-primary-400">James Njovu</span>
          </h1>
          <h2
            ref={roleRef}
            className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300"
          >
            Senior Software Engineer
          </h2>
          <p
            ref={summaryRef}
            className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed max-w-xl"
          >
            Senior Software Engineer with {yearsOfExperience}+ years delivering mission-critical financial
            systems in the Elixir/Phoenix ecosystem. I design well-factored APIs, do measurable performance
            work, and publish open-source libraries other engineers build on. I lead code review and CI/CD
            practice, and mentor junior engineers.
          </p>
          <div className="flex flex-wrap gap-4" ref={ctaRef}>
            <a href="#contact" className="btn btn-primary btn-animated group">
              Contact Me
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/jamesnjovu/resume.pdf" className="btn btn-secondary hover-scale group" download>
              <FaDownload className="mr-2 group-hover:animate-bounce" /> Download CV
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4" ref={statsRef}>
            {stats.map((stat, index) => (
              <div className="text-center" key={stat.label}>
                <h3
                  ref={(el) => (statRefs.current[index] = el)}
                  className="text-4xl font-bold text-primary-600 dark:text-primary-400 tabular-nums"
                >
                  {stat.value}
                  {stat.suffix}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative" ref={portraitRef}>
            <div
              ref={glowRef}
              className="absolute -inset-0.5 bg-gradient-cta rounded-full blur opacity-75 dark:opacity-50"
            ></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl transition-transform duration-300 hover:scale-105">
              <img src={Profile} alt="James Njovu" className="w-full h-full object-cover" />
            </div>
            <div
              ref={badgeRef}
              className="absolute -right-4 -bottom-4 bg-white dark:bg-dark-bg-secondary p-4 rounded-full shadow-lg"
            >
              <div className="bg-primary-600 text-white rounded-full h-20 w-20 flex items-center justify-center font-bold">
                <div className="text-center">
                  <div className="text-xl">{yearsOfExperience}+</div>
                  <div className="text-xs">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
