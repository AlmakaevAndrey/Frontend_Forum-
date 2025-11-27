import { RootState } from '../../../api/store';
import { useGetPostQuery, useLikePostMutation } from '../../../api/apiSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../../shared/lib/toast';
import * as S from './ArticleRead.styled';
import MyButton from '../../../components/Button/Button';
import CommentsDiv from '../../../components/Comment/Comment';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { formatText } from '../../../utils/formatText';

const ArticleReadPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { showError } = useToast();

  const {
    data: article,
    isLoading,
    error,
  } = useGetPostQuery(id!, {
    skip: !id,
  });

  const [likePost] = useLikePostMutation();

  const hasLiked =
    article?.likes?.some((like) => like.toString() === user?.id) ?? false;

  const handleEdit = () => {
    navigate(`/article_edit/${id}`);
  };

  const dateFormatted = article
    ? new Intl.DateTimeFormat(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(article.date))
    : '';

  const handleLike = async () => {
    if (!token) {
      showError(t('messages.likeGuestError'));
      return;
    }
    if (!id) return;

    try {
      const updated = await likePost(id).unwrap();
    } catch (err) {
      if (err?.status === 401) {
        showError(t('messages.notAuthorized'));
        navigate('/signin');
      } else {
        showError(t('messages.likeFailed'));
      }
    }
  };

  if (isLoading) return <div>{t('common.loading')}...</div>;
  if (error) return <div>{t('common.fetchError')}</div>;
  if (!article) return <div>{t('articleEdit.notFound')}</div>;

  const canEdit = token && (role === 'admin' || user?.id === article.author);

  return (
    <S.ArticleWrapper>
      <S.ArticleDiv>
        <S.Title>{article.title}</S.Title>
        <S.Author>
          {t('articleRead.by')} {article.author ?? 'Unknown'} | {dateFormatted}
        </S.Author>
        <S.Content
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(formatText(article.excerpt)),
          }}
        ></S.Content>
        <S.ButtonWrapper>
          <MyButton
            onClick={handleLike}
            aria-label={
              hasLiked ? t('articleRead.unlike') : t('articleRead.like')
            }
            data-testid='like-button'
            disabled={!article}
          >
            {hasLiked ? '❤️' : '🤍'}({article.likes?.length ?? 0})
          </MyButton>
          {canEdit && (
            <MyButton onClick={handleEdit}>{t('buttons.edit')}</MyButton>
          )}
          {/* сделать админку */}
        </S.ButtonWrapper>

        <CommentsDiv postId={article._id} />
      </S.ArticleDiv>
    </S.ArticleWrapper>
  );
};

export default ArticleReadPage;
