import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { Post } from '../components/Post/types';
import { email } from 'zod';

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, data }: {url: string; method: string; data?: any}) => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios({ url: baseUrl + url, method, data, headers: token ? { Authorization: `Bearer ${token}`} : {}, });
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
  tagTypes: ['Posts', 'Auth'],
  endpoints: (builder) => ({

    register:builder.mutation<any, {username: string; email: string, password: string}>({
        query: (user) => ({
          url: '/auth/register',
          method: 'post',
          data: user,
          withCredentials: true,

    })
    }),

    login: builder.mutation<any, {email: string; password: string}>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'post',
        data: credentials,
        withCredentials: true,
      }),
    }),
    
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

export const { useRegisterMutation, useLoginMutation, useAddPostMutation, useGetPostsQuery, useLikePostMutation } = ApiSlice;
