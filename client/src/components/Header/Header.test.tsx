import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const mockAuthReducer = (state: AuthState = { token: null }, action: any) =>
  state;

interface AuthState {
  token: string | null;
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('Header', () => {
  const toggleThemeMock = jest.fn();
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
              toggleTheme={toggleThemeMock}
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

  it('calls toggleTheme when theme button clicked', () => {
    renderHeader(null);
    const themeButton = screen.getByText('Dark');
    fireEvent.click(themeButton);
    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
