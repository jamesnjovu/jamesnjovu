import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

const ThemeToggle = ({ theme, toggleTheme }) => {
  // Function to cycle through themes: light -> dark -> system
  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed z-20 top-4 right-4 md:top-6 md:right-6 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-lg transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FaSun className="text-yellow-500" />
      ) : theme === 'dark' ? (
        <FaMoon className="text-indigo-400" />
      ) : (
        <FaDesktop className="text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;