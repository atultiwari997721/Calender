import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import styles from './NoteModal.module.css';
import { X, Save } from 'lucide-react';

const NoteModal = ({ date, initialNote, onSave, onClose }) => {
  const [note, setNote] = useState(initialNote);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Notes for {format(date, 'MMMM do, yyyy')}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your plans here..."
        />
        
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={() => onSave(note)}>
            <Save size={18} />
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
