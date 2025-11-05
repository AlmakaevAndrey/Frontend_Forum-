import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from './PostCard';
import { useLikePostMutation } from '../../../api/apiSlice';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import { Post } from '../types';

jest.mock('../../../api/apiSlice', () => ({
  useLikePostMutation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('./PostCard.styles', () => ({
  Card: (props: any) => <div data-testid='card' {...props} />,
  Title: (props: any) => <h2 data-testid='title' {...props} />,
  Excerpt: (props: any) => <p data-testid='excerpt' {...props} />,
  Footer: (props: any) => <div data-testid='footer' {...props} />,
  SpanItem: (props: any) => <span data-testid='span-item' {...props} />,
}));

describe('PostCard component', () => {
  const mockLikePost = jest.fn();
  const mockOnClick = jest.fn();

  const mockPost: Post = {
    _id: '123',
    title: 'Test Title',
    excerpt: 'Short description',
    author: 'John Doe',
    authorAvatar: '',
    likes: [{ likes: 'u1', ref: 'User' }],
    date: new Date().toISOString(),
    comments: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLikePostMutation as jest.Mock).mockReturnValue([mockLikePost]);
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: { language: 'en' },
    });
  });

  it('renders post content correctly', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostCard post={mockPost} />
      </ThemeProvider>
    );

    expect(screen.getByTestId('title')).toHaveTextContent(mockPost.title);
    expect(screen.getByTestId('excerpt')).toHaveTextContent(mockPost.excerpt);

    const authorSpan = screen.getAllByTestId('span-item')[0];
    expect(authorSpan).toHaveTextContent(mockPost.author);
    expect(authorSpan).toHaveTextContent('👨‍💻');

    const formattedDate = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(mockPost.date));

    expect(screen.getAllByTestId('span-item')[1]).toHaveTextContent(
      `📅${formattedDate}`
    );

    const likeElement = screen.queryByText(/🩷/);
    expect(likeElement).toHaveTextContent('🩷 1');
  });

  it('calls onClick when card is clicked', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostCard post={mockPost} onClick={mockOnClick} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('card'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls likePost when clicking like button', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostCard post={mockPost} />
      </ThemeProvider>
    );

    const likeButton = screen.getByTestId(`like-button-${mockPost._id}`);
    fireEvent.click(likeButton);
    expect(mockLikePost).toHaveBeenCalledWith(mockPost._id);
  });

  it('renders emoji avatar if authorAvatar is missing', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <PostCard post={{ ...mockPost, authorAvatar: '' }} />
      </ThemeProvider>
    );

    const authorSpan = screen.getAllByTestId('span-item')[0];
    expect(authorSpan).toHaveTextContent('👨‍💻');
  });
});
