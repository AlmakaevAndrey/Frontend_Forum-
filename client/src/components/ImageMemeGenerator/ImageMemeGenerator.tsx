import React, { useState } from 'react';
import * as S from './ImageMemeGenerator.styled';
import Loader from '../../components/Loader/Loader';
import {
  useGenerateImageMemeMutation,
  useAddMemeMutation,
} from '../../api/apiSlice';
import { t } from 'i18next';

type HumorLevel = 'easy' | 'medium' | 'hard';

const MemeGeneratorSlider: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<HumorLevel>('easy');
  const [preview, setPreview] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [generateMeme, { isLoading: isGenerating }] =
    useGenerateImageMemeMutation();
  const [addMeme, { isLoading: isAdding }] = useAddMemeMutation();

  const generateHandler = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setError(null);

    try {
      const result = await generateMeme({ topic, difficulty: level }).unwrap();
      setPreview(result.image);
      setTopText(result.top);
      setBottomText(result.bottom);
    } catch (err: any) {
      console.error(err);
      setError('Failed to generate meme');
    }
  };

  const addHandler = async () => {
    if (!preview) return;

    try {
      const blob = await fetch(preview).then((res) => res.blob());
      const file = new File([blob], 'meme.png', { type: 'image/png' });
      await addMeme({ file }).unwrap();
      setPreview(null);
      setTopText('');
      setBottomText('');
      setTopic('');
    } catch (err: any) {
      console.error(err);
      setError('Failed to add meme');
    }
  };

  return (
    <S.Wrapper>
      <S.Title>{t('common.memeGenerated')}</S.Title>
      <S.Input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={t('common.enterMemeTopic')}
        disabled={isGenerating || isAdding}
      />

      <S.Difficulty>
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <S.DifficultyButton
            key={d}
            onClick={() => setLevel(d)}
            className={level === d ? 'active' : ''}
            disabled={isGenerating || isAdding}
          >
            {d === 'easy' && '🟢 Easy'}
            {d === 'medium' && '🟡 Medium'}
            {d === 'hard' && '🔴 Hard'}
          </S.DifficultyButton>
        ))}
      </S.Difficulty>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <S.AddMemeButton
        onClick={generateHandler}
        disabled={!topic.trim() || isGenerating || isAdding}
      >
        {isGenerating ? <Loader /> : t('common.generateMeme')}
      </S.AddMemeButton>

      {preview && (
        <S.AddMemeWrapper>
          <img
            src={preview}
            style={{ maxWidth: '100%' }}
            alt='Generated meme'
          />

          <S.ButtonGroup>
            <S.AddMemeButton onClick={addHandler} disabled={isAdding}>
              {isAdding ? <Loader /> : t('common.saveMeme')}
            </S.AddMemeButton>
            <S.CancelButton onClick={() => setPreview(null)}>
              {t('buttons.cancel')}
            </S.CancelButton>
          </S.ButtonGroup>
        </S.AddMemeWrapper>
      )}
    </S.Wrapper>
  );
};

export default MemeGeneratorSlider;
