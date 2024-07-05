import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import SecondPage from './Components/SecondPage';
import './App.css'

const App: React.FC = () => {
  return (
    <div className='app-container' >
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SecondPage" element={<SecondPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    
  );
};

export default App;

