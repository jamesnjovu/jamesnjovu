import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import Profile from '../assets/james-profile.jpg';

const About = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef(null);

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
    <section id="about" className="min-h-screen flex items-center section-container">
      <div 
        ref={sectionRef}
        className="grid md:grid-cols-2 gap-8 items-center opacity-0"
      >
        <div className="order-2 md:order-1 stagger-children">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent animate-staggered">
            Hi, I'm <span className="text-primary-600 dark:text-primary-400">James Njovu</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300 animate-staggered animate-staggered-delay-1">
            Full Stack Software Engineer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed animate-staggered animate-staggered-delay-2 max-w-xl">
            Results-driven Software Engineer with over 4 years of professional experience building reusable UI components and designing scalable back-end architectures. Passionate about clean code, performance optimization, and building user-friendly interfaces. Experienced in mentoring junior developers with a strong interest in AI/ML and cloud technologies.
          </p>
          <div className="flex flex-wrap gap-4 animate-staggered animate-staggered-delay-3">
            <a
              href="#contact"
              className="btn btn-primary btn-animated group"
            >
              Contact Me
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/jamesnjovu/resume.pdf"
              className="btn btn-secondary hover-scale group"
              download
            >
              <FaDownload className="mr-2 group-hover:animate-bounce" /> Download CV
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-4 animate-staggered animate-staggered-delay-4">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary-600 dark:text-primary-400">{currentYear - 2020}+</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary-600 dark:text-primary-400">20+</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary-600 dark:text-primary-400">10+</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Happy Clients</p>
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-cta rounded-full blur opacity-75 dark:opacity-50 animate-pulse"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl transition-all duration-300 hover:scale-105">
              <img
                src={Profile} 
                alt="James Njovu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 bg-white dark:bg-dark-bg-secondary p-4 rounded-full shadow-lg">
              <div className="bg-primary-600 text-white rounded-full h-20 w-20 flex items-center justify-center font-bold">
                <div className="text-center">
                  <div className="text-xl">{currentYear - 2020}+</div>
                  <div className="text-xs">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration - visible in light mode */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary-100 rounded-tr-full -z-10 opacity-50 hidden dark:hidden md:block"></div>
      
      {/* Background decoration - visible in dark mode */}
      <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-accent-900/20 rounded-tl-full -z-10 opacity-40 hidden dark:md:block"></div>
    </section>
  );
};

export default About;