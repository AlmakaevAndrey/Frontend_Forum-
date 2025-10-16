import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../api/store';
import { Role } from '../shared/types/roles';
import Loader from '../components/Loader/Loader';

interface Props {
  roles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children, roles }) => {
  const { token, user, role, isLoadingUser } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoadingUser) {
    return <Loader />;
  }

  const currentRole: Role = role || user?.role || 'guest';

  if (
    token &&
    (window.location.pathname === '/signin' ||
      window.location.pathname === '/signup')
  ) {
    return <Navigate to='/' replace />;
  }

  if (!token && !roles.includes('guest')) {
    return <Navigate to='/signin' replace />;
  }

  if (token && !roles.includes(currentRole)) {
    return <Navigate to='/forbidden_page' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
