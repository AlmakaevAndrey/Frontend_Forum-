import React, { ReactNode, useState } from 'react';
import { HeaderWrapper } from './Header.styled';
import MyButton from '../Button/Button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  children: ReactNode;
  isDarkProps: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  children,
  isDarkProps,
  toggleTheme,
}) => {
  return (
    <HeaderWrapper>
      <MyButton onClick={toggleTheme}>
        {isDarkProps ? 'Light' : 'Dark'}
      </MyButton>
      <nav>
        <Link to="/setting">Settings</Link>
        <Link to="/signin">Sign in</Link>
      </nav>
      {children}
    </HeaderWrapper>
  );
};

export default Header;
