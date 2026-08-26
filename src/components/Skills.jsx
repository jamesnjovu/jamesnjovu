import { useState, useRef } from 'react';
import { FaCode, FaPeopleCarry, FaLanguage, FaStar } from 'react-icons/fa';
import { gsap, useGSAP, MOTION, prefersReducedMotion } from '../utils/animations';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const panelRef = useRef(null);

  // Each technical skill carries its own category, so a skill can never fall out
  // of the UI because a category list and the data drifted apart.
  const skills = {
    technical: [
      { name: 'Elixir', level: 95, category: 'Backend' },
      { name: 'Phoenix', level: 85, category: 'Backend' },
      { name: 'Node.js', level: 75, category: 'Backend' },
      { name: 'PHP', level: 75, category: 'Backend' },
      { name: 'JAVA', level: 75, category: 'Backend' },
      { name: 'Phoenix LiveView', level: 85, category: 'Frontend' },
      { name: 'JavaScript ES6', level: 85, category: 'Frontend' },
      { name: 'ReactJS', level: 80, category: 'Frontend' },
      { name: 'HTML5', level: 90, category: 'Frontend' },
      { name: 'CSS3', level: 85, category: 'Frontend' },
      { name: 'SQL', level: 80, category: 'Database' },
      { name: 'PostgreSQL', level: 80, category: 'Database' },
      { name: 'MySQL', level: 85, category: 'Database' },
      { name: 'MsSQL', level: 75, category: 'Database' },
      { name: 'Oracle', level: 70, category: 'Database' },
      { name: 'RESTful API', level: 90, category: 'DevOps & Tools' },
      { name: 'Docker', level: 70, category: 'DevOps & Tools' },
      { name: 'Git & CI/CD', level: 85, category: 'DevOps & Tools' },
    ],
    soft: [
      { name: 'Problem Solving', level: 95 },
      { name: 'Mentoring', level: 90 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Adaptability', level: 90 },
      { name: 'Leadership', level: 85 },
      { name: 'Mathematical Skills', level: 85 },
      { name: 'Time Management', level: 85 },
      { name: 'Communication', level: 80 },
    ],
    languages: [
      { name: 'English', level: 95, description: 'Fluent' },
      { name: 'Nyanja', level: 90, description: 'Fluent' },
      { name: 'Bemba', level: 75, description: 'Fluent' },
    ],
  };

  const categoryOrder = ['Backend', 'Frontend', 'Database', 'DevOps & Tools'];
  const getSkillsByCategory = (category) =>
    skills.technical.filter((skill) => skill.category === category);

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'technical':
        return <FaCode />;
      case 'soft':
        return <FaPeopleCarry />;
      case 'languages':
        return <FaLanguage />;
      default:
        return <FaCode />;
    }
  };

  // Section heading + tab bar reveal, once, on scroll.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(headingRef.current, {
        opacity: 0,
        y: MOTION.distance,
        scrollTrigger: { trigger: sectionRef.current, start: MOTION.start, once: true },
      });

      gsap.from('.skills-tab', {
        opacity: 0,
        y: 16,
        stagger: MOTION.stagger,
        scrollTrigger: { trigger: sectionRef.current, start: MOTION.start, once: true },
      });
    },
    { scope: sectionRef }
  );

  // Panel content animates on first view AND on every tab change, so switching
  // tabs feels like a deliberate transition rather than a hard swap.
  useGSAP(
    () => {
      const bars = gsap.utils.toArray('.skill-bar');

      if (prefersReducedMotion()) {
        gsap.set(bars, { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: panelRef.current, start: 'top 90%', once: true },
      });

      tl.from('.skill-group', { opacity: 0, y: 24, stagger: 0.1, duration: MOTION.durationFast })
        .from('.skill-card', { opacity: 0, y: 18, stagger: 0.03, duration: MOTION.durationFast }, '-=0.3')
        .fromTo(
          bars,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power2.out', stagger: 0.04 },
          '-=0.25'
        );
    },
    { scope: panelRef, dependencies: [activeTab], revertOnUpdate: true }
  );

  return (
    <section id="skills" className="section-container relative" ref={sectionRef}>
      <div>
        <h2 className="section-title" ref={headingRef}>
          My Skills
        </h2>

        <div className="mb-8 flex flex-wrap border-b border-gray-200 dark:border-gray-700" role="tablist">
          {['technical', 'soft', 'languages'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`skills-tab py-3 px-5 font-medium flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab
                  ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {getTabIcon(tab)}
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Skills
            </button>
          ))}
        </div>

        <div ref={panelRef}>
          {activeTab === 'technical' && (
            <div className="space-y-10">
              {categoryOrder.map((category, idx) => (
                <div key={category} className="skill-group">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-2">
                      {idx + 1}
                    </span>
                    {category}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSkillsByCategory(category).map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-card bg-white dark:bg-dark-bg-secondary p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="skill-bar bg-gradient-primary h-2 rounded-full origin-left"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'soft' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.soft.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card bg-white dark:bg-dark-bg-secondary rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                    <div className="relative">
                      <FaStar size={28} />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{skill.name}</h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="skill-bar bg-gradient-primary h-2 rounded-full origin-left"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="max-w-2xl mx-auto">
              {skills.languages.map((language) => (
                <div key={language.name} className="skill-card mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium text-lg text-gray-800 dark:text-gray-200">
                        {language.name}
                      </span>
                      <span className="ml-2 text-sm bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 rounded-full px-2 py-0.5">
                        {language.description}
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">{language.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="skill-bar bg-gradient-primary h-3 rounded-full relative origin-left"
                      style={{ width: `${language.level}%` }}
                    >
                      {language.level >= 90 && (
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 font-medium text-xs text-white">
                          Fluent
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="skill-group mt-8 bg-primary-50 dark:bg-primary-900/10 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                  <FaLanguage className="mr-2 text-primary-600 dark:text-primary-400" />
                  Language Proficiency Scale
                </h3>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-16 inline-block">90-100%:</span>
                    <span className="ml-2">Native/Fluent - Full professional proficiency</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-16 inline-block">80-89%:</span>
                    <span className="ml-2">Advanced - Professional working proficiency</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-16 inline-block">70-79%:</span>
                    <span className="ml-2">Upper Intermediate - Limited working proficiency</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-16 inline-block">60-69%:</span>
                    <span className="ml-2">Intermediate - Basic professional proficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 bottom-10 -left-20 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Skills;
