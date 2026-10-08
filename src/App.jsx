import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import MobileNav from './components/MobileNav/MobileNav';
import OfflineBanner from './components/OfflineBanner/OfflineBanner';

// Lazy load route pages for faster initial bundle & ultra-fast launch
const Calendar = lazy(() => import('./components/Calendar/Calendar'));
const TimeTablePage = lazy(() => import('./components/TimeTable/TimeTablePage'));
const DatesPage = lazy(() => import('./components/Dates/DatesPage'));

const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '260px',
    width: '100%'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid rgba(1, 125, 189, 0.2)',
      borderTopColor: 'var(--primary-color)',
      borderRadius: '50%',
      animation: 'spin 0.6s linear infinite'
    }} />
  </div>
);

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if launched as installed PWA mobile app or on mobile device
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://') ||
      new URLSearchParams(window.location.search).get('source') === 'pwa';

    const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    const hasNavigatedInSession = sessionStorage.getItem('panchang_session_active');

    // On mobile app / mobile device launch, default directly to /atultiwari
    if (!hasNavigatedInSession) {
      sessionStorage.setItem('panchang_session_active', 'true');
      if ((isStandalone || isMobileDevice) && (location.pathname === '/' || location.pathname === '')) {
        navigate('/atultiwari', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

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
      <OfflineBanner />
      <ThemeToggle isDark={theme === 'dark'} toggleTheme={toggleTheme} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/atultiwari" element={<TimeTablePage />} />
          <Route path="/timetable" element={<TimeTablePage />} />
          <Route path="/time" element={<TimeTablePage />} />
          <Route path="/dates" element={<DatesPage />} />
          <Route path="*" element={<TimeTablePage />} />
        </Routes>
      </Suspense>
      <MobileNav />
    </div>
  );
}

export default App;
