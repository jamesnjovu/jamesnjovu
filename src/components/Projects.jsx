
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NumberF from '../assets/images/projects/numberF.png';
import UssdEmulator from '../assets/images/projects/ussdEmulator.png';
import ExMpesa from '../assets/images/projects/exMpesa.png';
import PineUi from '../assets/images/projects/pineUi.png';
import ExMtnMomo from '../assets/images/projects/exMtnMomo.png'; // You'll need to add this image
import ExLiveTable from '../assets/images/projects/exLiveTable.png'; // You'll need to add this image

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedProjects, setPaginatedProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const projectsGridRef = useRef(null);

  // Enhanced project data with additional libraries
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
      "title": "Elixir Mpesa",
      "description": "An Elixir library for integrating with the Vodacom M-Pesa OpenAPI. This package provides a simple and elegant way to integrate M-Pesa payment services into your Elixir applications, featuring session management, C2B/B2C/B2B payments, transaction status queries, and direct debit operations.",
      "image": ExMpesa,
      "technologies": ["Elixir", "API Integration", "Payment Processing", "Fintech", "Open Source", "Json"],
      "category": "library",
      "links": {
        "github": "https://github.com/jamesnjovu/ex_mpesa",
        "live": "https://hex.pm/packages/elixir_mpesa"
      }
    },
    {
      title: 'MTN MoMo API Client',
      description: 'A comprehensive Elixir client for MTN Mobile Money API integration, allowing developers to easily implement MTN MoMo payments in their Phoenix/Elixir applications. The library supports collections, disbursements, and remittances with robust error handling and configuration options.',
      image: ExMtnMomo,
      technologies: ['Elixir', 'API Client', 'Payment Gateway', 'MTN MoMo', 'Fintech'],
      category: 'library',
      links: {
        github: 'https://github.com/jamesnjovu/ex_mtn_momo',
        live: 'https://hexdocs.pm/ex_mtn_momo/readme.html'
      }
    },
    {
      title: 'Live Table for Phoenix LiveView',
      description: 'A powerful, customizable, and interactive data table component for Phoenix LiveView applications. Features include sortable columns, pagination, search functionality, custom formatting, and responsive design all with minimal configuration.',
      image: ExLiveTable,
      technologies: ['Elixir', 'Phoenix LiveView', 'DataTables', 'UI Component', 'HEEx'],
      category: 'library',
      links: {
        github: 'https://github.com/jamesnjovu/ex_live_table',
        live: 'https://hexdocs.pm/ex_live_table/readme.html'
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
        live: 'https://hex.pm/packages/number_f'
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

  // Check for mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

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

    // Calculate total pages for pagination based on screen size
    const projectsPerPage = isMobile ? 1 : 4;
    const pages = Math.ceil(filtered.length / projectsPerPage);
    setTotalPages(pages);

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [filter, searchTerm, isMobile]);

  // Handle pagination
  useEffect(() => {
    const projectsPerPage = isMobile ? 1 : 4;
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    setPaginatedProjects(visibleProjects.slice(startIndex, endIndex));

    // Scroll to projects grid when pagination changes (if not the first render)
    if (projectsGridRef.current && currentPage !== 1) {
      setTimeout(() => {
        projectsGridRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [visibleProjects, currentPage, isMobile]);

  // Handle page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  // Calculate projects per page based on device
  const projectsPerPage = isMobile ? 1 : 4;

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
                  className={`py-2 px-4 rounded-md transition-all duration-300 ${filter === category.value
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

        {/* Projects Grid - with responsive pagination */}
        {visibleProjects.length > 0 ? (
          <>
            <div ref={projectsGridRef} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Showing {isMobile ? `project ${currentPage}` : `${paginatedProjects.length} projects`} of {visibleProjects.length}
                {filter !== 'all' && ` in ${filter}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isMobile ? 'Viewing 1 project per page on mobile' : 'Viewing 4 projects per page'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
              {paginatedProjects.map((project, index) => (
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
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

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

            {/* Enhanced Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/20'
                    }`}
                  aria-label="Previous page"
                >
                  <FaChevronLeft />
                </button>

                {/* Dynamic Page Numbers - show fewer on mobile */}
                {isMobile ? (
                  // On mobile, show current page, with ellipsis if needed
                  <div className="flex items-center space-x-1">
                    {currentPage > 2 && (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className="h-8 w-8 rounded-full flex items-center justify-center transition-all text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20"
                          aria-label="Page 1"
                        >
                          1
                        </button>
                        {currentPage > 3 && <span className="text-gray-500 dark:text-gray-400">...</span>}
                      </>
                    )}

                    {currentPage > 1 && (
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        className="h-8 w-8 rounded-full flex items-center justify-center transition-all text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20"
                        aria-label={`Page ${currentPage - 1}`}
                      >
                        {currentPage - 1}
                      </button>
                    )}

                    <button
                      className="h-8 w-8 rounded-full flex items-center justify-center transition-all bg-primary-600 text-white"
                      aria-label={`Page ${currentPage}`}
                      aria-current="page"
                    >
                      {currentPage}
                    </button>

                    {currentPage < totalPages && (
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        className="h-8 w-8 rounded-full flex items-center justify-center transition-all text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20"
                        aria-label={`Page ${currentPage + 1}`}
                      >
                        {currentPage + 1}
                      </button>
                    )}

                    {currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && <span className="text-gray-500 dark:text-gray-400">...</span>}
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="h-8 w-8 rounded-full flex items-center justify-center transition-all text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20"
                          aria-label={`Page ${totalPages}`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  // On desktop, show all page numbers
                  [...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index + 1)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${currentPage === index + 1
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/20'
                        }`}
                      aria-label={`Page ${index + 1}`}
                      aria-current={currentPage === index + 1 ? 'page' : undefined}
                    >
                      {index + 1}
                    </button>
                  ))
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/20'
                    }`}
                  aria-label="Next page"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setFilter('all'); setSearchTerm(''); }}
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
