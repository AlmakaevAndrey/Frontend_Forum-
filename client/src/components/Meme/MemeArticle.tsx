import React from 'react';
import { Meme } from './memeTypes';
import * as S from './MemeArticle.styles';
import { useTranslation } from 'react-i18next';
import { usePostLikeOnMemeMutation } from '../../api/apiSlice';
import { Loader } from 'lucide-react';

interface memeProps {
  memes: Meme;
  disabled: boolean;
}

export const MemeArticle: React.FC<memeProps> = ({ memes, disabled }) => {
  const [likeMeme] = usePostLikeOnMemeMutation();
  const { t, i18n } = useTranslation();

  const handleLikes = async () => {
    try {
      await likeMeme(memes._id);
    } catch (error) {
      console.error(error);
    }
  };

  if (!memes) return <Loader />;

  const dateFormatted = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(memes?.date || Date.now()));

  return (
    <S.MemeCard>
      <S.MemeImg src={memes.imgURL} alt='meme' />
      {disabled && (
        <S.Overlay>
          <Loader />
        </S.Overlay>
      )}
      <S.Footer>
        <S.SpanItem>
          {memes?.authorAvatar ? (
            <img src={memes.authorAvatar} alt={memes.author} />
          ) : (
            '👨‍💻'
          )}
          {memes.author ?? 'Unknown'}
        </S.SpanItem>
        <S.SpanItem>
          📅
          {dateFormatted}
        </S.SpanItem>
        <S.SpanItem onClick={handleLikes}>
          🩷 {memes.likes?.length ?? 0}
        </S.SpanItem>
      </S.Footer>
    </S.MemeCard>
  );
};

export default MemeArticle;
