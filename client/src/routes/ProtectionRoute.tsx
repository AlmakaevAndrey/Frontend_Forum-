import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../api/store';
import { Role } from '../shared/types/roles';

interface Props {
  roles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const role: Role = user?.role || 'guest';

  if (!token) {
    if (roles.includes('guest')) {
      return <>{children}</>;
    }
    return <Navigate to='/signin' replace />;
  }

  if (token && user && !roles.includes(role)) {
    return <Navigate to='/forbidden_page' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
