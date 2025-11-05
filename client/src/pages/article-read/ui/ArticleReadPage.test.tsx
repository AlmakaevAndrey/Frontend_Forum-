import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import ArticleReadPage from './ArticleReadPage';
import authReducer from '../../../auth/authSlice';
import * as api from '../../../api/apiSlice';
import { useGetPostQuery } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

jest.mock('../../../components/Button/Button', () => {
  return ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  );
});

jest.mock('../../../api/apiSlice', () => ({
  useGetPostQuery: jest.fn(),
  useLikePostMutation: jest.fn(),
  useAddCommentMutation: jest.fn(),
  useGetCommentsQuery: jest.fn(),
}));

jest.mock('../../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: 'en' } }),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: { token: 'abc', role: 'user', user: { id: 'u1' } },
    },
  });

describe('ArticleReadPage', () => {
  const mockNavigate = jest.fn();
  const mockShowInfo = jest.fn();
  const mockShowError = jest.fn();

  const mockLikePost = jest.fn().mockReturnValue({ unwrap: jest.fn() });
  const mockAddComment = jest.fn().mockReturnValue({ unwrap: jest.fn() });

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({
      showInfo: mockShowInfo,
      showError: mockShowError,
    });
    (useParams as jest.Mock).mockReturnValue({ id: '123' });

    (api.useLikePostMutation as jest.Mock).mockReturnValue([
      mockLikePost,
      { isLoading: false, reset: jest.fn() },
    ]);

    (api.useAddCommentMutation as jest.Mock).mockReturnValue([
      mockAddComment,
      { isLoading: false, reset: jest.fn() },
    ]);

    (api.useGetCommentsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
  });

  it('renders loading state', () => {
    (useGetPostQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <ThemeProvider theme={theme.lightTheme}>
            <ArticleReadPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('common.loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetPostQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <ThemeProvider theme={theme.lightTheme}>
            <ArticleReadPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('common.fetchError')).toBeInTheDocument();
  });

  it('renders not found when article is null', () => {
    (useGetPostQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <ThemeProvider theme={theme.lightTheme}>
            <ArticleReadPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('articleEdit.notFound')).toBeInTheDocument();
  });

  it('renders article content and like button', () => {
    (useGetPostQuery as jest.Mock).mockReturnValue({
      data: {
        _id: '123',
        title: 'Test Title',
        excerpt: 'Test content',
        author: 'u1',
        date: new Date().toISOString(),
        likes: [],
      },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <ThemeProvider theme={theme.lightTheme}>
            <ArticleReadPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByTestId('like-button')).toBeInTheDocument();
  });

  it('calls likePost when like button is clicked', async () => {
    const mockLike = jest
      .fn()
      .mockReturnValue({ unwrap: () => Promise.resolve({ likes: true }) });

    (useGetPostQuery as jest.Mock).mockReturnValue({
      data: {
        _id: '123',
        title: 'Test Title',
        excerpt: 'Test content',
        author: 'u1',
        date: new Date().toISOString(),
        likes: [],
      },
      isLoading: false,
      error: null,
    });

    (api.useLikePostMutation as jest.Mock).mockReturnValue([
      mockLike,
      { isLoading: false, reset: jest.fn() },
    ]);

    render(
      <Provider store={createTestStore()}>
        <BrowserRouter>
          <ThemeProvider theme={theme.lightTheme}>
            <ArticleReadPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('like-button'));

    await waitFor(() => {
      expect(mockLike).toHaveBeenCalledWith('123');
      expect(mockShowInfo).toHaveBeenCalledWith('messages.likeAdded');
    });
  });
});
