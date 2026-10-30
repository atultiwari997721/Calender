import React, { useState, useRef, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar as CalendarIcon, ExternalLink, Award, Clock, ArrowRight } from 'lucide-react';
import Calendar from '../Calendar/Calendar';
import ScheduleDisplay from './ScheduleDisplay';
import LectureDetailModal from '../Modal/LectureDetailModal';
import { timeTable, dateSpecificSchedules, examTimetables } from '../../data/timeTable';
import { holidays } from '../../data/holidays';
import styles from './TimeTablePage.module.css';

const TimeTablePage = () => {
  const [selectedDaySchedule, setSelectedDaySchedule] = useState(() => {
    const today = new Date();
    const dayName = format(today, 'EEEE');
    const dateKey = format(today, 'yyyy-MM-dd');
    const schedule = dateSpecificSchedules[dateKey] || timeTable[dayName] || [];
    let holiday = holidays[dateKey];
    if (dayName === 'Sunday') {
      holiday = holiday ? `Sunday | ${holiday}` : 'Sunday';
    }
    return {
      day: dayName,
      date: today,
      schedule: schedule,
      holiday: holiday
    };
  });

  const [selectedLectureSlot, setSelectedLectureSlot] = useState(null);
  const [activeExamTab, setActiveExamTab] = useState('mst2'); // 'mst2' | 'remedial' | 'endSem'

  const scheduleRef = useRef(null);
  const isUserInteraction = useRef(false);

  useEffect(() => {
    if (isUserInteraction.current && selectedDaySchedule && scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      isUserInteraction.current = false;
    }
  }, [selectedDaySchedule]);

  const handleDateSelect = (date) => {
    isUserInteraction.current = true;
    const dayName = format(date, 'EEEE'); // 'Monday', 'Tuesday', etc.
    const dateKey = format(date, 'yyyy-MM-dd');
    const schedule = dateSpecificSchedules[dateKey] || timeTable[dayName] || [];
    let holiday = holidays[dateKey];
    
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

  const jumpToExamDate = (isoDateStr) => {
    const parsedDate = parseISO(isoDateStr);
    handleDateSelect(parsedDate);
  };

  return (
    <div className="timetable-page-container" style={{ width: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
      
      {/* Quick Official Announcement Notice Banner */}
      <div className={styles.quickNotice}>
        <div className={styles.noticeContent}>
          <FileText size={28} color="var(--primary-color)" />
          <div className={styles.noticeText}>
            <h4>Official End Sem & MST Time Tables Announced</h4>
            <p>B.Tech V Sem (CL/AL): MST-II (2-4 Nov), Remedial (12-14 Nov), End Sem (18 Nov-7 Dec)</p>
          </div>
        </div>
        <a 
          href="https://ies.ipsacademy.org/wp-content/uploads/2026/10/5th-Sem-Time-Table-New-Scheme.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pdfBtn}
        >
          <Download size={16} /> Official End Sem PDF <ExternalLink size={14} />
        </a>
      </div>

      <h1 style={{ margin: '0 0 20px 0', color: 'var(--primary-color)', textAlign: 'center' }}>
        College Time Table
      </h1>
      
      {/* Interactive Calendar view with day schedule click */}
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

      {/* ============================================================== */}
      {/* DEDICATED EXAM TIME TABLE SECTION (MST-II, REMEDIAL, END SEM) */}
      {/* ============================================================== */}
      <div className={styles.examSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.mainTitle}>
            <Award size={22} /> Examination Time Tables
          </div>
          <a 
            href={examTimetables[activeExamTab].pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.pdfBtn} ${
              activeExamTab === 'mst2' 
                ? styles.pdfBtnMst2 
                : activeExamTab === 'remedial' 
                  ? styles.pdfBtnRemedial 
                  : styles.pdfBtnEndSem
            }`}
            title={`Download ${examTimetables[activeExamTab].title} PDF`}
          >
            <Download size={16} /> {examTimetables[activeExamTab].pdfButtonText} <ExternalLink size={14} />
          </a>
        </div>

        {/* Tab Buttons */}
        <div className={styles.tabBar}>
          <button 
            className={`${styles.tabBtn} ${activeExamTab === 'mst2' ? `${styles.activeTab} ${styles.activeTabMst2}` : ''}`}
            onClick={() => setActiveExamTab('mst2')}
          >
            🎯 MST-II (02 - 04 Nov)
          </button>
          <button 
            className={`${styles.tabBtn} ${activeExamTab === 'remedial' ? `${styles.activeTab} ${styles.activeTabRemedial}` : ''}`}
            onClick={() => setActiveExamTab('remedial')}
          >
            🔄 Remedial MST (12 - 14 Nov)
          </button>
          <button 
            className={`${styles.tabBtn} ${activeExamTab === 'endSem' ? `${styles.activeTab} ${styles.activeTabEndSem}` : ''}`}
            onClick={() => setActiveExamTab('endSem')}
          >
            📋 End Sem Exam (18 Nov - 07 Dec)
          </button>
        </div>

        {/* TAB 1: MST-II */}
        {activeExamTab === 'mst2' && (
          <div className={styles.examCard}>
            <div className={styles.examMeta}>
              <div className={styles.examMetaTitle} style={{ color: '#d97706' }}>{examTimetables.mst2.title}</div>
              <div className={styles.examMetaSub}>{examTimetables.mst2.batch} • Dates: {examTimetables.mst2.datesRange}</div>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date & Day</th>
                    <th>Time Slot</th>
                    <th>Sub Code</th>
                    <th>Subject Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examTimetables.mst2.schedule.map((entry) => (
                    <React.Fragment key={entry.date}>
                      {entry.slots.map((slot, sIdx) => (
                        <tr key={`${entry.date}-${sIdx}`}>
                          {sIdx === 0 && (
                            <td rowSpan={entry.slots.length} style={{ fontWeight: 600, borderRight: '1px solid var(--border-color)', verticalAlign: 'top' }}>
                              <div style={{ color: '#d97706' }}>{entry.dateDisplay}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.day}</div>
                            </td>
                          )}
                          <td>
                            <span className={`${styles.timeBadge} ${styles.timeBadgeMst2}`}><Clock size={12} /> {slot.time}</span>
                          </td>
                          <td>
                            <span className={`${styles.codeBadge} ${styles.codeBadgeMst2}`}>{slot.code}</span>
                          </td>
                          <td style={{ fontWeight: 500 }}>{slot.subject}</td>
                          {sIdx === 0 && (
                            <td rowSpan={entry.slots.length} style={{ verticalAlign: 'middle', borderLeft: '1px solid var(--border-color)' }}>
                              <button 
                                className={`${styles.viewDateBtn} ${styles.viewDateBtnMst2}`}
                                onClick={() => jumpToExamDate(entry.date)}
                                title="Open this day in the interactive daily view"
                              >
                                View Day <ArrowRight size={12} />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Remedial MST */}
        {activeExamTab === 'remedial' && (
          <div className={styles.examCard}>
            <div className={styles.examMeta}>
              <div className={styles.examMetaTitle} style={{ color: '#7e22ce' }}>{examTimetables.remedial.title}</div>
              <div className={styles.examMetaSub}>{examTimetables.remedial.batch} • Dates: {examTimetables.remedial.datesRange}</div>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date & Day</th>
                    <th>Time Slot</th>
                    <th>Sub Code</th>
                    <th>Subject Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examTimetables.remedial.schedule.map((entry) => (
                    <React.Fragment key={entry.date}>
                      {entry.slots.map((slot, sIdx) => (
                        <tr key={`${entry.date}-${sIdx}`}>
                          {sIdx === 0 && (
                            <td rowSpan={entry.slots.length} style={{ fontWeight: 600, borderRight: '1px solid var(--border-color)', verticalAlign: 'top' }}>
                              <div style={{ color: '#7e22ce' }}>{entry.dateDisplay}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.day}</div>
                            </td>
                          )}
                          <td>
                            <span className={`${styles.timeBadge} ${styles.timeBadgeRemedial}`}><Clock size={12} /> {slot.time}</span>
                          </td>
                          <td>
                            <span className={`${styles.codeBadge} ${styles.codeBadgeRemedial}`}>{slot.code}</span>
                          </td>
                          <td style={{ fontWeight: 500 }}>{slot.subject}</td>
                          {sIdx === 0 && (
                            <td rowSpan={entry.slots.length} style={{ verticalAlign: 'middle', borderLeft: '1px solid var(--border-color)' }}>
                              <button 
                                className={`${styles.viewDateBtn} ${styles.viewDateBtnRemedial}`}
                                onClick={() => jumpToExamDate(entry.date)}
                                title="Open this day in the interactive daily view"
                              >
                                View Day <ArrowRight size={12} />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: End Semester Exam */}
        {activeExamTab === 'endSem' && (
          <div className={styles.examCard}>
            <div className={styles.examMeta}>
              <div className={styles.examMetaTitle} style={{ color: '#0284c7' }}>{examTimetables.endSem.title}</div>
              <div className={styles.examMetaSub}>
                <strong>{examTimetables.endSem.institute}</strong> • {examTimetables.endSem.subText}
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--primary-color)', fontWeight: 600, marginTop: '2px' }}>
                {examTimetables.endSem.examName} • {examTimetables.endSem.branch} • {examTimetables.endSem.timing}
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date & Day</th>
                    <th>Exam Time</th>
                    <th>Sub Code</th>
                    <th>Subject Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examTimetables.endSem.schedule.map((entry) => (
                    <tr key={entry.date}>
                      <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                        <div style={{ color: '#0284c7' }}>{entry.dateDisplay}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{entry.day}</div>
                      </td>
                      <td>
                        <span className={`${styles.timeBadge} ${styles.timeBadgeEndSem}`}><Clock size={12} /> {entry.time}</span>
                      </td>
                      <td>
                        <span className={`${styles.codeBadge} ${styles.codeBadgeEndSem}`}>{entry.code}</span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{entry.subject}</td>
                      <td>
                        <button 
                          className={`${styles.viewDateBtn} ${styles.viewDateBtnEndSem}`}
                          onClick={() => jumpToExamDate(entry.date)}
                          title="Open this day in the interactive daily view"
                        >
                          View Day <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
              <a 
                href={examTimetables.endSem.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.pdfBtn} ${styles.pdfBtnEndSem}`}
              >
                <Download size={16} /> Download Complete 5th Sem Exam PDF Scheme <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Academic Calendar Jul-Dec 2026 Table */}
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
                { event: 'MST-II (DBMS, FML, ISM, NN, S&A, BC)', date: '2-4 Nov 2026' },
                { event: 'Remedial MST (All Subjects)', date: '12-14 Nov 2026' },
                { event: 'Commencement of End Sem Exam (Theory)', date: '17 Nov 2026 (Papers: 18 Nov - 7 Dec)' },
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

      {/* Subject & Faculty Reference */}
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
                { code: 'PCC CL11', subject: 'Foundations of Machine Learning (FML)', faculty: 'Mr. Yagyapal Yadav (YY)' },
                { code: 'PCC CL12', subject: 'Neural Network (NN)', faculty: 'Ms. Pratibha Singh Tomar (PST)' },
                { code: 'PEC CL01', subject: 'Elective-I [Information Storage Management] (ISM)', faculty: 'Ms. Ankita Dubey (AD)' },
                { code: 'SBC CL02 (P)', subject: 'Programming with Java Script (JS)', faculty: 'Ms. Mohini Lowanshi (ML)' },
                { code: 'HSMC HS06', subject: 'HSSOC- II [Business Communication] (BC)', faculty: 'Ms. Rachana Bairagi (RB)' },
                { code: 'IFC EC01', subject: 'IFC-II [Sensors and Automation] (S&A)', faculty: 'Ms. Rudrakshi Sharma (MRS)' },
                { code: 'MLC MLC03', subject: 'Environmental Studies (ES)', faculty: 'Dr. Kantikumar Athankar (DKA)' },
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
