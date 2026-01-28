import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedPage from './FeedPage';
import {
  useAddMemeMutation,
  useGetMemesQuery,
  useGetPostsQuery,
} from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import { Post } from '../../../components/Post/types';

jest.mock('../../../api/apiSlice', () => ({
  useGetPostsQuery: jest.fn(),
  useGetMemesQuery: jest.fn(),
  useAddMemeMutation: jest.fn(),
}));

jest.mock('../../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../components/PostList/ui/PostList', () => ({
  PostList: ({ posts }: { posts: Post[] }) => (
    <div data-testid='post-list'>
      {posts.map((p) => (
        <div key={p._id}>{p.title}</div>
      ))}
    </div>
  ),
}));

describe('FeedPage', () => {
  const mockShowError = jest.fn();

  const mockPosts: Post[] = [
    {
      _id: '1',
      title: 'Test Post 1',
      excerpt: 'This is a test post',
      author: 'John Doe',
      authorAvatar: 'avatar.png',
      likes: [{ likes: 'user1', ref: 'User' }],
      date: '2025-11-05T12:00:00Z',
      comments: [
        {
          userId: 'u1',
          username: 'Alice',
          text: 'Nice post!',
          createdAt: '2025-11-05T12:30:00Z',
        },
      ],
    },
    {
      _id: '2',
      title: 'Test Post 2',
      excerpt: 'Another test post',
      author: 'Jane Smith',
      likes: [],
      date: '2025-11-04T10:00:00Z',
      comments: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      showError: mockShowError,
    });

    (useGetMemesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    (useAddMemeMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);
  });

  it('renders loading state', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <FeedPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('loader-svg')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <FeedPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('post.errorLoadingPosts')).toBeInTheDocument();
  });

  it('renders posts', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      isError: false,
    });

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <FeedPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('post-list')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('filters posts by query', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      isError: false,
    });

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <FeedPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('post.searchSetting'), {
      target: { value: 'Post 1' },
    });

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument();
  });
});
