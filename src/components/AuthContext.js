import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Sprawdzenie w sessionStorage
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const login = sessionStorage.getItem('login') || localStorage.getItem('login');
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAuthenticated'));

    useEffect(() => {
        if (isAuthenticated === null && token && login) {
            axios.post('http://localhost:8080/rest/auth/valid-token', {
                login: login,
                token: token
            })
            .then(response => {
                if (response.data === true) {
                    setIsAuthenticated(true);
                    sessionStorage.setItem('isAuthenticated', true);
                } else {
                    setIsAuthenticated(false);
                    sessionStorage.setItem('isAuthenticated', false);
                }
            })
            .catch(error => {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                sessionStorage.setItem('isAuthenticated', false);
            });
        }
        else{
          setIsAuthenticated(true);
        }
    }, [setIsAuthenticated, isAuthenticated]);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
