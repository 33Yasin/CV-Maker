import React from 'react';
import styles from '../styles/MonthSelect.module.css'; // Use same style for consistency

function YearSelect({ value, onChange, label, min = 1950, max = new Date().getFullYear() + 8, disabled }) {
  const years = [];
  for (let y = max; y >= min; y--) years.push(y);
  return (
    <div className={styles.monthSelect}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Yıl</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export default YearSelect; 