import { RootState } from '../../../api/store';
import { useGetPostsQuery, useLikePostMutation } from '../../../api/apiSlice';
import React, { useEffect, useState } from 'react';
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

  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [likePost] = useLikePostMutation();
  const [article, setArticle] = useState<any>(null);
  const hasLiked = article?.likes?.includes?.(user?.id) ?? false;

  const { showInfo, showError } = useToast();

  useEffect(() => {
    if (isLoading) {
      showInfo('Loading article...');
    }
  }, [isLoading]);

  useEffect(() => {
    if (posts && id) {
      const found = posts.find((p) => p._id === id);
      setArticle(found);

      if (found) {
        showInfo('Article found!');
      }
    }
  }, [posts, id]);

  const handleEdit = () => {
    navigate(`/article_edit/${id}`);
  };

  const handleLike = async () => {
    if (!id) return;
    try {
      const updated = await likePost(id).unwrap();

      setArticle((prev: any) => ({
        ...prev,
        likes: updated.likes,
      }));

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

  const canEdit = token && (role === 'admin' || user?.id === article.authorId);

  return (
    <S.ArticleWrapper>
      <S.ArticleDiv>
        <S.Title>{article.title}</S.Title>
        <S.Author>
          By {article.author} | {new Date(article.date).toLocaleDateString()}
        </S.Author>
        <S.Content>{article.excerpt}</S.Content>
        <MyButton onClick={handleLike}>
          {hasLiked ? '❤️' : '💔'}({article.likes.length})
        </MyButton>

        {canEdit && <MyButton onClick={handleEdit}>Edit</MyButton>}

        <CommentsDiv postId={article._id} />
      </S.ArticleDiv>
    </S.ArticleWrapper>
  );
};

export default ArticleReadPage;
