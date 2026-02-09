import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

interface AuthState {
  token: string | null;
}

const mockAuthReducer = (state: AuthState = { token: null }, action: any) =>
  state;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'header.login': 'Login',
        'header.logout': 'Logout',
        'header.dark': 'Dark',
      };
      return translations[key] || key;
    },
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('Header', () => {
  const onThemeChangeMock = jest.fn();
  const handleLogoutMock = jest.fn();
  const handleLoginMock = jest.fn();

  const renderHeader = (token: string | null) => {
    const store = configureStore({
      reducer: { auth: mockAuthReducer },
      preloadedState: { auth: { token } as AuthState },
    });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme.darkTheme}>
            <Header
              isDarkProps={false}
              onThemeChange={onThemeChangeMock}
              handleLogout={handleLogoutMock}
              handleLogin={handleLoginMock}
            />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders Login button when no token', () => {
    renderHeader(null);
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  it('renders Logout button when token exists', () => {
    renderHeader('fakeToken');
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  // it('calls toggleTheme when theme button clicked', () => {
  //   renderHeader(null);
  //   const themeButton = screen.getByText('Dark');
  //   fireEvent.click(themeButton);
  //   expect(onThemeChangeMock).toHaveBeenCalled();
  // });
});
