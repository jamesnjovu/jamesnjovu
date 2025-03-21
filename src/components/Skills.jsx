import { useState } from 'react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  
  const skills = {
    technical: [
      'Elixir', 'JavaScript ES6', 'SQL', 'HTML5', 'CSS3', 'JAVA',
      'Phoenix', 'ReactJS', 'Node.js', 'Docker', 'MsSQL', 'Postgres', 
      'Oracle', 'RESTful API', 'C++', 'PHP', 'MySQL', 'C#'
    ],
    soft: [
      'Leadership', 'Mentoring', 'Problem Solving', 'Mathematical Skills',
      'Communication', 'Team Collaboration', 'Time Management', 'Adaptability'
    ],
    languages: ['English (Fluent)', 'Nyanja (Fluent)']
  };

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">My Skills</h2>
      
      <div className="mb-8 flex border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'technical'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('technical')}
        >
          Technical Skills
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'soft'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('soft')}
        >
          Soft Skills
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'languages'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => setActiveTab('languages')}
        >
          Languages
        </button>
      </div>
      
      <div className="flex flex-wrap">
        {skills[activeTab].map((skill, index) => (
          <span
            key={index}
            className="skill-tag"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
