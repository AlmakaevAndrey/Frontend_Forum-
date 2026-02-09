import React, {
  HtmlHTMLAttributes,
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
import { useGetMemesQuery, useGetPostsQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { filteredAndSortPosts } from '../../../utils/postUtils';
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MemeSlider from '../../../components/MemeSlider/MemeSlider';

const categories: readonly string[] = [
  'docs',
  'practice',
  'courses',
  'community',
] as const;

const FeedPage: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'date' | 'likes'>('date');

  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const { data: memes = [] } = useGetMemesQuery();
  const { showInfo, showError } = useToast();
  const prevState = useRef({ isLoading: false, isError: false });

  useEffect(() => {
    if (isLoading && !prevState.current.isLoading)
      if (isError && !prevState.current.isError)
        showError(t('common.fetchError'));
    prevState.current = { isLoading, isError };
  }, [isLoading, isError, showInfo, showError, t]);

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
          <S.Title>{t('feed.settingsTitle')}</S.Title>
          <S.WrapperForArticleDiv>
            <S.InputWrapper>
              <S.InputInArticle
                aria-label={t('post.searchSetting')}
                type='text'
                placeholder={t('common.searchPlaceholder')}
                value={query}
                onChange={handleQueryChange}
              />

              {query && (
                <S.ClearButton
                  type='button'
                  onClick={() =>
                    handleQueryChange({
                      target: { value: '' },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  ❌
                </S.ClearButton>
              )}
            </S.InputWrapper>
            <S.SelectInArticle onChange={handleSortChange}>
              <S.OptionInArticle value='date'>
                {t('post.sortByDate')}
              </S.OptionInArticle>
              <S.OptionInArticle value='likes'>
                {t('post.sortByLikes')}
              </S.OptionInArticle>
            </S.SelectInArticle>
          </S.WrapperForArticleDiv>
        </S.SettingsForArticle>
      </S.Section>
      <S.Section>
        <S.ContainerForArticle>
          <S.Title>✍ {t('post.posts')}</S.Title>
          {isLoading && <Loader data-testid='loader-svg' />}
          {isError && <p>{t('post.errorLoadingPosts')}</p>}
          {!isLoading && !isError && <PostList posts={filteredPosts} />}
        </S.ContainerForArticle>
      </S.Section>
      <S.Section>
        <S.SettingsForArticle>
          <S.Title>😂 {t('common.memes')}</S.Title>
          <MemeSlider memes={memes} />
        </S.SettingsForArticle>
      </S.Section>
      <S.Section>
        <S.ContainerForLinks>
          <S.Title>🔗 {t('post.usefulLinks')}</S.Title>
          {/* Сделать топ - 3 и дальше сделать новую страницу! */}
          <S.WrapperGridLinksList>
            {categories.map((key) => {
              const filtered = usefulLinks
                .filter((l) => l.category === key)
                .slice(0, 3);
              return (
                <S.DividerLinksList key={key}>
                  <S.LinksTitle>{t(`categories.${key}`)}</S.LinksTitle>
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
          </S.WrapperGridLinksList>
        </S.ContainerForLinks>
      </S.Section>
    </S.ContentWrapper>
  );
};

export default FeedPage;
