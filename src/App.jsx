import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
    linkedin: '',
    github: '',
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

  const cvRef = useRef(null);

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

  const downloadCV = async () => {
    if (!cvRef.current) return;

    try {
      // Capture the CV component with high quality
      const canvas = await html2canvas(cvRef.current, {
        scale: 3, // High quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: 1131,
        scrollX: 0,
        scrollY: 0,
      });

      // Create PDF with A4 dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      // A4 dimensions in points: 595.28 x 841.89
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate scaling to fit the image properly
      const imgWidth = 800;
      const imgHeight = 1131;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('my-cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
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

        <div className="download-section" style={{ marginTop: '20px' }}>
          <button 
            onClick={downloadCV}
            className="download-button"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#2e75cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => e.target.style.background = '#1e65bc'}
            onMouseLeave={(e) => e.target.style.background = '#2e75cc'}
          >
            📄 Download CV as PDF
          </button>
        </div>
      </div>

      <div className="cv-preview-container">
        <div className="cv-a4-wrapper">
          <div ref={cvRef}>
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
    </div>
  );
}

export default App;
