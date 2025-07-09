// Skills.jsx
// Component for managing and editing the user's skills list

import React, { useState } from 'react';
import styles from '../styles/Skills.module.css';

function Skills({ skills, setSkills }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempSkills, setTempSkills] = useState([...skills]);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim() && !tempSkills.includes(input.trim())) {
            setTempSkills([...tempSkills, input.trim()]);
            setInput('');
        }
    };

    const handleRemove = (skill) => {
        setTempSkills(tempSkills.filter(s => s !== skill));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const canSave = () => {
        return tempSkills.length > 0;
    };

    const saveSkills = () => {
        if (canSave()) {
            setSkills(tempSkills);
            setIsEditing(false);
        }
    };

    const editSkills = () => {
        setTempSkills([...skills]);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setTempSkills([...skills]);
        setIsEditing(false);
        setInput('');
    };

    const deleteSkills = () => {
        setSkills([]);
        setTempSkills([]);
        setIsEditing(true);
    };

    const renderSkillsForm = () => {
        return (
            <div className={styles.skillsItem}>
                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Yetenekler
                    </label>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Yetenek ekleyin"
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={handleAdd}
                            className={styles.addButton}
                            title="Ekle"
                        >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4V16" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M4 10H16" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {tempSkills.length > 0 && (
                    <div className={styles.skillsList}>
                        <label className={styles.fieldLabel}>Eklenen Yetenekler</label>
                        <ul className={styles.list}>
                            {tempSkills.map((skill, idx) => (
                                <li key={idx} className={styles.listItem}>
                                    <span className={styles.itemText}>{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(skill)}
                                        className={styles.removeButton}
                                        title="Kaldır"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5.5" y="9.25" width="9" height="1.5" rx="0.75" fill="#b3b3b1" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={saveSkills}
                        disabled={!canSave()}
                    >
                        Kaydet
                    </button>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={cancelEdit}
                    >
                        İptal
                    </button>
                    <button
                        type="button"
                        className={styles.removeButton}
                        onClick={deleteSkills}
                    >
                        Sil
                    </button>
                </div>
            </div>
        );
    };

    const renderSummaryCard = () => {
        return (
            <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                    <div className={styles.summaryTitle}>
                        Yetenekler ({skills.length})
                    </div>
                    {skills.length > 0 ? (
                        <div className={styles.summarySkills}>
                            {skills.join(', ')}
                        </div>
                    ) : (
                        <div className={styles.summaryEmpty}>
                            Henüz yetenek eklenmemiş
                        </div>
                    )}
                </div>
                <div className={styles.summaryActions}>
                    <button
                        className={styles.editButton}
                        onClick={editSkills}
                    >
                        Düzenle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={deleteSkills}
                    >
                        Sil
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Yetenekler</h3>
            
            {isEditing || skills.length === 0 ? renderSkillsForm() : renderSummaryCard()}
        </div>
    );
}

export default Skills; 