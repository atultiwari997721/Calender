import React from 'react';
import styles from './ScheduleDisplay.module.css';

const ScheduleDisplay = ({ schedule, dayName, holiday }) => {
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
        <div className={`${styles.specialDay} ${schedule[0].type === 'Holiday' ? styles.holiday : styles.expert}`}>
          <h2>{schedule[0].subject}</h2>
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
        {schedule.map((slot, index) => (
          <div key={index} className={styles.slot}>
            <div className={styles.time}>{slot.time}</div>
            <div className={styles.info}>
              <div className={styles.subject}>{slot.subject}</div>
              <div className={styles.type}>{slot.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDisplay;
