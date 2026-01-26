import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';
import { NavigateFunction } from 'react-router-dom';
import { Comment, Post } from '../components/Post/types';
import { User } from '../components/User1/userTypes';
import { logout } from '../auth/authSlice';

const axiosBaseQuery =
  ({ baseUrl, navigate }: { baseUrl: string; navigate?: NavigateFunction }) =>
  async ({
    url,
    method,
    data,
    headers,
  }: {
    url: string;
    method: string;
    data?: any;
    headers?: Record<string, string>;
  }) => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        withCredentials: true,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const status = axiosError.response?.status;

      if (status === 401) {
        const { store } = await import('./store');
        store.dispatch(logout());
        localStorage.removeItem('token');
        window.location.href = '/signin';
      } else if (status === 403) {
        console.warn('Access denied', axiosError.response?.data);
      }
      return {
        error: {
          status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

// const API_URL = (process.env.REACT_APP_API_URL as string) ?? '/';
const API_URL =
  process.env.REACT_APP_API_URL === '/' || !process.env.REACT_APP_API_URL
    ? ''
    : process.env.REACT_APP_API_URL;

export const ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }), // http://localhost:5000
  tagTypes: ['Posts', 'Auth', 'Comments', 'User'],
  endpoints: (builder) => ({
    register: builder.mutation<
      any,
      { username: string; email: string; password: string }
    >({
      query: (user) => ({
        url: '/auth/register',
        method: 'post',
        data: user,
        withCredentials: true,
      }),
    }),

    login: builder.mutation<any, { email: string; password: string }>({
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

    getPost: builder.query<Post, string>({
      query: (id) => ({ url: `/posts/${id}`, method: 'get' }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'post',
        data: newPost,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      invalidatesTags: ['Posts'],
    }),

    getComments: builder.query<Comment[], string>({
      query: (postId) => ({
        url: `/posts/${postId}/comments`,
        method: 'get',
      }),
      providesTags: (result, error, postId) => [
        { type: 'Comments', id: postId },
      ],
    }),

    addComment: builder.mutation<Comment, { id: string; text: string }>({
      query: ({ id, text }) => ({
        url: `/posts/${id}/comments`,
        method: 'post',
        data: { text },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Comments', id }],
    }),

    likePost: builder.mutation<Post, string>({
      query: (postId) => ({
        url: `/posts/${postId}/like`,
        method: 'patch',
        withCredentials: true,
      }),
      invalidatesTags: ['Posts'],
    }),

    updatePost: builder.mutation<
      any,
      { id: string; data: { title: string; excerpt: string } }
    >({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: 'put',
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      invalidatesTags: ['Posts'],
    }),

    updateUser: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/upload/update',
        method: 'put',
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      providesTags: ['User'],
      transformResponse: (response: any) => {
        return response;
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAddPostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useGetUsersQuery,
  useLikePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdatePostMutation,
  useUpdateUserMutation,
} = ApiSlice;
