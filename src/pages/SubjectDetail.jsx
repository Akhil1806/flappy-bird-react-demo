import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getSubject } from '../data/store';

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  
  const subject = getSubject(id);
  
  // Reset index when subject changes
  useEffect(() => {
    setCurrentNoteIndex(0);
  }, [id]);

  if (!subject) {
    return <div style={{ padding: '20px' }}>Subject not found</div>;
  }

  const notes = subject.notes || [];
  const currentNote = notes[currentNoteIndex];

  const handleNext = () => {
    if (currentNoteIndex < notes.length - 1) {
      setCurrentNoteIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentNoteIndex > 0) {
      setCurrentNoteIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      backgroundColor: '#ecf0f1'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '16px 20px', 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10
      }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ border: 'none', background: 'none', padding: 0, marginRight: '16px', cursor: 'pointer' }}
        >
          <ArrowLeft color="#2c3e50" size={24} />
        </button>
        <h1 style={{ color: '#2c3e50', fontSize: '20px', margin: 0, fontWeight: 700 }}>
          {subject.name}
        </h1>
      </div>

      {/* Progress Bar */}
      {notes.length > 0 && (
        <div style={{ 
          height: '4px', 
          backgroundColor: '#bdc3c7', 
          width: '100%' 
        }}>
          <div style={{
            height: '100%',
            width: `${((currentNoteIndex + 1) / notes.length) * 100}%`,
            backgroundColor: subject.color,
            transition: 'width 0.3s ease'
          }} />
        </div>
      )}

      {/* Content */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '20px',
        paddingBottom: '80px' // Space for bottom bar
      }}>
        {notes.length > 0 ? (
          <div className="markdown-body" style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            color: '#2c3e50'
          }}>
            <ReactMarkdown>{currentNote.content}</ReactMarkdown>
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#7f8c8d' 
          }}>
            No notes available for this subject yet.
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {notes.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60px',
          backgroundColor: 'white',
          borderTop: '1px solid #ecf0f1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 100
        }}>
          <button 
            onClick={handlePrev}
            disabled={currentNoteIndex === 0}
            style={{ 
              border: 'none', 
              background: 'none', 
              padding: '8px', 
              cursor: currentNoteIndex === 0 ? 'default' : 'pointer',
              opacity: currentNoteIndex === 0 ? 0.3 : 1,
              display: 'flex',
              alignItems: 'center',
              color: '#2c3e50',
              fontWeight: 600
            }}
          >
            <ChevronLeft size={24} />
            <span style={{ marginLeft: '4px' }}>Prev</span>
          </button>

          <span style={{ color: '#7f8c8d', fontSize: '14px' }}>
            {currentNoteIndex + 1} / {notes.length}
          </span>

          <button 
            onClick={handleNext}
            disabled={currentNoteIndex === notes.length - 1}
            style={{ 
              border: 'none', 
              background: 'none', 
              padding: '8px', 
              cursor: currentNoteIndex === notes.length - 1 ? 'default' : 'pointer',
              opacity: currentNoteIndex === notes.length - 1 ? 0.3 : 1,
              display: 'flex',
              alignItems: 'center',
              color: '#2c3e50',
              fontWeight: 600
            }}
          >
            <span style={{ marginRight: '4px' }}>Next</span>
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectDetail;
