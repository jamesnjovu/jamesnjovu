import { useRef } from 'react';
import { useGSAP, reveal } from '../utils/animations';

/**
 * Shared section shell: consistent rhythm, one heading pattern, and the scroll
 * reveal applied in one place rather than repeated per section.
 */
const Section = ({ id, eyebrow, title, children, className = '' }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      reveal('.reveal', { trigger: ref.current });
    },
    { scope: ref }
  );

  return (
    <section id={id} ref={ref} className={`section ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="shell">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="section-heading reveal">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
