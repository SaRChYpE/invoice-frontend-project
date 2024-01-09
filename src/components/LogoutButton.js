import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usuwanie danych z sessionStorage
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Wyloguj</button>
  );
};

export default LogoutButton;
