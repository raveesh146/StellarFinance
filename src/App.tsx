import React from 'react';
import { AdminDashboard } from './pages/AdminDashboard';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { KYCVerification } from './pages/KYCVerification';
import { AdvisorDashboard } from './pages/AdvisorDashboard';

function App() {
  // Dummy auth state
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/advisor' element={<AdvisorDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/kyc" element={<KYCVerification />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;