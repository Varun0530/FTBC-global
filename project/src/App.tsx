import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WorldMapDemo from './components/world-map-demo';
import ChangeResourcesHub from './components/resources-page';

// Code splitting - lazy load route components for better performance
const DashboardPage = lazy(() => import('./components/dashboard-page'));
const GetStartedPage = lazy(() => import('./components/get-started-page'));
const LeaderboardPage = lazy(() => import('./components/leaderboard-page'));
const AmericaLeaderboardPage = lazy(() => import('./components/america-leaderboard-page'));
const EMEALeaderboardPage = lazy(() => import('./components/emea-leaderboard-page'));
const GreaterChinaLeaderboardPage = lazy(() => import('./components/greater-china-leaderboard-page'));
const ProfilePage = lazy(() => import('./components/profile-page'));

// Simple loading fallback
const LoadingFallback = () => (
  <div style={{ 
    minHeight: '100vh', 
    backgroundColor: '#FFFFFF', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: '#2056AE'
  }}>
    <div>Loading...</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
            <WorldMapDemo />
          </div>
        } />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/america-leaderboard" element={<AmericaLeaderboardPage />} />
        <Route path="/emea-leaderboard" element={<EMEALeaderboardPage />} />
        <Route path="/greater-china-leaderboard" element={<GreaterChinaLeaderboardPage />} />
        <Route path="/profile/:name" element={<ProfilePage />} />
        <Route path="/resources" element={<ChangeResourcesHub />} />
      </Routes>
    </Suspense>
  );
}

export default App;
