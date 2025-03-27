import { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');

    // If a theme is saved in localStorage, use it
    if (savedTheme) {
      return savedTheme;
    }

    // Otherwise, use system preference as default
    return 'system';
  });

  const [isLoading, setIsLoading] = useState(true);

  // Effect to apply the theme based on user preference
  useEffect(() => {
    // Function to apply the theme to the document
    const applyTheme = () => {
      // First, remove both classes to start fresh
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode', 'light-mode');

      if (theme === 'dark') {
        document.documentElement.classList.add('dark'); // This is for Tailwind
        document.body.classList.add('dark-mode'); // This is for your custom CSS
      } else if (theme === 'light') {
        document.body.classList.add('light-mode'); // For custom CSS, Tailwind uses the absence of 'dark'
      } else if (theme === 'system') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.classList.add('dark'); // This is for Tailwind
          document.body.classList.add('dark-mode'); // This is for your custom CSS
        } else {
          document.body.classList.add('light-mode'); // For custom CSS
        }
      }
    };

    // Apply theme immediately
    applyTheme();

    // Save to localStorage
    localStorage.setItem('theme', theme);

    // Listen for system preference changes if in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);

      // Cleanup listener
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Simulate loading animation
  useEffect(() => {
    // Simulate loading time (reduce in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Toggle through themes: light -> dark -> system -> light
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-dark-bg-primary z-50">
        <div className="text-center">
          <div className="relative h-24 w-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent animate-pulse">
            James Njovu
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 animate-pulse">
            Software Engineer
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Header />
      <main>
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
