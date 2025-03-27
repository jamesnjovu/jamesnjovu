import { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaChevronDown, FaChevronUp, FaStar, FaTrophy, FaArrowRight } from 'react-icons/fa';

const Experience = () => {
  const [expandedItem, setExpandedItem] = useState(0);
  const sectionRef = useRef(null);
  
  const experiences = [
    {
      company: 'Probase Limited Zambia',
      position: 'Senior Software Engineer',
      period: 'August 2020 - Present',
      description: 'Leading development efforts for mission-critical financial systems and mentoring junior developers while implementing best practices for code quality and deployment.',
      responsibilities: [
        'Design and develop robust RESTful APIs to support mobile applications',
        'Create and maintain system documentation and architecture diagrams',
        'Collaborate with cross-functional teams to deliver high-quality software',
        'Lead code reviews and implement CI/CD pipelines'
      ],
      achievements: [
        'Developed RESTful APIs with 10+ endpoints, improving mobile app data querying flexibility by 40%',
        'Built an Elixir dependency for MNO integration, reducing code complexity by 30% and increasing system delivery speed by 20%',
        'Optimized database queries, resulting in a 50% improvement in application response time',
        'Successfully mentored 3 junior developers who are now contributing independently to projects'
      ],
      technologies: ['Elixir', 'Phoenix', 'JavaScript', 'SQL', 'RESTful API', 'Docker']
    },
    {
      company: 'Freelance',
      position: 'Software Developer',
      period: 'September 2019 - July 2020',
      description: 'Self-employed freelance developer delivering custom software solutions for diverse client needs.',
      responsibilities: [
        'Develop full-stack web and mobile applications based on client requirements',
        'Design and implement database schemas and architectures',
        'Provide ongoing maintenance and support for delivered projects',
        'Create detailed technical documentation for client handover'
      ],
      achievements: [
        'Built a secure E-banking mobile application using JAVA, XML and PHP with biometric authentication',
        'Designed SQL database schema for an admin portal, creating 20+ tables with optimized relationships',
        'Developed custom systems for 20% of computer studies students for their final projects',
        'Maintained 100% client satisfaction rate with on-time delivery of all projects'
      ],
      technologies: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'Java', 'SQL', 'MySQL']
    },
    {
      company: 'Chilenje South Secondary School',
      position: 'Student Teacher',
      period: 'January 2018 - April 2018',
      description: 'Taught ICT and Mathematics to secondary school students while managing the school database.',
      responsibilities: [
        'Prepare and deliver lessons on computer studies and mathematics',
        'Evaluate student performance and provide constructive feedback',
        'Maintain and update the school database with student records',
        'Assist in organizing extracurricular technology activities'
      ],
      achievements: [
        'Managed and updated the school database on a weekly basis, improving record accuracy by 25%',
        'Developed a simplified programming curriculum that increased student engagement by 40%',
        'Created an automated grading system that reduced administrative workload by 15%'
      ],
      technologies: ['Database Management', 'MS Office', 'Teaching', 'Basic Programming']
    }
  ];

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

  return (
    <section id="experience" className="section-container relative">
      <div ref={sectionRef} className="opacity-0">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="space-y-8 stagger-children">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg transition-all duration-300 cursor-pointer experience-card ${
                expandedItem === index 
                ? 'bg-primary-50 dark:bg-primary-900/20 shadow-lg border-l-4 border-primary-600' 
                : 'bg-white dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/10 border-l-4 border-transparent'
              }`}
              onClick={() => setExpandedItem(index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <FaBriefcase />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{exp.position}</h3>
                    <h4 className="text-lg font-medium">{exp.company}</h4>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">{exp.period}</span>
                  <button className="mt-2 text-primary-600 dark:text-primary-400" aria-label={expandedItem === index ? "Collapse" : "Expand"}>
                    {expandedItem === index ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">{exp.description}</p>
              
              {expandedItem === index && (
                <div className="mt-6 space-y-6 animate-fadeIn">
                  <div>
                    <h5 className="flex items-center font-medium text-primary-600 dark:text-primary-400 mb-2">
                      <FaStar className="mr-2" /> Key Responsibilities:
                    </h5>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-5">
                      {exp.responsibilities.map((responsibility, i) => (
                        <li key={i} className="flex items-start">
                          <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 mr-2 text-sm" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="flex items-center font-medium text-primary-600 dark:text-primary-400 mb-2">
                      <FaTrophy className="mr-2" /> Key Achievements:
                    </h5>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <FaArrowRight className="text-primary-600 dark:text-primary-400 mt-1 mr-2 text-sm" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/2 -left-20 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Experience;