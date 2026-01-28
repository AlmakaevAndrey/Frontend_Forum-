import React, { useEffect, useState, useTransition } from 'react';
import * as S from './MemeSlider.styled';
import { Meme } from '../Meme/memeTypes';
import MemeArticle from '../../components/Meme/MemeArticle';
import { useAddMemeMutation } from '../../api/apiSlice';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/Loader/Loader';

interface Props {
  memes: Meme[];
}

const MemeSlider: React.FC<Props> = ({ memes }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [addMeme, { isLoading: isAddingMeme }] = useAddMemeMutation();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const uploadHandler = async () => {
    if (!file) return;

    try {
      await addMeme({ file }).unwrap();
      setFile(null);
    } finally {
    }
  };

  const truncateFileName = (name: string, max = 18) => {
    if (name.length <= max) return name;

    const ext = name.split('.').pop();
    const base = name.slice(0, max - (ext?.length || 0) - 3);

    return `${base}...${ext}`;
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? memes.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === memes.length - 1 ? 0 : prev + 1));
  };

  const leftIndex = (index - 1 + memes.length) % memes.length;
  const rightIndex = (index + 1) % memes.length;

  if (!memes.length) return null;

  return (
    <S.Wrapper>
      <S.PrevButton onClick={prev}>◀</S.PrevButton>
      <S.Slider>
        <S.Side src={memes[leftIndex].imgURL} />
        <S.Center>
          <MemeArticle memes={memes[index]} disabled={isAddingMeme} />
        </S.Center>
        <S.Side src={memes[rightIndex].imgURL} />
      </S.Slider>

      <S.NextButton onClick={next}>▶</S.NextButton>
      <S.AddMemeWrapper>
        {preview && <S.Preview src={preview} />}

        <S.HiddenInput
          id='upload'
          type='file'
          accept='image/*'
          onChange={onChange}
        />

        <S.UploadLabel htmlFor='upload'>
          <S.Icon>🖼️</S.Icon>
          {file ? truncateFileName(file.name) : t('common.fileNotSelected')}
        </S.UploadLabel>
        <S.AddMemeButton onClick={uploadHandler} disabled={isAddingMeme}>
          {isAddingMeme ? <Loader /> : t('common.addMeme')}
        </S.AddMemeButton>
      </S.AddMemeWrapper>
    </S.Wrapper>
  );
};

export default MemeSlider;
