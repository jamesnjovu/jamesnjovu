import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import NumberF from '../assets/images/projects/numberF.png'
import UssdEmulator from '../assets/images/projects/ussdEmulator.png'

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      title: 'USSD Emulator',
      description: 'The USSD Emulator is a React-based web application that allows developers to test and simulate USSD session flows by interacting with a backend API. It provides an interface for entering USSD codes, receiving responses, and navigating through menu options as users would on a mobile device.',
      image: UssdEmulator,
      technologies: ['React', 'JavaScript', 'Vite'],
      category: 'frontend',
      links: {
        github: 'https://github.com/jamesnjovu/ussd-emulator',
        live: 'https://jamesnjovu.github.io/ussd-emulator/'
      }
    },
    {
      title: 'Admin Portal Database',
      description: 'Designed and implemented a relational database schema for an admin portal with 20+ tables, including foreign keys and relationships.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['SQL', 'Database Design', 'Entity Relationships'],
      category: 'backend',
      links: {
        github: 'https://github.com/',
        live: '#'
      }
    },
    {
      title: 'Elixir Number Functions Library',
      description: 'Built a dependency in Elixir to help with simple numeric functions, e.g number to words, currency format display, etc.',
      image: NumberF,
      technologies: ['Elixir', 'Mathematics'],
      category: 'library',
      links: {
        github: 'https://github.com/jamesnjovu/elixir_number_functions',
        live: 'https://hexdocs.pm/number_f'
      }
    },
    {
      title: 'RESTful API for Mobile App',
      description: 'Developed a RESTful API with 10+ endpoints to support flexible data querying for a mobile application.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['API Design', 'REST', 'Backend Development'],
      category: 'backend',
      links: {
        github: 'https://github.com/',
        live: '#'
      }
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'library', label: 'Libraries' }
  ];

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">My Projects</h2>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setFilter(category.value)}
            className={`py-2 px-4 rounded-md transition-colors ${
              filter === category.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded-full px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                    >
                    <FaGithub /> Code
                  </a>
                )}
                {!project.links.github && (
                  <div
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                    >
                  </div>
                )}
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;