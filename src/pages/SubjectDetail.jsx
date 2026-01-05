import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getSubjectName = (id) => {
    const map = {
      'java': 'Java', 'cpp': 'C++', 'python': 'Python',
      'ds': 'Data Structures', 'ml': 'Machine Learning',
      'os': 'Operating Systems', 'net': 'Networking', 'dbms': 'DBMS'
    };
    return map[id] || 'Subject';
  };

  return (
    <div style={{ padding: '20px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ border: 'none', background: 'none', padding: 0, marginRight: '16px', cursor: 'pointer' }}
        >
          <ArrowLeft color="#2c3e50" size={28} />
        </button>
        <h1 style={{ color: '#2c3e50', fontSize: '24px', margin: 0 }}>
          {getSubjectName(id)} Notes
        </h1>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <p style={{ color: '#7f8c8d', fontSize: '16px', lineHeight: '1.6' }}>
          This is where your {getSubjectName(id)} notes will appear.
          <br /><br />
          - Topic 1: Introduction<br />
          - Topic 2: Advanced Concepts<br />
          - Topic 3: Project Ideas
        </p>
      </div>
    </div>
  );
};

export default SubjectDetail;
