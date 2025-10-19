import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResizeModule from '../../shared/lib/ImageResizeModule';
import 'react-quill/dist/quill.snow.css';
import * as S from './Editor.styled';
import DOMPurify from 'dompurify';

Quill.register('modules/imageResize', ImageResizeModule);

interface EditProps {
  value: string;
  onChange: (plainText: string, html: string) => void;
  placeholder?: string;
}

const Editor: React.FC<EditProps> = ({ value, onChange, placeholder }) => {
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

  const handleChange = (newHtml: string) => {
    const sanitizedHtml = DOMPurify.sanitize(newHtml);
    const temp = document.createElement('div');
    temp.innerHTML = sanitizedHtml;
    const plainText = temp.textContent || temp.innerText || '';
    onChange(plainText.trim(), sanitizedHtml);
  };
  // Сделать добавки и отрисовку картинок

  return (
    <>
      <S.ArticleForm>
        <ReactQuill
          theme='snow'
          placeholder={placeholder || 'Введите текст статьи'}
          value={value}
          onChange={handleChange}
          modules={modules}
        />
      </S.ArticleForm>
    </>
  );
};

export default Editor;
