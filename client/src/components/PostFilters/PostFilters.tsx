import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as S from './PostFilters.styled';
import { useTranslation } from 'react-i18next';

const searchSchemas = z.object({
  query: z.string().min(2, 'Минимум 2 символа'),
  sort: z.enum(['date', 'likes']),
});

type SearchForm = z.infer<typeof searchSchemas>;

export const PostFilters: React.FC<{
  onChange: (values: SearchForm) => void;
}> = ({ onChange }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchemas),
    defaultValues: { query: '', sort: 'date' },
  });

  const onSubmit = (values: SearchForm) => {
    onChange(values);
  };

  return (
    <S.SearchForm onSubmit={handleSubmit(onSubmit)}>
      <S.FormGroup>
        <S.Input
          {...register('query')}
          placeholder={t('postFilters.inputPlaceholder')}
        />
        {errors.query && <span>{errors.query.message}</span>}
      </S.FormGroup>
      <S.Select {...register('sort')}>
        <option value='date'>{t('postFilters.optionDate')}</option>
        <option value='likes'>{t('postFilters.optionLikes')}</option>
      </S.Select>

      <button type='submit'>{t('postFilters.buttonSubmit')}</button>
    </S.SearchForm>
  );
};
