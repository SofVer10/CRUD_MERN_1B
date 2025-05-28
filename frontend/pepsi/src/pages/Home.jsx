import React from 'react';
import '../styles/StyleHome.css';
import Fondo from '../images/fondo.mp4';

const Home = () => {
  return (
    <div className="home-container">
      <video autoPlay muted loop className="background-video">
        <source src={Fondo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="overlay"></div>
      
      <div className="content">
        <div className="subtitle">
          <div className="icon-container">
            <div className="chart-icon">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          <span>Journey to new frontiers. Journey to Pepsi Experience</span>
        </div>
        
        <h1 className="main-title">PEPSI</h1>
        
        <p className="description">
          Away from the mundane energy of today's famous metropoles, lies the 
          ancient land of spirits. Swimming and captivating in equal measures, 
          step into a different weather. Sweeping peaks, lakes and ancient waterfalls.
        </p>
        
        <button className="cta-button">
          Start the journey
          <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Home;