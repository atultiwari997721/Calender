import React, { useState } from 'react';
import { format } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import ScheduleDisplay from './ScheduleDisplay';
import { timeTable } from '../../data/timeTable';

const TimeTablePage = () => {
  const [selectedDaySchedule, setSelectedDaySchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    const dayName = format(date, 'EEEE'); // 'Monday', 'Tuesday', etc.
    const schedule = timeTable[dayName] || [];
    setSelectedDaySchedule({ day: dayName, date: date, schedule: schedule });
    setSelectedDate(date);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ margin: '20px 0', color: 'var(--primary-color)' }}>College Time Table</h1>
      
      {/* We reuse Calendar but pass a custom handler if we refactor Calendar to accept it.
          Currently Calendar handles its own state and modals. 
          To reuse it effectively for this use case, we might need to modify Calendar.jsx to accept an onDateSelect prop 
          that overrides the default behavior, OR we simply let the user click a date, ignore the note modal (or close it), 
          and show the schedule below.
          
          For "Best UI", let's modify Calendar.jsx to accept a prop `onDateSelectOverride` which if present, 
          prevents the default modal and calls this function instead.
      */}
      <Calendar onDateSelectOverride={handleDateSelect} />

      {selectedDaySchedule && (
        <div style={{ width: '100%', animation: 'fadeIn 0.5s' }}>
          <ScheduleDisplay 
            schedule={selectedDaySchedule.schedule} 
            dayName={`${selectedDaySchedule.day}, ${format(selectedDaySchedule.date, 'MMMM do')}`} 
          />
        </div>
      )}
    </div>
  );
};

export default TimeTablePage;
