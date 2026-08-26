import Section from './Section';
import { education } from '../content';

const Education = () => (
  <Section id="education" eyebrow="Education" title="Training and certification">
    <ol className="space-y-8">
      {education.map((item) => (
        <li key={item.credential} className="reveal">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-base">{item.credential}</h3>
            <span className="mono text-xs text-ink-subtle">{item.period}</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">{item.institution}</p>
          <p className="mt-2 max-w-prose text-sm text-ink-subtle">{item.note}</p>
        </li>
      ))}
    </ol>
  </Section>
);

export default Education;
