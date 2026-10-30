export const timeTable = {
  Monday: [
    { time: '09:45-10:35', subject: 'ISM(L) AD', type: 'Lecture' },
    { time: '10:35-11:25', subject: 'FML(L) YY', type: 'Lecture' },
    { time: '11:30-01:10', subject: 'ML Lab(A)(YY/ML) N-108 / DBMS Lab(B)(VKG/AV) N-109', type: 'Lab' },
    { time: '01:40-02:30', subject: 'NN(L) PST', type: 'Lecture' },
    { time: '02:30-04:50', subject: 'Internship I', type: 'Other' }
  ],
  Tuesday: [
    { time: '09:45-11:25', subject: 'BC(L) RB', type: 'Lecture' },
    { time: '11:30-12:20', subject: 'FML(L) YY', type: 'Lecture' },
    { time: '12:20-01:10', subject: 'NN(L) PST', type: 'Lecture' },
    { time: '01:40-02:30', subject: 'DBMS(L) AV', type: 'Lecture' },
    { time: '02:30-04:50', subject: 'Mini Project', type: 'Other' }
  ],
  Wednesday: [
    { time: '09:45-11:25', subject: 'ML Lab(B)(YY/ML) N-108 / DBMS Lab(A)(VKG/NKY) N-109', type: 'Lab' },
    { time: '11:30-12:20', subject: 'DBMS(L) AV', type: 'Lecture' },
    { time: '12:20-01:10', subject: 'S&A(L) MRS', type: 'Lecture' },
    { time: '01:40-02:30', subject: 'ISM(L) AD', type: 'Lecture' },
    { time: '02:30-04:50', subject: 'Spoken Tutorial', type: 'Tutorial' }
  ],
  Thursday: [
    { time: '09:45-10:35', subject: 'NN(L) PST', type: 'Lecture' },
    { time: '10:35-11:25', subject: 'FML(L) YY', type: 'Lecture' },
    { time: '11:30-01:10', subject: 'DBMS Lab(B)(VKG/SKB) N-109 / JS Lab(A) (ML/TN) N-205', type: 'Lab' },
    { time: '01:40-02:30', subject: 'DBMS(L) AV', type: 'Lecture' },
    { time: '02:30-03:20', subject: 'ISM(L) AD', type: 'Lecture' },
    { time: '03:20-04:50', subject: 'LLC', type: 'Other' }
  ],
  Friday: [
    { time: '09:45-10:35', subject: 'DBMS(L) AV', type: 'Lecture' },
    { time: '10:35-11:25', subject: 'FML(L) YY', type: 'Lecture' },
    { time: '11:30-12:20', subject: 'S&A(L) MRS', type: 'Lecture' },
    { time: '12:20-01:10', subject: 'ES(L) DKA', type: 'Lecture' },
    { time: '01:40-03:20', subject: 'DBMS Lab(A)(VKG/PST) N-109 / JS Lab(B) (ML/TN) N-205', type: 'Lab' },
    { time: '03:20-04:50', subject: 'Spoken Tutorial', type: 'Tutorial' }
  ],
  Saturday: [
    { time: 'ALL DAY', subject: 'Expert Lecture', type: 'Special' }
  ],
  Sunday: [
    { time: 'ALL DAY', subject: 'HOLIDAY', type: 'Holiday' }
  ]
};

// Date-specific schedules for exams and special dates
export const dateSpecificSchedules = {
  // === Mid Semester Test II (MST-II) (02 Nov - 04 Nov 2026) ===
  '2026-11-02': [
    {
      time: '9:45AM-11:30AM',
      subject: 'PCC CL 10 - Database Management System',
      type: 'Exam',
      examType: 'MST-II',
      code: 'PCC CL 10'
    },
    {
      time: '9:45AM-11:15AM',
      subject: 'PCC CL 11 - Foundations of Machine Learning',
      type: 'Exam',
      examType: 'MST-II',
      code: 'PCC CL 11'
    }
  ],
  '2026-11-03': [
    {
      time: '11:45AM-1:15 PM',
      subject: 'PCC CL 12 - Neural Network',
      type: 'Exam',
      examType: 'MST-II',
      code: 'PCC CL 12'
    },
    {
      time: '9:45AM-11:15AM',
      subject: 'PEC CL 01 (D) - Information Storage Management',
      type: 'Exam',
      examType: 'MST-II',
      code: 'PEC CL 01 (D)'
    }
  ],
  '2026-11-04': [
    {
      time: '11:45AM-1:15 PM',
      subject: 'HSMC HS06 - Business Communication',
      type: 'Exam',
      examType: 'MST-II',
      code: 'HSMC HS06'
    },
    {
      time: '9:45AM-11:15AM',
      subject: 'IFC EC01 - Sensors and Automation',
      type: 'Exam',
      examType: 'MST-II',
      code: 'IFC EC01'
    }
  ],

  // === Remedial MST (12 Nov - 14 Nov 2026) ===
  '2026-11-12': [
    {
      time: '09:45 AM - 11:15 AM',
      subject: 'PCC CL 10 - Database Management System (DBMS)',
      type: 'Exam',
      examType: 'Remedial MST',
      code: 'PCC CL 10'
    },
    {
      time: '11:45 AM - 01:15 PM',
      subject: 'PCC CL 11 - Foundations of Machine Learning (FML)',
      type: 'Exam',
      examType: 'Remedial MST',
      code: 'PCC CL 11'
    }
  ],
  '2026-11-13': [
    {
      time: '09:45 AM - 11:15 AM',
      subject: 'PCC CL 12 - Neural Network (NN)',
      type: 'Exam',
      examType: 'Remedial MST',
      code: 'PCC CL 12'
    },
    {
      time: '11:45 AM - 01:15 PM',
      subject: 'PEC CL 01 (D) - Information Storage Management (ISM)',
      type: 'Exam',
      examType: 'Remedial MST',
      code: 'PEC CL 01 (D)'
    }
  ],
  '2026-11-14': [
    {
      time: '09:45 AM - 11:15 AM',
      subject: 'HSMC HS06 - Business Communication (BC)',
      type: 'Exam',
      examType: 'Remedial MST',
      code: 'HSMC HS06'
    },
    {
      time: '11:45 AM - 01:15 PM',
      subject: 'IFC EC01 - Sensors and Automation (S&A)',
      type: 'Exam',
      examType: 'Remedial MST',
      code: 'IFC EC01'
    }
  ],

  // === End Semester Examination December - 2026 ===
  '2026-11-18': [
    {
      time: '10:00 AM - 01:00 PM',
      subject: 'PCC-CL10/AL10 - Database Management System (DBMS)',
      type: 'Exam',
      examType: 'End Sem Theory Exam',
      code: 'PCC-CL10/AL10'
    }
  ],
  '2026-11-23': [
    {
      time: '10:00 AM - 01:00 PM',
      subject: 'PCC-CL11/AL11 - Foundations of Machine Learning (FML)',
      type: 'Exam',
      examType: 'End Sem Theory Exam',
      code: 'PCC-CL11/AL11'
    }
  ],
  '2026-11-27': [
    {
      time: '10:00 AM - 01:00 PM',
      subject: 'PCC-CL12/AL12 - Neural Network (NN)',
      type: 'Exam',
      examType: 'End Sem Theory Exam',
      code: 'PCC-CL12/AL12'
    }
  ],
  '2026-12-01': [
    {
      time: '10:00 AM - 01:00 PM',
      subject: 'PEC-CL01(D) - Information Storage Management / Cyber Security',
      type: 'Exam',
      examType: 'End Sem Theory Exam',
      code: 'PEC-CL01(D)'
    }
  ],
  '2026-12-04': [
    {
      time: '10:00 AM - 01:00 PM',
      subject: 'HSMC-HS06 - Business Communication (BC)',
      type: 'Exam',
      examType: 'End Sem Theory Exam',
      code: 'HSMC-HS06'
    }
  ],
  '2026-12-07': [
    {
      time: '10:00 AM - 01:00 PM',
      subject: 'IFC-EC01 - Sensors and Automation (S&A)',
      type: 'Exam',
      examType: 'End Sem Theory Exam',
      code: 'IFC-EC01'
    }
  ]
};

// Structured exam timetable data for dedicated UI reference cards
export const examTimetables = {
  mst2: {
    title: 'Mid Semester Test II (MST-II)',
    batch: 'B.Tech III Yr V Sem (CL T1+T2+T3)',
    datesRange: '02 Nov - 04 Nov 2026',
    pdfUrl: 'https://ies.ipsacademy.org/wp-content/uploads/2026/10/MST-II-Exaination-time-table-july-dec-2026.pdf',
    pdfButtonText: 'Download Official MST-II PDF',
    schedule: [
      {
        date: '2026-11-02',
        dateDisplay: '2.11.26',
        day: 'Monday',
        slots: [
          { time: '9:45AM-11:30AM', code: 'PCC CL 10', subject: 'Database Management System' },
          { time: '9:45AM-11:15AM', code: 'PCC CL 11', subject: 'Foundations of Machine Learning' }
        ]
      },
      {
        date: '2026-11-03',
        dateDisplay: '3.11.26',
        day: 'Tuesday',
        slots: [
          { time: '11:45AM-1:15 PM', code: 'PCC CL 12', subject: 'Neural Network' },
          { time: '9:45AM-11:15AM', code: 'PEC CL 01 (D)', subject: 'Information Storage Management' }
        ]
      },
      {
        date: '2026-11-04',
        dateDisplay: '4.11.26',
        day: 'Wednesday',
        slots: [
          { time: '11:45AM-1:15 PM', code: 'HSMC HS06', subject: 'Business Communication' },
          { time: '9:45AM-11:15AM', code: 'IFC EC01', subject: 'Sensors and Automation' }
        ]
      }
    ]
  },
  remedial: {
    title: 'Remedial Mid Semester Test (MST)',
    batch: 'B.Tech III Yr V Sem (CL T1+T2+T3)',
    datesRange: '12 Nov - 14 Nov 2026',
    pdfUrl: 'https://ies.ipsacademy.org/wp-content/uploads/2026/10/Remedial-mst-examination-time-table-july-dec-2026.pdf.pdf',
    pdfButtonText: 'Download Official Remedial MST PDF',
    schedule: [
      {
        date: '2026-11-12',
        dateDisplay: '12/11/2026',
        day: 'Thursday',
        slots: [
          { time: '09:45 AM - 11:15 AM', code: 'PCC CL 10', subject: 'Database Management System' },
          { time: '11:45 AM - 01:15 PM', code: 'PCC CL 11', subject: 'Foundations of Machine Learning' }
        ]
      },
      {
        date: '2026-11-13',
        dateDisplay: '13/11/2026',
        day: 'Friday',
        slots: [
          { time: '09:45 AM - 11:15 AM', code: 'PCC CL 12', subject: 'Neural Network' },
          { time: '11:45 AM - 01:15 PM', code: 'PEC CL 01 (D)', subject: 'Information Storage Management' }
        ]
      },
      {
        date: '2026-11-14',
        dateDisplay: '14/11/2026',
        day: 'Saturday',
        slots: [
          { time: '09:45 AM - 11:15 AM', code: 'HSMC HS06', subject: 'Business Communication' },
          { time: '11:45 AM - 01:15 PM', code: 'IFC EC01', subject: 'Sensors and Automation' }
        ]
      }
    ]
  },
  endSem: {
    title: 'End Semester Examination December - 2026',
    institute: 'IPS ACADEMY • Institute of Engineering & Science, Indore',
    subText: 'A UGC Autonomous Institute, Affiliated to RGPV, Bhopal',
    examName: 'Exam : B.Tech (All Students) V Semester',
    branch: 'Branch : CL / AL',
    timing: 'Time : 10:00 AM to 01:00 PM',
    datesRange: '18 Nov - 07 Dec 2026',
    pdfUrl: 'https://ies.ipsacademy.org/wp-content/uploads/2026/10/5th-Sem-Time-Table-New-Scheme.pdf',
    pdfButtonText: 'Download Official End Sem PDF',
    schedule: [
      {
        date: '2026-11-18',
        dateDisplay: '18/11/2026',
        day: 'Wednesday',
        time: '10:00 AM - 01:00 PM',
        code: 'PCC-CL10/AL10',
        subject: 'Database Management System'
      },
      {
        date: '2026-11-23',
        dateDisplay: '23/11/2026',
        day: 'Monday',
        time: '10:00 AM - 01:00 PM',
        code: 'PCC-CL11/AL11',
        subject: 'Foundations of Machine Learning'
      },
      {
        date: '2026-11-27',
        dateDisplay: '27/11/2026',
        day: 'Friday',
        time: '10:00 AM - 01:00 PM',
        code: 'PCC-CL12/AL12',
        subject: 'Neural Network'
      },
      {
        date: '2026-12-01',
        dateDisplay: '01/12/2026',
        day: 'Tuesday',
        time: '10:00 AM - 01:00 PM',
        code: 'PEC-CL01(D)',
        subject: 'Information Storage Management / C. Cyber Security'
      },
      {
        date: '2026-12-04',
        dateDisplay: '04/12/2026',
        day: 'Friday',
        time: '10:00 AM - 01:00 PM',
        code: 'HSMC-HS06',
        subject: 'Business Communication'
      },
      {
        date: '2026-12-07',
        dateDisplay: '07/12/2026',
        day: 'Monday',
        time: '10:00 AM - 01:00 PM',
        code: 'IFC-EC01',
        subject: 'Sensors and Automation'
      }
    ]
  }
};
