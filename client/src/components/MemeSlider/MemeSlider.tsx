import React, { useState } from 'react';
import * as S from './MemeSlider.styled';
import { Meme } from '../Meme/memeTypes';
import { t } from 'i18next';
import MemeArticle from '../../components/Meme/MemeArticle';

interface Props {
  memes: Meme[];
}

const MemeSlider: React.FC<Props> = ({ memes }) => {
  const [index, setIndex] = useState(0);

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
          <MemeArticle memes={memes[index]} />
        </S.Center>
        <S.Side src={memes[rightIndex].imgURL} />
      </S.Slider>

      <S.NextButton onClick={next}>▶</S.NextButton>
    </S.Wrapper>
  );
};

export default MemeSlider;
