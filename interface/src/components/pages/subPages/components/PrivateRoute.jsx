import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

function PrivateRoute({ element, ...props }) {
  const { user } = useAuth();

  return user ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;