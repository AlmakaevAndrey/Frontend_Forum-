import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { Comment, Post } from '../components/Post/types';

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
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

    updateUser: builder.mutation<any, { username?: string; avatar?: string }>({
      query: (data) => ({
        url: '/auth/update',
        method: 'put',
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    uploadAvatar: builder.mutation<
      { avatar: string; message: string },
      FormData
    >({
      query: (formData) => ({
        url: '/upload/avatar',
        method: 'post',
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    // Доделать после а то не работает загрузка аватара в профиль

    updateUserPost: builder.mutation<
      any,
      { username?: string; avatar?: string }
    >({
      query: (data) => ({
        url: '/auth/update',
        method: 'put',
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAddPostMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useLikePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdatePostMutation,
  useUploadAvatarMutation,
  useUpdateUserPostMutation,
} = ApiSlice;
