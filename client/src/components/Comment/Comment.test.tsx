import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useToast } from '../../shared/lib/toast';
import { useAddCommentMutation, useGetCommentsQuery } from '../../api/apiSlice';
import CommentsDiv from './Comment';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import theme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

jest.mock('../../api/apiSlice.ts');
jest.mock('../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      switch (key) {
        case 'comments.commentsCount':
          return `Comments (${options?.count ?? 0})`;
        case 'comments.writeComment':
          return 'Write a comment';
        case 'comments.add':
          return 'Add';
        case 'comments.guestsCannotComment':
          return 'Guests cannot comment';
        case 'comments.commentAdded':
          return 'Comment added';
        case 'comments.loading':
          return 'Loading...';
        default:
          return key;
      }
    },
  }),
}));

const mockStore = (authToken: string | null = 'mockToken') =>
  configureStore({
    preloadedState: { auth: { token: authToken } },
    reducer: (state) => state,
  });

const renderWithProviders = (
  ui: React.ReactElement,
  authToken: string | null = 'mockToken'
) => {
  const store = mockStore(authToken);
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme.lightTheme}>{ui}</ThemeProvider>
    </Provider>
  );
};

describe('CommentsDiv', () => {
  const mockAddComment = jest.fn();
  const mockShowInfo = jest.fn();
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetCommentsQuery as jest.Mock).mockReturnValue({
      data: [
        {
          username: 'John',
          text: 'Nice post!',
          createdAt: '2025-10-30T12:00:00Z',
          userId: '1',
        },
      ],
      isLoading: false,
    });

    (useAddCommentMutation as jest.Mock).mockReturnValue([
      mockAddComment,
      { isLoading: false },
    ]);

    (useToast as jest.Mock).mockReturnValue({
      showInfo: mockShowInfo,
      showError: mockShowError,
    });
  });

  test('renders comments', () => {
    renderWithProviders(<CommentsDiv postId='1' />);

    const heading = screen.getByRole('heading', { level: 2 });
    const normalized = heading.textContent?.replace(/\s+/g, '');

    expect(normalized).toContain(`Comments(1)`);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Nice post!')).toBeInTheDocument();
  });

  test('shows "Loading..." when loading', () => {
    (useGetCommentsQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      isLoading: true,
    });

    renderWithProviders(<CommentsDiv postId='1' />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('calls showError when not logged in', async () => {
    renderWithProviders(<CommentsDiv postId='1' />, null);

    const input = screen.getByPlaceholderText('Write a comment');
    fireEvent.change(input, { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith('Guests cannot comment');
    });
  });

  test('adds comment successfully', async () => {
    mockAddComment.mockReturnValueOnce({ unwrap: () => Promise.resolve({}) });

    renderWithProviders(<CommentsDiv postId='1' />);

    const input = screen.getByPlaceholderText('Write a comment');
    fireEvent.change(input, { target: { value: 'New comment' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(mockAddComment).toHaveBeenCalled();
      expect(mockShowInfo).toHaveBeenCalledWith('Comment added');
    });
  });
});
