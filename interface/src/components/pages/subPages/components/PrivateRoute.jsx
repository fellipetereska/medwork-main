import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
