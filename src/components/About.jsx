import { FaDownload } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center section-container">
      <div className="grid md:grid-cols-2 gap-8 items-center animate-fadeIn">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-indigo-600">James Njovu</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Full Stack Software Engineer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
            Results-driven Software Engineer with 4 years of professional experience building reusable UI components and designing scalable back-end architectures. Experienced in mentoring junior developers with a strong interest in AI/ML.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              className="bg-transparent border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:text-white font-medium py-3 px-6 rounded-md flex items-center gap-2 transition-colors"
              download
            >
              <FaDownload /> Download CV
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-600">
            <img
              src="/james-profile.jpg" 
              alt="James Njovu"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
