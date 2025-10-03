import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as S from './PostFilters.styled';

type SortOption = 'date' | 'likes';

const searchSchemas = z.object({
  query: z.string().min(2, 'Минимум 2 символа'),
  sort: z.enum(['date', 'likes']),
});

type SearchForm = z.infer<typeof searchSchemas>;

export const PostFilters: React.FC<{
  onChange: (values: SearchForm) => void;
}> = ({ onChange }) => {
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
        <S.Input {...register('query')} placeholder='Поиск постов' />
        {errors.query && <span>{errors.query.message}</span>}
      </S.FormGroup>
      <S.Select {...register('sort')}>
        <option value='date'>По дате</option>
        <option value='likes'>По лайкам</option>
      </S.Select>

      <button type='submit'>Найти</button>
    </S.SearchForm>
  );
};
