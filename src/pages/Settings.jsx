import React from 'react';

const Settings = () => {
  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      <h1 style={{ color: '#2c3e50', fontSize: '28px', marginBottom: '24px' }}>Settings</h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '16px 0', borderBottom: '1px solid #ecf0f1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', color: '#34495e' }}>Dark Mode</span>
          <div style={{ width: '40px', height: '20px', backgroundColor: '#bdc3c7', borderRadius: '10px', position: 'relative' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
          </div>
        </div>
        <div style={{ padding: '16px 0', borderBottom: '1px solid #ecf0f1' }}>
          <span style={{ fontSize: '16px', color: '#34495e' }}>Notifications</span>
        </div>
        <div style={{ padding: '16px 0', borderBottom: '1px solid #ecf0f1' }}>
          <span style={{ fontSize: '16px', color: '#34495e' }}>Sync Data</span>
        </div>
        <div style={{ padding: '16px 0' }}>
          <span style={{ fontSize: '16px', color: '#e74c3c' }}>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
