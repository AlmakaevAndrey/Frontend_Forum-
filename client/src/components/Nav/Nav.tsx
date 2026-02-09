import React, { ReactNode, useState } from 'react';
import * as S from './Nav.styles';
import { Link } from 'react-router-dom';
import ArticleLogo from '../../assets/svg/ArticleLogo';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../api/store';
import LanguageToggle from '../LanguageToggler/LanguageToggler';

interface NavProps {
  token: string | null;
  handleLogin: () => void;
  handleLogout: () => void;
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ token, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const { role } = useSelector((state: RootState) => state.auth);

  const closeMenu = () => setIsOpen(false);
  const currentLang = i18n.language === 'ru';

  return (
    <S.NavWrapper>
      <S.BurgerButton onClick={() => setIsOpen(!isOpen)}>
        {' '}
        {children}
      </S.BurgerButton>

      <S.Overlay data-testid='overlay' $isOpen={isOpen} onClick={closeMenu} />

      <S.Navigation $isOpen={isOpen}>
        <LanguageToggle
          data-testid='change-language'
          value={currentLang}
          onChange={(val) => i18n.changeLanguage(val ? 'ru' : 'en')}
        />

        <Link to='/' data-testid='link-home' onClick={closeMenu}>
          {t('header.home')}
        </Link>

        {!token && (
          <Link to='/signin' data-testid='link-signin' onClick={closeMenu}>
            {t('header.signIn')}
          </Link>
        )}

        {token && role === 'admin' && (
          <Link to='/setting' data-testid='link-settings' onClick={closeMenu}>
            {t('header.settings')}
          </Link>
        )}
        {token && (
          <Link to='/profile' data-testid='link-profile' onClick={closeMenu}>
            {t('header.profile')}
          </Link>
        )}
        {token && (
          <Link
            to='/article_writing'
            data-testid='link-article-writing'
            onClick={closeMenu}
          >
            <ArticleLogo type='checkbox' data-testid='toggle-theme' />
          </Link>
        )}
      </S.Navigation>
    </S.NavWrapper>
  );
};

export default Nav;
