import React from 'react';
import {
  ButtonDivWrapper,
  HeaderWrapper,
  HeaderDivider,
} from './Header.styled';
import MyButton from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/svg/Frontend_Forum';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/authSlice';
import { RootState } from 'api/store';
import Nav from '../../components/Nav/Nav';
import BurgerIcon from '../../assets/svg/burger-menu-right-svgrepo-com.svg';

interface HeaderProps {
  isDarkProps: boolean;
  toggleTheme: () => void;
  handleLogout: () => void;
  handleLogin: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  isDarkProps,
  toggleTheme,
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);

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
        <Link to='/'>
          <Logo />
        </Link>
        <ButtonDivWrapper>
          {!token ? (
            <>
              <MyButton onClick={handleLogin}>Login</MyButton>
            </>
          ) : (
            <MyButton onClick={handleLogout}>Logout</MyButton>
          )}

          <MyButton onClick={toggleTheme}>
            {isDarkProps ? 'Light' : 'Dark'}
          </MyButton>
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
