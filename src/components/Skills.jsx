import React, { useState } from 'react';

function Skills({ skills, setSkills }) {
  const [input, setInput] = useState('');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleAdd = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput('');
    }
  };

  const handleRemove = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div>
      <h3>Skills</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a skill"
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
            height: 36,
            background: '#f7f6f3',
            border: '1px solid #e3e2e0',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          title="Add"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4V16" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4 10H16" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {skills.map((skill, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ flex: 1 }}>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemove(skill)}
              style={{
                background: 'none',
                border: 'none',
                padding: 4,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 4,
                transition: 'background 0.15s',
              }}
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

export default Skills; 