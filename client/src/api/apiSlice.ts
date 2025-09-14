import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { Post } from '../components/Post/types';

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, data }: {url: string; method: string; data?: any}) => {
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
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    
    getPosts: builder.query<Post[], void>({
      query: () => ({ url: '/posts', method: 'get' }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Posts'],
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'post',
        data: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),


    likePost: builder.mutation<Post, string>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: 'patch',
      }),
      invalidatesTags: ['Posts'],
    })
  }),
});

export const { useAddPostMutation, useGetPostsQuery, useLikePostMutation } = ApiSlice;
