import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed z-20 top-4 right-4 md:top-6 md:right-6 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-lg transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon className="text-indigo-800" /> : <FaSun className="text-yellow-300" />}
    </button>
  );
};

export default ThemeToggle;
