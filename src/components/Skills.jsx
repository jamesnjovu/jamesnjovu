import { useState, useEffect, useRef } from 'react';
import { FaCode, FaPeopleCarry, FaLanguage, FaStar } from 'react-icons/fa';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const sectionRef = useRef(null);
  
  // Enhanced skill data with proficiency levels
  const skills = {
    technical: [
      { name: 'Elixir', level: 90 },
      { name: 'JavaScript ES6', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JAVA', level: 75 },
      { name: 'Phoenix', level: 85 },
      { name: 'ReactJS', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'Docker', level: 70 },
      { name: 'MsSQL', level: 75 },
      { name: 'Postgres', level: 80 },
      { name: 'Oracle', level: 70 },
      { name: 'RESTful API', level: 90 },
      { name: 'C++', level: 65 },
      { name: 'PHP', level: 75 },
      { name: 'MySQL', level: 85 },
      { name: 'C#', level: 60 }
    ],
    soft: [
      { name: 'Leadership', level: 85 },
      { name: 'Mentoring', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Mathematical Skills', level: 85 },
      { name: 'Communication', level: 80 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Time Management', level: 85 },
      { name: 'Adaptability', level: 90 }
    ],
    languages: [
      { name: 'English', level: 95, description: 'Fluent' },
      { name: 'Nyanja', level: 90, description: 'Fluent' }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Group technical skills by category for better organization
  const technicalCategories = {
    'Frontend': ['HTML5', 'CSS3', 'JavaScript ES6', 'ReactJS'],
    'Backend': ['Elixir', 'Phoenix', 'Node.js', 'PHP', 'JAVA', 'C#', 'C++'],
    'Database': ['SQL', 'MySQL', 'Postgres', 'MsSQL', 'Oracle'],
    'DevOps & Tools': ['Docker', 'RESTful API']
  };

  // Filter technical skills by category
  const getSkillsByCategory = (category) => {
    return skills.technical.filter(skill => 
      technicalCategories[category].includes(skill.name)
    );
  };

  // Get tab icon
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

  return (
    <section id="skills" className="section-container relative">
      <div ref={sectionRef} className="opacity-0">
        <h2 className="section-title">My Skills</h2>
        
        <div className="mb-8 flex flex-wrap border-b border-gray-200 dark:border-gray-700">
          {['technical', 'soft', 'languages'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-5 font-medium flex items-center gap-2 transition-all duration-300 ${
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
        
        <div className="animate-staggered">
          {activeTab === 'technical' && (
            <div className="space-y-10">
              {Object.keys(technicalCategories).map((category, idx) => (
                <div key={category} className={`animate-staggered animate-staggered-delay-${idx + 1}`}>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-2">
                      {idx + 1}
                    </span>
                    {category}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getSkillsByCategory(category).map((skill) => (
                      <div key={skill.name} className="bg-white dark:bg-dark-bg-secondary p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full"
                            style={{ 
                              width: `${skill.level}%`,
                              animation: `progressAnimation 1s ease-out forwards`,
                              transformOrigin: 'left'
                            }}
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
              {skills.soft.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className="bg-white dark:bg-dark-bg-secondary rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
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
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ 
                        width: `${skill.level}%`,
                        animation: `progressAnimation 1s ease-out forwards`,
                        transformOrigin: 'left'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'languages' && (
            <div className="max-w-2xl mx-auto">
              {skills.languages.map((language) => (
                <div key={language.name} className="mb-6">
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
                      className="bg-gradient-primary h-3 rounded-full relative"
                      style={{ 
                        width: `${language.level}%`,
                        animation: `progressAnimation 1s ease-out forwards`,
                        transformOrigin: 'left'
                      }}
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
              
              <div className="mt-8 bg-primary-50 dark:bg-primary-900/10 p-4 rounded-lg">
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
      
      {/* Add keyframes for progress bar animation */}
      <style jsx>{`
        @keyframes progressAnimation {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
