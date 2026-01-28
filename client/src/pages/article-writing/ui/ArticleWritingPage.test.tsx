import React from 'react';
import { fireEvent, waitFor, screen, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ArticleWriting from './ArticleWritingPage';
import { useAddPostMutation } from '../../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../shared/lib/toast';
import theme from '../../../styles/theme';

jest.mock('../../../api/apiSlice', () => ({
  useAddPostMutation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../../components/Editor/Editor', () => ({
  __esModule: true,
  default: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (plainText: string, html: string) => void;
    placeholder?: string;
  }) => (
    <textarea
      data-testid='quill-editor'
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value, e.target.value)}
    />
  ),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'articleWriting.enterTitle': 'Enter Title',
        'articleWriting.enterContent': 'Enter Content',
        'articleWriting.createArticle': 'Create Article',
        'articleWriting.publish': 'Publish',
      };
      return map[key] || key;
    },
    i18n: { language: 'en' },
  }),
}));

describe('ArticleWriting', () => {
  const mockNavigate = jest.fn();
  const mockShowInfo = jest.fn();
  const mockShowError = jest.fn();
  const unwrapMock = jest.fn().mockResolvedValue({ _id: '123' });

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({
      showInfo: mockShowInfo,
      showError: mockShowError,
    });
    (useAddPostMutation as jest.Mock).mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: unwrapMock }),
      { isLoading: false },
    ]);
  });

  it('submits form successfully', async () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <ArticleWriting />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Title/i), {
      target: { value: 'Test Title' },
    });

    fireEvent.change(screen.getByTestId('quill-editor'), {
      target: { value: 'Test Content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Publish/i }));

    await waitFor(() => {
      expect(unwrapMock).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/article_read/123');
    });
  });
});
