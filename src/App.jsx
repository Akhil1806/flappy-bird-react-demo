import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import Home from './pages/Home';
import Settings from './pages/Settings';
import SubjectDetail from './pages/SubjectDetail';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Android Back Button
  useEffect(() => {
    const handleBackButton = async () => {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (location.pathname === '/') {
          // If on home screen, minimize the app (or exit if you prefer)
          CapacitorApp.minimizeApp();
        } else {
          // Otherwise go back in history
          navigate(-1);
        }
      });
    };

    handleBackButton();

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [location, navigate]);

  const showNavbar = ['/', '/settings'].includes(location.pathname);

  return (
    <>
      {children}
      {showNavbar && <Navbar />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
