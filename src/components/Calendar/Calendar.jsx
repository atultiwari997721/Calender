import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NoteModal from '../Modal/NoteModal';
import styles from './Calendar.module.css';

import { holidays } from '../../data/holidays';

const Calendar = ({ onDateSelectOverride }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('calendarNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  }, [notes]);

  const onNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const onPrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day) => {
    if (onDateSelectOverride) {
      onDateSelectOverride(day);
    } else {
      setSelectedDate(day);
    }
  };

  const onSaveNote = (note) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setNotes(prev => ({
      ...prev,
      [dateKey]: note
    }));
    setSelectedDate(null);
  };

  const onCloseModal = () => {
    setSelectedDate(null);
  };

  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader 
        currentMonth={currentMonth} 
        onPrevMonth={onPrevMonth} 
        onNextMonth={onNextMonth} 
      />
      <CalendarGrid 
        currentMonth={currentMonth} 
        onDateClick={onDateClick} 
        notes={notes}
        holidays={holidays}
      />
      {selectedDate && (
        <NoteModal 
          date={selectedDate} 
          initialNote={notes[format(selectedDate, 'yyyy-MM-dd')] || ''}
          onSave={onSaveNote}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default Calendar;
