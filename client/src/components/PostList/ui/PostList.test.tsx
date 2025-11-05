import React from 'react';
import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PostList } from './PostList';
import rootReducer from '../../../auth/authSlice';
import { Post } from '../../../components/Post/types';
import * as apiSlice from '../../../api/apiSlice';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

const mockLikePost = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

jest.mock('../../../api/apiSlice', () => ({
  ...jest.requireActual('../../../api/apiSlice'),
  useLikePostMutation: jest.fn(() => [mockLikePost, { isLoading: false }]),
  api: {
    reducerPath: 'api',
    reducer: (state = {}) => state,
    middleware: () => (next: any) => (action: any) => next(action),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const posts: Post[] = [
  {
    _id: '1',
    title: 'Test Post 1',
    excerpt: 'This is the first...',
    author: 'Author 1',
    likes: [{ likes: '10', ref: 'User' }],
    date: '2025-11-01T12:00:00Z',
    comments: [
      {
        userId: '1',
        username: 'John',
        text: 'Nice post!',
        createdAt: '2025-11-01T12:10:00Z',
      },
    ],
  },
  {
    _id: '2',
    title: 'Test Post 2',
    excerpt: 'This is the second...',
    author: 'Author 2',
    likes: [{ likes: '5', ref: 'User' }],
    date: '2025-11-01T14:00:00Z',
    comments: [],
  },
];

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      auth: rootReducer,
      api: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        () => (next: (arg: any) => any) => (action: any) => next(action)
      ),
  });

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme.darkTheme}>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('PostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list of posts', () => {
    renderWithProviders(<PostList posts={posts} />);
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('This is the first...')).toBeInTheDocument();
    expect(screen.getByText('This is the second...')).toBeInTheDocument();
  });

  test('calls likePost when like button is clicked', async () => {
    renderWithProviders(<PostList posts={posts} />);

    const likeButton = screen.getByTestId('like-button-1');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(mockLikePost).toHaveBeenCalled();
    });
  });

  test('navigates when a post is clicked', () => {
    renderWithProviders(<PostList posts={posts} />);
    const postCard = screen.getByText('Test Post 1');
    fireEvent.click(postCard);
    expect(mockNavigate).toHaveBeenCalledWith('/article_read/1');
  });
});
