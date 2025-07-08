import React from 'react';
import styles from '../styles/MonthSelect.module.css';

const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

function MonthSelect({ value, onChange, label, disabled }) {
  return (
    <div className={styles.monthSelect}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles.select}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Ay</option>
        {MONTHS.map((name, idx) => (
          <option key={idx} value={String(idx+1).padStart(2, '0')}>{name}</option>
        ))}
      </select>
    </div>
  );
}

export default MonthSelect; 