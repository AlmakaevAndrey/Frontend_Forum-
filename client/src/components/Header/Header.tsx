import React, { ReactNode, useState } from 'react';
import {
  ButtonDivWrapper,
  HeaderWrapper,
  Navigation,
  HeaderDivider,
} from './Header.styled';
import MyButton from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/svg/Frontend_Forum';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/authSlice';
import { RootState } from 'api/store';
import ArticleLogo from '../../assets/svg/ArticleLogo';

interface HeaderProps {
  isDarkProps: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkProps, toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleLogin = () => {
    navigate('/signin');
  };
  // Сделать NAV
  return (
    <HeaderWrapper>
      <HeaderDivider>
        <Link to='/'>
          <Logo />
        </Link>
        <ButtonDivWrapper>
          <Navigation>
            <Link to='/'>Home</Link>

            {token && <Link to='/setting'>Settings</Link>}
            {token && <Link to='/profile'>Profile</Link>}
            {token && (
              <Link to='/article_writing'>
                <ArticleLogo />
              </Link>
            )}
            {!token ? (
              <>
                <Link to='/signin'>Sign in</Link>
                <MyButton onClick={handleLogin}>Login</MyButton>
              </>
            ) : (
              <MyButton onClick={handleLogout}>Logout</MyButton>
            )}
          </Navigation>
          <MyButton onClick={toggleTheme}>
            {isDarkProps ? 'Light' : 'Dark'}
          </MyButton>
        </ButtonDivWrapper>
      </HeaderDivider>
    </HeaderWrapper>
  );
};

export default Header;
