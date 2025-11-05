import React from 'react';
import { render, screen } from '@testing-library/react';
import LayoutErrorPage from './LayoutErrorPage';
import { useRouteError } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockError = { status: 500, message: 'Server Error' };
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn(),
}));

describe('LayoutErrorPage', () => {
  beforeEach(() => {
    (useRouteError as jest.Mock).mockReturnValue(mockError);
  });

  it('renders error status, messages and back link', () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <LayoutErrorPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('error.pageNotFound')).toBeInTheDocument();
    expect(screen.getByText('error.backToHome')).toBeInTheDocument();
    expect(screen.getByText('error.backToHome').closest('a')).toHaveAttribute(
      'href',
      '/'
    );
  });

  it('renders 404 if error status is undefined', () => {
    (useRouteError as jest.Mock).mockReturnValue({ message: 'Not found' });

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <LayoutErrorPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
