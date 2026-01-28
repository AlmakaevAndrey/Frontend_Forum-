import React, { useState } from 'react';
import * as S from './ArticleWritingPage.styled';
import 'react-quill/dist/quill.snow.css';
import { useToast } from '../../../shared/lib/toast';
import { useAddPostMutation } from '../../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import Editor from '../../../components/Editor/Editor';
import { useTranslation } from 'react-i18next';

export const ArticleWriting: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [excerptHtml, setExcerptHtml] = useState('');
  const [addPost, { isLoading: isLoadingMutation }] = useAddPostMutation();

  const { showInfo, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      showError(t('messages.fillAllFields'));

      return;
    }

    try {
      const newPost = await addPost({ title, excerpt }).unwrap();
      navigate(`/article_read/${newPost._id}`);
    } catch (err) {
      showError(t('messages.notAuthorized'));
    }
  };

  return (
    <S.ArticleWrapper>
      <S.ArticleForm onSubmit={handleSubmit}>
        <S.ArticleEditor>
          <S.Text>{t('articleWriting.createArticle')}</S.Text>
          <S.Input
            value={title}
            type='text'
            placeholder={t('articleWriting.enterTitle')}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
            data-testid='quill-editor'
            value={excerptHtml}
            onChange={(plainText, html) => {
              setExcerpt(plainText);
              setExcerptHtml(html);
            }}
            placeholder={t('articleWriting.enterContent')}
          />
          <S.ToPublishButton type='submit' disabled={isLoadingMutation}>
            {isLoadingMutation
              ? t('articleWriting.saving')
              : t('articleWriting.publish')}
          </S.ToPublishButton>
        </S.ArticleEditor>
      </S.ArticleForm>
    </S.ArticleWrapper>
  );
};

export default ArticleWriting;
