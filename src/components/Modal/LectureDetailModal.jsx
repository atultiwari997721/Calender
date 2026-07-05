import React from 'react';
import styles from './LectureDetailModal.module.css';
import { X, Clock, BookOpen, User, MapPin, Layers, Info } from 'lucide-react';

const FACULTY_MAP = {
  'AD': { name: 'Ms. Ankita Dubey', role: 'Assistant Professor' },
  'YY': { name: 'Ms. Megha Chokhada', role: 'Assistant Professor' },
  'ML': { name: 'Ms. Mohini Lowanshi', role: 'Assistant Professor' },
  'VKG': { name: 'Mr. Ved Kumar Gupta', role: 'Assistant Professor' },
  'AV': { name: 'Ms. Abhilasha Vyas', role: 'Assistant Professor' },
  'PST': { name: 'Ms. Pratibha Singh Tomar', role: 'Assistant Professor' },
  'RB': { name: 'Ms. Rachana Bairagi', role: 'Assistant Professor' },
  'MDS': { name: 'Mr. Devendra Shinde', role: 'Assistant Professor' },
  'DKA': { name: 'Mr. Kantikumar Athankar', role: 'Assistant Professor' },
  'VD': { name: 'Dr. Vandana Dubey', role: 'Head of Department (HOD)' },
  'SKB': { name: 'Mr. S. K. Bhan', role: 'Faculty Advisor' },
  'NKY': { name: 'Mr. N. K. Yadav', role: 'Associate Professor' },
};

const SUBJECT_MAP = {
  'DBMS': { code: 'PCC CL10', name: 'Database Management System (DBMS)', defaultFaculty: ['AV', 'VKG'] },
  'FML': { code: 'PCC CL11', name: 'Foundations of Machine Learning (FML)', defaultFaculty: ['YY'] },
  'NN': { code: 'PCC CL12', name: 'Neural Network (NN)', defaultFaculty: ['PST'] },
  'ISM': { code: 'PEC CL01', name: 'Elective-I [Information Storage Management] (ISM)', defaultFaculty: ['AD'] },
  'JS': { code: 'SBC CL02', name: 'Programming with Java Script (JS)', defaultFaculty: ['ML'] },
  'BC': { code: 'HSMC HS06', name: 'HSSOC- II [Business Communication] (BC)', defaultFaculty: ['RB'] },
  'S&A': { code: 'IFC EC01', name: 'IFC-II [Sensors and Automation] (S&A)', defaultFaculty: ['MDS'] },
  'ES': { code: 'MLC MLC03', name: 'Environmental Studies (ES)', defaultFaculty: ['DKA'] },
  'MINI PROJECT': { code: 'PROJ CL02', name: 'Mini Project', defaultFaculty: ['VD'] },
  'INTERNSHIP': { code: 'PROJ', name: 'Internship-I', defaultFaculty: ['VD'] },
  'SPOKEN TUTORIAL': { code: 'SBC CL02', name: 'Spoken Tutorial (Programming with JS)', defaultFaculty: ['ML'] },
};

function parseSubSlot(part) {
  const cleanPart = part.trim();
  
  // 1. Detect Room/Location (e.g. N-108, N-109, N-007, N-205, N-107)
  const roomMatch = cleanPart.match(/N-\d+/);
  const room = roomMatch ? roomMatch[0] : null;
  
  // 2. Detect Batch (e.g. (A) or (B))
  const batchMatch = cleanPart.match(/\(([AB])\)/);
  const batch = batchMatch ? `Batch ${batchMatch[1]}` : null;
  
  // 3. Find Faculty
  const facultyList = [];
  const parenMatches = cleanPart.match(/\(([^)]+)\)/g);
  if (parenMatches) {
    parenMatches.forEach(pm => {
      const inner = pm.replace(/[()]/g, '');
      if (inner !== 'A' && inner !== 'B' && inner !== 'L') {
        const splitFac = inner.split('/');
        splitFac.forEach(f => {
          const trimmedF = f.trim();
          if (FACULTY_MAP[trimmedF]) {
            facultyList.push({ abbr: trimmedF, ...FACULTY_MAP[trimmedF] });
          } else if (trimmedF.length > 0 && /^[A-Z]{2,3}$/.test(trimmedF)) {
            facultyList.push({ abbr: trimmedF, name: `${trimmedF} Faculty`, role: 'Department Faculty' });
          }
        });
      }
    });
  }
  
  // Also check for standalone faculty abbreviations at the end of string (like "ISM(L) AD")
  const words = cleanPart.split(/\s+/);
  words.forEach(word => {
    const cleanWord = word.replace(/[()]/g, '').trim();
    if (FACULTY_MAP[cleanWord] && !facultyList.some(f => f.abbr === cleanWord)) {
      facultyList.push({ abbr: cleanWord, ...FACULTY_MAP[cleanWord] });
    }
  });
  
  // 4. Identify Subject
  let subjectInfo = null;
  let subjectType = 'Lecture';
  
  if (cleanPart.toLowerCase().includes('lab')) {
    subjectType = 'Lab';
  } else if (cleanPart.toLowerCase().includes('project')) {
    subjectType = 'Project';
  } else if (cleanPart.toLowerCase().includes('tutorial')) {
    subjectType = 'Tutorial';
  } else if (cleanPart.toLowerCase().includes('internship')) {
    subjectType = 'Internship';
  } else if (cleanPart.toLowerCase().includes('llc')) {
    subjectType = 'Other';
  }
  
  // Find matching subject
  for (const [key, value] of Object.entries(SUBJECT_MAP)) {
    if (cleanPart.toUpperCase().includes(key.toUpperCase())) {
      subjectInfo = value;
      break;
    }
  }
  
  // Fallbacks for specific common labels
  if (!subjectInfo) {
    if (cleanPart.toUpperCase().includes('ML LAB')) {
      subjectInfo = { code: 'PCC CL11', name: 'Machine Learning Lab' };
      subjectType = 'Lab';
    } else if (cleanPart.toUpperCase().includes('DBMS LAB')) {
      subjectInfo = { code: 'PCC CL10', name: 'Database Management System Lab' };
      subjectType = 'Lab';
    } else if (cleanPart.toUpperCase().includes('JS LAB')) {
      subjectInfo = { code: 'SBC CL02', name: 'Programming with Java Script (JS) Lab' };
      subjectType = 'Lab';
    } else if (cleanPart.toUpperCase().includes('LLC')) {
      subjectInfo = { code: 'LLC', name: 'Life Long Learning (LLC)' };
      subjectType = 'Other';
    } else {
      const nameOnly = cleanPart.replace(/N-\d+/g, '').replace(/\([^)]+\)/g, '').trim();
      subjectInfo = { code: 'GEN', name: nameOnly || cleanPart };
    }
  }

  // Populate default faculty if none found
  if (facultyList.length === 0 && subjectInfo.defaultFaculty) {
    subjectInfo.defaultFaculty.forEach(abbr => {
      if (FACULTY_MAP[abbr]) {
        facultyList.push({ abbr, ...FACULTY_MAP[abbr] });
      }
    });
  }
  
  return {
    originalText: cleanPart,
    subjectName: subjectInfo.name,
    subjectCode: subjectInfo.code,
    subjectType,
    batch,
    room,
    faculty: facultyList
  };
}

const LectureDetailModal = ({ slot, dayName, onClose }) => {
  if (!slot) return null;

  // Split multi-subjects (e.g. ML Lab(A) / DBMS Lab(B))
  const parts = slot.subject.split('/');
  const subSlots = parts.map(part => parseSubSlot(part));

  // Determine overall type badge
  const primaryType = subSlots[0]?.subjectType || slot.type || 'Lecture';

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className={`${styles.typeBadge} ${styles[primaryType.toLowerCase()]}`}>
              {primaryType}
            </span>
            <h2 className={styles.modalTitle}>Lecture Details</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close details">
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {/* Time & Day Card */}
          <div className={styles.timeCard}>
            <div className={styles.infoRow}>
              <Clock className={styles.icon} size={18} />
              <div>
                <div className={styles.label}>Time & Day</div>
                <div className={styles.value}>{slot.time} • {dayName}</div>
              </div>
            </div>
          </div>

          {/* Sub slots (usually 1, but could be 2 for split labs) */}
          <div className={styles.slotsContainer}>
            {subSlots.map((sub, index) => (
              <div 
                key={index} 
                className={`${styles.slotCard} ${subSlots.length > 1 ? styles.splitCard : ''}`}
              >
                {sub.batch && (
                  <div className={styles.batchBadge}>{sub.batch}</div>
                )}
                
                <div className={styles.slotSubjectHeader}>
                  <BookOpen className={styles.cardIcon} size={20} />
                  <div>
                    <h3 className={styles.subjectName}>{sub.subjectName}</h3>
                    <span className={styles.subjectCode}>{sub.subjectCode}</span>
                  </div>
                </div>

                <div className={styles.detailsGrid}>
                  {/* Room / Location */}
                  <div className={styles.detailItem}>
                    <MapPin className={styles.detailIcon} size={16} />
                    <div>
                      <div className={styles.detailLabel}>Location</div>
                      <div className={styles.detailValue}>
                        {sub.room ? `Room ${sub.room}` : 'Main Classroom / Seminar Hall'}
                      </div>
                    </div>
                  </div>

                  {/* Class Type */}
                  <div className={styles.detailItem}>
                    <Layers className={styles.detailIcon} size={16} />
                    <div>
                      <div className={styles.detailLabel}>Format</div>
                      <div className={styles.detailValue}>{sub.subjectType}</div>
                    </div>
                  </div>
                </div>

                {/* Faculty list */}
                {sub.faculty && sub.faculty.length > 0 && (
                  <div className={styles.facultySection}>
                    <h4 className={styles.sectionTitle}>
                      <User size={14} style={{ marginRight: '4px' }} />
                      Faculty
                    </h4>
                    <div className={styles.facultyList}>
                      {sub.faculty.map((fac, fIdx) => (
                        <div key={fIdx} className={styles.facultyCard}>
                          <div className={styles.facultyAvatar}>
                            {fac.abbr}
                          </div>
                          <div>
                            <div className={styles.facultyName}>{fac.name}</div>
                            <div className={styles.facultyRole}>{fac.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Extra notes / Disclaimer */}
          <div className={styles.footerNote}>
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>Refer to the reference table below for full academic events and subject codes.</span>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.closeBtn} onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailModal;
