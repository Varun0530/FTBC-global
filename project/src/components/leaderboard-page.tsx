import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDemo from './navbar-demo';

interface LeaderboardEntry {
  rank: number;
  initials: string;
  name: string;
  country: string;
  adoptionRate: number;
  businessUnit: string;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, initials: "SH", name: "Shaurya", country: "India", adoptionRate: 98, businessUnit: "Operations" },
  { rank: 2, initials: "NM", name: "Nguyen Minh", country: "Vietnam", adoptionRate: 96, businessUnit: "Supply Chain" },
  { rank: 3, initials: "RM", name: "Rahul Mehta", country: "India", adoptionRate: 95, businessUnit: "Quality" },
  { rank: 4, initials: "SN", name: "Siti Nur", country: "Indonesia", adoptionRate: 94, businessUnit: "Manufacturing" },
  { rank: 5, initials: "KW", name: "Kenji Watanabe", country: "Japan", adoptionRate: 93, businessUnit: "R&D" },
  { rank: 6, initials: "LJ", name: "Liew Jia", country: "Malaysia", adoptionRate: 92, businessUnit: "Logistics" },
  { rank: 7, initials: "SP", name: "Sonal Patel", country: "India", adoptionRate: 91, businessUnit: "Sales" },
  { rank: 8, initials: "ZA", name: "Zainab Ali", country: "Singapore", adoptionRate: 90, businessUnit: "Customer Success" },
  { rank: 9, initials: "EP", name: "Eun-Ji Park", country: "South Korea", adoptionRate: 89, businessUnit: "Digital" },
  { rank: 10, initials: "AR", name: "Arjun Rao", country: "India", adoptionRate: 88, businessUnit: "Procurement" },
];


export default function LeaderboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure proper focus management for accessibility
    const viewButtons = document.querySelectorAll('.view-profile-btn');
    viewButtons.forEach((btn) => {
      btn.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
          e.preventDefault();
          (btn as HTMLButtonElement).click();
        }
      });
    });
  }, []);

  const handleViewProfile = (name: string) => {
    navigate(`/profile/${encodeURIComponent(name)}`);
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
          background: #1a1a1a;
          color: #ffffff;
          min-height: 100vh;
        }

        /* Main container with radial highlights */
        .leaderboard-container {
          min-height: 100vh;
          background: #1a1a1a;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(32, 86, 174, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(32, 86, 174, 0.03) 0%, transparent 50%);
          padding: 2rem 1rem;
        }

        /* Centered content wrapper */
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Main card styling */
        .leaderboard-card {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(32, 86, 174, 0.15);
          border-radius: 14px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(32, 86, 174, 0.1) inset,
            0 2px 8px rgba(32, 86, 174, 0.05);
          padding: 2.5rem;
          margin-top: 2rem;
        }

        /* Title styling */
        .leaderboard-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          color: #2056AE;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }

        /* Table styling */
        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
          background: transparent;
        }

        .leaderboard-table thead {
          border-bottom: 1px solid rgba(32, 86, 174, 0.2);
        }

        .leaderboard-table th {
          text-align: left;
          padding: 1rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #2056AE;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

          .leaderboard-table tbody tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background-color 0.2s ease;
        }

        .leaderboard-table tbody tr:hover {
          background: rgba(32, 86, 174, 0.05);
        }

        .leaderboard-table tbody tr:last-child {
          border-bottom: none;
        }

        .leaderboard-table td {
          padding: 1.25rem 1.25rem;
          vertical-align: middle;
        }

        /* Rank column */
        .rank-cell {
          font-size: 1.125rem;
          font-weight: 700;
          color: #2056AE;
          width: 60px;
        }

        /* Participant name column */
        .participant-cell {
          min-width: 220px;
        }

        .participant-block {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

          .avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #2056AE;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          color: #ffffff;
          flex-shrink: 0;
        }

        .participant-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

          .participant-name {
          font-weight: 600;
          font-size: 0.9375rem;
          color: #ffffff;
        }

        .participant-location {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Location column */
        .location-cell {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9375rem;
        }

        /* Adoption rate column */
        .adoption-cell {
          min-width: 200px;
        }

        .adoption-block {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .adoption-percent {
          font-weight: 700;
          font-size: 0.9375rem;
          color: #2056AE;
          min-width: 50px;
        }

          .progress-bar-container {
          flex: 1;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          max-width: 200px;
        }

        .progress-bar-fill {
          height: 100%;
          background: #2056AE;
          border-radius: 4px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px rgba(32, 86, 174, 0.4);
        }

        /* Business unit column */
        .business-unit-cell {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9375rem;
        }

        /* View button column */
        .view-cell {
          text-align: right;
        }

        .view-profile-btn {
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 1px solid #2056AE;
          border-radius: 6px;
          color: #2056AE;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .view-profile-btn:hover {
          background: rgba(32, 86, 174, 0.1);
          box-shadow: 0 0 12px rgba(32, 86, 174, 0.3);
        }

        .view-profile-btn:focus {
          outline: 2px solid #2056AE;
          outline-offset: 2px;
        }

        .view-profile-btn:active {
          transform: scale(0.98);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .leaderboard-card {
            padding: 1.5rem;
          }

          .leaderboard-title {
            font-size: 1.5rem;
          }

          .leaderboard-table {
            font-size: 0.875rem;
          }

          .leaderboard-table th,
          .leaderboard-table td {
            padding: 0.75rem 0.5rem;
          }

          .location-cell,
          .business-unit-cell {
            display: none;
          }

          .adoption-block {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .progress-bar-container {
            max-width: 100%;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .leaderboard-container {
            padding: 1rem 0.5rem;
          }

          .leaderboard-card {
            padding: 1rem;
            border-radius: 12px;
          }

          .leaderboard-table th,
          .leaderboard-table td {
            padding: 0.625rem 0.375rem;
            font-size: 0.8125rem;
          }

          .avatar {
            width: 32px;
            height: 32px;
            font-size: 0.75rem;
          }

          .view-profile-btn {
            padding: 0.375rem 0.875rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
      
      <div className="leaderboard-container">
        <NavbarDemo />
        <div className="content-wrapper">
          <div className="leaderboard-card">
            <h1 className="leaderboard-title">APAC Region Leaderboard</h1>
            <table 
              className="leaderboard-table" 
              role="table"
              aria-label="APAC Region Leaderboard showing top 10 participants"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Participant name</th>
                  <th className="location-cell">Location</th>
                  <th>Adoption rate</th>
                  <th className="business-unit-cell">Business unit</th>
                  <th className="view-cell">View</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr key={entry.rank}>
                    <td className="rank-cell">{entry.rank}</td>
                    <td className="participant-cell">
                      <div className="participant-block">
                        <div className="avatar" aria-label={`${entry.name} avatar`}>
                          {entry.initials}
                        </div>
                        <div className="participant-info">
                          <div className="participant-name">{entry.name}</div>
                          <div className="participant-location">{entry.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="location-cell">{entry.country}</td>
                    <td className="adoption-cell">
                      <div className="adoption-block">
                        <span className="adoption-percent">{entry.adoptionRate}%</span>
                        <div className="progress-bar-container" role="progressbar" aria-valuenow={entry.adoptionRate} aria-valuemin={0} aria-valuemax={100}>
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${entry.adoptionRate}%` }}
                            aria-label={`${entry.adoptionRate}% adoption rate`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="business-unit-cell">{entry.businessUnit}</td>
                    <td className="view-cell">
                      <button
                        className="view-profile-btn"
                        onClick={() => handleViewProfile(entry.name)}
                        aria-label={`View profile for ${entry.name}`}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
