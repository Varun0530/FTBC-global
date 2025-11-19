import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TPLogo from './tp-logo';

interface ParticipantData {
  name: string;
  country: string;
  businessUnit: string;
  adoptionRate: number;
  region: 'APAC' | 'America' | 'EMEA' | 'Greater China';
}

// All participant data from all leaderboards
const allParticipants: ParticipantData[] = [
  // APAC Region
  { name: "Shaurya", country: "India", businessUnit: "Operations", adoptionRate: 98, region: "APAC" },
  { name: "Nguyen Minh", country: "Vietnam", businessUnit: "Supply Chain", adoptionRate: 96, region: "APAC" },
  { name: "Rahul Mehta", country: "India", businessUnit: "Quality", adoptionRate: 95, region: "APAC" },
  { name: "Siti Nur", country: "Indonesia", businessUnit: "Manufacturing", adoptionRate: 94, region: "APAC" },
  { name: "Kenji Watanabe", country: "Japan", businessUnit: "R&D", adoptionRate: 93, region: "APAC" },
  { name: "Liew Jia", country: "Malaysia", businessUnit: "Logistics", adoptionRate: 92, region: "APAC" },
  { name: "Sonal Patel", country: "India", businessUnit: "Sales", adoptionRate: 91, region: "APAC" },
  { name: "Zainab Ali", country: "Singapore", businessUnit: "Customer Success", adoptionRate: 90, region: "APAC" },
  { name: "Eun-Ji Park", country: "South Korea", businessUnit: "Digital", adoptionRate: 89, region: "APAC" },
  { name: "Arjun Rao", country: "India", businessUnit: "Procurement", adoptionRate: 88, region: "APAC" },
  
  // America Region
  { name: "James Smith", country: "United States", businessUnit: "Operations", adoptionRate: 98, region: "America" },
  { name: "Mariana Santos", country: "Brazil", businessUnit: "Supply Chain", adoptionRate: 96, region: "America" },
  { name: "Robert Williams", country: "United States", businessUnit: "Quality", adoptionRate: 95, region: "America" },
  { name: "Patricia Brown", country: "Canada", businessUnit: "Manufacturing", adoptionRate: 94, region: "America" },
  { name: "Michael Davis", country: "United States", businessUnit: "R&D", adoptionRate: 93, region: "America" },
  { name: "Diego Oliveira", country: "Brazil", businessUnit: "Logistics", adoptionRate: 92, region: "America" },
  { name: "Jennifer Garcia", country: "United States", businessUnit: "Sales", adoptionRate: 91, region: "America" },
  { name: "Ana Costa", country: "Brazil", businessUnit: "Customer Success", adoptionRate: 90, region: "America" },
  { name: "David Thompson", country: "Canada", businessUnit: "Digital", adoptionRate: 89, region: "America" },
  { name: "Santiago Martinez", country: "Argentina", businessUnit: "Procurement", adoptionRate: 88, region: "America" },
  
  // EMEA Region
  { name: "Hans Schmidt", country: "Germany", businessUnit: "Operations", adoptionRate: 98, region: "EMEA" },
  { name: "Sophie Martin", country: "France", businessUnit: "Supply Chain", adoptionRate: 96, region: "EMEA" },
  { name: "James Brown", country: "United Kingdom", businessUnit: "Quality", adoptionRate: 95, region: "EMEA" },
  { name: "Ahmed Mohammed", country: "UAE", businessUnit: "Manufacturing", adoptionRate: 94, region: "EMEA" },
  { name: "Luca Moretti", country: "Italy", businessUnit: "R&D", adoptionRate: 93, region: "EMEA" },
  { name: "Emma Karlsson", country: "Sweden", businessUnit: "Logistics", adoptionRate: 92, region: "EMEA" },
  { name: "Pieter van der Berg", country: "Netherlands", businessUnit: "Sales", adoptionRate: 91, region: "EMEA" },
  { name: "Omar Al-Rashid", country: "Saudi Arabia", businessUnit: "Customer Success", adoptionRate: 90, region: "EMEA" },
  { name: "Nkem Okonkwo", country: "Nigeria", businessUnit: "Digital", adoptionRate: 89, region: "EMEA" },
  { name: "Yusuf Kaya", country: "Turkey", businessUnit: "Procurement", adoptionRate: 88, region: "EMEA" },
  
  // Greater China Region
  { name: "Wang Li", country: "China", businessUnit: "Operations", adoptionRate: 98, region: "Greater China" },
  { name: "Zhang Ming", country: "China", businessUnit: "Supply Chain", adoptionRate: 96, region: "Greater China" },
  { name: "Liu Xia", country: "China", businessUnit: "Quality", adoptionRate: 95, region: "Greater China" },
  { name: "Chen Jun", country: "China", businessUnit: "Manufacturing", adoptionRate: 94, region: "Greater China" },
  { name: "Li Yang", country: "China", businessUnit: "R&D", adoptionRate: 93, region: "Greater China" },
  { name: "Huang Wei", country: "China", businessUnit: "Logistics", adoptionRate: 92, region: "Greater China" },
  { name: "Wu Xin", country: "China", businessUnit: "Sales", adoptionRate: 91, region: "Greater China" },
  { name: "Zhou Qing", country: "China", businessUnit: "Customer Success", adoptionRate: 90, region: "Greater China" },
  { name: "Xu Fang", country: "China", businessUnit: "Digital", adoptionRate: 89, region: "Greater China" },
  { name: "Sun Yu", country: "China", businessUnit: "Procurement", adoptionRate: 88, region: "Greater China" },
];

// Region-specific information
const regionInfo: Record<string, { 
  regionName: string; 
  languages: string; 
  about: string;
  timezone: string;
}> = {
  'APAC': {
    regionName: 'APAC Region',
    languages: 'English, Hindi, Mandarin, Japanese, Korean, Bahasa',
    about: 'Leading digital transformation initiatives across Asia-Pacific with extensive experience in cross-cultural change management. Passionate about regional adoption, data-driven decisions and human-centred transformation.',
    timezone: 'Mon — Fri, 09:00 — 17:00 (SGT)'
  },
  'America': {
    regionName: 'America Region',
    languages: 'English, Spanish, Portuguese, French',
    about: 'Driving digital transformation across North and South America with deep expertise in organizational change. Committed to adoption excellence, data-driven strategies and people-first transformation approaches.',
    timezone: 'Mon — Fri, 09:00 — 17:00 (EST)'
  },
  'EMEA': {
    regionName: 'EMEA Region',
    languages: 'English, German, French, Arabic, Swedish, Dutch, Italian',
    about: 'Leading digital transformation initiatives across Europe, Middle East and Africa with 8+ years of experience in organizational change. Passionate about adoption, data-driven decisions and human-centred change.',
    timezone: 'Mon — Fri, 09:00 — 16:30 (CET)'
  },
  'Greater China': {
    regionName: 'Greater China Region',
    languages: 'Mandarin, Cantonese, English',
    about: 'Spearheading digital transformation across Greater China with extensive experience in regional change management. Focused on adoption excellence, data-driven innovation and culturally-aware transformation strategies.',
    timezone: 'Mon — Fri, 09:00 — 18:00 (CST)'
  }
};

export default function ProfilePage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const participantName = name ? decodeURIComponent(name) : "Maria Andersson";
  useEffect(() => {
    // Ensure proper focus management for accessibility
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach((btn) => {
      btn.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
          e.preventDefault();
          (btn as HTMLElement).click();
        }
      });
    });
  }, []);

  const handleButtonClick = (action: string) => {
    alert(`${action} clicked`);
  };

  // Find participant data
  const participantData = useMemo(() => {
    return allParticipants.find(p => p.name === participantName) || {
      name: participantName,
      country: "Unknown",
      businessUnit: "Operations & Digital",
      adoptionRate: 0,
      region: "EMEA" as const
    };
  }, [participantName]);

  const regionData = regionInfo[participantData.region] || regionInfo['EMEA'];

  // Generate initials from name
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(participantData.name);

  // Generate email from name
  const getEmail = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '') + '@tetrapak.com';
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          background: #050505;
          color: #ffffff;
          min-height: 100vh;
        }

        /* Main container with radial highlights */
        .profile-container {
          min-height: 100vh;
          background: #050505;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(6, 240, 224, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(6, 240, 224, 0.03) 0%, transparent 50%);
          padding: 2rem 1rem;
        }

        /* Header with brand and nav */
        .header {
          max-width: 1200px;
          margin: 0 auto 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }

        .brand-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-image {
          width: 60px;
          height: 60px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .nav-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .nav-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid rgba(6, 240, 224, 0.3);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .nav-btn:hover {
          color: #06f0e0;
          border-color: #06f0e0;
        }

        .nav-btn:focus {
          outline: 2px solid #06f0e0;
          outline-offset: 2px;
        }

        /* Centered content wrapper */
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Main profile card */
        .profile-card {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(6, 240, 224, 0.15);
          border-radius: 14px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(6, 240, 224, 0.1) inset,
            0 2px 8px rgba(6, 240, 224, 0.05);
          overflow: hidden;
        }

        /* Card header */
        .card-header {
          background: rgba(6, 240, 224, 0.05);
          border-bottom: 1px solid rgba(6, 240, 224, 0.15);
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #06f0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.75rem;
          color: #050505;
          flex-shrink: 0;
        }

        .profile-header-info {
          flex: 1;
        }

        .profile-name {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .profile-subtitle {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.625rem 1.25rem;
          background: transparent;
          border: 1px solid #06f0e0;
          border-radius: 6px;
          color: #06f0e0;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          white-space: nowrap;
        }

        .action-btn:hover {
          background: rgba(6, 240, 224, 0.1);
          box-shadow: 0 0 12px rgba(6, 240, 224, 0.3);
        }

        .action-btn:focus {
          outline: 2px solid #06f0e0;
          outline-offset: 2px;
        }

        .action-btn:active {
          transform: scale(0.98);
        }

        /* Card body */
        .card-body {
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }

        /* Left column */
        .left-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .meta-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meta-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #06f0e0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .meta-value {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .about-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
        }

        .about-text {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        .skills-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          padding: 0.375rem 0.875rem;
          background: rgba(6, 240, 224, 0.1);
          border: 1px solid rgba(6, 240, 224, 0.3);
          border-radius: 6px;
          color: #06f0e0;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .achievements-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(6, 240, 224, 0.05);
          border-radius: 8px;
          border-left: 3px solid #06f0e0;
        }

        .achievement-text {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Right column */
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .side-card {
          background: rgba(6, 240, 224, 0.03);
          border: 1px solid rgba(6, 240, 224, 0.15);
          border-radius: 10px;
          padding: 1.25rem;
        }

        .side-card-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #06f0e0;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .side-card-content {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        .side-card-link {
          display: block;
          padding: 0.5rem 0;
          color: #06f0e0;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: opacity 0.2s ease;
        }

        .side-card-link:hover {
          opacity: 0.8;
        }

        .side-card-link:focus {
          outline: 2px solid #06f0e0;
          outline-offset: 2px;
          border-radius: 2px;
        }

        /* Responsive design */
        @media (max-width: 968px) {
          .card-body {
            grid-template-columns: 1fr;
          }

          .header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .nav-buttons {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .profile-container {
            padding: 1rem 0.5rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }

          .card-body {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .brand-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .nav-buttons {
            flex-direction: column;
            width: 100%;
          }

          .nav-btn {
            width: 100%;
          }
        }
      `}</style>
      
      <div className="profile-container">
        <div className="content-wrapper">
          <header className="header">
            <div className="brand-section">
              <TPLogo size={48} className="logo-image" />
            </div>
            <nav className="nav-buttons">
              <button className="nav-btn" onClick={() => navigate('/')}>Dashboard</button>
              <button className="nav-btn" onClick={() => navigate('/')}>Champions</button>
              <button className="nav-btn" onClick={() => navigate('/')}>Resources</button>
            </nav>
          </header>

          <main className="content-wrapper">
            <div className="profile-card">
              <div className="card-header">
                <div className="avatar-large" aria-label={`${participantData.name} avatar`}>{initials}</div>
                <div className="profile-header-info">
                  <h1 className="profile-name">{participantData.name}</h1>
                  <div className="profile-subtitle">Transformation Champion — {regionData.regionName}</div>
                </div>
                <div className="header-actions">
                  <button 
                    className="action-btn"
                    onClick={() => {
                      if (participantData.name === "Shaurya") {
                        window.open("https://teams.microsoft.com/l/chat/19:uni01_djjzl7d4gfyxcuw5kpwige4xg45memujcrsiq4wy4r6cly43dzpa@thread.v2/conversations?context=%7B%22contextType%22%3A%22chat%22%7D", "_blank");
                      } else {
                        handleButtonClick(`Message ${participantData.name.split(' ')[0]}`);
                      }
                    }}
                    aria-label={`Message ${participantData.name.split(' ')[0]}`}
                  >
                    Message {participantData.name.split(' ')[0]}
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => handleButtonClick('Book a 10-min sync')}
                    aria-label="Book a 10-min sync"
                  >
                    Book a 10-min sync
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => handleButtonClick('Ask for support')}
                    aria-label="Ask for support"
                  >
                    Ask for support
                  </button>
                </div>
              </div>

              <div className="card-body">
                <div className="left-column">
                  <div className="meta-block">
                    <div className="meta-label">Location</div>
                    <div className="meta-value">{participantData.country} — {regionData.regionName}</div>
                  </div>

                  <div className="meta-block">
                    <div className="meta-label">Function</div>
                    <div className="meta-value">{participantData.businessUnit}</div>
                  </div>

                  <div className="meta-block">
                    <div className="meta-label">Languages</div>
                    <div className="meta-value">{regionData.languages}</div>
                  </div>

                  <div className="about-section">
                    <h2 className="section-title">About</h2>
                    <p className="about-text">
                      {regionData.about}
                    </p>
                  </div>

                  <div className="skills-section">
                    <h2 className="section-title">Skills</h2>
                    <div className="skills-tags">
                      <span className="skill-tag">Communication</span>
                      <span className="skill-tag">Facilitation</span>
                      <span className="skill-tag">Data Awareness</span>
                      <span className="skill-tag">Change Management</span>
                    </div>
                  </div>

                  <div className="achievements-section">
                    <h2 className="section-title">Achievements</h2>
                    <div className="achievement-item">
                      <div className="achievement-text">{participantData.adoptionRate}% team adoption rate</div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-text">Trained {Math.floor(participantData.adoptionRate * 1.2)}+ champions</div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-text">Led {Math.floor(participantData.adoptionRate / 6)} successful change initiatives</div>
                    </div>
                  </div>
                </div>

                <div className="right-column">
                  <div className="side-card">
                    <div className="side-card-title">Contact</div>
                    <div className="side-card-content">
                      <a 
                        href={`mailto:${getEmail(participantData.name)}`} 
                        className="side-card-link"
                      >
                        {getEmail(participantData.name)}
                      </a>
                    </div>
                  </div>

                  <div className="side-card">
                    <div className="side-card-title">Availability</div>
                    <div className="side-card-content">
                      {regionData.timezone}
                    </div>
                  </div>

                  <div className="side-card">
                    <div className="side-card-title">Quick Links</div>
                    <div className="side-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <a href="#" className="side-card-link">View shared resources</a>
                      <a href="#" className="side-card-link">Schedule a meeting</a>
                      <a href="#" className="side-card-link">Request support</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

