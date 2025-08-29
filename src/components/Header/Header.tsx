import React, { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header>Header{children}</header>;
};

export default Header;
