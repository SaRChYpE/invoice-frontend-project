import React, { useState } from 'react';
import Navbar from './Navbar';

const Home = () => {
  const login = sessionStorage.getItem('login');
  const [markdown, setMarkdown] = useState('');
    
  return (
    <div>
      <Navbar className="navbar" />
      <div className="home-container">
        <h2 className="home-heading">Witaj, {login}!</h2>
        <h2>przepraszam nie umiem we frontend:(((((((</h2>

        {/* Przykład użycia dangerouslySetInnerHTML z dynamicznie ustawianą treścią */}
        <div dangerouslySetInnerHTML={{ __html: markdown }} />

        {/* Pole do wprowadzania treści */}
        <textarea
          placeholder="Wprowadź treść HTML"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
