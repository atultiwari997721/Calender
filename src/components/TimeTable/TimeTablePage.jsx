import React, { useState } from 'react';
import { format, isSunday } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import ScheduleDisplay from './ScheduleDisplay';
import { timeTable } from '../../data/timeTable';
import { holidays } from '../../data/holidays';

const TimeTablePage = () => {
  const [selectedDaySchedule, setSelectedDaySchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const scheduleRef = React.useRef(null);

  React.useEffect(() => {
    if (selectedDaySchedule && scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDaySchedule]);

  const handleDateSelect = (date) => {
    const dayName = format(date, 'EEEE'); // 'Monday', 'Tuesday', etc.
    const dateKey = format(date, 'yyyy-MM-dd');
    const schedule = timeTable[dayName] || [];
    let holiday = holidays[dateKey];
    
    console.log("Date Selected:", dateKey, dayName, "Holiday:", holiday);
    
    // Check for Sunday
    if (dayName === 'Sunday') {
      if (holiday) {
        holiday = `Sunday | ${holiday}`;
      } else {
        holiday = "Sunday";
      }
    }
    
    setSelectedDaySchedule({ 
      day: dayName, 
      date: date, 
      schedule: schedule,
      holiday: holiday 
    });
    setSelectedDate(date);
  };

  return (
    <div className="timetable-page-container" style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '60px' }}>
      <h1 style={{ margin: '0 0 20px 0', color: 'var(--primary-color)', textAlign: 'center' }}>College Time Table</h1>
      
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
        <div ref={scheduleRef} style={{ width: '100%', animation: 'fadeIn 0.5s', scrollMarginTop: '80px' }}>
          <ScheduleDisplay 
            schedule={selectedDaySchedule.schedule} 
            dayName={`${selectedDaySchedule.day}, ${format(selectedDaySchedule.date, 'MMMM do')}`} 
            holiday={selectedDaySchedule.holiday}
          />
        </div>
      )}

      <div style={{ 
        marginTop: '30px', 
        width: '100%', 
        background: 'var(--bg-card)', 
        padding: '20px', 
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Academic Calendar (Jan-June 2026)</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ background: 'var(--bg-glass)', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Event</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { event: 'Registration', date: '15-20 Dec 2025' },
                { event: 'Commencement of Classes', date: '22 Dec 2025' },
                { event: 'MST-I', date: '18-20 Feb 2026' },
                { event: 'MST-II', date: '26-28 March 2026' },
                { event: 'End Sem Exam Starts', date: '7 April 2026' },
                { event: 'Next Semester (5th)', date: '1 July 2026' },
              ].map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px' }}>{item.event}</td>
                  <td style={{ padding: '10px' }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeTablePage;
