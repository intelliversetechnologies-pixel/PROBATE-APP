import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import ClientDashboard from './pages/client/ClientDashboard';
import NewApplication from './pages/client/NewApplication';
import ClientDocuments from './pages/client/ClientDocuments';
import OfficerDashboard from './pages/officer/OfficerDashboard';
import LegalDashboard from './pages/legal/LegalDashboard';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/auth/LoginPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:role" element={<LoginPage />} />

          <Route element={<Layout />}>
            {/* Client Routes */}
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/new" element={<NewApplication />} />
            <Route path="/client/documents" element={<ClientDocuments />} />

            {/* Officer Routes */}
            <Route path="/officer" element={<OfficerDashboard />} />
            <Route path="/officer/*" element={<OfficerDashboard />} />

            {/* Legal Routes */}
            <Route path="/legal" element={<LegalDashboard />} />
            <Route path="/legal/*" element={<LegalDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
