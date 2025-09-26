import { RootState } from '../../../api/store';
import { useGetPostQuery, useLikePostMutation } from '../../../api/apiSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../../shared/lib/toast';
import * as S from './ArticleRead.styled';
import MyButton from '../../../components/Button/Button';
import CommentsDiv from '../../../components/Comment/Comment';

const ArticleReadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { data: article, isLoading, error } = useGetPostQuery(id!);
  const [likePost] = useLikePostMutation();

  const hasLiked =
    article?.likes?.some((like) => like.toString() === user?.id) ?? false;

  const { showInfo, showError } = useToast();

  const handleEdit = () => {
    navigate(`/article_edit/${id}`);
  };

  const handleLike = async () => {
    if (!id) return;
    try {
      const updated = await likePost(id).unwrap();
      showInfo(updated.likes ? 'Вы лайкнули!' : 'Вы убрали лайк!');
    } catch (err) {
      if (err?.status === 401) {
        showError('Вы не авторизированы!');
        navigate('/signin');
      } else {
        showError('Ошибка при лайке поста!');
      }
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки статьи</div>;
  }

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  const canEdit = token && (role === 'admin' || user?.id === article.author);

  return (
    <S.ArticleWrapper>
      <S.ArticleDiv>
        <S.Title>{article.title}</S.Title>
        <S.Author>
          By {article.author} | {new Date(article.date).toLocaleDateString()}
        </S.Author>
        <S.Content>{article.excerpt}</S.Content>
        <S.ButtonWrapper>
          <MyButton onClick={handleLike} disabled={!article}>
            {hasLiked ? '❤️' : '💔'}({article.likes?.length ?? 0})
          </MyButton>
          {canEdit && <MyButton onClick={handleEdit}>Edit</MyButton>}
          {/* сделать админку */}
        </S.ButtonWrapper>

        <CommentsDiv postId={article._id} />
      </S.ArticleDiv>
    </S.ArticleWrapper>
  );
};

export default ArticleReadPage;
