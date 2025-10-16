import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Title, Wrapper, Message } from './ForbiddenPage.styles';

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>403</Title>
      <Message>
        У вас нет прав для просмотра этой страницы. Возможно, вы вошли под
        другим пользователем или не авторизованы.
      </Message>
      <Button onClick={() => navigate('/signin')}>Вернуться на главную</Button>
    </Wrapper>
  );
};

export default ForbiddenPage;
