import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ForbiddenPage.styles';

const ForbiddenPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <S.Title>{t('forbidden.title')}</S.Title>
      <S.Message>{t('forbidden.message')}</S.Message>
      <S.Button onClick={() => navigate('/')}>{t('forbidden.goHome')}</S.Button>
    </S.Wrapper>
  );
};

export default ForbiddenPage;
