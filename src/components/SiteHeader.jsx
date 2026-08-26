import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../utils/animations';
import { profile, sections } from '../content';
import ThemeToggle from './ThemeToggle';

const SiteHeader = ({ theme, onToggleTheme }) => {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useGSAP(
    () => {
      // Hairline border only once the page has moved, so the header sits flat at rest.
      ScrollTrigger.create({
        start: 'top -8',
        end: 99999,
        onToggle: (self) => setCondensed(self.isActive),
      });
    },
    { scope: headerRef }
  );

  // Mark the section currently in view.
  useEffect(() => {
    const observed = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      },
      { rootMargin: '-72px 0px -60% 0px' }
    );
    observed.forEach((el) => observer.observe(el));
    return () => observed.forEach((el) => observer.unobserve(el));
  }, []);

  // Mobile menu: animate open, and close on Escape.
  useGSAP(
    () => {
      if (!menuRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(menuRef.current, { autoAlpha: menuOpen ? 1 : 0 });
        return;
      }
      gsap.to(menuRef.current, {
        autoAlpha: menuOpen ? 1 : 0,
        y: menuOpen ? 0 : -6,
        duration: 0.2,
        ease: 'power2.out',
      });
    },
    { dependencies: [menuOpen] }
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 bg-bg/85 backdrop-blur-md transition-colors duration-200 ${
        condensed ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`rounded px-3 py-2 text-sm transition-colors duration-200 hover:text-ink ${
                active === s.id ? 'text-ink' : 'text-ink-muted'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary hidden md:inline-flex">
            Résumé
          </a>
          <button
            type="button"
            className="icon-btn md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FaTimes size={16} aria-hidden="true" /> : <FaBars size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={menuRef}
        className={`invisible border-t border-line bg-bg opacity-0 md:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
      >
        <nav aria-label="Sections" className="shell flex flex-col py-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded px-1 py-3 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {s.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-1 py-3 text-sm text-accent"
            onClick={() => setMenuOpen(false)}
          >
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
