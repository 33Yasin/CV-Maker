// YearStepper.jsx
// Component for incrementing/decrementing a year value (used in date selection)
import React from 'react';
import styles from '../styles/YearStepper.module.css';

function YearStepper({ value, onChange, min = 1950, max = new Date().getFullYear() + 8, label, disabled }) {
  // State variables for the year value and min/max
  const handleDecrease = () => {
    if (!disabled && value > min) onChange(value - 1);
  };
  const handleIncrease = () => {
    if (!disabled && value < max) onChange(value + 1);
  };
  const handleInput = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= min && val <= max) onChange(val);
  };
  return (
    <div className={styles.yearStepper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.stepperRow}>
        <button type="button" className={styles.stepBtn} onClick={handleDecrease} disabled={disabled || value <= min} aria-label="Decrease year">-</button>
        <input
          type="number"
          className={styles.input}
          value={value || ''}
          min={min}
          max={max}
          onChange={handleInput}
          disabled={disabled}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button type="button" className={styles.stepBtn} onClick={handleIncrease} disabled={disabled || value >= max} aria-label="Increase year">+</button>
      </div>
    </div>
  );
}

export default YearStepper; 