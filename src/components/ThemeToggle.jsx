import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className="icon-btn"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <FaSun size={15} aria-hidden="true" /> : <FaMoon size={15} aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
