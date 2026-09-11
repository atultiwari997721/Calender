import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import styles from './MobileNav.module.css';

const MobileNav = () => {
  return (
    <nav className={styles.bottomNav} aria-label="Mobile Navigation">
      <NavLink 
        to="/" 
        end
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <div className={styles.iconWrapper}>
          <Calendar size={20} />
        </div>
        <span className={styles.label}>Calendar</span>
      </NavLink>

      <NavLink 
        to="/atultiwari" 
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <div className={styles.iconWrapper}>
          <Clock size={20} />
        </div>
        <span className={styles.label}>Time Table</span>
      </NavLink>

      <NavLink 
        to="/dates" 
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <div className={styles.iconWrapper}>
          <GraduationCap size={20} />
        </div>
        <span className={styles.label}>Dates</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
