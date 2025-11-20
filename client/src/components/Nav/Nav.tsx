import React, { ReactNode, useState } from 'react';
import * as S from './Nav.styles';
import { Link } from 'react-router-dom';
import ArticleLogo from '../../assets/svg/ArticleLogo';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../api/store';
import { MyCustomButton } from '../../components/Button/Button.styles';

interface NavProps {
  token: string | null;
  handleLogin: () => void;
  handleLogout: () => void;
  children: ReactNode;
}

const Nav: React.FC<NavProps> = ({ token, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const { user, role } = useSelector((state: RootState) => state.auth);

  const closeMenu = () => setIsOpen(false);
  const currentLang = i18n.language?.toUpperCase() ?? 'en';

  return (
    <S.NavWrapper>
      <S.BurgerButton onClick={() => setIsOpen(!isOpen)}>
        {' '}
        {children}
      </S.BurgerButton>

      <S.Overlay data-testid='overlay' $isOpen={isOpen} onClick={closeMenu} />

      <S.Navigation $isOpen={isOpen}>
        <MyCustomButton
          data-testid='change-language'
          onClick={() =>
            i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')
          }
        >
          {currentLang}
        </MyCustomButton>

        {/* <S.LanguageButton onClick={() => i18n.changeLanguage('en')}>
          EN
        </S.LanguageButton>
        <S.LanguageButton onClick={() => i18n.changeLanguage('ru')}>
          RU
        </S.LanguageButton> */}

        <Link to='/' data-testid='link-home' onClick={closeMenu}>
          {t('header.home')}
        </Link>
        <Link to='/signin' data-testid='link-signin' onClick={closeMenu}>
          {t('header.signIn')}
        </Link>

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
            <ArticleLogo />
          </Link>
        )}
      </S.Navigation>
    </S.NavWrapper>
  );
};

export default Nav;
