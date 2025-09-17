import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedPage from './pages/feed/ui/FeedPage';
import ProfilePage from './pages/profile/ui/ProfilePage';
import SignInPage from './pages/sign-in/ui/SignInPage';
import SignUpPage from './pages/sign-up/ui/SignUpPage';
import ArticleEditPage from './pages/article-edit/ui/ArticleEditPage';
import ArticleReadPage from './pages/article-read/ui/ArticleReadPage';
import SettingPage from './pages/settings/ui/SettingPage';
import { Provider } from 'react-redux';
import { store } from './api/store';
import ProtectedRoute from './routes/ProtectedRoute';
import { Role } from './shared/types/roles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProtectedRoute roles={['guest','user','admin']}><FeedPage /></ProtectedRoute> },
      { path: '/signin', element: <ProtectedRoute roles={['guest']}><SignInPage /></ProtectedRoute> },
      { path: '/signup', element: <ProtectedRoute roles={['guest']}><SignUpPage /></ProtectedRoute> },
      { path: '/profile/:id', element: <ProtectedRoute roles={['user','admin']}><ProfilePage /></ProtectedRoute> },
      { path: '/article_edit/:id', element: <ProtectedRoute roles={['user','admin']}><ArticleEditPage /></ProtectedRoute> },
      { path: '/article_read/:id', element: <ProtectedRoute roles={['guest','user','admin']}><ArticleReadPage /></ProtectedRoute> },
      { path: '/setting', element: <ProtectedRoute roles={['user','admin']}><SettingPage /></ProtectedRoute> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
