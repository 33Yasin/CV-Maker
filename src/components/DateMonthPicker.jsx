// DateMonthPicker.jsx
// Component for picking a month and year (used in date selection for education/experience)

import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import styles from '../styles/DateMonthPicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('tr', tr);

function parseValue(value) {
  if (!value) return null;
  // value: 'YYYY-MM'
  const [year, month] = value.split('-');
  if (!year || !month) return null;
  return new Date(parseInt(year), parseInt(month) - 1);
}

function formatValue(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function DateMonthPicker({ value, onChange, label, disabled }) {
  return (
    <div className={styles.dateMonthPicker}>
      {label && <label className={styles.label}>{label}</label>}
      <DatePicker
        selected={parseValue(value)}
        onChange={date => onChange(formatValue(date))}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale="tr"
        placeholderText="Ay/Yıl"
        className={styles.input}
        calendarClassName={styles.calendar}
        disabled={disabled}
        maxDate={new Date(new Date().getFullYear() + 8, 11)}
        minDate={new Date(1950, 0)}
      />
    </div>
  );
}

export default DateMonthPicker; 