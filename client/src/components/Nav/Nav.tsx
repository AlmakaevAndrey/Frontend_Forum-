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

  return (
    <S.NavWrapper>
      <S.BurgerButton onClick={() => setIsOpen(!isOpen)}>
        {' '}
        {children}
      </S.BurgerButton>
      <S.Navigation $isOpen={isOpen}>
        <Link to='/'>Home</Link>
        <Link to='/signin'>Sign in</Link>

        {token && <Link to='/setting'>Settings</Link>}
        {token && <Link to='/profile'>Profile</Link>}
        {token && (
          <Link to='/article_writing'>
            <ArticleLogo />
          </Link>
        )}
      </S.Navigation>
    </S.NavWrapper>
  );
};

export default Nav;
