import React, { useState } from 'react';
import * as S from './ArticleWritingPage.styled';
import 'react-quill/dist/quill.snow.css';
import { useToast } from '../../../shared/lib/toast';
import { useAddPostMutation } from '../../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import Editor from '../../../components/Editor/Editor';

const ArticleWriting: React.FC = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [excerptHtml, setExcerptHtml] = useState('');
  const [addPost, { isLoading: isLoadingMutation }] = useAddPostMutation();

  const { showInfo, showError } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) {
      showError('Заполните все поля!');
      return;
    }

    try {
      const newPost = await addPost({ title, excerpt }).unwrap();
      showInfo('Статья успешно добавлена');
      navigate(`/article_read/${newPost._id}`);
    } catch (err) {
      showError('Вы не авторизированы!');
    }
  };

  return (
    <S.ArticleWrapper>
      <S.ArticleForm onSubmit={handleSubmit}>
        <S.ArticleEditor>
          <S.Text>Создание статьи</S.Text>
          <S.Input
            type='text'
            placeholder='Введите заголовок'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
            value={excerptHtml}
            onChange={(plainText, html) => {
              setExcerpt(plainText);
              setExcerptHtml(html);
            }}
            placeholder='Введите текст статьи'
          />
          <S.ToPublishButton disabled={isLoadingMutation}>
            {isLoadingMutation ? 'Сохраняю...' : 'Опубликовать'}
          </S.ToPublishButton>
        </S.ArticleEditor>
      </S.ArticleForm>
    </S.ArticleWrapper>
  );
};

export default ArticleWriting;
