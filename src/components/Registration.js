import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegistration = async () => {
  // Walidacja danych
  if (!login || !email || !password) {
    setErrorMessage('Wszystkie pola są wymagane.');
    return;
  }

  if (!validateEmail(email)) {
    setErrorMessage('Nieprawidłowy format adresu email.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/rest/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        password,
        email,
      }),
    });

    if (response.ok) {
      // Rejestracja udana - przekierowanie do innego widoku (np. strony logowania)
      navigate('/login');
      return;
    }

    // Check if the response has content before trying to parse JSON
    const contentType = response.headers.get('content-type');
    const hasContent = contentType && contentType.includes('application/json');

    if (hasContent) {
      const data = await response.json();
      setErrorMessage(data.message || 'Wystąpił błąd podczas rejestracji.');
    } else {
      setErrorMessage('Wystąpił błąd podczas rejestracji.');
    }
  } catch (error) {
    console.error('Błąd podczas rejestracji:', error);
    setErrorMessage('Wystąpił błąd. Spróbuj ponownie.');
  }
};

  return (
    <div className='registration-container'>
      <h2>Rejestracja</h2>
      <form className='registration-form'>
        <label>Login:</label>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <br />
        <label>Adres email:</label>
        <input
          type="email"
          placeholder="Adres email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Hasło:</label>
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={handleRegistration}>
          Zarejestruj się
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
      <p>
        Masz już konto? <Link to="/login">Zaloguj się</Link>
      </p>
    </div>
  );
};

export default Registration;