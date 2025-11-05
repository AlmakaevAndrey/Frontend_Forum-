import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from '../../api/store';
import theme from '../../styles/theme';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('Nav component', () => {
  const mockChild = <div data-testid='burger-icon'>🍔</div>;

  const renderNav = (token: string | null) =>
    render(
      <Provider store={store}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ThemeProvider theme={theme.darkTheme}>
            <Nav token={token} handleLogin={jest.fn()} handleLogout={jest.fn()}>
              {mockChild}
            </Nav>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
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

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders only public links when no token', () => {
    renderNav(null);
    fireEvent.click(screen.getByTestId('burger-icon'));
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('renders private links when token exists', () => {
    renderNav('fakeToken');
    fireEvent.click(screen.getByTestId('burger-icon'));
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('changes language when clicking EN/RU', () => {
    const mockChangeLanguage = jest.fn();
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: { changeLanguage: mockChangeLanguage },
    });

    renderNav(null);
    fireEvent.click(screen.getByTestId('burger-icon'));
    fireEvent.click(screen.getByText('EN'));
    fireEvent.click(screen.getByText('RU'));

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(mockChangeLanguage).toHaveBeenCalledWith('ru');
  });
});
