import React, { useEffect } from "react";
import "../styles/landingpage.css";
import getToken from "../services/token";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const redirectToContact = () => {
    navigate('/in')
  };

  const redirectToGlobal = () => {
    navigate('/global')
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="app-title">StreamGuess</h1>
        <p className="app-description" style={{color: 'white'}}>
          A fun and interactive guessing game for music enthusiasts.
        </p>
        <div className="button-container">
          <button className="action-button" onClick={redirectToContact}>India Charts</button>
          <button className="action-button" onClick={redirectToGlobal}>Gloabal Charts</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
