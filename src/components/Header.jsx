import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
    const menuItems = [
        { label: 'About', to: 'about' },
        { label: 'Skills', to: 'skills' },
        { label: 'Experience', to: 'experience' },
        { label: 'Education', to: 'education' },
        { label: 'Projects', to: 'projects' },
        { label: 'Contact', to: 'contact' }
    ];

    return (
        <header className={`fixed w-full z-10 transition-all duration-300 ${scrolled ? 'py-2 bg-opacity-90 backdrop-blur-sm' : 'py-4'} ${scrolled ? 'bg-white dark:bg-gray-900' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <ScrollLink to="home" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">
                        <h1 className="text-2xl font-bold text-indigo-600">James Njovu</h1>
                    </ScrollLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {menuItems.map((item) => (
                            <ScrollLink
                                key={item.to}
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer font-medium transition-colors"
                            >
                                {item.label}
                            </ScrollLink>
                        ))}
                    </nav>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="https://github.com/jamesnjovu" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <FaGithub size={22} />
                        </a>
                        <a href="https://www.linkedin.com/in/james-njovu-0a71181b2/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                            <FaLinkedin size={22} />
                        </a>
                        <a href="/jamesnjovu/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 dark:text-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 py-4">
                    <div className="flex flex-col space-y-4 px-4">
                        {menuItems.map((item) => (
                            <ScrollLink
                                key={item.to}
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </ScrollLink>
                        ))}
                        <div className="flex items-center space-x-4 pt-2">
                            <a href="https://github.com/jamesnjovu" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                                <FaGithub size={22} />
                            </a>
                            <a href="https://www.linkedin.com/in/james-njovu-0a71181b2/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                                <FaLinkedin size={22} />
                            </a>
                            <a href="/jamesnjovu/resume.pdf" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                                Resume
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
