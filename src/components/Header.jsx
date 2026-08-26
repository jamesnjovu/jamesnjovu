import { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaFileAlt, FaChevronDown } from 'react-icons/fa';
import { gsap, ScrollTrigger, useGSAP, MOTION, prefersReducedMotion } from '../utils/animations';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const navRef = useRef(null);
    const actionsRef = useRef(null);
    const progressRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const menuItems = [
        { label: 'About', to: 'about' },
        { label: 'Skills', to: 'skills' },
        { label: 'Experience', to: 'experience' },
        { label: 'Education', to: 'education' },
        { label: 'Projects', to: 'projects' },
        { label: 'Contact', to: 'contact' }
    ];

    // Header entrance + a reading-progress bar driven by page scroll.
    useGSAP(
        () => {
            // ScrollTrigger replaces a raw scroll listener for the condensed header state.
            ScrollTrigger.create({
                start: 'top -50',
                end: 99999,
                onToggle: (self) => setScrolled(self.isActive),
            });

            gsap.to(progressRef.current, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
            });

            if (prefersReducedMotion()) return;

            gsap.timeline({ defaults: { ease: MOTION.ease } })
                .fromTo(
                    logoRef.current,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: MOTION.durationFast }
                )
                .fromTo(
                    navRef.current.children,
                    { opacity: 0, y: -14 },
                    { opacity: 1, y: 0, stagger: 0.06, duration: MOTION.durationFast },
                    '-=0.2'
                )
                .fromTo(
                    actionsRef.current.children,
                    { opacity: 0, y: -14 },
                    { opacity: 1, y: 0, stagger: 0.06, duration: MOTION.durationFast },
                    '-=0.3'
                );
        },
        { scope: headerRef }
    );

    // Mobile menu slides open and its links cascade in.
    useGSAP(
        () => {
            const menu = mobileMenuRef.current;
            if (!menu) return;

            const links = menu.querySelectorAll('.mobile-link');

            if (prefersReducedMotion()) {
                gsap.set(menu, { autoAlpha: isMenuOpen ? 1 : 0, y: 0 });
                return;
            }

            if (isMenuOpen) {
                gsap.timeline()
                    .set(menu, { autoAlpha: 1 })
                    .fromTo(menu, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: MOTION.durationFast })
                    .fromTo(
                        links,
                        { opacity: 0, x: -16 },
                        { opacity: 1, x: 0, stagger: 0.05, duration: 0.3 },
                        '-=0.15'
                    );
            } else {
                gsap.to(menu, {
                    autoAlpha: 0,
                    y: -16,
                    duration: 0.28,
                    ease: MOTION.easeInOut,
                });
            }
        },
        { scope: headerRef, dependencies: [isMenuOpen] }
    );

    // Highlight the nav item for whichever section is in view.
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    // Lock body scroll when the mobile menu is open.
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <header
            ref={headerRef}
            className={`fixed w-full z-40 transition-all duration-300 ${
                scrolled
                    ? 'py-2 navbar-glass border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-dark-bg-primary/90'
                    : 'py-4 bg-transparent'
            }`}
        >
            {/* Reading progress */}
            <div
                ref={progressRef}
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-cta"
            ></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <ScrollLink to="about" spy={true} smooth={true} offset={-70} duration={500} className="cursor-pointer">
                        <h1 className="text-2xl font-bold relative group" ref={logoRef}>
                            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">James Njovu</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-cta transition-all duration-300 group-hover:w-full"></span>
                        </h1>
                    </ScrollLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1" ref={navRef}>
                        {menuItems.map((item) => (
                            <ScrollLink
                                key={item.to}
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className={`px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 relative cursor-pointer
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
                    <div className="hidden md:flex items-center space-x-4" ref={actionsRef}>
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
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu — GSAP owns its open/close motion. */}
            <div
                ref={mobileMenuRef}
                className={`md:hidden fixed left-0 right-0 top-[60px] invisible opacity-0 bg-white dark:bg-dark-bg-secondary border-t border-gray-200 dark:border-gray-800 shadow-lg z-50 ${
                    isMenuOpen ? '' : 'pointer-events-none'
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
                                className={`mobile-link px-4 py-2 rounded-md transition-colors cursor-pointer ${
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
                        <div className="mobile-link flex items-center space-x-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <a href="https://github.com/jamesnjovu" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2">
                                <FaGithub size={22} />
                            </a>
                            <a href="https://www.linkedin.com/in/james-njovu-0a71181b2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2">
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
