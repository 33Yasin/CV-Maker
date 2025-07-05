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
                    {userInfo.email && <span>{userInfo.email}</span>}
                    {userInfo.phone && <span>{userInfo.phone}</span>}
                </div>
            </div>

            <div className={styles.cvSection}>
                <div className={styles.cvSectionTitle}>Education</div>
                {educationList.length === 0 && <div style={{color:'#888'}}>No education info provided.</div>}
                {educationList.map((education, index) => (
                    <div className={styles.cvEduItem} key={index}>
                        <div className={styles.cvEduDetails}>
                            <strong>{education.school}</strong>{education.degree && `, ${education.degree}`}
                        </div>
                        <div className={styles.cvEduYear}>{education.year}</div>
                    </div>
                ))}
            </div>

            <div className={styles.cvSection}>
                <div className={styles.cvSectionTitle}>Work Experience</div>
                {experienceList.length === 0 && <div style={{color:'#888'}}>No work experience provided.</div>}
                {experienceList.map((exp, index) => (
                    <div className={styles.cvExpItem} key={index}>
                        <div className={styles.cvExpDetails}>
                            <strong>{exp.position}</strong>{exp.company && `, ${exp.company}`}
                        </div>
                        <div className={styles.cvExpDuration}>{exp.duration}</div>
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
