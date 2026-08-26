import Section from './Section';
import { skills, languages } from '../content';

const Skills = () => (
  <Section id="skills" eyebrow="Skills" title="What I work with">
    <dl className="space-y-6">
      {skills.map((group) => (
        <div key={group.group} className="reveal grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <dt className="text-sm font-medium text-ink-subtle sm:pt-0.5">{group.group}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}

      <div className="reveal grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt className="text-sm font-medium text-ink-subtle sm:pt-0.5">Spoken</dt>
        <dd className="text-sm text-ink-muted">{languages.join(' · ')}</dd>
      </div>
    </dl>
  </Section>
);

export default Skills;
