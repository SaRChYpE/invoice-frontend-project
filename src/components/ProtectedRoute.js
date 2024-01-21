// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext'; // Załóżmy, że masz kontekst autentykacji

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/home" replace />
  );
};

export default ProtectedRoute;