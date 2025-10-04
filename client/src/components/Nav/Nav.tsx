import React, { ReactNode, useState } from 'react';
import * as S from './Nav.styles';
import { Link } from 'react-router-dom';
import ArticleLogo from '../../assets/svg/ArticleLogo';

interface NavProps {
  token: string | null;
  handleLogin: () => void;
  handleLogout: () => void;
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ token, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <S.NavWrapper>
      <S.BurgerButton onClick={() => setIsOpen(!isOpen)}>
        {' '}
        {children}
      </S.BurgerButton>

      <S.Overlay $isOpen={isOpen} onClick={closeMenu} />

      <S.Navigation $isOpen={isOpen}>
        <Link to='/' onClick={closeMenu}>
          Home
        </Link>
        <Link to='/signin' onClick={closeMenu}>
          Sign in
        </Link>

        {token && (
          <Link to='/setting' onClick={closeMenu}>
            Settings
          </Link>
        )}
        {token && (
          <Link to='/profile' onClick={closeMenu}>
            Profile
          </Link>
        )}
        {token && (
          <Link to='/article_writing' onClick={closeMenu}>
            <ArticleLogo />
          </Link>
        )}
      </S.Navigation>
    </S.NavWrapper>
  );
};

export default Nav;
