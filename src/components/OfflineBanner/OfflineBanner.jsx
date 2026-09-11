import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import styles from './OfflineBanner.module.css';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className={styles.offlineBanner} role="status" aria-live="polite">
      <div className={styles.offlineDot} />
      <WifiOff size={14} color="#38bdf8" />
      <span className={styles.offlineText}>
        Offline Mode • Viewing saved calendar & timetable
      </span>
    </div>
  );
};

export default OfflineBanner;
