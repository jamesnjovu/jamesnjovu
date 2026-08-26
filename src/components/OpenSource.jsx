import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Section from './Section';
import { projects } from '../content';

const OpenSource = () => (
  <Section id="projects" eyebrow="Open Source" title="Packages and tools I maintain">
    <ul className="grid gap-3 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.name} className="reveal card card-interactive flex flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base">{project.name}</h3>
            {project.package && project.package !== project.name && (
              <span className="mono text-xs text-ink-subtle">{project.package}</span>
            )}
          </div>

          <p className="mt-2 flex-1 text-sm text-ink-muted">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-sm">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent inline-flex items-center gap-1.5"
              >
                <FaGithub size={13} aria-hidden="true" /> Source
              </a>
            )}
            {project.links.package && (
              <a
                href={project.links.package}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent inline-flex items-center gap-1.5"
              >
                <FaExternalLinkAlt size={11} aria-hidden="true" /> Package
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent inline-flex items-center gap-1.5"
              >
                <FaExternalLinkAlt size={11} aria-hidden="true" /> Demo
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

export default OpenSource;
