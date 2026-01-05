import React from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects } from '../data/store';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      <h1 style={{ 
        color: '#2c3e50', 
        fontSize: '28px', 
        marginBottom: '24px', 
        fontWeight: 700 
      }}>
        My Notes
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px' 
      }}>
        {subjects.map((sub) => (
          <div 
            key={sub.id}
            onClick={() => navigate(`/subject/${sub.id}`)}
            style={{
              backgroundColor: sub.color,
              borderRadius: '12px',
              height: '140px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.1s ease'
            }}
          >
            <span style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: 600,
              textAlign: 'center',
              padding: '10px'
            }}>
              {sub.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
