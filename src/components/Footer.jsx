import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const menuItems = [
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Experience', to: 'experience' },
    { label: 'Education', to: 'education' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' }
  ];
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/' },
    { icon: <FaTwitter />, url: 'https://twitter.com/' }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-600">James Njovu</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Full Stack Software Engineer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
              {menuItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                >
                  {item.label}
                </ScrollLink>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} James Njovu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
