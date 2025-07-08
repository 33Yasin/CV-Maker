import React, { useState } from "react";
import styles from '../styles/Experience.module.css';

function Experience({ experienceList, setExperienceList }) {
    const [savedIndices, setSavedIndices] = useState(new Set());

    const handleChange = (index, field, value) => {
        const updatedList = [...experienceList];
        updatedList[index][field] = value;
        setExperienceList(updatedList);
    }

    const addNewExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            duration: '',
            description: ''
        };
        
        setExperienceList([...experienceList, newExperience]);
    };

    const saveExperience = (index) => {
        const experience = experienceList[index];
        if (canSaveExperience(experience)) {
            setSavedIndices(prev => new Set([...prev, index]));
        }
    };

    const editExperience = (index) => {
        setSavedIndices(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    };

    const removeExperience = (index) => {
        const updatedList = experienceList.filter((_, i) => i !== index);
        setExperienceList(updatedList);
        
        setSavedIndices(prev => {
            const newSet = new Set();
            prev.forEach(savedIndex => {
                if (savedIndex < index) {
                    newSet.add(savedIndex);
                } else if (savedIndex > index) {
                    newSet.add(savedIndex - 1);
                }
            });
            return newSet;
        });
    };

    const canSaveExperience = (experience) => {
        return experience.company && experience.position;
    };

    const isExperienceSaved = (index) => {
        return savedIndices.has(index);
    };

    const renderExperienceForm = (exp, index) => {
    return (
            <div key={index} className={styles.experienceItem}>
                {/* Required Fields */}
                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Şirket Adı
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Şirket adını girin"
                        value={exp.company}
                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                    />
                </div>

                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Pozisyon
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Pozisyon adını girin"
                        value={exp.position}
                        onChange={(e) => handleChange(index, 'position', e.target.value)}
                    />
                </div>

                {/* Optional Fields */}
                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Süre
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Örn: Ocak 2023 - Aralık 2023"
                        value={exp.duration}
                        onChange={(e) => handleChange(index, 'duration', e.target.value)}
                    />
                </div>

                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Açıklama
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder="İş deneyiminizi ve sorumluluklarınızı açıklayın..."
                        value={exp.description}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                    />
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={() => saveExperience(index)}
                        disabled={!canSaveExperience(exp)}
                    >
                        Kaydet
                    </button>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => removeExperience(index)}
                    >
                        İptal
                    </button>
                </div>
            </div>
        );
    };

    const renderSummaryCard = (exp, index) => {
        const truncateDescription = (text, maxLength = 100) => {
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength) + '...';
        };

        return (
            <div key={index} className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                    <div className={styles.summaryTitle}>
                        <strong>{exp.position}</strong>
                        {exp.company && `, ${exp.company}`}
                    </div>
                    {exp.duration && (
                        <div className={styles.summaryDuration}>{exp.duration}</div>
                    )}
                    {exp.description && (
                        <div className={styles.summaryDescription}>
                            {truncateDescription(exp.description)}
                        </div>
                    )}
                </div>
                <div className={styles.summaryActions}>
                    <button
                        className={styles.editButton}
                        onClick={() => editExperience(index)}
                    >
                        Düzenle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={() => removeExperience(index)}
                    >
                        Kaldır
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Work Experience</h3>
            
            {/* Render all experience items */}
            {experienceList.map((exp, index) => {
                if (isExperienceSaved(index)) {
                    return renderSummaryCard(exp, index);
                } else {
                    return renderExperienceForm(exp, index);
                }
            })}

            {/* Add New Experience Button - always show */}
            <button onClick={addNewExperience} className={styles.addButton}>
                + İş Deneyimi Ekle
            </button>
        </div>
    );
}

export default Experience;