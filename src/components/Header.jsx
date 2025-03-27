import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaFileAlt, FaChevronDown } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle active section detection
    useEffect(() => {
        const handleSectionObservation = () => {
            const sections = document.querySelectorAll('section[id]');
            
            const observerOptions = {
                rootMargin: '-100px 0px -50% 0px',
                threshold: 0
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => {
                observer.observe(section);
            });
            
            return () => {
                sections.forEach(section => {
                    observer.unobserve(section);
                });
            };
        };
        
        const cleanup = handleSectionObservation();
        return cleanup;
    }, []);

    const menuItems = [
        { label: 'About', to: 'about' },
        { label: 'Skills', to: 'skills' },
        { label: 'Experience', to: 'experience' },
        { label: 'Education', to: 'education' },
        { label: 'Projects', to: 'projects' },
        { label: 'Contact', to: 'contact' }
    ];

    return (
        <header className={`fixed w-full z-40 transition-all duration-300 ${
            scrolled 
                ? 'py-2 navbar-glass border-b border-gray-200 dark:border-gray-800' 
                : 'py-4'
        } ${
            scrolled 
                ? 'bg-white/90 dark:bg-dark-bg-primary/90' 
                : 'bg-transparent'
        }`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <ScrollLink 
                        to="about" 
                        spy={true} 
                        smooth={true} 
                        offset={-70} 
                        duration={500} 
                        className="cursor-pointer"
                    >
                        <h1 className="text-2xl font-bold relative group">
                            <span className="bg-gradient-cta bg-clip-text text-transparent">James Njovu</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-cta transition-all duration-300 group-hover:w-full"></span>
                        </h1>
                    </ScrollLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        {menuItems.map((item) => (
                            <ScrollLink
                                key={item.to}
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className={`px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 relative
                                   ${activeSection === item.to 
                                        ? 'text-primary-600 dark:text-primary-400' 
                                        : 'hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10'
                                    }`}
                            >
                                {item.label}
                                {activeSection === item.to && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"></span>
                                )}
                            </ScrollLink>
                        ))}
                    </nav>

                    {/* Social Icons & Resume */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a 
                            href="https://github.com/jamesnjovu" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover-rotate"
                            aria-label="GitHub Profile"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/james-njovu-0a71181b2/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover-rotate"
                            aria-label="LinkedIn Profile"
                        >
                            <FaLinkedin size={22} />
                        </a>
                        <a 
                            href="/jamesnjovu/resume.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 hover:shadow-md"
                        >
                            <FaFileAlt /> Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden bg-white dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-gray-800 absolute w-full left-0 shadow-lg transition-all duration-300 transform ${
                    isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
                }`}
            >
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex flex-col space-y-4">
                        {menuItems.map((item) => (
                            <ScrollLink
                                key={item.to}
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    activeSection === item.to
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{item.label}</span>
                                    {activeSection === item.to && (
                                        <FaChevronDown className="text-primary-600 dark:text-primary-400" />
                                    )}
                                </div>
                            </ScrollLink>
                        ))}
                        <div className="flex items-center space-x-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <a href="https://github.com/jamesnjovu" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2">
                                <FaGithub size={22} />
                            </a>
                            <a href="https://www.linkedin.com/in/james-njovu-0a71181b2/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2">
                                <FaLinkedin size={22} />
                            </a>
                            <a href="/jamesnjovu/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2 ml-auto">
                                <FaFileAlt /> Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;