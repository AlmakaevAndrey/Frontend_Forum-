import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import theme from '../../styles/theme';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

interface AuthState {
  token: string | null;
}

const mockAuthReducer = (
  state: AuthState = { token: null },
  action: any
): AuthState => state;

describe('Nav component', () => {
  const mockChild = <div data-testid='burger-icon'>🍔</div>;

  const renderNav = (token: string | null) => {
    const store = configureStore({
      reducer: { auth: mockAuthReducer },
      preloadedState: { auth: { token } as AuthState },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme.darkTheme}>
            <Nav token={token} handleLogin={jest.fn()} handleLogout={jest.fn()}>
              {mockChild}
            </Nav>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: { changeLanguage: jest.fn() },
    });
  });

  it('renders burger icon', () => {
    renderNav(null);
    expect(screen.getByTestId('burger-icon')).toBeInTheDocument();
  });

  it('opens and closes menu on burger click', () => {
    renderNav(null);
    const burger = screen.getByTestId('burger-icon');
    fireEvent.click(burger);

    expect(screen.getByTestId('link-home')).toBeInTheDocument();
    expect(screen.getByTestId('link-signin')).toBeInTheDocument();
  });

  it('renders only public links when no token', () => {
    renderNav(null);
    fireEvent.click(screen.getByTestId('burger-icon'));

    expect(screen.getByTestId('link-home')).toBeInTheDocument();
    expect(screen.getByTestId('link-signin')).toBeInTheDocument();
    expect(screen.queryByTestId('link-profile')).not.toBeInTheDocument();
    expect(screen.queryByTestId('link-settings')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('link-article-writing')
    ).not.toBeInTheDocument();
  });

  it('renders private links when token exists', () => {
    renderNav('fakeToken');
    fireEvent.click(screen.getByTestId('burger-icon'));

    expect(screen.getByTestId('link-home')).toBeInTheDocument();
    expect(screen.getByTestId('link-signin')).toBeInTheDocument();
    expect(screen.getByTestId('link-profile')).toBeInTheDocument();
    expect(screen.getByTestId('link-settings')).toBeInTheDocument();
    expect(screen.getByTestId('link-article-writing')).toBeInTheDocument();
  });

  it('changes language when clicking EN/RU', () => {
    const mockChangeLanguage = jest.fn();
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: { changeLanguage: mockChangeLanguage },
      t: (key: string) => key,
    });

    renderNav(null);
    fireEvent.click(screen.getByTestId('burger-icon'));
    fireEvent.click(screen.getByText('EN'));
    fireEvent.click(screen.getByText('RU'));

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
  });
});
