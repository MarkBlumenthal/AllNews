// src/pages/About.tsx
import React from 'react';
import PieChart from '../components/PieChart'; 

const About: React.FC = () => {
  return (
    <div className="container">
      <h1 className="my-4">About Us</h1>
      <p>This is a news application that displays political news from various sources.</p>
      <PieChart /> 
    </div>
  );
};

export default About;

