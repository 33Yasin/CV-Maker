import React, { useState } from 'react';
import styles from '../styles/Activities.module.css';

function Activities({ activities, setActivities }) {
  const [input, setInput] = useState('');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleAdd = () => {
    if (input.trim() && !activities.includes(input.trim())) {
      setActivities([...activities, input.trim()]);
      setInput('');
    }
  };

  const handleRemove = (activity) => {
    setActivities(activities.filter(a => a !== activity));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Activities</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add an activity"
          className={styles.input}
        />
        <button
          type="button"
          onClick={handleAdd}
          className={styles.addButton}
          title="Add"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4V16" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 10H16" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <ul className={styles.list}>
        {activities.map((activity, idx) => (
          <li key={idx} className={styles.listItem}>
            <span className={styles.itemText}>{activity}</span>
            <button
              type="button"
              onClick={() => handleRemove(activity)}
              className={styles.removeButton}
              title="Remove"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5.5" y="9.25" width="9" height="1.5" rx="0.75" fill={hoveredIdx === idx ? '#37352f' : '#b3b3b1'} />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities; 