export const getBaseUrl = () => {
  if (typeof window === 'undefined') return '';

  const { hostname } = window.location;

  if (hostname === 'localhost') return 'http://localhost:5000';

  if (hostname.includes('vercel.app'))
    return 'https://frontend-forum.onrender.com';

  return '';
};
