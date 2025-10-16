import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import * as S from './LayoutErrorPage.styles';

const LayoutErrorPage: React.FC = () => {
  const error = useRouteError() as any;

  return (
    <div>
      <S.ErrorWrapper>
        <S.Title>{error?.status || '404'}</S.Title>
        <S.Status>{error?.statusText || 'Страница не найдена'}</S.Status>
        <S.BackLink to='/'>Вернуться на главную</S.BackLink>
      </S.ErrorWrapper>
    </div>
  );
};

export default LayoutErrorPage;
