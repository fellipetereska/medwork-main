import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

function PrivateRoute({ children, requiredPermission }) {
  const { user, checkSignIn } = useAuth();

  useEffect(() => {
    checkSignIn();

    if (user && user.permissao_usuario > requiredPermission) {
      toast.warn('Somente para Administradores!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [user, requiredPermission, checkSignIn]);

  return user && user.permissao_usuario <= requiredPermission ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;
