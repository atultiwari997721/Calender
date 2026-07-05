import React, { useState, useMemo } from 'react';
import { academicCalendar } from '../../data/academicCalendar';
import styles from './DatesPage.module.css';
import { Search, Calendar as CalendarIcon, FileText, Printer, Award, BookOpen, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const DatesPage = () => {
  const [activeSemester, setActiveSemester] = useState('autumn'); // 'autumn' or 'spring'
  const [searchQuery, setSearchQuery] = useState('');

  // Categories helper
  const getCategory = (event) => {
    const text = event.toLowerCase();
    if (text.includes('exam') || text.includes('mst') || text.includes('re-examination') || text.includes('test')) {
      return { label: 'Exam / Test', class: styles.exam };
    }
    if (text.includes('commencement') || text.includes('begins') || text.includes('last day') || text.includes('instructions')) {
      return { label: 'Academic Milestone', class: styles.milestone };
    }
    if (text.includes('diwas') || text.includes('celebration') || text.includes('day') || text.includes('swaranjali') || text.includes('festival') || text.includes('holiday')) {
      return { label: 'Holiday / Event', class: styles.celebration };
    }
    return { label: 'Administrative', class: styles.admin };
  };

  const currentEvents = useMemo(() => {
    return academicCalendar[activeSemester] || [];
  }, [activeSemester]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return currentEvents;
    const query = searchQuery.toLowerCase();
    return currentEvents.filter(
      (item) =>
        item.event.toLowerCase().includes(query) ||
        item.dateStr.toLowerCase().includes(query) ||
        getCategory(item.event).label.toLowerCase().includes(query)
    );
  }, [currentEvents, searchQuery]);

  // Semester stats
  const stats = useMemo(() => {
    const events = academicCalendar[activeSemester] || [];
    let exams = 0;
    let milestones = 0;
    let admin = 0;
    let holidays = 0;

    events.forEach(e => {
      const cat = getCategory(e.event).label;
      if (cat.includes('Exam')) exams++;
      else if (cat.includes('Milestone')) milestones++;
      else if (cat.includes('Holiday')) holidays++;
      else admin++;
    });

    return {
      total: events.length,
      exams,
      milestones,
      holidays,
      admin
    };
  }, [activeSemester]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.backLinkGroup}>
            <Link to="/atultiwari" className={styles.backLink}>← Back to Timetable</Link>
            <Link to="/" className={styles.backLink}>Go to Calendar →</Link>
          </div>
          <h1 className={styles.title}>Academic Calendar</h1>
          <p className={styles.subtitle}>IPS Academy - Institute of Engineering & Science (AY 2026-27)</p>
        </div>
        <button className={styles.printBtn} onClick={handlePrint}>
          <Printer size={18} />
          Print Calendar
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statTotal}`}>
          <div className={styles.statIconWrapper}><CalendarIcon size={20} /></div>
          <div>
            <div className={styles.statVal}>{stats.total}</div>
            <div className={styles.statLabel}>Total Events</div>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statExams}`}>
          <div className={styles.statIconWrapper}><Award size={20} /></div>
          <div>
            <div className={styles.statVal}>{stats.exams}</div>
            <div className={styles.statLabel}>Exams & Tests</div>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statMilestones}`}>
          <div className={styles.statIconWrapper}><BookOpen size={20} /></div>
          <div>
            <div className={styles.statVal}>{stats.milestones}</div>
            <div className={styles.statLabel}>Milestones</div>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statHolidays}`}>
          <div className={styles.statIconWrapper}><Clock size={20} /></div>
          <div>
            <div className={styles.statVal}>{stats.holidays}</div>
            <div className={styles.statLabel}>Events & Holidays</div>
          </div>
        </div>
      </div>

      {/* Tabs and Search Controls */}
      <div className={styles.controlsRow}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeSemester === 'autumn' ? styles.activeTab : ''}`}
            onClick={() => { setActiveSemester('autumn'); setSearchQuery(''); }}
          >
            🍁 Autumn Semester (III, V, VII Sem)
          </button>
          <button 
            className={`${styles.tabBtn} ${activeSemester === 'spring' ? styles.activeTab : ''}`}
            onClick={() => { setActiveSemester('spring'); setSearchQuery(''); }}
          >
            🌸 Spring Semester (IV, VI, VIII Sem)
          </button>
        </div>

        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            placeholder="Search events, dates, categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Event Timeline / List */}
      <div className={styles.timelineContainer}>
        {filteredEvents.length === 0 ? (
          <div className={styles.noResults}>
            <FileText size={48} className={styles.noResultsIcon} />
            <h3>No Academic Events Found</h3>
            <p>Try refining your search query or switching semesters.</p>
          </div>
        ) : (
          <div className={styles.timeline}>
            {filteredEvents.map((item, idx) => {
              const category = getCategory(item.event);
              return (
                <div key={item.id} className={styles.timelineItem} style={{ '--animation-order': idx }}>
                  <div className={styles.timelineNode}>
                    <div className={styles.nodeNumber}>{item.id}</div>
                  </div>
                  
                  <div className={styles.eventCard}>
                    <div className={styles.eventCardHeader}>
                      <span className={`${styles.categoryBadge} ${category.class}`}>
                        <Tag size={12} style={{ marginRight: '4px' }} />
                        {category.label}
                      </span>
                      <span className={styles.eventDate}>
                        <CalendarIcon size={14} style={{ marginRight: '6px' }} />
                        {item.dateStr}
                      </span>
                    </div>
                    
                    <h3 className={styles.eventTitle}>{item.event}</h3>
                    
                    <div className={styles.eventSubdetails}>
                      <span className={styles.eventStartEnd}>
                        ISO Key: <code>{item.start}</code> {item.start !== item.end && `to ${item.end}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatesPage;
