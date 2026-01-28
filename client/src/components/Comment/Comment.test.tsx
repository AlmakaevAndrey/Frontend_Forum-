import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

import { useAddCommentMutation, useGetCommentsQuery } from '../../api/apiSlice';
import { useToast } from '../../shared/lib/toast';

import CommentsDiv from './Comment';

jest.mock('../../api/apiSlice');
jest.mock('../../shared/lib/toast');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
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

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Nice post!')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    (useGetCommentsQuery as jest.Mock).mockReturnValueOnce({
      data: [],
      isLoading: true,
    });

    renderWithProviders(<CommentsDiv postId='1' />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('calls showError when not logged in', async () => {
    renderWithProviders(<CommentsDiv postId='1' />, null);

    const input = screen.getByPlaceholderText(/writeComment/i);
    fireEvent.change(input, { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByText(/add/i));

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        'comments.guestsCannotComment'
      );
    });
  });
  test('adds comment successfully', async () => {
    mockAddComment.mockReturnValue({ unwrap: () => Promise.resolve({}) });

    renderWithProviders(<CommentsDiv postId='1' />);

    const input = screen.getByPlaceholderText(/writeComment/i);
    fireEvent.change(input, { target: { value: 'New comment' } });
    fireEvent.click(screen.getByText(/add/i));

    await waitFor(() => {
      expect(mockAddComment).toHaveBeenCalledWith({
        id: '1',
        text: 'New comment',
      });
      expect(input).toHaveValue('');
    });
  });
});
