// GeneralInfo.jsx
// Component for collecting and editing the user's general information (name, email, phone, LinkedIn, GitHub, photo)

import React, { useRef, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import styles from '../styles/GeneralInfo.module.css';

function getCroppedImg(imageSrc, crop, zoom, aspect = 1) {
  // Utility to crop the image using canvas
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = Math.min(image.width, image.height);
      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
      resolve(canvas.toDataURL('image/jpeg'));
    };
    image.onerror = reject;
  });
}

function GeneralInfo({ userInfo, setUserInfo }) {
  // --- State for photo upload and cropping ---
  const [isEditing, setIsEditing] = useState(!userInfo.firstName && !userInfo.lastName);
  const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });
  const [photo, setPhoto] = useState(userInfo.photo || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const fileInputRef = useRef();

  // --- Handle file input change (when user selects a photo) ---
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target.result);
        setShowCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Handle cropping and saving the photo ---
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (selectedImage && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(selectedImage, croppedAreaPixels, zoom);
      setPhoto(croppedImg);
      setTempUserInfo((prev) => ({ ...prev, photo: croppedImg }));
      setShowCrop(false);
      setSelectedImage(null);
    }
  };

  // --- Handle input changes for text fields ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // --- Main render ---
  const canSave = () => {
    return tempUserInfo.firstName && tempUserInfo.lastName;
  };

  const saveInfo = () => {
    if (canSave()) {
      setUserInfo({ ...tempUserInfo, photo: photo });
      setIsEditing(false);
    }
  };

  const editInfo = () => {
    setTempUserInfo({ ...userInfo });
    setPhoto(userInfo.photo || null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setTempUserInfo({ ...userInfo });
    setPhoto(userInfo.photo || null);
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
      photo: null,
    };
    setUserInfo(emptyUserInfo);
    setTempUserInfo(emptyUserInfo);
    setPhoto(null);
    setIsEditing(true);
  };

  const renderPhotoEditor = () => (
    <div className={styles.photoEditorSection}>
      <label className={styles.fieldLabel}>Fotoğraf (opsiyonel)</label>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {/* Photo or Cropper box */}
        <div style={{ width: 120, height: 120, position: 'relative', background: '#f7f6f3', borderRadius: 8, border: '1px solid #e3e2e0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          {showCrop && selectedImage ? (
            <div style={{ width: 120, height: 120, position: 'relative' }}>
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
                style={{ containerStyle: { borderRadius: '8px' } }}
              />
            </div>
          ) : photo ? (
            <img src={photo} alt="Profil" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '1px solid #e3e2e0' }} />
          ) : (
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#e3e2e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 32 }}>+</div>
          )}
        </div>
        {/* File input always visible below photo/cropper */}
        <div className={styles.fileInputWrapper} style={{ marginTop: 0, width: '100%' }}>
          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            className={styles.inputFile}
            onChange={handlePhotoChange}
            ref={fileInputRef}
          />
          <label htmlFor="photo-upload" className={styles.inputFileLabel} style={{ width: '100%', textAlign: 'center' }}>
            Fotoğraf Seç
          </label>
        </div>
        {/* Crop controls only if cropping */}
        {showCrop && selectedImage && (
          <>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              style={{ width: 120, marginTop: 8 }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
              <button type="button" className={styles.saveButton} onClick={handleCropSave}>
                Kırp & Kaydet
              </button>
              <button type="button" className={styles.cancelButton} onClick={() => setShowCrop(false)}>
                İptal
              </button>
            </div>
          </>
        )}
      </div>
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
            onChange={handleChange}
            name="firstName"
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
            onChange={handleChange}
            name="lastName"
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
            onChange={handleChange}
            name="email"
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
            onChange={handleChange}
            name="phone"
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
            onChange={handleChange}
            name="linkedin"
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
            onChange={handleChange}
            name="github"
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
      <h3 className={styles.title}>Genel Bilgiler</h3>
      
      {isEditing || (!userInfo.firstName && !userInfo.lastName) ? renderInfoForm() : renderSummaryCard()}
    </div>
  );
}

export default GeneralInfo;
