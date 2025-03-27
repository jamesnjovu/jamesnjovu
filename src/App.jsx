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

  // Effect to apply the theme based on user preference
  useEffect(() => {
    // Function to apply the theme to the document body
    const applyTheme = () => {
      if (theme === 'dark') {
        document.body.className = 'dark-mode';
      } else if (theme === 'light') {
        document.body.className = 'light-mode';
      } else if (theme === 'system') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.className = prefersDark ? 'dark-mode' : 'light-mode';
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

  // Toggle through themes: light -> dark -> system -> light
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };
  
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

export default App
