import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import { useState } from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle toggle with animation
  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Determine icon and color based on current theme
  const getThemeIcon = () => {
    if (theme === 'light') {
      return <FaSun className="text-yellow-500" />;
    } else if (theme === 'dark') {
      return <FaMoon className="text-indigo-400" />;
    } else {
      return <FaDesktop className="text-gray-600 dark:text-gray-300" />;
    }
  };
  
  // Theme name for accessibility
  const getThemeName = () => {
    if (theme === 'light') return 'Light';
    if (theme === 'dark') return 'Dark';
    return 'System';
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`fixed z-30 top-4 right-4 md:top-6 md:right-6 p-3 rounded-full shadow-lg transition-all duration-300 ${
        isAnimating ? 'scale-110' : ''
      } ${
        theme === 'light' 
          ? 'bg-yellow-50 ring-2 ring-yellow-200' 
          : theme === 'dark' 
            ? 'bg-indigo-900 ring-2 ring-indigo-700' 
            : 'bg-gray-200 dark:bg-gray-800'
      }`}
      aria-label={`Toggle theme, current theme: ${getThemeName()}`}
    >
      <div className={`transform transition-transform duration-500 ${isAnimating ? 'rotate-180' : ''}`}>
        {getThemeIcon()}
      </div>
      
      {/* Theme indicator tooltip */}
      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {getThemeName()} Mode
      </span>
      
      {/* Decorative ring */}
      <span className={`absolute inset-0 rounded-full ${
        theme === 'light' ? 'bg-yellow-200' : theme === 'dark' ? 'bg-indigo-700' : 'bg-gray-300 dark:bg-gray-700'
      } -z-10 opacity-20 animate-ping`}></span>
    </button>
  );
};

export default ThemeToggle;