import { useState, useEffect, useCallback } from 'react';
import Backdrop from './components/Backdrop';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import Work from './components/Work';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import SiteFooter from './components/SiteFooter';

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function App() {
  // 'system' follows the OS until the visitor picks a side; App is the single
  // owner of theme state (it used to be split between App and the footer).
  const [preference, setPreference] = useState(() => localStorage.getItem('theme') || 'system');
  const resolved = preference === 'system' ? getSystemTheme() : preference;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    localStorage.setItem('theme', preference);
  }, [preference, resolved]);

  // Keep following the OS while the preference is 'system'.
  useEffect(() => {
    if (preference !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => document.documentElement.classList.toggle('dark', media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [preference]);

  const toggleTheme = useCallback(
    () => setPreference(resolved === 'dark' ? 'light' : 'dark'),
    [resolved]
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
      >
        Skip to content
      </a>

      <Backdrop />

      <SiteHeader theme={resolved} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero />
        <Work />
        <OpenSource />
        <Skills />
        <Education />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
