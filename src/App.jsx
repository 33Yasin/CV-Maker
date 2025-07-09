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
    general: false,
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
      // PDF export için body'ye özel class ekle
      document.body.classList.add('pdf-export');

      // Fontların yüklenmesini bekle
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // Gerçek içerik yüksekliğini ölç
      const cvElement = cvRef.current;
      const realWidth = 800; // A4 genişliği
      const realHeight = cvElement.scrollHeight; // Dinamik yükseklik

      // PDF boyutunu ayarla (A4 genişliği, içerik yüksekliği)
      const pdf = new jsPDF('p', 'pt', [realWidth, realHeight]);
      const pdfWidth = realWidth;
      const pdfHeight = realHeight;

      // Canvas'ı gerçek boyutta oluştur
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
      // PDF export class'ını kaldır
      document.body.classList.remove('pdf-export');
    }
  };

  return (
    <>
      <Navbar />
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
              title="PDF indir"
            >
              <img src={pdfGif} alt="PDF indir" style={{ width: 32, height: 32, display: 'block' }} />
              <span style={{ fontSize: 15, fontWeight: 500, color: '#2e75cc', fontFamily: 'Inter, sans-serif', letterSpacing: 0.1 }}>{'Download as PDF'}</span>
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
    </>
  );
}

export default App;
