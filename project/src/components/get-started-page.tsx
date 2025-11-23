import { useEffect } from 'react';
import NavbarDemo from './navbar-demo';

export default function GetStartedPage() {
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

  const handlePlayClick = () => {
    alert('Play video');
  };

  const handleCTAClick = () => {
    alert('Find your regional champion');
  };

  return (
    <>
      <style>{`
        :root {
          --bg: #FFFFFF;
          --accent: #2056AE;
          --card-bg: rgba(255, 255, 255, 0.95);
          --sidebar-bg: rgba(32, 86, 174, 0.08);
          --text-primary: #1a1a1a;
          --text-secondary: rgba(26, 26, 26, 0.7);
          --text-muted: rgba(26, 26, 26, 0.5);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          background: var(--bg);
          color: var(--text-primary);
          min-height: 100vh;
        }

        /* Main container */
        .get-started-container {
          min-height: 100vh;
          background: var(--bg);
          padding: 2rem 1rem;
          padding-top: 1rem;
        }

        /* Centered page wrapper */
        .page-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Main card */
        .card {
          background: var(--card-bg);
          border: 1px solid rgba(32, 86, 174, 0.15);
          border-radius: 18px;
          box-shadow: 
            0 12px 48px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(32, 86, 174, 0.1) inset,
            0 4px 16px rgba(32, 86, 174, 0.08);
          padding: 28px;
          display: flex;
          gap: 28px;
        }

        /* Left content column */
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, var(--accent), #69CFF6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .lede {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .section-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .bullet-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-left: 0;
        }

        .bullet-item {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 1.5rem;
          position: relative;
        }

        .bullet-item::before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--accent);
          font-size: 1.5rem;
          line-height: 1;
        }

        /* Right sidebar */
        .sidebar {
          width: 360px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex-shrink: 0;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sidebar-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--accent);
        }

        /* Video spotlight */
        .video-container {
          background: var(--sidebar-bg);
          border: 1px solid rgba(32, 86, 174, 0.2);
          border-radius: 12px;
          aspect-ratio: 16 / 9;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-button {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(32, 86, 174, 0.9);
          border: 3px solid var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          z-index: 2;
        }

        .play-button::before {
          content: "";
          width: 0;
          height: 0;
          border-left: 20px solid var(--text-primary);
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          margin-left: 4px;
        }

        .play-button:hover {
          background: var(--accent);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(32, 86, 174, 0.5);
        }

        .play-button:focus {
          outline: 3px solid var(--accent);
          outline-offset: 3px;
        }

        .time-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.7);
          color: var(--text-primary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 2;
        }

        /* Thumbnails */
        .thumbnails-row {
          display: flex;
          gap: 0.75rem;
        }

        .thumbnail {
          flex: 1;
          aspect-ratio: 16 / 9;
          background: var(--sidebar-bg);
          border: 1px solid rgba(32, 86, 174, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent);
          text-align: center;
          padding: 0.5rem;
        }

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.3;
        }

        .dot.active {
          opacity: 1;
        }

        /* Sessions */
        .session-block {
          background: var(--sidebar-bg);
          border: 1px solid rgba(32, 86, 174, 0.2);
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .session-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .session-description {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* CTA Button */
        .cta-button {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(90deg, var(--accent), #69CFF6);
          border: none;
          border-radius: 8px;
          color: var(--bg);
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          margin-top: 0.5rem;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(32, 86, 174, 0.4);
        }

        .cta-button:focus {
          outline: 3px solid var(--accent);
          outline-offset: 3px;
        }

        .cta-button:active {
          transform: translateY(0);
        }

        /* Responsive design */
        @media (max-width: 968px) {
          .card {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .get-started-container {
            padding: 1rem 0.5rem;
          }

          .card {
            padding: 1.5rem;
            border-radius: 14px;
          }

          .page-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .thumbnails-row {
            flex-direction: column;
          }
        }
      `}</style>
      
      <div className="get-started-container">
        <NavbarDemo />
        <div className="page-wrapper">
          <main className="card">
            <div className="content">
              <div>
                <h1 className="page-title">Change Champions Hub</h1>
                <p className="lede">Your local partners for clarity, support, and smooth adoption.</p>
              </div>

              <section className="section">
                <h2 className="section-title">Change Champions — Now Live (Q1 2025)</h2>
                <p className="section-text">
                  We have launched a global Change Champions Network to make transformation easier and more human. Champions are local, trained employees who will help teams understand upcoming changes, provide guidance during rollouts; and surface feedback to leadership. Reach out to your regional champion for help.
                </p>
              </section>

              <section className="section">
                <h2 className="section-title">What Change Champions do</h2>
                <ul className="bullet-list">
                  <li className="bullet-item">Communicate upcoming changes and timelines to the team</li>
                  <li className="bullet-item">Support colleagues during transitions and answer common questions</li>
                  <li className="bullet-item">Act as a bridge between strategy and people — translate messages locally</li>
                  <li className="bullet-item">Collect feedback, highlight pain points, and escalate risks early</li>
                  <li className="bullet-item">Reinforce training and share job-aids / quick tips</li>
                  <li className="bullet-item">Monitor readiness and adoption within their team</li>
                  <li className="bullet-item">Represent regional and functional nuances to the programme team</li>
                </ul>
              </section>
            </div>

            <aside className="sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">Change Champion Spotlight</h3>
                <div className="video-container">
                  <button 
                    className="play-button"
                    onClick={handlePlayClick}
                    aria-label="Play video"
                  />
                  <div className="time-badge">1:00</div>
                </div>
                <div className="thumbnails-row">
                  <div className="thumbnail">APAC</div>
                  <div className="thumbnail">EMEA</div>
                  <div className="thumbnail">Greater: China</div>
                </div>
                <div className="carousel-dots">
                  <div className="dot active"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Upcoming Sessions</h3>
                <div className="session-block">
                  <div className="session-title">Q1 — Introduction Webinar</div>
                  <div className="session-description">
                    Short 25 minute webinar "Meet the Change Champions Network" — what champions do, how to expect them; 1 degree star
                  </div>
                </div>
                <div className="session-block">
                  <div className="session-title">Q3 — Mid-Year Impact Session</div>
                  <div className="session-description">
                    30–45 minute session. Champions share success stories, adoption metrics, and upcoming change calendar.
                  </div>
                </div>
              </div>

              <button 
                className="cta-button"
                onClick={handleCTAClick}
                aria-label="Find your regional champion"
              >
                Find your regional champion →
              </button>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}

