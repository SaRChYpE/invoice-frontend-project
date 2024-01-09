import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const token = sessionStorage.getItem('token');
            if (!token) {
                // Jeśli token nie istnieje, przekieruj użytkownika na stronę logowania:
                navigate('/login');
            }
        } else {
            // Jeśli użytkownik nie jest uwierzytelniony, przekieruj go na stronę logowania:
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Zwróć children tylko jeśli użytkownik jest uwierzytelniony i token jest obecny:
    return isAuthenticated ? children : null;
};

export default PrivateRoute;
