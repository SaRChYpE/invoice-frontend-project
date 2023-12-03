// Home.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const [hasCompanyProfile, setHasCompanyProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sprawdzenie, czy użytkownik ma założony profil firmy
    fetch('http://localhost:8080/rest/company/1') // Tutaj podaj właściwy endpoint
      .then(response => {
        if (response.ok) {
          setHasCompanyProfile(true);
        } else {
          // Jeśli nie ma założonego profilu firmy, przekieruj do widoku tworzenia firmy
          navigate('/create-company');
        }
      })
      .catch(error => {
        console.error('Błąd sprawdzania profilu firmy:', error);
      });
  }, [navigate]);

  const handleLogout = () => {
    // Tutaj dodaj kod do wylogowania użytkownika
    // Np. usuń token z kontekstu autentykacji
    // i przekieruj do strony logowania
  };

  return (
    <div>
      <div>
        {/* Edytuj dane firmy - link do odpowiedniej ścieżki */}
        <Link to="/edit-company">Edytuj dane firmy</Link>
        {/* Przyciski Klienci i Faktury - linki do odpowiednich ścieżek */}
        <Link to="/clients">Klienci</Link>
        <Link to="/invoices">Faktury</Link>
        {/* Przycisk Wyloguj - wywołuje funkcję handleLogout po kliknięciu */}
        <button onClick={handleLogout}>Wyloguj</button>
      </div>
      {/* Treść strony głównej - można dodać dodatkowe elementy */}
      <h2>Witaj na stronie głównej!</h2>
    </div>
  );
};

export default Home;
