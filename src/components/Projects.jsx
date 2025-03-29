import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaSearch } from 'react-icons/fa';
import NumberF from '../assets/images/projects/numberF.png';
import UssdEmulator from '../assets/images/projects/ussdEmulator.png';
import PineUi from '../assets/images/projects/pineUi.png';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const sectionRef = useRef(null);
  
  // Enhanced project data
  const projects = [
    {
      title: 'Pine UI',
      description: 'A comprehensive library of interactive UI components for Phoenix applications built with AlpineJS and TailwindCSS. Features 15+ components including animated text, interactive cards, form elements, buttons with loading states, tooltips, and badges.',
      image: PineUi,
      technologies: ['Elixir', 'Phoenix', 'TailwindCSS', 'AlpineJS', 'HEEx'],
      category: 'library',
      links: {
        github: 'https://github.com/jamesnjovu/pine_ui_phoenix',
        live: 'https://hex.pm/packages/pine_ui_phoenix'
      }
    },
    {
      title: 'E-Banking Mobile Application',
      description: 'Built a secure mobile banking solution with features including account management, transfers, bill payments, and transaction history. Implemented biometric authentication and end-to-end encryption.',
      image: 'https://via.placeholder.com/600x400',
      technologies: ['Java', 'XML', 'PHP', 'MySQL', 'Security', 'Mobile'],
      category: 'fullstack',
      links: {
        github: 'https://github.com/',
        live: '#'
      }
    },
    {
      title: 'Elixir Number Functions Library',
      description: 'Built a popular dependency in Elixir to help with numeric formatting and conversions. Features include number to words conversion, currency formatting, and mathematical utilities used by developers across multiple applications.',
      image: NumberF,
      technologies: ['Elixir', 'Mathematics', 'Open Source', 'Package Development'],
      category: 'library',
      links: {
        github: 'https://github.com/jamesnjovu/elixir_number_functions',
        live: 'https://hexdocs.pm/number_f'
      }
    },
    {
      title: 'USSD Emulator',
      description: 'A React-based web application that simulates USSD session flows by interacting with a backend API. Provides an intuitive interface for developers to test USSD applications without needing a physical device.',
      image: UssdEmulator,
      technologies: ['React', 'JavaScript', 'Vite', 'CSS3', 'REST API'],
      category: 'frontend',
      links: {
        github: 'https://github.com/jamesnjovu/ussd-emulator',
        live: 'https://jamesnjovu.github.io/ussd-emulator/'
      }
    },
  ];

  useEffect(() => {
    // Filter and search projects
    const filtered = projects.filter(project => {
      const matchesFilter = filter === 'all' || project.category === filter;
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    });
    
    setVisibleProjects(filtered);
  }, [filter, searchTerm]);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
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

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'library', label: 'Libraries' }
  ];
  
  return (
    <section id="projects" className="section-container relative overflow-hidden">
      <div ref={sectionRef} className="opacity-0">
        <h2 className="section-title">My Projects</h2>
        
        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`py-2 px-4 rounded-md transition-all duration-300 ${
                    filter === category.value
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
            {visibleProjects.map((project, index) => (
              <div 
                key={index}
                className="card project-card hover:shadow-xl"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover project-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex gap-4">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-400 transition-colors hover-rotate"
                            aria-label="View source code"
                          >
                            <FaGithub size={22} />
                          </a>
                        )}
                        {project.links.live && project.links.live !== '#' && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-400 transition-colors hover-rotate"
                            aria-label="View live demo"
                          >
                            <FaExternalLinkAlt size={22} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 rounded-full px-2 py-1">
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
                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 transition-colors group"
                      >
                        <FaGithub className="group-hover:animate-bounce" /> Code
                      </a>
                    )}
                    {!project.links.github && <div></div>}
                    
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-1 transition-colors group"
                    >
                      <FaExternalLinkAlt className="group-hover:animate-bounce" /> Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {setFilter('all'); setSearchTerm('');}} 
              className="mt-4 btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-10 -right-20 w-64 h-64 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-10 -left-20 w-64 h-64 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Projects;
