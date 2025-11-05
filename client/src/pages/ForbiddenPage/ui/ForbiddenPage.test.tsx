import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForbiddenPage from './ForbiddenPage';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe('ForbiddenPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme.lightTheme}>
          <ForbiddenPage />
        </ThemeProvider>
      </BrowserRouter>
    );

  it('renders title, message and button', () => {
    renderComponent();

    expect(screen.getByText('forbidden.title')).toBeInTheDocument();
    expect(screen.getByText('forbidden.message')).toBeInTheDocument();
    expect(screen.getByText('forbidden.goHome')).toBeInTheDocument();
  });

  it('navigates to home when button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText('forbidden.goHome'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
