import React from 'react';
import * as S from './FeedPage.styles';
import { PostList } from '../../../components/PostList/ui/PostList';

const mockPosts = [
  {
    id: '1',
    title: 'React + TypeScript: быстрый старт',
    excerpt: 'Разбираем основы работы с React и TS...',
    author: 'Alex',
    date: '2025-09-01',
  },
  {
    id: '2',
    title: 'Что нового в ES2025?',
    excerpt: 'Новые фичи JavaScript и как их применять...',
    author: 'Maria',
    date: '2025-09-02',
  },
];

const FeedPage: React.FC = () => {
  return (
    <S.ContentWrapper>
      <S.Section>
        <S.Title>Frontend Forum</S.Title>
        <S.Subtitle>This Forum from developer for developers!</S.Subtitle>
      </S.Section>
      <S.Section>
        <S.SettingsForArticle>
          <h2>Настройки поиска статей</h2>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            voluptates ducimus nesciunt sapiente
          </div>
        </S.SettingsForArticle>
      </S.Section>
      <S.Section>
        <S.ContainerForArticle>
          <h3>Посты</h3>
          <PostList posts={mockPosts}>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum natus fugit provident, laborum enim, quibusdam
              cupiditate quaerat, ea placeat illum
            </h2>
          </PostList>
        </S.ContainerForArticle>
      </S.Section>
      <S.Section>
        <S.ContainerForLinks>
          <h4>Полезные ссылки</h4>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem,
          omnis.
        </S.ContainerForLinks>
      </S.Section>
    </S.ContentWrapper>
  );
};

export default FeedPage;
