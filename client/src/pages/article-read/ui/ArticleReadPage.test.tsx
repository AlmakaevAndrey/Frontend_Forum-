import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ArticleReadPage from './ArticleReadPage';
import {
  useGetPostQuery,
  useLikePostMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
} from '../../../api/apiSlice';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../../shared/lib/toast';
import theme from '../../../styles/theme';

jest.mock('../../../api/apiSlice', () => ({
  useGetPostQuery: jest.fn(),
  useLikePostMutation: jest.fn(),
  useGetCommentsQuery: jest.fn(),
  useAddCommentMutation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ id: '123' })),
}));

jest.mock('../../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));

describe('ArticleReadPage', () => {
  const mockNavigate = jest.fn();
  const mockShowInfo = jest.fn();
  const mockShowError = jest.fn();
  const mockLikePost = jest.fn().mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({}),
  });
  const mockAddComment = jest.fn().mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({}),
  });

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({
      showInfo: mockShowInfo,
      showError: mockShowError,
    });

    (useLikePostMutation as jest.Mock).mockReturnValue([mockLikePost]);
    (useGetPostQuery as jest.Mock).mockReturnValue({
      data: {
        _id: '123',
        title: 'Test Title',
        excerpt: 'Test content',
        author: 'u1',
        likes: [],
        date: new Date().toISOString(),
      },
      isLoading: false,
      error: null,
    });
    (useGetCommentsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    (useAddCommentMutation as jest.Mock).mockReturnValue([
      mockAddComment,
      { isLoading: false },
    ]);

    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: 'token',
      role: 'user',
      user: { id: 'u1' },
    });
  });

  it('renders article content and like button', async () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <ArticleReadPage />
      </ThemeProvider>
    );

    const likeButton = await screen.findByTestId('like-button');

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
  });

  it('calls likePost when clicking like button', async () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <ArticleReadPage />
      </ThemeProvider>
    );

    const likeButton = await screen.findByTestId('like-button');
    fireEvent.click(likeButton);

    expect(mockLikePost).toHaveBeenCalledWith('123');
  });

  it('shows error when no token', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      token: null,
      role: '',
      user: { id: 'u1' },
    });

    render(
      <ThemeProvider theme={theme.darkTheme}>
        <ArticleReadPage />
      </ThemeProvider>
    );

    const likeButton = await screen.findByTestId('like-button');
    fireEvent.click(likeButton);

    expect(mockShowError).toHaveBeenCalledWith('messages.likeGuestError');
  });
});
