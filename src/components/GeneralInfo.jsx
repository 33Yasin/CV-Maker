import React, { useState } from "react";
import AvatarEditor from 'react-avatar-editor';
import styles from '../styles/GeneralInfo.module.css';

function GeneralInfo({ userInfo, setUserInfo }) {
    const [isEditing, setIsEditing] = useState(!userInfo.firstName && !userInfo.lastName);
    const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });
    const [selectedImage, setSelectedImage] = useState(null);
    const [scale, setScale] = useState(1.1);
    const [editorRef, setEditorRef] = useState(null);
    const [cropped, setCropped] = useState(userInfo.photo || null);

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
            setUserInfo({ ...tempUserInfo, photo: cropped });
            setIsEditing(false);
        }
    };

    const editInfo = () => {
        setTempUserInfo({ ...userInfo });
        setCropped(userInfo.photo || null);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setTempUserInfo({ ...userInfo });
        setCropped(userInfo.photo || null);
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleCrop = () => {
        if (editorRef) {
            const canvas = editorRef.getImageScaledToCanvas().toDataURL();
            setCropped(canvas);
            setSelectedImage(null);
        }
    };

    const renderPhotoEditor = () => (
        <div className={styles.photoEditorSection}>
            <label className={styles.fieldLabel}>Fotoğraf (opsiyonel)</label>
            {cropped && (
                <div className={styles.photoPreview}>
                    <img src={cropped} alt="Profil" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '1px solid #e3e2e0' }} />
                </div>
            )}
            {selectedImage ? (
                <div className={styles.avatarEditorWrapper}>
                    <AvatarEditor
                        ref={setEditorRef}
                        image={selectedImage}
                        width={120}
                        height={120}
                        border={30}
                        borderRadius={60}
                        color={[255,255,255,0.6]}
                        scale={scale}
                        rotate={0}
                    />
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                            type="range"
                            min={1}
                            max={2}
                            step={0.01}
                            value={scale}
                            onChange={e => setScale(parseFloat(e.target.value))}
                        />
                        <span style={{ fontSize: 12, color: '#888' }}>Yakınlaştır</span>
                    </div>
                    <button type="button" className={styles.saveButton} style={{ marginTop: 8 }} onClick={handleCrop}>
                        Kırp &amp; Kaydet
                    </button>
                </div>
            ) : (
                <div className={styles.fileInputWrapper} style={{ marginTop: 8 }}>
                    <input
                        type="file"
                        accept="image/*"
                        id="photo-upload"
                        className={styles.inputFile}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="photo-upload" className={styles.inputFileLabel}>
                        Fotoğraf Seç
                    </label>
                    {selectedImage && (
                        <span className={styles.selectedFileName}>{selectedImage.name}</span>
                    )}
                </div>
            )}
        </div>
    );

    const renderInfoForm = () => {
  return (
            <div className={styles.generalInfoItem}>
                {renderPhotoEditor()}
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

    const deleteInfo = () => {
        const emptyUserInfo = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            linkedin: '',
            github: '',
            photo: null,
        };
        setUserInfo(emptyUserInfo);
        setTempUserInfo(emptyUserInfo);
        setCropped(null);
        setIsEditing(true);
    };

    const renderSummaryCard = () => {
        const hasContactInfo = userInfo.email || userInfo.phone || userInfo.linkedin || userInfo.github;
        
        return (
            <div className={styles.summaryCard}>
                <div className={styles.summaryContent}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        {userInfo.photo && (
                            <img src={userInfo.photo} alt="Profil" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '1px solid #e3e2e0' }} />
                        )}
                        <div>
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
                    </div>
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
