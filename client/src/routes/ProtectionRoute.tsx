import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../api/store';
import { Role } from '../shared/types/roles';

interface Props {
  children: React.ReactNode;
  roles: Role[];
}

const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const role: Role = user?.role || 'guest';

  if (!token && roles.includes('guest')) {
    return <>{children}</>;
  }

  if (token) {
    <Navigate to='signin' replace />;
  }

  if (token && user && !roles.includes(user.role)) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
