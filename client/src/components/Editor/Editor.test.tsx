import { render, screen, fireEvent } from '@testing-library/react';
import Editor from './Editor';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import theme from '../../styles/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  I18nextProvider: ({ children }: any) => children,
}));

jest.mock('react-quill', () => {
  const QuillMock = {
    register: jest.fn(),
    import: jest.fn(() => class {}),
  };

  return {
    __esModule: true,
    default: ({ value, onChange, placeholder }: any) => (
      <div data-testid='react-quill'>
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    ),
    Quill: QuillMock,
  };
});

describe('Editor', () => {
  it('renders the editor with placeholder', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <Editor value='' onChange={jest.fn()} />
      </ThemeProvider>
    );

    const editor = screen.getByTestId('react-quill');
    expect(editor).toBeInTheDocument();

    const textarea = editor.querySelector('textarea');
    expect(textarea).toHaveAttribute('placeholder', 'editor.addPostText');
  });

  it('calls onChange with plain text and sanitized HTML', () => {
    const handleChange = jest.fn();

    render(
      <ThemeProvider theme={theme.darkTheme}>
        <Editor value='' onChange={handleChange} />
      </ThemeProvider>
    );

    const editor = screen.getByTestId('react-quill');
    const textarea = editor.querySelector('textarea')!;
    fireEvent.change(textarea, { target: { value: '<b>Hello</b>' } });

    expect(handleChange).toHaveBeenCalledWith('Hello', '<b>Hello</b>');
  });
});
