import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import LoadingScreen from './LoadingScreen';

function PrivateRoute({ children, requiredPermission }) {
  const { user, checkSignIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkSignIn();
      setLoading(false);
    }

    checkAuthentication();
  }, []);

  if (loading) {
    <LoadingScreen />
    return null;
  }

  return user && user.permissao_usuario <= requiredPermission ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
