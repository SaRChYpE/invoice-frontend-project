// Login.js
import React, {useContext, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './style.css'; // Import stylów
import AuthContext from './AuthContext'; // Import kontekstu

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin =  () => {
      axios.post('http://localhost:8080/rest/auth/login', {
      login: username,
      password: password,
      code: 100000,
    })
      .then( response => {
        if (response.status === 200 && response.data.token) {
          const token = response.data.token;
          const login = response.data.login
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('login', login);
          sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
          navigate('/home');
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
