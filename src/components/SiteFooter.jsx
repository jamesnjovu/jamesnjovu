import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { profile } from '../content';

const SiteFooter = () => (
  <footer className="border-t border-line py-10">
    <div className="shell flex flex-wrap items-center justify-between gap-4">
      <div className="text-sm text-ink-subtle">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        {/* The stack belongs here, stated once and quietly — the hero already
            demonstrates it by working. */}
        <p className="mt-1">
          Built with React and GSAP ·{' '}
          <a
            href="https://github.com/jamesnjovu/jamesnjovu"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            Source
          </a>
        </p>
      </div>

      <div className="flex items-center gap-1">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile">
          <FaGithub size={16} aria-hidden="true" />
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile">
          <FaLinkedin size={16} aria-hidden="true" />
        </a>
        <a href="#top" className="icon-btn" aria-label="Back to top">
          <FaArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
