import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import SubjectDetail from './pages/SubjectDetail';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  // Don't show navbar on detail page if you want a cleaner look, 
  // but for this request "bottom nav bar" implies it might be persistent.
  // I'll keep it persistent for the main tabs.
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
