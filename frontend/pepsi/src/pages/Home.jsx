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

        </div>
        
        <h1 className="main-title">PEPSI</h1>
        
      
      </div>
    </div>
  );
};

export default Home;