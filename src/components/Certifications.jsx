// Certifications.jsx
// Component for managing and editing the user's certifications list

import React, { useState } from 'react';
import styles from '../styles/Certifications.module.css';

function Certifications({ certifications, setCertifications }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempCertifications, setTempCertifications] = useState([...certifications]);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim() && !tempCertifications.includes(input.trim())) {
            setTempCertifications([...tempCertifications, input.trim()]);
            setInput('');
        }
    };

    const handleRemove = (cert) => {
        setTempCertifications(tempCertifications.filter(c => c !== cert));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const canSave = () => {
        return tempCertifications.length > 0;
    };

    const saveCertifications = () => {
        if (canSave()) {
            setCertifications(tempCertifications);
            setIsEditing(false);
        }
    };

    const editCertifications = () => {
        setTempCertifications([...certifications]);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setTempCertifications([...certifications]);
        setIsEditing(false);
        setInput('');
    };

    const deleteCertifications = () => {
        setCertifications([]);
        setTempCertifications([]);
        setIsEditing(true);
    };

    const renderCertificationsForm = () => {
        return (
            <div className={styles.certificationsItem}>
                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Sertifikalar
                    </label>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Sertifika ekleyin"
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

                {tempCertifications.length > 0 && (
                    <div className={styles.certificationsList}>
                        <label className={styles.fieldLabel}>Eklenen Sertifikalar</label>
                        <ul className={styles.list}>
                            {tempCertifications.map((cert, idx) => (
                                <li key={idx} className={styles.listItem}>
                                    <span className={styles.itemText}>{cert}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(cert)}
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
                        onClick={saveCertifications}
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
                        onClick={deleteCertifications}
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
                        Sertifikalar ({certifications.length})
                    </div>
                    {certifications.length > 0 ? (
                        <div className={styles.summaryCertifications}>
                            {certifications.join(', ')}
                        </div>
                    ) : (
                        <div className={styles.summaryEmpty}>
                            Henüz sertifika eklenmemiş
                        </div>
                    )}
                </div>
                <div className={styles.summaryActions}>
                    <button
                        className={styles.editButton}
                        onClick={editCertifications}
                    >
                        Düzenle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={deleteCertifications}
                    >
                        Sil
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Sertifikalar</h3>
            
            {isEditing || certifications.length === 0 ? renderCertificationsForm() : renderSummaryCard()}
        </div>
    );
}

export default Certifications; 