// WelcomePage.js
import './styles.css'
import React from 'react';
import { Link } from 'react-router-dom';


const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h2>Witaj!</h2>
      <div className="button-container">
        <Link to="/login">
          <button>Zaloguj się</button>
        </Link>
        <Link to="/register">
          <button>Zarejestruj się</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;