import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as S from './FeedPage.styles';
import { PostList } from '../../../components/PostList/ui/PostList';
import { usefulLinks } from '../../../components/Links/usefulLinks';
import { useGetPostsQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { filteredAndSortPosts } from '../../../utils/postUtils';
import { Loader } from 'lucide-react';

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
  const prevState = useRef({ isLoading: false, isError: false });

  useEffect(() => {
    if (isLoading && !prevState.current.isLoading) showInfo('Загрузка');
    if (isError && !prevState.current.isError) showError('Ошибка при загрузке');
    prevState.current = { isLoading, isError };
  }, [isLoading, isError, showInfo, showError]);

  const filteredPosts = useMemo(
    () => filteredAndSortPosts(posts, query, sort),
    [posts, query, sort]
  );

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSort(e.target.value as 'date' | 'likes'),
    []
  );

  return (
    <S.ContentWrapper>
      <S.Section>
        <S.SettingsForArticle>
          <h2>Настройки поиска статей</h2>
          <S.WrapperForArticleDiv>
            <S.InputInArticle
              aria-label='Поиск по статьям'
              type='text'
              placeholder='Поиск...'
              value={query}
              onChange={handleQueryChange}
            />
            <S.SelectInArticle onChange={handleSortChange}>
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
          {isLoading && <Loader />}
          {isError && <p>Ошибка при загрузке постов</p>}
          {!isLoading && !isError && <PostList posts={filteredPosts} />}
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
