import React from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isToday, 
  isSunday, isSaturday, format 
} from 'date-fns';
import styles from './Calendar.module.css';

const CalendarGrid = ({ currentMonth, onDateClick, notes, holidays }) => {
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
    <>
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
        const holiday = holidays ? holidays[dateKey] : null;
        const isSun = isSunday(day);
        const isSat = isSaturday(day);
        
        // Check for specific exam types
        const isMst2 = holiday && (holiday.includes('MST-II') || holiday.includes('MST 2'));
        const isRemedial = holiday && holiday.toLowerCase().includes('remedial');
        const isEndSem = holiday && (holiday.includes('End Sem') || holiday.includes('End Semester'));
        const isMst1 = holiday && (holiday.includes('MST-I') || holiday.includes('MST 1')) && !isMst2;
        const isAcademic = holiday && (
          isMst2 || isRemedial || isEndSem || isMst1 ||
          holiday.includes('Exam') || 
          holiday.includes('Sem')
        );

        let cellClass = `${styles.dayCell} ${!isSameMonth(day, monthStart) ? styles.notCurrentMonth : ''} ${isToday(day) ? styles.today : ''}`;
        let textClass = styles.holidayText;
        
        // Priority Logic: Specific Exams > Other Academic > Holiday > Saturday > Sunday
        if (isMst2) {
          cellClass += ` ${styles.eventMst2}`;
          textClass = styles.mst2Text;
        } else if (isRemedial) {
          cellClass += ` ${styles.eventRemedial}`;
          textClass = styles.remedialText;
        } else if (isEndSem) {
          cellClass += ` ${styles.eventEndSem}`;
          textClass = styles.endSemText;
        } else if (isMst1) {
          cellClass += ` ${styles.eventMst1}`;
          textClass = styles.mst1Text;
        } else if (isAcademic) {
          cellClass += ` ${styles.academicEvent}`;
          textClass = styles.academicText;
        } else if (holiday) {
          cellClass += ` ${styles.holiday}`;
          textClass = styles.holidayText;
        } else if (isSat && isSameMonth(day, monthStart)) {
          cellClass += ` ${styles.saturday}`;
        } else if (isSun && isSameMonth(day, monthStart)) {
          cellClass += ` ${styles.sunday}`;
        }
        
        return (
          <div
            key={day.toString()}
            className={cellClass}
            onClick={() => onDateClick(day)}
            title={holiday} 
          >
            <span className={styles.dayNumber}>{format(day, 'd')}</span>
            
            {holiday && (
              <div className={textClass}>
                {holiday}
              </div>
            )}
            
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

    {/* Quick Visual Color Legend */}
    <div className={styles.calendarLegend}>
      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.dotMst2}`} />
        <span>MST-II (2-4 Nov)</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.dotRemedial}`} />
        <span>Remedial MST (12-14 Nov)</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.dotEndSem}`} />
        <span>End Sem Exam (18 Nov-7 Dec)</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendDot} ${styles.dotHoliday}`} />
        <span>Holiday / Sunday</span>
      </div>
    </div>
    </>
  );
};

export default CalendarGrid;
