import React, { useState } from 'react';
import * as S from './MemeGenerate.styled';
import {
  useGeneratePostMutation,
  useAddPostMutation,
} from '../../api/apiSlice';
import Loader from '../../components/Loader/Loader';
import { t } from 'i18next';

const MemeGenerate: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy'
  );
  const [error, setError] = useState<string | null>(null);

  const [preview, setPreview] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [generatePost, { isLoading }] = useGeneratePostMutation();
  const [addPost, { isLoading: isSaving }] = useAddPostMutation();

  const generateHandler = async () => {
    setError(null);

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    try {
      const result = await generatePost({ topic, difficulty }).unwrap();

      const text: string = result.content;

      const titleMatch = text.match(/Title:(.*)/i);
      const contentMatch = text.match(/Content:([\s\S]*)/i);

      const title = titleMatch?.[1]?.trim() || topic;
      const content = contentMatch?.[1]?.trim() || text;

      setPreview({
        title,
        content,
      });
    } catch (e: any) {
      console.error('Generation error:', e);
      setError(
        e?.data?.message || 'Failed to generate post. Please try again.'
      );
    }
  };

  const saveHandler = async () => {
    if (!preview) return;

    try {
      await addPost({
        title: preview.title,
        excerpt: preview.content,
      }).unwrap();

      setPreview(null);
      setTopic('');
      setError(null);
    } catch (e: any) {
      setError('Failed to save post');
    }
  };

  const cancelHandler = () => {
    setPreview(null);
    setError(null);
  };

  return (
    <S.Wrapper>
      <S.Title>{t('common.postGenerated')}</S.Title>

      <S.Input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={t('common.enterMemeTopic')}
        disabled={isLoading || isSaving}
      />

      <S.Difficulty>
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <S.DifficultyButton
            key={d}
            onClick={() => setDifficulty(d)}
            className={difficulty === d ? 'active' : ''}
            disabled={isLoading || isSaving}
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
        disabled={!topic.trim() || isLoading || isSaving}
      >
        {isLoading ? <Loader /> : t('common.generateMeme')}
      </S.AddMemeButton>

      {preview && (
        <S.Preview>
          <h2>{preview.title}</h2>
          <p>{preview.content}</p>

          <S.ButtonGroup>
            <S.AddMemeButton onClick={saveHandler} disabled={isSaving}>
              {isSaving ? <Loader /> : t('common.saveMeme')}
            </S.AddMemeButton>

            <S.CancelButton onClick={cancelHandler} disabled={isSaving}>
              {t('buttons.cancel')}
            </S.CancelButton>
          </S.ButtonGroup>
        </S.Preview>
      )}
    </S.Wrapper>
  );
};

export default MemeGenerate;
