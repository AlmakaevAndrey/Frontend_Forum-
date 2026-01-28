import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

import ArticleEditPage from './ArticleEditPage';
import authReducer from '../../../auth/authSlice';
import { ApiSlice } from '../../../api/apiSlice';

import { useGetPostsQuery, useUpdatePostMutation } from '../../../api/apiSlice';
import { useToast } from '../../../shared/lib/toast';
import { useNavigate, useParams } from 'react-router-dom';

jest.mock('../../../api/apiSlice', () => ({
  useGetPostsQuery: jest.fn(),
  useUpdatePostMutation: jest.fn(),
  ApiSlice: {
    reducerPath: 'api',
    reducer: (state = {}) => state,
    middleware: () => (next: any) => (action: any) => next(action),
  },
}));

jest.mock('../../../shared/lib/toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../components/Editor/Editor', () => () => (
  <div data-testid='editor'>Editor</div>
));

jest.mock('../../../pages/ForbiddenPage/ui/ForbiddenPage', () => () => (
  <div data-testid='forbidden'>Forbidden</div>
));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

const mockShowInfo = jest.fn();
const mockShowError = jest.fn();
(useToast as jest.Mock).mockReturnValue({
  showInfo: mockShowInfo,
  showError: mockShowError,
});

const mockApiReducer = (state = {}) => state;

const rootReducer = combineReducers({
  auth: authReducer,
  api: mockApiReducer,
});

export const createTestStore = (preloadedState?: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

describe('ArticleEditPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
  });

  it('renders editor when user can edit', () => {
    const post = { _id: '123', title: 'Hello', excerpt: 'World', author: 'u1' };

    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: [post],
      isLoading: false,
    });

    (useUpdatePostMutation as jest.Mock).mockReturnValue([jest.fn()]);

    render(
      <Provider
        store={createTestStore({
          auth: { token: 'abc', role: 'user', user: { id: 'u1' } },
        })}
      >
        <ThemeProvider theme={theme.lightTheme}>
          <BrowserRouter>
            <ArticleEditPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('articleEdit.pageTitle')).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });

  it('updates post and redirects', async () => {
    const post = { _id: '123', title: 'A', excerpt: 'B', author: 'u1' };
    const mockUpdate = jest
      .fn()
      .mockReturnValue({ unwrap: () => Promise.resolve({}) });

    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: [post],
      isLoading: false,
    });
    (useUpdatePostMutation as jest.Mock).mockReturnValue([mockUpdate]);

    render(
      <Provider
        store={createTestStore({
          auth: { token: 'abc', role: 'admin', user: { id: 'u1' } },
        })}
      >
        <ThemeProvider theme={theme.lightTheme}>
          <BrowserRouter>
            <ArticleEditPage />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('buttons.save'));

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        id: '123',
        data: { title: 'A', excerpt: 'B' },
      });
      expect(mockNavigate).toHaveBeenCalledWith('/article_read/123');
    });
  });
});
