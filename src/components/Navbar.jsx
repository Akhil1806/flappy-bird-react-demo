import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '60px',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      zIndex: 1000
    }}>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: isActive ? '#3498db' : '#95a5a6',
          fontSize: '12px',
          fontWeight: 600
        })}
      >
        <Home size={24} />
        <span style={{ marginTop: '4px' }}>Subjects</span>
      </NavLink>
      
      <NavLink 
        to="/settings" 
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: isActive ? '#3498db' : '#95a5a6',
          fontSize: '12px',
          fontWeight: 600
        })}
      >
        <Settings size={24} />
        <span style={{ marginTop: '4px' }}>Settings</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
