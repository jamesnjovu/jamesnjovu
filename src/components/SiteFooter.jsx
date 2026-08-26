import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { profile } from '../content';

const SiteFooter = () => (
  <footer className="border-t border-line py-10">
    <div className="shell flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-ink-subtle">
        © {new Date().getFullYear()} {profile.name}
      </p>

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
