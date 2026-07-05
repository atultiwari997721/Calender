import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import ScheduleDisplay from './ScheduleDisplay';
import LectureDetailModal from '../Modal/LectureDetailModal';
import { timeTable } from '../../data/timeTable';
import { holidays } from '../../data/holidays';

const TimeTablePage = () => {
  const [selectedDaySchedule, setSelectedDaySchedule] = useState(null);
  const [selectedLectureSlot, setSelectedLectureSlot] = useState(null);

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
            onSlotClick={setSelectedLectureSlot}
          />
        </div>
      )}

      {selectedLectureSlot && (
        <LectureDetailModal
          slot={selectedLectureSlot}
          dayName={selectedDaySchedule ? `${selectedDaySchedule.day}, ${format(selectedDaySchedule.date, 'MMMM do')}` : ''}
          onClose={() => setSelectedLectureSlot(null)}
        />
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
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Academic Calendar (Jul-Dec 2026)</h2>
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
                { event: 'Registration (5th Sem)', date: '1-4 July 2026' },
                { event: 'Commencement of Classes', date: '6 July 2026' },
                { event: 'MST-I', date: '10-12 Sept 2026' },
                { event: 'MST-II', date: '2-4 Nov 2026' },
                { event: 'Commencement of End Sem Exam', date: '17 Nov 2026' },
                { event: 'Commencement of Next Sem (6th Sem)', date: '10 Dec 2026' },
              ].map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px' }}>{item.event}</td>
                  <td style={{ padding: '10px' }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Link to="/dates" style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary-hover)'} onMouseOut={(e) => e.target.style.color = 'var(--primary-color)'}>
            View Full Academic Calendar (Autumn & Spring) →
          </Link>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px', 
        width: '100%', 
        background: 'var(--bg-card)', 
        padding: '20px', 
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Subject & Faculty Reference (Semester 5)</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
            <thead>
              <tr style={{ background: 'var(--bg-glass)', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Code</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Subject Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Faculty</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: 'PCC CL10', subject: 'Database Management System (DBMS)', faculty: 'Ms. Abhilasha Vyas (AV), Mr. Ved Kumar Gupta (VKG)' },
                { code: 'PCC CL11', subject: 'Foundations of Machine Learning (FML)', faculty: 'Ms. Megha Chokhada (MC) / YY' },
                { code: 'PCC CL12', subject: 'Neural Network (NN)', faculty: 'Ms. Pratibha Singh Tomar (PST)' },
                { code: 'PEC CL01', subject: 'Elective-I [Information Storage Management] (ISM)', faculty: 'Ms. Ankita Dubey (AD)' },
                { code: 'SBC CL02', subject: 'Programming with Java Script (JS)', faculty: 'Ms. Mohini Lowanshi (ML)' },
                { code: 'HSMC HS06', subject: 'HSSOC- II [Business Communication] (BC)', faculty: 'Ms. Rachana Bairagi (RB)' },
                { code: 'IFC EC01', subject: 'IFC-II [Sensors and Automation] (S&A)', faculty: 'Mr. Devendra Shinde (MDS)' },
                { code: 'MLC MLC03', subject: 'Environmental Studies (ES)', faculty: 'Mr. Kantikumar Athankar (DKA)' },
                { code: 'PROJ CL02', subject: 'Mini Project', faculty: 'Dr. Vandana Dubey (VD)' },
                { code: 'PROJ', subject: 'Internship-I', faculty: 'Dr. Vandana Dubey (VD)' },
              ].map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--accent-color)' }}>{item.code}</td>
                  <td style={{ padding: '10px' }}>{item.subject}</td>
                  <td style={{ padding: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.faculty}</td>
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
