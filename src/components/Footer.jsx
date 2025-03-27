import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaArrowUp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const menuItems = [
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Experience', to: 'experience' },
    { label: 'Education', to: 'education' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' }
  ];
  
  const socialLinks = [
    { 
      icon: <FaGithub />, 
      label: 'GitHub',
      url: 'https://github.com/jamesnjovu' 
    },
    { 
      icon: <FaLinkedin />, 
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/james-njovu-0a71181b2/' 
    },
    { 
      icon: <FaTwitter />, 
      label: 'Twitter',
      url: 'https://twitter.com/' 
    }
  ];

  // Check if we should show the scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 500; // Show after scrolling 500px
      
      setShowScrollTop(scrollY > showThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gray-100 dark:bg-gray-900 pt-16 pb-8 overflow-hidden">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-primary-600 dark:bg-primary-500 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-300 z-30 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-1/2">
        <svg className="relative block w-full h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-gray-800"></path>
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Info column */}
          <div className="animate-staggered">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">James Njovu</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-sm">
              Full Stack Software Engineer with a passion for building elegant, user-friendly solutions to complex problems.
            </p>
            
            {/* Quick contact */}
            <div className="mt-6 space-y-3">
              <a href="mailto:njovujames@gmail.com" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FaEnvelope className="mr-3" /> njovujames@gmail.com
              </a>
              <a href="tel:+260978921730" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FaPhoneAlt className="mr-3" /> +260 978 921730
              </a>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:shadow-md text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Site map */}
          <div className="animate-staggered animate-staggered-delay-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Site Map</h3>
            <nav className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all cursor-pointer py-1"
                >
                  {item.label}
                </ScrollLink>
              ))}
            </nav>
          </div>
          
          {/* Newsletter/Contact CTA */}
          <div className="animate-staggered animate-staggered-delay-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Get In Touch</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interested in working together? Let's discuss your project!
            </p>
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="btn btn-primary inline-block cursor-pointer"
            >
              Contact Me
            </ScrollLink>
            
            {/* Download CV */}
            <div className="mt-6">
              <a
                href="/jamesnjovu/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-block"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} James Njovu. All rights reserved.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
            Made with <FaHeart className="text-red-500 mx-1" /> using React & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
