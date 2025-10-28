import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import '../public/fonts/Roboto.css';
import './i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './api/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './routes/ProtectionRoute';
import { Loader } from './components/Loader/Loader';

const LazyFeedPage = lazy(() => import('./pages/feed/ui/FeedPage'));
const LazyProfilePage = lazy(() => import('./pages/profile/ui/ProfilePage'));
const LazySignInPage = lazy(() => import('./pages/sign-in/ui/SignInPage'));
const LazySignUpPage = lazy(() => import('./pages/sign-up/ui/SignUpPage'));
const LazyArticleEditPage = lazy(
  () => import('./pages/article-edit/ui/ArticleEditPage')
);
const LazyArticleReadPage = lazy(
  () => import('./pages/article-read/ui/ArticleReadPage')
);
const LazyArticleWriting = lazy(
  () => import('./pages/article-writing/ui/ArticleWritingPage')
);
const LazySettingPage = lazy(() => import('./pages/settings/ui/SettingPage'));
const LazyForbiddenPage = lazy(
  () => import('./pages/ForbiddenPage/ui/ForbiddenPage')
);
const LazyLayoutErrorPage = lazy(
  () => import('./pages/error-page/ui/LayoutErrorPage')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <App>
        <Suspense fallback={<Loader />}>
          <LazyLayoutErrorPage />
        </Suspense>
      </App>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute roles={['guest', 'user', 'admin']}>
            <Suspense fallback={<Loader />}>
              <LazyFeedPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/signin',
        element: (
          <ProtectedRoute roles={['guest']}>
            <Suspense fallback={<Loader />}>
              <LazySignInPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <ProtectedRoute roles={['guest']}>
            <Suspense fallback={<Loader />}>
              <LazySignUpPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:id',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <Suspense fallback={<Loader />}>
              <LazyProfilePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <Suspense fallback={<Loader />}>
              <LazyProfilePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/article_writing',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <Suspense fallback={<Loader />}>
              <LazyArticleWriting />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/article_edit/:id',
        element: (
          <ProtectedRoute roles={['user', 'admin']}>
            <Suspense fallback={<Loader />}>
              <LazyArticleEditPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/article_read/:id',
        element: (
          <ProtectedRoute roles={['guest', 'user', 'admin']}>
            <Suspense fallback={<Loader />}>
              <LazyArticleReadPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/setting',
        element: (
          <ProtectedRoute roles={['admin']}>
            <Suspense fallback={<Loader />}>
              <LazySettingPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: '/forbidden_page',
        element: (
          <ProtectedRoute roles={['user', 'admin', 'guest']}>
            <Suspense fallback={<Loader />}>
              <LazyForbiddenPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
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
