import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import theme from '../../styles/theme';
import { useTranslation } from 'react-i18next';
import { any } from 'zod';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const mockAuthReducer = (
  state = { token: any, role: any, user: any },
  action: any
) => state;

describe('Nav component', () => {
  const mockChild = <div data-testid='burger-icon'>🍔</div>;

  const renderNav = (token: string | null, role: string | null = null) => {
    const store = configureStore({
      reducer: { auth: mockAuthReducer },
      preloadedState: { auth: { token, role, user: null } },
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
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(),
      },
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
    expect(screen.getByTestId('change-language')).toBeInTheDocument();
  });

  it('renders only public links when no token', () => {
    renderNav(null);
    fireEvent.click(screen.getByTestId('burger-icon'));

    expect(screen.getByTestId('link-home')).toBeInTheDocument();
    expect(screen.getByTestId('link-signin')).toBeInTheDocument();

    expect(screen.queryByTestId('link-profile')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('link-article-writing')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('link-settings')).not.toBeInTheDocument();
  });

  it('renders private links when token exists', () => {
    renderNav('fakeToken', 'user');
    fireEvent.click(screen.getByTestId('burger-icon'));

    expect(screen.getByTestId('link-profile')).toBeInTheDocument();
    expect(screen.getByTestId('link-article-writing')).toBeInTheDocument();
  });

  it('renders admin link when role = admin', () => {
    renderNav('token123', 'admin');
    fireEvent.click(screen.getByTestId('burger-icon'));

    expect(screen.getByTestId('link-settings')).toBeInTheDocument();
  });

  it('toggles language when clicking language button', () => {
    const mockChangeLanguage = jest.fn();
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
    });

    renderNav(null);
    fireEvent.click(screen.getByTestId('burger-icon'));

    const langButton = screen.getByTestId('change-language');

    fireEvent.click(langButton);

    expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
  });
});
