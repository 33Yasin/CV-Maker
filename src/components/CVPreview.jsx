import React from 'react';
import styles from '../styles/CVPreview.module.css';

function CVPreview({ userInfo, educationList, experienceList, skills, activities, certifications }) {
    return (
        <div className={styles.cvContainer}>
            <div className={styles.cvHeader}>
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

            <div className={styles.cvSection}>
                <div className={styles.cvSectionTitle}>Education</div>
                {educationList.length === 0 && <div style={{color:'#888'}}>No education info provided.</div>}
                {educationList.map((education, index) => {
                    // Format dates
                    const formatDate = (dateString) => {
                        if (!dateString) return '';
                        const date = new Date(dateString + '-01');
                        return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
                    };

                    const startDate = formatDate(education.startDate);
                    const endDate = education.isOngoing ? 'Devam ediyor' : formatDate(education.endDate);
                    const dateRange = startDate && (endDate || education.isOngoing) ? `${startDate} - ${endDate}` : '';

                    return (
                        <div className={styles.cvEduItem} key={index}>
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
                    );
                })}
            </div>

            <div className={styles.cvSection}>
                <div className={styles.cvSectionTitle}>Work Experience</div>
                {experienceList.length === 0 && <div style={{color:'#888'}}>No work experience provided.</div>}
                {experienceList.map((exp, index) => (
                    <div className={styles.cvExpItem} key={index}>
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
                ))}
            </div>

            {skills && skills.length > 0 && (
                <div className={styles.cvSection}>
                    <div className={styles.cvSectionTitle}>Skills</div>
                    <ul style={{margin:0, paddingLeft:20}}>
                        {skills.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                        ))}
                    </ul>
                </div>
            )}

            {activities && activities.length > 0 && (
                <div className={styles.cvSection}>
                    <div className={styles.cvSectionTitle}>Activities</div>
                    <ul style={{margin:0, paddingLeft:20}}>
                        {activities.map((activity, idx) => (
                            <li key={idx}>{activity}</li>
                        ))}
                    </ul>
                </div>
            )}

            {certifications && certifications.length > 0 && (
                <div className={styles.cvSection}>
                    <div className={styles.cvSectionTitle}>Certifications</div>
                    <ul style={{margin:0, paddingLeft:20}}>
                        {certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CVPreview;
