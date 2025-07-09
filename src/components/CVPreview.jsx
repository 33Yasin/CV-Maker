import React, { useRef, useLayoutEffect, useState } from 'react';
import styles from '../styles/CVPreview.module.css';

const PAGE_HEIGHT = 1123; // px, A4 boyutu

function CVPreview({ userInfo, educationList, experienceList, skills, activities, certifications }) {
    // Her item için ref oluştur
    const sectionRefs = useRef([]);
    const [pages, setPages] = useState([]);

    // Tüm içerik bloklarını tek bir diziye koy (her biri {type, data, jsx})
    const contentBlocks = [];
    // Header (sadece ilk sayfada)
    contentBlocks.push({ type: 'header', jsx: (
        <div className={styles.cvHeader} key="header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {userInfo.photo && (
                    <img src={userInfo.photo} alt="Profil" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e3e2e0' }} />
                )}
                <div>
                    <div className={styles.cvName}>
                        {userInfo.firstName} {userInfo.lastName}
                    </div>
                    <div className={styles.cvContact}>
                        {userInfo.email && (
                            <span>
                                {userInfo.email.startsWith('http') ? (
                                    <a href={userInfo.email} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                        {userInfo.email}
                                    </a>
                                ) : (
                                    <a href={`mailto:${userInfo.email}`} className={styles.contactLink}>
                                        {userInfo.email}
                                    </a>
                                )}
                            </span>
                        )}
                        {userInfo.phone && <span>{userInfo.phone}</span>}
                        {userInfo.linkedin && (
                            <span>
                                <a href={userInfo.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                    {userInfo.linkedin}
                                </a>
                            </span>
                        )}
                        {userInfo.github && (
                            <span>
                                <a href={userInfo.github} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                                    {userInfo.github}
                                </a>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) });
    // Education
    contentBlocks.push({ type: 'sectionTitle', jsx: <div className={styles.cvSectionTitle} key="edu-title">Education</div> });
    if (educationList.length === 0) {
        contentBlocks.push({ type: 'empty', jsx: <div style={{color:'#888'}} key="edu-empty">No education info provided.</div> });
    } else {
        educationList.forEach((education, idx) => {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString + '-01');
                return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
            };
            const startDate = formatDate(education.startDate);
            const endDate = education.isOngoing ? 'Devam ediyor' : formatDate(education.endDate);
            const dateRange = startDate && (endDate || education.isOngoing) ? `${startDate} - ${endDate}` : '';
            contentBlocks.push({
                type: 'edu',
                jsx: (
                    <div className={styles.cvEduItem} key={`edu-${idx}`}>
                        <div className={styles.cvEduDetails}>
                            <div style={{ marginBottom: '4px' }}>
                                <strong>{education.school}</strong>
                                {education.degreeType && `, ${education.degreeType}`}
                            </div>
                            <div style={{ color: '#787774', fontSize: '0.95rem' }}>
                                {education.program}
                                {education.doubleMajor && ` / ${education.doubleMajor}`}
                                {education.gpa && ` • GPA: ${education.gpa}`}
                            </div>
                        </div>
                        <div className={styles.cvEduYear}>{dateRange}</div>
                    </div>
                )
            });
        });
    }
    // Experience
    contentBlocks.push({ type: 'sectionTitle', jsx: <div className={styles.cvSectionTitle} key="exp-title">Work Experience</div> });
    if (experienceList.length === 0) {
        contentBlocks.push({ type: 'empty', jsx: <div style={{color:'#888'}} key="exp-empty">No work experience provided.</div> });
    } else {
        experienceList.forEach((exp, idx) => {
            contentBlocks.push({
                type: 'exp',
                jsx: (
                    <div className={styles.cvExpItem} key={`exp-${idx}`}>
                        <div className={styles.cvExpDetails}>
                            <div style={{ marginBottom: '4px' }}>
                                <strong>{exp.position}</strong>{exp.company && `, ${exp.company}`}
                            </div>
                            {exp.duration && (
                                <div style={{ color: '#787774', fontSize: '0.95rem', marginBottom: '4px' }}>
                                    {exp.duration}
                                </div>
                            )}
                            {exp.description && (
                                <div style={{ color: '#9b9a97', fontSize: '0.9rem', lineHeight: '1.4' }}>
                                    {exp.description}
                                </div>
                            )}
                        </div>
                    </div>
                )
            });
        });
    }
    // Skills
    if (skills && skills.length > 0) {
        contentBlocks.push({
            type: 'sectionTitle',
            jsx: <div className={styles.cvSectionTitle} key="skills-title">Skills</div>
        });
        contentBlocks.push({
            type: 'skills',
            jsx: (
                <ul style={{margin:0, paddingLeft:20}} key="skills-list">
                    {skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                    ))}
                </ul>
            )
        });
    }
    // Activities
    if (activities && activities.length > 0) {
        contentBlocks.push({
            type: 'sectionTitle',
            jsx: <div className={styles.cvSectionTitle} key="activities-title">Activities</div>
        });
        contentBlocks.push({
            type: 'activities',
            jsx: (
                <ul style={{margin:0, paddingLeft:20}} key="activities-list">
                    {activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                    ))}
                </ul>
            )
        });
    }
    // Certifications
    if (certifications && certifications.length > 0) {
        contentBlocks.push({
            type: 'sectionTitle',
            jsx: <div className={styles.cvSectionTitle} key="certs-title">Certifications</div>
        });
        contentBlocks.push({
            type: 'certifications',
            jsx: (
                <ul style={{margin:0, paddingLeft:20}} key="certs-list">
                    {certifications.map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                    ))}
                </ul>
            )
        });
    }

    // Her block için ref ata
    sectionRefs.current = contentBlocks.map((_, i) => sectionRefs.current[i] || React.createRef());

    useLayoutEffect(() => {
        // Sayfa bölme algoritması: blokları sırayla ekle, toplam yükseklik A4'ü aşınca yeni sayfa başlat
        let currentPage = [];
        let currentHeight = 0;
        const newPages = [];
        for (let i = 0; i < contentBlocks.length; i++) {
            const ref = sectionRefs.current[i];
            const el = ref.current;
            if (!el) continue;
            const blockHeight = el.offsetHeight;
            if (currentHeight + blockHeight > PAGE_HEIGHT && currentPage.length > 0) {
                newPages.push([...currentPage]);
                currentPage = [];
                currentHeight = 0;
            }
            currentPage.push(i);
            currentHeight += blockHeight;
        }
        if (currentPage.length > 0) newPages.push([...currentPage]);
        setPages(newPages);
    }, [userInfo, educationList, experienceList, skills, activities, certifications]);

    // Önce tüm blokları invisible şekilde render et, sonra gerçek sayfa bölme ile göster
    return (
        <div className="cvPreviewPages">
            {/* Ölçüm için invisible render */}
            <div style={{ position: 'absolute', left: -9999, top: 0, visibility: 'hidden', width: 800 }}>
                {contentBlocks.map((block, i) => (
                    <div ref={sectionRefs.current[i]} key={i}>{block.jsx}</div>
                ))}
            </div>
            {/* Her sayfa için ayrı .cvContainer */}
            {pages.map((pageBlockIndices, pageIdx) => (
                <div className={styles.cvContainer} key={pageIdx}>
                    {pageBlockIndices.map(i => (
                        <React.Fragment key={i}>{contentBlocks[i].jsx}</React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default CVPreview;
