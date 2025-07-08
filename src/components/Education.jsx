import React, { useState } from "react";
import styles from '../styles/Education.module.css';
import YearSelect from './YearSelect';
import MonthSelect from './MonthSelect';
import DateMonthPicker from './DateMonthPicker';

function Education({ educationList, setEducationList }) {
    const [savedIndices, setSavedIndices] = useState(new Set());

    const handleChange = (index, field, value) => {
        const updatedList = [...educationList];
        updatedList[index][field] = value;
        setEducationList(updatedList);
    }

    const handleCheckboxChange = (index, checked) => {
        const updatedList = [...educationList];
        updatedList[index].isOngoing = checked;
        if (checked) {
            updatedList[index].endDate = '';
        }
        setEducationList(updatedList);
    };

    const handleDateMonthChange = (index, field, value) => {
        const updatedList = [...educationList];
        updatedList[index][field] = value;
        setEducationList(updatedList);
    };

    const addNewEducation = () => {
        const newEducation = {
            school: '',
            program: '',
            startDate: '',
            endDate: '',
            isOngoing: false,
            degreeType: '',
            gpa: '',
            doubleMajor: ''
        };
        
        setEducationList([...educationList, newEducation]);
        // New education will automatically show as form since it's not in savedIndices
    };

    const saveEducation = (index) => {
        const education = educationList[index];
        if (canSaveEducation(education)) {
            // Mark this education as saved
            setSavedIndices(prev => new Set([...prev, index]));
        }
    };

    const editEducation = (index) => {
        // Remove from saved indices to show form again
        setSavedIndices(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });
    };

    const removeEducation = (index) => {
        const updatedList = educationList.filter((_, i) => i !== index);
        setEducationList(updatedList);
        
        // Update saved indices to account for the removed item
        setSavedIndices(prev => {
            const newSet = new Set();
            prev.forEach(savedIndex => {
                if (savedIndex < index) {
                    // Keep indices before the removed item unchanged
                    newSet.add(savedIndex);
                } else if (savedIndex > index) {
                    // Shift indices after the removed item by -1
                    newSet.add(savedIndex - 1);
                }
                // Don't add the removed index
            });
            return newSet;
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
    };

    const canSaveEducation = (education) => {
        // This function checks if education can be saved
        return education.school && education.program && education.startDate;
    };

    const isEducationSaved = (index) => {
        return savedIndices.has(index);
    };

    const renderEducationForm = (edu, index) => {
        return (
            <div key={index} className={styles.educationItem}>
                {/* Required Fields */}
                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Okul Adı
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Üniversite/Okul adını girin"
                        value={edu.school}
                        onChange={(e) => handleChange(index, 'school', e.target.value)}
                    />
                </div>

                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Bölüm / Program
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Bölüm veya program adını girin"
                        value={edu.program}
                        onChange={(e) => handleChange(index, 'program', e.target.value)}
                    />
                </div>

                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Başlangıç Tarihi
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <DateMonthPicker
                            value={edu.startDate}
                            onChange={val => handleDateMonthChange(index, 'startDate', val)}
                            label={null}
                            disabled={false}
                        />
                    </div>
                </div>

                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Mezuniyet / Bitiş Tarihi
                    </label>
                    <div className={styles.dateContainer}>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <DateMonthPicker
                                value={edu.endDate}
                                onChange={val => handleDateMonthChange(index, 'endDate', val)}
                                label={null}
                                disabled={edu.isOngoing}
                            />
                        </div>
                        <div className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={edu.isOngoing}
                                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                            />
                            <label className={styles.checkboxLabel}>
                                Hâlâ devam ediyorum
                            </label>
                        </div>
                    </div>
                </div>

                {/* Optional Fields */}
                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Derece Türü
                    </label>
                    <select
                        className={styles.degreeSelect}
                        value={edu.degreeType}
                        onChange={(e) => handleChange(index, 'degreeType', e.target.value)}
                    >
                        <option value="">Seçiniz</option>
                        <option value="Önlisans">Önlisans</option>
                        <option value="Lisans">Lisans</option>
                        <option value="Yüksek Lisans">Yüksek Lisans</option>
                        <option value="Doktora">Doktora</option>
                        <option value="Diğer">Diğer</option>
                    </select>
                </div>

                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Not Ortalaması (GPA)
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Örn: 3.45/4.00"
                        value={edu.gpa}
                        onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                    />
                </div>

                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Çift Anadal / Yan Dal
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Varsa çift anadal veya yan dal bilgisi"
                        value={edu.doubleMajor}
                        onChange={(e) => handleChange(index, 'doubleMajor', e.target.value)}
                    />
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={() => saveEducation(index)}
                        disabled={!canSaveEducation(edu)}
                    >
                        Kaydet
                    </button>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => removeEducation(index)}
                    >
                        İptal
                    </button>
                </div>
            </div>
        );
    };

    const renderSummaryCard = (edu, index) => {
        const startDate = formatDate(edu.startDate);
        const endDate = edu.isOngoing ? 'Devam ediyor' : formatDate(edu.endDate);
        const dateRange = `${startDate} - ${endDate}`;

        return (
            <div key={index} className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                    <div className={styles.summaryTitle}>
                        <strong>{edu.school}</strong>
                        {edu.degreeType && `, ${edu.degreeType}`}
                    </div>
                    <div className={styles.summaryDetails}>
                        {edu.program}
                        {edu.doubleMajor && ` / ${edu.doubleMajor}`}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </div>
                    <div className={styles.summaryDate}>{dateRange}</div>
                </div>
                <div className={styles.summaryActions}>
                    <button
                        className={styles.editButton}
                        onClick={() => editEducation(index)}
                    >
                        Düzenle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={() => removeEducation(index)}
                    >
                        Kaldır
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Education</h3>
            
            {/* Render all education items */}
            {educationList.map((edu, index) => {
                if (isEducationSaved(index)) {
                    return renderSummaryCard(edu, index);
                } else {
                    return renderEducationForm(edu, index);
                }
            })}

            {/* Add New Education Button - always show */}
            <button onClick={addNewEducation} className={styles.addButton}>
                + Eğitim Ekle
            </button>
        </div>
    );
}

export default Education;