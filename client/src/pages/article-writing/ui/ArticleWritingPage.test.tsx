import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArticleWriting from './ArticleWritingPage';
import { useAddPostMutation } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

// Мокаем RTK Query хук
jest.mock('../../../api/apiSlice', () => ({
  useAddPostMutation: jest.fn(),
}));

// Мокаем toast
jest.mock('../../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));

// Мокаем i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Мокаем useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Мокаем Editor
jest.mock('../../../components/Editor/Editor', () => (props: any) => {
  return (
    <textarea
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value, e.target.value)}
    />
  );
});

describe('ArticleWriting', () => {
  const mockShowInfo = jest.fn();
  const mockShowError = jest.fn();
  const mockAddPost = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      showInfo: mockShowInfo,
      showError: mockShowError,
    });
    (useAddPostMutation as jest.Mock).mockReturnValue([
      mockAddPost,
      { isLoading: false, reset: jest.fn() },
    ]);
  });

  const renderWithProviders = () =>
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <ArticleWriting />
        </ThemeProvider>
      </BrowserRouter>
    );

  it('renders form inputs and publish button', () => {
    renderWithProviders();

    expect(
      screen.getByPlaceholderText('articleWriting.enterTitle')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('articleWriting.enterContent')
    ).toBeInTheDocument();
    expect(screen.getByText('articleWriting.publish')).toBeInTheDocument();
  });

  it('shows error if fields are empty', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText('articleWriting.publish'));

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith('messages.fillAllFields');
    });
  });

  it('submits form successfully', async () => {
    mockAddPost.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({ _id: '123' }),
    });

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText('articleWriting.enterTitle'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('articleWriting.enterContent'),
      {
        target: { value: 'Test Content' },
      }
    );

    fireEvent.click(screen.getByText('articleWriting.publish'));

    await waitFor(() => {
      expect(mockAddPost).toHaveBeenCalledWith({
        title: 'Test Title',
        excerpt: 'Test Content',
      });
      expect(mockShowInfo).toHaveBeenCalledWith('messages.postAdded');
      expect(mockNavigate).toHaveBeenCalledWith('/article_read/123');
    });
  });

  it('shows error if addPost fails', async () => {
    mockAddPost.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue({}),
    });

    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText('articleWriting.enterTitle'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(
      screen.getByPlaceholderText('articleWriting.enterContent'),
      {
        target: { value: 'Test Content' },
      }
    );

    fireEvent.click(screen.getByText('articleWriting.publish'));

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith('messages.notAuthorized');
    });
  });

  it('disables button when mutation is loading', () => {
    (useAddPostMutation as jest.Mock).mockReturnValue([
      mockAddPost,
      { isLoading: true, reset: jest.fn() },
    ]);

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <ArticleWriting />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('articleWriting.saving')).toBeDisabled();
  });
});
