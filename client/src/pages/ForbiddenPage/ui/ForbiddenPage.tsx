import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Title, Wrapper, Message } from './ForbiddenPage.styles';
import { useTranslation } from 'react-i18next';

const ForbiddenPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>{t('forbidden.title')}</Title>
      <Message>{t('forbidden.message')}</Message>
      <Button onClick={() => navigate('/')}>{t('forbidden.goHome')}</Button>
    </Wrapper>
  );
};

export default ForbiddenPage;
