import React from 'react';
import { useRouteError } from 'react-router-dom';
import * as S from './LayoutErrorPage.styles';
import { useTranslation } from 'react-i18next';

const LayoutErrorPage: React.FC = () => {
  const { t } = useTranslation();
  const error = useRouteError() as any;

  return (
    <div>
      <S.ErrorWrapper>
        <S.Title>{error?.status || '404'}</S.Title>
        <S.Status>{t('error.pageNotFound')}</S.Status>
        <S.BackLink to='/'>{t('error.backToHome')}</S.BackLink>
      </S.ErrorWrapper>
    </div>
  );
};

export default LayoutErrorPage;
