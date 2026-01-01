import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import TimeTablePage from './components/TimeTable/TimeTablePage';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <ThemeToggle isDark={theme === 'dark'} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/atultiwari" element={<TimeTablePage />} />
      </Routes>
    </div>
  );
}

export default App;
