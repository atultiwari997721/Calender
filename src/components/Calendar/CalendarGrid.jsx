import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, isToday, 
  isSunday, format 
} from 'date-fns';
import styles from './Calendar.module.css';

const CalendarGrid = ({ currentMonth, onDateClick, notes }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.grid}>
      {weekDays.map((day, index) => (
        <div 
          key={day} 
          className={`${styles.dayName} ${index === 0 ? styles.dayNameSunday : ''}`}
        >
          {day}
        </div>
      ))}

      {days.map((day) => {
        const dateKey = format(day, 'yyyy-MM-dd');
        const note = notes[dateKey];
        const isSun = isSunday(day);
        
        return (
          <div
            key={day.toString()}
            className={`
              ${styles.dayCell}
              ${!isSameMonth(day, monthStart) ? styles.notCurrentMonth : ''}
              ${isToday(day) ? styles.today : ''}
              ${isSun && isSameMonth(day, monthStart) ? styles.sunday : ''}
            `}
            onClick={() => onDateClick(day)}
          >
            <span className={styles.dayNumber}>{format(day, 'd')}</span>
            {note && (
              <>
                <div className={styles.noteIndicator} />
                <div className={styles.notePreview}>{note}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
