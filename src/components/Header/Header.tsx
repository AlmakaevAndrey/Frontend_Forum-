import React, { ReactNode, useState } from 'react';
import {
  ButtonDivWrapper,
  HeaderWrapper,
  Navigation,
  HeaderDivider,
} from './Header.styled';
import MyButton from '../Button/Button';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/svg/Frontend_Forum';

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
      <HeaderDivider>
        <Logo />
        <ButtonDivWrapper>
          <Navigation>
            <Link to="/setting">Settings</Link>
            <Link to="/signin">Sign in</Link>
          </Navigation>
          <MyButton onClick={toggleTheme}>
            {isDarkProps ? 'Light' : 'Dark'}
          </MyButton>
          {children}
        </ButtonDivWrapper>
      </HeaderDivider>
    </HeaderWrapper>
  );
};

export default Header;
