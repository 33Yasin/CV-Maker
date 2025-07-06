import React, { useState } from "react";
import styles from '../styles/GeneralInfo.module.css';

function GeneralInfo({ userInfo, setUserInfo }) {
    const [isEditing, setIsEditing] = useState(!userInfo.firstName && !userInfo.lastName);
    const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });

    const handleChange = (field, value) => {
        setTempUserInfo(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const canSave = () => {
        return tempUserInfo.firstName && tempUserInfo.lastName;
    };

    const saveInfo = () => {
        if (canSave()) {
            setUserInfo(tempUserInfo);
            setIsEditing(false);
        }
    };

    const editInfo = () => {
        setTempUserInfo({ ...userInfo });
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setTempUserInfo({ ...userInfo });
        setIsEditing(false);
    };

    const deleteInfo = () => {
        const emptyUserInfo = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            linkedin: '',
            github: '',
        };
        setUserInfo(emptyUserInfo);
        setTempUserInfo(emptyUserInfo);
        setIsEditing(true);
    };

    const renderInfoForm = () => {
        return (
            <div className={styles.generalInfoItem}>
                {/* Required Fields */}
                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Ad
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Adınızı girin"
                        value={tempUserInfo.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                </div>

                <div className={styles.requiredField}>
                    <label className={`${styles.fieldLabel} ${styles.requiredLabel}`}>
                        Soyad
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Soyadınızı girin"
                        value={tempUserInfo.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                </div>

                {/* Optional Fields */}
                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        E-posta
                    </label>
                    <input
                        type="email"
                        className={styles.input}
                        placeholder="E-posta adresinizi girin"
                        value={tempUserInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>

                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        Telefon
                    </label>
                    <input
                        type="tel"
                        className={styles.input}
                        placeholder="Telefon numaranızı girin"
                        value={tempUserInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </div>

                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        LinkedIn
                    </label>
                    <input
                        type="url"
                        className={styles.input}
                        placeholder="LinkedIn profil linkinizi girin"
                        value={tempUserInfo.linkedin}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                    />
                </div>

                <div className={styles.optionalField}>
                    <label className={`${styles.fieldLabel} ${styles.optionalLabel}`}>
                        GitHub
                    </label>
                    <input
                        type="url"
                        className={styles.input}
                        placeholder="GitHub profil linkinizi girin"
                        value={tempUserInfo.github}
                        onChange={(e) => handleChange('github', e.target.value)}
                    />
                </div>

                <div className={styles.formActions}>
                    <button
                        type="button"
                        className={styles.saveButton}
                        onClick={saveInfo}
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
                        onClick={deleteInfo}
                    >
                        Sil
                    </button>
                </div>
            </div>
        );
    };

    const renderSummaryCard = () => {
        const hasContactInfo = userInfo.email || userInfo.phone || userInfo.linkedin || userInfo.github;
        
        return (
            <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                    <div className={styles.summaryTitle}>
                        {userInfo.firstName} {userInfo.lastName}
                    </div>
                    {hasContactInfo && (
                        <div className={styles.summaryContact}>
                            {userInfo.email && <div>{userInfo.email}</div>}
                            {userInfo.phone && <div>{userInfo.phone}</div>}
                            {userInfo.linkedin && <div>{userInfo.linkedin}</div>}
                            {userInfo.github && <div>{userInfo.github}</div>}
                        </div>
                    )}
                </div>
                <div className={styles.summaryActions}>
                    <button
                        className={styles.editButton}
                        onClick={editInfo}
                    >
                        Düzenle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={deleteInfo}
                    >
                        Sil
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>General Information</h3>
            
            {isEditing || (!userInfo.firstName && !userInfo.lastName) ? renderInfoForm() : renderSummaryCard()}
        </div>
    );
}

export default GeneralInfo;
