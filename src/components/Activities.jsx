import React, { useState } from 'react';
import styles from '../styles/Activities.module.css';

function Activities({ activities, setActivities }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempActivities, setTempActivities] = useState([...activities]);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim() && !tempActivities.includes(input.trim())) {
            setTempActivities([...tempActivities, input.trim()]);
            setInput('');
        }
    };

    const handleRemove = (activity) => {
        setTempActivities(tempActivities.filter(a => a !== activity));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const canSave = () => {
        return tempActivities.length > 0;
    };

    const saveActivities = () => {
        if (canSave()) {
            setActivities(tempActivities);
            setIsEditing(false);
        }
    };

    const editActivities = () => {
        setTempActivities([...activities]);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setTempActivities([...activities]);
        setIsEditing(false);
        setInput('');
    };

    const deleteActivities = () => {
        setActivities([]);
        setTempActivities([]);
        setIsEditing(true);
    };

    const renderActivitiesForm = () => {
        return (
            <div className={styles.activitiesItem}>
                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Aktiviteler
                    </label>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Aktivite ekleyin"
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

                {tempActivities.length > 0 && (
                    <div className={styles.activitiesList}>
                        <label className={styles.fieldLabel}>Eklenen Aktiviteler</label>
                        <ul className={styles.list}>
                            {tempActivities.map((activity, idx) => (
                                <li key={idx} className={styles.listItem}>
                                    <span className={styles.itemText}>{activity}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(activity)}
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
                        onClick={saveActivities}
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
                        onClick={deleteActivities}
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
                        Aktiviteler ({activities.length})
                    </div>
                    {activities.length > 0 ? (
                        <div className={styles.summaryActivities}>
                            {activities.join(', ')}
                        </div>
                    ) : (
                        <div className={styles.summaryEmpty}>
                            Henüz aktivite eklenmemiş
                        </div>
                    )}
                </div>
                <div className={styles.summaryActions}>
                    <button
                        className={styles.editButton}
                        onClick={editActivities}
                    >
                        Düzenle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={deleteActivities}
                    >
                        Sil
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Activities</h3>
            
            {isEditing || activities.length === 0 ? renderActivitiesForm() : renderSummaryCard()}
        </div>
    );
}

export default Activities; 