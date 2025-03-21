import { useState } from 'react';

const Experience = () => {
  const [expandedItem, setExpandedItem] = useState(0);
  
  const experiences = [
    {
      company: 'Probase Limited Zambia',
      position: 'Senior Software Engineer',
      period: 'August 2020 - Present',
      description: 'Developing, deploying, maintaining and supporting company systems in addition to designing and managing system databases.',
      achievements: [
        'Developed RESTFul based APIs to support flexible querying data by mobile app consisting of 10+ endpoints.',
        'Built multiple internal tools, including a dependency in elixir to integrate to MNOs seamlessly helping fellow developers write less code and increasing system delivery speed by 20%.'
      ]
    },
    {
      company: 'Freelance',
      position: 'Software Developer',
      period: 'September 2019 - July 2020',
      description: 'Self-employed freelance developer working on various client projects.',
      achievements: [
        'Built an E-banking mobile application using JAVA, XML and PHP.',
        'Created schema of SQL-based relational database for a new admin portal, involving 20+ tables, along with fields, foreign keys relationships, pivot tables.',
        'Built systems for 20% of the computer studies students for their final projects using PHP, HTML5, CSS3 and JavaScript.'
      ]
    },
    {
      company: 'Chilenje South Secondary School',
      position: 'Student Teacher',
      period: 'January 2018 - April 2018',
      description: 'Responsible for teaching ICT and Mathematics to secondary school students.',
      achievements: [
        'Managed, maintained and updated the school\'s database weekly.',
        'Assisted students with computer studies and programming basics.'
      ]
    }
  ];

  return (
    <section id="experience" className="section-container">
      <h2 className="section-title">Work Experience</h2>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
              expandedItem === index 
              ? 'bg-indigo-50 dark:bg-indigo-900/30 shadow-md' 
              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
            }`}
            onClick={() => setExpandedItem(index)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-indigo-600">{exp.position}</h3>
                <h4 className="text-lg font-medium">{exp.company}</h4>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">{exp.period}</span>
            </div>
            
            <p className="mt-4 text-gray-700 dark:text-gray-300">{exp.description}</p>
            
            {expandedItem === index && (
              <div className="mt-4 space-y-2 animate-fadeIn">
                <h5 className="font-medium text-indigo-600">Key Achievements:</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
