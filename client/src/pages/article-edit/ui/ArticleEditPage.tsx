import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../../shared/lib/toast';
import { useGetPostsQuery, useUpdatePostMutation } from '../../../api/apiSlice';
import { RootState } from '../../../api/store';
import { Post } from '../../../components/Post/types';
import * as S from './ArticleEditPage.styled';
import Editor from '../../../components/Editor/Editor';
import ForbiddenPage from '../../../pages/ForbiddenPage/ui/ForbiddenPage';

const ArticleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token, role, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [updatedPost] = useUpdatePostMutation();
  const { showInfo, showError } = useToast();

  const [article, setArticle] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [excerptHTML, setExcerptHtml] = useState('');

  useEffect(() => {
    if (posts && id) {
      const found = posts.find((p) => p._id === id);

      if (found) {
        setArticle(found);
        setTitle(found.title);
        setExcerpt(found.excerpt);
      }
    }
  }, [posts, id]);

  const handleSave = async () => {
    if (!id) return;
    try {
      const updated = await updatedPost({
        id,
        data: { title, excerpt },
      }).unwrap();

      showInfo('Статья успешно обновлена!');
      navigate(`/article_read/${id}`);
    } catch (err) {
      if (err?.status === 401) {
        showError('Вы не авторизированы!');
        navigate('/signin');
      } else {
        showError('Ошибка при обновслении статьи!');
      }
    }
  };

  const handleCancel = () => {
    navigate(`/article_read/${id}`);
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
  if (!canEdit) return <ForbiddenPage />;

  return (
    <S.EditWrapper>
      <S.EditForm>
        <S.Title>Редактирование статьи</S.Title>

        <S.Label>Заголовок</S.Label>
        <S.Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <S.Label>Текст</S.Label>

        <Editor
          value={excerptHTML}
          onChange={(plainText, html) => {
            setExcerpt(plainText);
            setExcerptHtml(html);
          }}
        />

        <S.ButtonWrapper>
          <S.MyButton onClick={handleCancel}>Отмена</S.MyButton>
          <S.MyButton onClick={handleSave}>Сохранить</S.MyButton>
        </S.ButtonWrapper>
      </S.EditForm>
    </S.EditWrapper>
  );
};

export default ArticleEditPage;
