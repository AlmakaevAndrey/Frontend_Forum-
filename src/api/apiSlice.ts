import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { Post } from 'components/Post/types';

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, data }: any) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPost: builder.query<Post[], void>({
      query: () => ({ url: '/posts', method: 'get' }),
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation<Post, string>({
      query: (postId) => ({
        url: '/posts',
        method: 'PATCH',
        data: { increment: true }, //Нужно через бекен увеличивать лайки
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useAddPostMutation } = ApiSlice;
