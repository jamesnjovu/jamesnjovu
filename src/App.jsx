import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseTracker from './components/MouseTracker';
import { gsap, ScrollTrigger, useGSAP, MOTION, prefersReducedMotion } from './utils/animations';

function App() {
  // Footer owns theme switching; App just applies whatever is stored on load.
  const [theme] = useState(() => localStorage.getItem('theme') || 'system');
  const [showLoader, setShowLoader] = useState(true);
  const loaderRef = useRef(null);
  const loaderMarkRef = useRef(null);

  // Effect to apply the theme based on user preference
  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode', 'light-mode');

      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark-mode');
      } else if (theme === 'light') {
        document.body.classList.add('light-mode');
      } else if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.add('light-mode');
        }
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // The loader stays up until the page has actually loaded — with a short
  // minimum so it never flashes — then wipes away instead of cutting out.
  useGSAP(
    () => {
      if (!loaderRef.current) return;

      const reduced = prefersReducedMotion();
      const dismiss = () => {
        if (reduced) {
          setShowLoader(false);
          ScrollTrigger.refresh();
          return;
        }

        gsap.timeline({
          onComplete: () => {
            setShowLoader(false);
            // Section positions shift once the loader is gone.
            ScrollTrigger.refresh();
          },
        })
          .to(loaderMarkRef.current, { y: -16, opacity: 0, duration: 0.35, ease: 'power2.in' })
          .to(loaderRef.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, '-=0.1');
      };

      if (!reduced) {
        gsap.from(loaderMarkRef.current, { opacity: 0, y: 16, duration: MOTION.durationFast });
      }

      // setTimeout rather than gsap.delayedCall: GSAP's ticker is driven by
      // requestAnimationFrame, which Chrome pauses entirely in background tabs.
      const minimumDisplay = setTimeout(() => {
        if (document.readyState === 'complete') {
          dismiss();
        } else {
          window.addEventListener('load', dismiss, { once: true });
        }
      }, 600);

      return () => clearTimeout(minimumDisplay);
    },
    { dependencies: [] }
  );

  return (
    <div className="App">
      {showLoader && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-dark-bg-primary"
        >
          <div className="text-center" ref={loaderMarkRef}>
            <div className="relative h-24 w-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              James Njovu
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Senior Software Engineer</p>
          </div>
        </div>
      )}

      <MouseTracker />
      <Header />
      <main>
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
