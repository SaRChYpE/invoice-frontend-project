// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.css'; // Import stylów


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Wysłanie żądania do pierwszego endpointu
    fetch('http://localhost:8080/rest/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: username, password: password, code: 100000 }),
    })
      .then(response => response.json())
      .then(data => {
        // Sprawdzenie, czy użytkownik istnieje w bazie danych
        if (data.login && data.token) {
          navigate('/kod-2fa');
        } else {
          alert('Użytkownik nie istnieje. Zarejestruj się.');
        }
      })
      .catch(error => {
        console.error('Błąd logowania:', error);
      });
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form>
        <label>
          Login:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Zaloguj się
        </button>
        <p>
          Nie masz konta? <Link to="/rejestracja">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
