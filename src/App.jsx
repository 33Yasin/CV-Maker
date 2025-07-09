// App.jsx
// Main application component for the CV Maker. Handles all state, layout, and PDF export logic.

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
import Navbar from './components/Navbar';
import './App.css';
import pdfGif from './assets/pdf.gif';

function App() {
  // --- Main user info state ---
  // Holds all general user information for the CV
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
  });
  
  // --- Section states for each CV part ---
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activities, setActivities] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // --- Sidebar dropdown state ---
  // Controls which sidebar section is expanded
  const [expandedSections, setExpandedSections] = useState({
    general: false,
    education: false,
    experience: false,
    skills: false,
    activities: false,
    certifications: false
  });

  // Ref for the CV preview (used for PDF export)
  const cvRef = useRef(null);

  // Toggle which sidebar section is open
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

  // --- PDF Export Logic ---
  // Exports the CV preview as a PDF using html2canvas and jsPDF
  const downloadCV = async () => {
    if (!cvRef.current) return;

    try {
      // Add a special class to the body to force A4 layout for PDF export
      document.body.classList.add('pdf-export');

      // Wait for fonts to load before rendering
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Measure the real height of the CV content for PDF export
      const cvElement = cvRef.current;
      const realWidth = 800; // A4 width in px
      const realHeight = cvElement.scrollHeight; // Dynamic height

      // Create a PDF with the real content height
      const pdf = new jsPDF('p', 'pt', [realWidth, realHeight]);
      const pdfWidth = realWidth;
      const pdfHeight = realHeight;

      // Render the CV as a canvas at the correct size
      const canvas = await html2canvas(cvElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#fff',
        width: pdfWidth,
        height: pdfHeight,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL('image/png');

      // Add the image to the PDF and save
      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight
      );
      pdf.save('my-cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      // Remove the export class after PDF is generated
      document.body.classList.remove('pdf-export');
    }
  };

  // --- Main Render ---
  // Layout: Sidebar (left) + CV Preview (right)
  return (
    <>
      <Navbar />
      <div className="app-container">
        {/* Sidebar with all form sections */}
        <div className="sidebar">
          {/* General Info Section */}
          <div className="section">
            <div className="section-header" onClick={() => toggleSection('general')}>
              <h3>Genel Bilgiler</h3>
              <span className="toggle-icon">{expandedSections.general ? '▼' : '▶'}</span>
            </div>
            {expandedSections.general && (
              <div className="section-content">
                <GeneralInfo userInfo={userInfo} setUserInfo={setUserInfo} />
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className="section">
            <div className="section-header" onClick={() => toggleSection('education')}>
              <h3>Eğitim</h3>
              <span className="toggle-icon">{expandedSections.education ? '▼' : '▶'}</span>
            </div>
            {expandedSections.education && (
              <div className="section-content">
                <Education educationList={educationList} setEducationList={setEducationList} />
              </div>
            )}
          </div>

          {/* Work Experience Section */}
          <div className="section">
            <div className="section-header" onClick={() => toggleSection('experience')}>
              <h3>İş Deneyimi</h3>
              <span className="toggle-icon">{expandedSections.experience ? '▼' : '▶'}</span>
            </div>
            {expandedSections.experience && (
              <div className="section-content">
                <Experience experienceList={experienceList} setExperienceList={setExperienceList} />
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div className="section">
            <div className="section-header" onClick={() => toggleSection('skills')}>
              <h3>Yetenekler</h3>
              <span className="toggle-icon">{expandedSections.skills ? '▼' : '▶'}</span>
            </div>
            {expandedSections.skills && (
              <div className="section-content">
                <Skills skills={skills} setSkills={setSkills} />
              </div>
            )}
          </div>

          {/* Activities Section */}
          <div className="section">
            <div className="section-header" onClick={() => toggleSection('activities')}>
              <h3>Aktiviteler</h3>
              <span className="toggle-icon">{expandedSections.activities ? '▼' : '▶'}</span>
            </div>
            {expandedSections.activities && (
              <div className="section-content">
                <Activities activities={activities} setActivities={setActivities} />
              </div>
            )}
          </div>

          {/* Certifications Section */}
          <div className="section">
            <div className="section-header" onClick={() => toggleSection('certifications')}>
              <h3>Sertifikalar</h3>
              <span className="toggle-icon">{expandedSections.certifications ? '▼' : '▶'}</span>
            </div>
            {expandedSections.certifications && (
              <div className="section-content">
                <Certifications certifications={certifications} setCertifications={setCertifications} />
              </div>
            )}
          </div>

          {/* PDF Download Button */}
          <div className="download-section" style={{ marginTop: '20px' }}>
            <button 
              onClick={downloadCV}
              className="download-button"
              title="PDF Olarak İndir"
            >
              <img src={pdfGif} alt="PDF indir" style={{ width: 32, height: 32, display: 'block' }} />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#2e75cc', fontFamily: 'Inter, sans-serif', letterSpacing: 0.1 }}>{'PDF Olarak İndir'}</span>
            </button>
          </div>
        </div>

        {/* CV Preview Area */}
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
    </>
  );
}

export default App;
