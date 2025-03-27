/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        dark: {
          bg: {
            primary: "#0f172a", // Example dark primary color
            secondary: "#1e293b", // Example dark secondary color
            tertiary: "#334155",  // Dark tertiary (custom)
          },
          text: {
            primary: "#f8fafc", // Example dark primary color
            secondary: "#e2e8f0", // Example dark secondary color
            tertiary: "#cbd5e1",  // Dark tertiary (custom)
          },
        },
        light: {
          bg: {
            primary: "#ffffff", // Example dark primary color
            secondary: "#f3f4f6", // Example dark secondary color
            tertiary: "#e5e7eb",  // Dark tertiary (custom)
          },
          text: {
            primary: "#111827", // Example dark primary color
            secondary: "#374151", // Example dark secondary color
            tertiary: "#6b7280",  // Dark tertiary (custom)
          },
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      boxShadow: {
        'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

        // Dark mode shadows
        'dark-shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        darkShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'dark-shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'dark-shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--primary-600), var(--accent-600))',
        'gradient-secondary': 'linear-gradient(to right, var(--accent-600), var(--primary-600))',
        'gradient-cta': 'linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%)',
      },
    },
  },
  darkMode: "class", // Enable class-based dark mode
  plugins: [],
}

