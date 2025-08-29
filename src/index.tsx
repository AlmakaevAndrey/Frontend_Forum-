import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedPage from './pages/feed/ui/FeedPage';
import ProfilePage from './pages/profile/ui/ProfilePage';
import SignInPage from './pages/sign-in/ui/SignInPage';
import ArticleEditPage from './pages/article-edit/ui/ArticleEditPage';
import ArticleReadPage from './pages/article-read/ui/ArticleReadPage';
import SettingPage from './pages/settings/ui/SettingPage';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: '/profile/:id', element: <ProfilePage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/article_edit/:id', element: <ArticleEditPage /> },
      { path: '/article_read/:id', element: <ArticleReadPage /> },
      { path: '/setting', element: <SettingPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
