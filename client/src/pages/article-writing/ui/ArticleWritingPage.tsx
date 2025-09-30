import { useToast } from '../../../shared/lib/toast';
import { useAddPostMutation } from '../../../api/apiSlice';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ArticleWritingPage.styled';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from '../../../shared/lib/ImageResizeModule';

Quill.register('modules/imageResize', ImageResize);

const ArticleWriting: React.FC = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
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

          <ReactQuill
            theme='snow'
            placeholder='Введите текст статьи'
            value={excerpt}
            onChange={setExcerpt}
            modules={modules}
            // style={{ height: '300px', marginBottom: '2rem' }}
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
