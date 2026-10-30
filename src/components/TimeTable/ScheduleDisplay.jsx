import React from 'react';
import styles from './ScheduleDisplay.module.css';

const ScheduleDisplay = ({ schedule, dayName, holiday, onSlotClick }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <div className={styles.scheduleContainer}>
        {holiday && (
          <div className={styles.holidayAlert}>
            <h3>🎉 {holiday}</h3>
          </div>
        )}
        <div className={styles.noClasses}>
          <h3>No classes scheduled for {dayName}</h3>
        </div>
      </div>
    );
  }

  // Handle holidays or expert lectures formatted as single items
  if (schedule[0].time === 'ALL DAY') {
    return (
      <div className={styles.scheduleContainer}>
        {holiday && (
          <div className={styles.holidayAlert}>
            <h3>🎉 {holiday}</h3>
          </div>
        )}
        <div 
          className={`${styles.specialDay} ${schedule[0].type === 'Holiday' ? styles.holiday : styles.expert}`}
          onClick={() => onSlotClick && onSlotClick(schedule[0])}
          style={{ cursor: 'pointer' }}
        >
          <h2>{schedule[0].subject}</h2>
          <span style={{ fontSize: '0.85rem', opacity: 0.8, display: 'block', marginTop: '8px' }}>
            Click for details
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.scheduleContainer}>
      {holiday && (
        <div className={styles.holidayAlert}>
          <h3>🎉 {holiday}</h3>
        </div>
      )}
      <h3 className={styles.dayTitle}>{dayName}'s Schedule</h3>
      <div className={styles.timeline}>
        {schedule.map((slot, index) => {
          const isExam = slot.type === 'Exam';
          const isMst2 = slot.examType === 'MST-II';
          const isRemedial = slot.examType === 'Remedial MST';
          const isEndSem = slot.examType && slot.examType.includes('End Sem');

          let slotClass = styles.slot;
          let badgeClass = styles.examBadge;

          if (isMst2) {
            slotClass += ` ${styles.slotMst2}`;
            badgeClass += ` ${styles.badgeMst2}`;
          } else if (isRemedial) {
            slotClass += ` ${styles.slotRemedial}`;
            badgeClass += ` ${styles.badgeRemedial}`;
          } else if (isEndSem) {
            slotClass += ` ${styles.slotEndSem}`;
            badgeClass += ` ${styles.badgeEndSem}`;
          } else if (isExam) {
            slotClass += ` ${styles.slotExam}`;
          }

          return (
            <div 
              key={index} 
              className={slotClass}
              onClick={() => onSlotClick && onSlotClick(slot)}
              style={{ cursor: 'pointer' }}
              title="Click to view details"
            >
              <div className={styles.time}>{slot.time}</div>
              <div className={styles.info}>
                <div className={styles.subject}>{slot.subject}</div>
                {slot.examType ? (
                  <span className={badgeClass}>📝 {slot.examType}</span>
                ) : (
                  <div className={styles.type}>{slot.type}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleDisplay;

