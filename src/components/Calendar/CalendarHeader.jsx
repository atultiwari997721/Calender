import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Calendar.module.css';

const CalendarHeader = ({ currentMonth, onPrevMonth, onNextMonth }) => {
  return (
    <div className={styles.header}>
      <div className={styles.monthTitle}>
        {format(currentMonth, 'MMMM yyyy')}
      </div>
      <div className={styles.navControls}>
        <button onClick={onPrevMonth} className={styles.navButton} aria-label="Previous Month">
          <ChevronLeft size={24} />
        </button>
        <button onClick={onNextMonth} className={styles.navButton} aria-label="Next Month">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
