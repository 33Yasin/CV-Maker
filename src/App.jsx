import React, { useState } from 'react';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import CVPreview from './components/CVPreview';
import Skills from './components/Skills';
import Activities from './components/Activities';
import Certifications from './components/Certifications';
import './App.css';

function App() {
  // Kullanıcı bilgilerini tutan state
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activities, setActivities] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Dropdown sections state
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    education: false,
    experience: false,
    skills: false,
    activities: false,
    certifications: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const newState = {};
      // Close all sections first
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Open only the clicked section if it wasn't already open
      newState[section] = !prev[section];
      return newState;
    });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="section">
          <div className="section-header" onClick={() => toggleSection('general')}>
            <h3>General Information</h3>
            <span className="toggle-icon">{expandedSections.general ? '▼' : '▶'}</span>
          </div>
          {expandedSections.general && (
            <div className="section-content">
              <GeneralInfo userInfo={userInfo} setUserInfo={setUserInfo} />
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header" onClick={() => toggleSection('education')}>
            <h3>Education</h3>
            <span className="toggle-icon">{expandedSections.education ? '▼' : '▶'}</span>
          </div>
          {expandedSections.education && (
            <div className="section-content">
              <Education educationList={educationList} setEducationList={setEducationList} />
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header" onClick={() => toggleSection('experience')}>
            <h3>Work Experience</h3>
            <span className="toggle-icon">{expandedSections.experience ? '▼' : '▶'}</span>
          </div>
          {expandedSections.experience && (
            <div className="section-content">
              <Experience experienceList={experienceList} setExperienceList={setExperienceList} />
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header" onClick={() => toggleSection('skills')}>
            <h3>Skills</h3>
            <span className="toggle-icon">{expandedSections.skills ? '▼' : '▶'}</span>
          </div>
          {expandedSections.skills && (
            <div className="section-content">
              <Skills skills={skills} setSkills={setSkills} />
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header" onClick={() => toggleSection('activities')}>
            <h3>Activities</h3>
            <span className="toggle-icon">{expandedSections.activities ? '▼' : '▶'}</span>
          </div>
          {expandedSections.activities && (
            <div className="section-content">
              <Activities activities={activities} setActivities={setActivities} />
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header" onClick={() => toggleSection('certifications')}>
            <h3>Certifications</h3>
            <span className="toggle-icon">{expandedSections.certifications ? '▼' : '▶'}</span>
          </div>
          {expandedSections.certifications && (
            <div className="section-content">
              <Certifications certifications={certifications} setCertifications={setCertifications} />
            </div>
          )}
        </div>
      </div>

      <div className="cv-preview-container">
        <div className="cv-a4-wrapper">
          <CVPreview 
            userInfo={userInfo} 
            educationList={educationList} 
            experienceList={experienceList}
            skills={skills}
            activities={activities}
            certifications={certifications}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
