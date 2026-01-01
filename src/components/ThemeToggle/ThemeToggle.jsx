import React from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button 
      className={styles.toggleButton} 
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
