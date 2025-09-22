import React, { useEffect, useMemo, useState } from 'react';
import * as S from './FeedPage.styles';
import { PostList } from '../../../components/PostList/ui/PostList';
import { usefulLinks } from '../../../components/Links/usefulLinks';
import { useGetPostsQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';

const categories = {
  docs: '📚 Документация',
  practice: '🛠 Практика',
  courses: '🎓 Курсы',
  community: '📰 Сообщества',
} as const;

const FeedPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'date' | 'likes'>('date');

  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const { showInfo, showError } = useToast();

  useEffect(() => {
    if (isLoading) {
      showInfo('Загрузка');
    } else if (isError) {
      showError('Ошибка при загрузке');
    }
  }, [isLoading, isError, showInfo, showError]);

  const filteredPosts = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    let filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(lowerQuery)
    );

    if (sort === 'date') {
      return [...filtered].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    if (sort === 'likes') {
      return [...filtered].sort((a, b) => b.likes.length - a.likes.length);
    }

    return filtered;
  }, [posts, query, sort]);

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
          <PostList posts={filteredPosts}></PostList>
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
