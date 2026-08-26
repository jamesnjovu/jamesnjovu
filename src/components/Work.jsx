import Section from './Section';
import { work } from '../content';

const Work = () => (
  <Section id="work" eyebrow="Experience" title="Where I've worked">
    <ol className="space-y-12">
      {work.map((role) => (
        <li key={`${role.company}-${role.period}`} className="reveal">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg">
              {role.role} <span className="text-ink-muted">· {role.company}</span>
            </h3>
            <span className="mono text-xs text-ink-subtle">{role.period}</span>
          </div>

          <p className="mt-2 max-w-prose text-ink-muted">{role.summary}</p>

          <ul className="mt-4 space-y-2">
            {role.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink-muted">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                <span className="max-w-prose">{item}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {role.tech.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  </Section>
);

export default Work;
