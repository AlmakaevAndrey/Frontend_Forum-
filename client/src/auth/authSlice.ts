import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userTypes';
import { Role } from 'shared/types/roles';

interface AuthState {
  user: User | null;
  token: string | null;
  role: 'admin' | 'user' | 'guest' | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        role: 'admin' | 'user' | 'guest';
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    loadUser: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const role = localStorage.getItem('role') as Role | null;
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.role = role;
      }
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { loginSuccess, logout, loadUser, updateUserProfile } =
  authSlice.actions;
export default authSlice.reducer;
