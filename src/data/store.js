// Import markdown files using Vite's raw import
import javaIntro from './markdown/java-intro.md?raw';
import javaOop from './markdown/java-oop.md?raw';
import cppBasics from './markdown/cpp-basics.md?raw';
import cppStl from './markdown/cpp-stl.md?raw';
import pythonIntro from './markdown/python-intro.md?raw';

export const subjects = [
  { 
    id: 'java', 
    name: 'Java', 
    color: '#e67e22',
    notes: [
      { id: 'intro', title: 'Introduction', content: javaIntro },
      { id: 'oop', title: 'OOP Concepts', content: javaOop },
    ]
  },
  { 
    id: 'cpp', 
    name: 'C++', 
    color: '#2980b9',
    notes: [
      { id: 'basics', title: 'Basics', content: cppBasics },
      { id: 'stl', title: 'STL', content: cppStl },
    ]
  },
  { 
    id: 'python', 
    name: 'Python', 
    color: '#f1c40f',
    notes: [
      { id: 'intro', title: 'Introduction', content: pythonIntro },
    ]
  },
  { id: 'ds', name: 'Data Structures', color: '#27ae60', notes: [] },
  { id: 'ml', name: 'Machine Learning', color: '#8e44ad', notes: [] },
  { id: 'os', name: 'Operating Systems', color: '#34495e', notes: [] },
  { id: 'net', name: 'Networking', color: '#e74c3c', notes: [] },
  { id: 'dbms', name: 'DBMS', color: '#16a085', notes: [] },
];

export const getSubject = (id) => subjects.find(s => s.id === id);
