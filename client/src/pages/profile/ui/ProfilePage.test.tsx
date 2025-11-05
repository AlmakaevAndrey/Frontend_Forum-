import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProfilePage from './ProfilePage';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import { useToast } from '../../../shared/lib/toast';
import {
  useUpdateUserMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '../../../api/apiSlice';
import authReducer, { AuthState } from '../../../auth/authSlice';
import { Post } from '../../../components/Post/types';

jest.mock('../../../shared/lib/toast');
jest.mock('../../../api/apiSlice');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mockShowInfo = jest.fn();
const mockShowError = jest.fn();

(useToast as jest.Mock).mockReturnValue({
  showInfo: mockShowInfo,
  showError: mockShowError,
});

const mockUpdateUser = jest.fn();
const mockUpdatePost = jest.fn();

(useUpdateUserMutation as jest.Mock).mockReturnValue([
  mockUpdateUser,
  { isLoading: false },
]);

(useUpdatePostMutation as jest.Mock).mockReturnValue([
  mockUpdatePost,
  { isLoading: false },
]);

(useGetPostsQuery as jest.Mock).mockReturnValue({
  data: [] as Post[],
  isLoading: false,
  error: null as any,
});

const initialAuthState: AuthState = {
  user: {
    id: '1',
    username: 'John',
    email: 'john@example.com',
    avatar: null,
    role: 'user',
  },
  token: 'token123',
  role: 'user',
  isLoadingUser: false,
};

const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: { auth: initialAuthState },
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme.lightTheme}>
        <ProfilePage />
      </ThemeProvider>
    </Provider>
  );

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user information and profile sections', () => {
    renderComponent();

    const profileCard = screen.getByText('profile.title').closest('div');
    expect(profileCard).toBeInTheDocument();

    expect(within(profileCard!).getByText(/John/)).toBeInTheDocument();
    expect(
      within(profileCard!).getByText(/john@example.com/)
    ).toBeInTheDocument();

    const roleElement = within(profileCard!).getByText(
      (content) =>
        content.replace(/\s+/g, ' ').includes('profile.role') &&
        content.replace(/\s+/g, ' ').includes('user')
    );
    expect(roleElement).toBeInTheDocument();

    expect(screen.getByText('profile.upload')).toBeInTheDocument();
    expect(screen.getAllByText('profile.change').length).toBeGreaterThan(0);
  });

  it('calls updateUser when clicking change button', () => {
    renderComponent();

    const changeButton = screen.getAllByText('profile.change')[0];
    fireEvent.click(changeButton);

    expect(mockUpdateUser).toHaveBeenCalled();
  });

  it('displays not authorized message when no token', () => {
    const emptyStore = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: { ...initialAuthState, token: null, user: null },
      },
    });

    render(
      <Provider store={emptyStore}>
        <ThemeProvider theme={theme.lightTheme}>
          <ProfilePage />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('profile.notAuthorized')).toBeInTheDocument();
  });
});
