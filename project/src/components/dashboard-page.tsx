import { useEffect, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import tetrapakLogo from '../assets/tetrapak-logo.svg';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [, startTransition] = useTransition();
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

  const handleQuickLink = (link: string) => {
    alert(link);
  };

  const handleNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #FFFFFF;
          --card: #FFFFFF;
          --muted: #666666;
          --accent: #2056AE;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: var(--bg);
          color: #1a1a1a;
          min-height: 100vh;
        }

        /* Dashboard container */
        .dashboard-container {
          min-height: 100vh;
          background: var(--bg);
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(32, 86, 174, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(32, 86, 174, 0.03) 0%, transparent 50%);
          padding: 2rem 1rem;
        }

        /* Centered container */
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Top bar */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
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
          border: 1px solid rgba(32, 86, 174, 0.3);
          border-radius: 6px;
          color: rgba(26, 26, 26, 0.7);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .nav-btn.active {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(32, 86, 174, 0.1);
        }

        .nav-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .nav-btn:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* Welcome section */
        .welcome-section {
          margin-bottom: 2.5rem;
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          font-size: 1rem;
          color: #D35B36;
        }

        /* Main content grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        /* Section cards */
        .section-card {
          background: var(--card);
          border: 1px solid rgba(32, 86, 174, 0.15);
          border-radius: 14px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(32, 86, 174, 0.1) inset,
            0 2px 8px rgba(32, 86, 174, 0.05);
          padding: 1.5rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 1.25rem;
        }

        /* Announcements list */
        .announcements-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .announcement-item {
          padding: 1rem;
          background: rgba(32, 86, 174, 0.03);
          border: 1px solid rgba(32, 86, 174, 0.1);
          border-radius: 8px;
        }

        .announcement-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .announcement-meta {
          font-size: 0.875rem;
          color: rgba(26, 26, 26, 0.6);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .priority-tag {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: #D35B36;
          color: #1a1a1a;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 4px;
          margin-left: 0.5rem;
        }

        /* Events list */
        .events-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .event-item {
          padding: 1rem;
          background: rgba(32, 86, 174, 0.03);
          border: 1px solid rgba(32, 86, 174, 0.1);
          border-radius: 8px;
        }

        .event-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .event-meta {
          font-size: 0.875rem;
          color: rgba(26, 26, 26, 0.6);
        }

        /* Quick Links section */
        .quick-links-section {
          margin-top: 2rem;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .quick-link-card {
          background: var(--card);
          border: 1px solid rgba(32, 86, 174, 0.15);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-link-card:hover {
          background: rgba(211, 91, 54, 0.05);
          border-color: #D35B36;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(211, 91, 54, 0.2);
        }

        .quick-link-card:active {
          background: rgba(211, 91, 54, 0.1);
          border-color: #D35B36;
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(211, 91, 54, 0.3);
        }

        .quick-link-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .icon-playbooks {
          background: rgba(105, 207, 246, 0.2);
          color: #69CFF6;
        }

        .icon-templates {
          background: rgba(32, 86, 174, 0.2);
          color: var(--accent);
        }

        .icon-ask {
          background: rgba(32, 86, 174, 0.2);
          color: var(--accent);
        }

        .icon-stories {
          background: rgba(32, 86, 174, 0.2);
          color: var(--accent);
        }

        .quick-link-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(26, 26, 26, 0.9);
          text-align: center;
        }

        /* Responsive design */
        @media (max-width: 968px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .quick-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .topbar {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .nav-buttons {
            width: 100%;
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .quick-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div className="dashboard-container">
        <div className="container">
          {/* Top bar */}
          <header className="topbar">
            <div className="brand-section">
              <img src={tetrapakLogo} alt="Tetra Pak" className="logo-image" style={{ height: '48px', width: 'auto' }} />
            </div>
            <nav className="nav-buttons">
              <button className="nav-btn active" aria-label="Navigate to Dashboard" onClick={() => handleNavigate('/dashboard')}>Dashboard</button>
              <button className="nav-btn" aria-label="Navigate to Champions" onClick={() => handleNavigate('/')}>Champions</button>
              <button className="nav-btn" aria-label="Navigate to Resources" onClick={() => handleNavigate('/resources')}>Resources</button>
            </nav>
          </header>

          {/* Welcome section */}
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome back, Champion</h1>
            <p className="welcome-subtitle">Your global network at a glance</p>
          </div>

          {/* Main content grid */}
          <div className="content-grid">
            {/* Announcements */}
            <section className="section-card">
              <h2 className="section-title">Announcements</h2>
              <ul className="announcements-list">
                <li className="announcement-item">
                  <div className="announcement-title">New Global Initiative Launch</div>
                  <div className="announcement-meta">
                    Customer Experience Transformation begins Q2 • 2 days ago
                    <span className="priority-tag">High Priority</span>
                  </div>
                </li>
                <li className="announcement-item">
                  <div className="announcement-title">Q1 Champion Results</div>
                  <div className="announcement-meta">87% adoption rate across all regions • 1 week ago</div>
                </li>
                <li className="announcement-item">
                  <div className="announcement-title">Updated Communication Templates</div>
                  <div className="announcement-meta">New materials available in Resources Hub • 2 weeks ago</div>
                </li>
              </ul>
            </section>

            {/* Upcoming Events */}
            <section className="section-card">
              <h2 className="section-title">Upcoming Events</h2>
              <ul className="events-list">
                <li className="event-item">
                  <div className="event-title">EMEA Regional Call</div>
                  <div className="event-meta">Tomorrow, 14:00 CET • 23 registered</div>
                </li>
                <li className="event-item">
                  <div className="event-title">Global Champions Webinar</div>
                  <div className="event-meta">Friday, 16:00 UTC • 156 registered</div>
                </li>
                <li className="event-item">
                  <div className="event-title">APAC Sync Session</div>
                  <div className="event-meta">Next Monday, 09:00 SGT • 18 registered</div>
                </li>
              </ul>
            </section>
          </div>

          {/* Quick Links */}
          <section className="quick-links-section">
            <h2 className="section-title">Quick Links</h2>
            <div className="quick-links-grid">
              <button 
                className="quick-link-card" 
                onClick={() => handleQuickLink('Playbooks')}
                aria-label="Open Playbooks"
              >
                <div className="quick-link-icon icon-playbooks">📘</div>
                <div className="quick-link-label">Playbooks</div>
              </button>
              <button 
                className="quick-link-card" 
                onClick={() => handleQuickLink('Templates')}
                aria-label="Open Templates"
              >
                <div className="quick-link-icon icon-templates">📄</div>
                <div className="quick-link-label">Templates</div>
              </button>
              <button 
                className="quick-link-card" 
                onClick={() => handleQuickLink('Ask a Champion')}
                aria-label="Ask a Champion"
              >
                <div className="quick-link-icon icon-ask">💬</div>
                <div className="quick-link-label">Ask a Champion</div>
              </button>
              <button 
                className="quick-link-card" 
                onClick={() => handleQuickLink('Success Stories')}
                aria-label="View Success Stories"
              >
                <div className="quick-link-icon icon-stories">🏆</div>
                <div className="quick-link-label">Success Stories</div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}


