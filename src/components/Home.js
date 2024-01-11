import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import LogoutButton from "./LogoutButton";

const Home = () => {
  const [userLogin, setUserLogin] = useState('');

  const handleLoginChange = (event) => {
    setUserLogin(event.target.value); // Aktualizacja stanu dla wprowadzonego loginu
  };

  const handleViewCustomer = () => {
    if (userLogin) {
      window.location.href = `http://localhost:3000/customer/${userLogin}`;
    } else {
      alert('Proszę wprowadzić login użytkownika.');
    }
  };

  return (
    <div>
      <div>
        {/* Edytuj dane firmy - link do odpowiedniej ścieżki */}
        <Link to="/create-company">Stwórz firmę</Link>
        {/* Przyciski Klienci i Faktury - linki do odpowiednich ścieżek */}
        <Link to="/clients">Klienci</Link>
        <Link to="/invoices">Faktury</Link>
        {/* Przycisk Wyloguj - wywołuje funkcję handleLogout po kliknięciu */}
        <LogoutButton />
      </div>

      {/* Pole do wprowadzania loginu i przycisk */}
      <div>
        <input
          type="text"
          placeholder="Wprowadź login użytkownika"
          value={userLogin}
          onChange={handleLoginChange}
        />
        <button onClick={handleViewCustomer}>Pokaż dane klienta</button>
      </div>

      {/* Treść strony głównej */}
      <h2>Witaj na stronie głównej!</h2>
    </div>
  );
};

export default Home;
