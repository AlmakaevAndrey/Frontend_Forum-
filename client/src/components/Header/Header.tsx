import React from 'react';
import {
  ButtonDivWrapper,
  HeaderWrapper,
  HeaderDivider,
  Linked,
} from './Header.styled';
import MyButton from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/svg/Frontend_Forum';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/authSlice';
import { RootState } from 'api/store';
import { useTranslation } from 'react-i18next';
import Nav from '../../components/Nav/Nav';
import BurgerIcon from '../../assets/svg/burger-menu-right-svgrepo-com.svg';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface HeaderProps {
  isDarkProps: boolean;
  onThemeChange: (isDark: boolean) => void;
  handleLogout: () => void;
  handleLogin: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ isDarkProps, onThemeChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleLogin = () => {
    navigate('/signup');
  };

  return (
    <HeaderWrapper>
      <HeaderDivider>
        <Linked to='/'>
          <Logo />
        </Linked>
        <ButtonDivWrapper>
          {!token ? (
            <>
              <MyButton onClick={handleLogin}>{t('header.login')}</MyButton>
            </>
          ) : (
            <MyButton onClick={handleLogout}>{t('header.logout')}</MyButton>
          )}
          <ThemeToggle onThemeChange={onThemeChange} />
          <Nav
            token={token}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          >
            <BurgerIcon width={32} height={32} />
          </Nav>
        </ButtonDivWrapper>
      </HeaderDivider>
    </HeaderWrapper>
  );
};

export default Header;
