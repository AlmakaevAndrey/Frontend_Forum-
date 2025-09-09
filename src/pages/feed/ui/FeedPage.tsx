import React, { useEffect, useState } from 'react';
import * as S from './FeedPage.styles';
import { PostList } from '../../../components/PostList/ui/PostList';
import { usefulLinks } from '../../../components/Links/usefulLinks';
import { Post } from 'components/Post/types';

const categories = {
  docs: '📚 Документация',
  practice: '🛠 Практика',
  courses: '🎓 Курсы',
  community: '📰 Сообщества',
} as const;

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'React + TypeScript: быстрый старт',
    excerpt: 'Разбираем основы работы с React и TS...',
    author: 'Alex',
    date: '2025-09-01',
    likes: 2,
  },
  {
    id: '2',
    title: 'Что нового в ES2025?',
    excerpt: 'Новые фичи JavaScript и как их применять...',
    author: 'Maria',
    date: '2025-09-02',
    likes: 9,
  },
];

const FeedPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'date' | 'likes'>('date');
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    let filtered = mockPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === 'date') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sort === 'likes') {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    }

    setPosts(filtered);
  }, [query, sort]);

  return (
    <S.ContentWrapper>
      <S.Section>
        <S.SettingsForArticle>
          <h2>Настройки поиска статей</h2>
          <S.WrapperForArticleDiv>
            <S.InputInArticle
              type='text'
              placeholder='Поиск...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <S.SelectInArticle
              onChange={(e) => setSort(e.target.value as 'date' | 'likes')}
            >
              <S.OptionInArticle value='date'>По дате</S.OptionInArticle>
              <S.OptionInArticle value='likes'>По лайкам</S.OptionInArticle>
            </S.SelectInArticle>
          </S.WrapperForArticleDiv>
        </S.SettingsForArticle>
      </S.Section>
      <S.Section>
        <S.ContainerForArticle>
          <h3>✍ Посты</h3>
          {/* Сделать на MongoDB список постов */}
          <PostList posts={posts}></PostList>
        </S.ContainerForArticle>
      </S.Section>
      <S.Section>
        <S.ContainerForLinks>
          <h4>🔗 Полезные ссылки</h4>
          {/* Сделать топ - 3 и дальше сделать новую страницу! */}
          <S.WrapperGridLinksList>
            {Object.entries(categories).map(([key, label]) => {
              const filtered = usefulLinks
                .filter((l) => l.category === key)
                .slice(0, 3);
              return (
                <S.DividerLinksList key={key}>
                  <h5>{label}</h5>
                  <S.LinksList>
                    {filtered.map((link) => {
                      const Icon = link.icon;
                      return (
                        <S.LinkItem key={link.url}>
                          <S.LinkAnchor
                            href={link.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Icon size={18} />
                            {link.title}
                          </S.LinkAnchor>
                        </S.LinkItem>
                      );
                    })}
                  </S.LinksList>
                </S.DividerLinksList>
              );
            })}
            {/* Еще подумать где сделать блок с мемами(может сбоку) */}
          </S.WrapperGridLinksList>
        </S.ContainerForLinks>
      </S.Section>
    </S.ContentWrapper>
  );
};

export default FeedPage;
