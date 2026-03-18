import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  // Se não tem token de autenticação, joga para a tela de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Usuário autenticado, renderiza a rota filha
  return <Outlet />;
};

export default ProtectedRoute;
