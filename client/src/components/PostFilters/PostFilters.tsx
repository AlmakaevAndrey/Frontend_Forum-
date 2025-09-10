import React from 'react';
import { useFormAction } from 'react-router-dom';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('query')} placeholder='Поиск постов' />
        {errors.query && <span>{errors.query.message}</span>}
      </div>
      <select {...register('sort')}>
        <option value='date'>По дате</option>
        <option value='likes'>По лайкам</option>
      </select>

      <button type='submit'>Найти</button>
    </form>
  );
};
