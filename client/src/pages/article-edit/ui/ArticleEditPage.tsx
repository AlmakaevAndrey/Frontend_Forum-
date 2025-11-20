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
import { useTranslation } from 'react-i18next';

const ArticleEditPage: React.FC = () => {
  const { t } = useTranslation();
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

      navigate(`/article_read/${id}`);
    } catch (err) {
      if (err?.status === 401) {
        showError(t('articleEdit.notAuthorized'));

        navigate('/signin');
      } else {
        showError(t('articleEdit.updateError'));
      }
    }
  };

  const handleCancel = () => {
    navigate(`/article_read/${id}`);
  };

  if (isLoading) return <div>{t('common.loading')}...</div>;
  if (error) return <div>{t('common.fetchError')}</div>;
  if (!article) return <div>{t('articleEdit.notFound')}</div>;

  const canEdit = token && (role === 'admin' || user?.id === article.author);
  if (!canEdit) return <ForbiddenPage />;

  return (
    <S.EditWrapper>
      <S.EditForm>
        <S.Title>{t('articleEdit.pageTitle')}</S.Title>

        <S.Label>{t('articleEdit.title')}</S.Label>
        <S.Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <S.Label>{t('articleEdit.text')}</S.Label>

        <Editor
          value={excerptHTML}
          onChange={(plainText, html) => {
            setExcerpt(plainText);
            setExcerptHtml(html);
          }}
        />

        <S.ButtonWrapper>
          <S.MyButton onClick={handleCancel}>{t('buttons.cancel')}</S.MyButton>
          <S.MyButton onClick={handleSave}>{t('buttons.save')}</S.MyButton>
        </S.ButtonWrapper>
      </S.EditForm>
    </S.EditWrapper>
  );
};

export default ArticleEditPage;
