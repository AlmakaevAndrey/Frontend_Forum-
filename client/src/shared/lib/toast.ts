import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export const useToast = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const themeMode: 'light' | 'dark' =
    (theme as any).mode === 'dark' ? 'dark' : 'light';

  const shownToasts = useRef<Set<string>>(new Set());
  const lastShown = useRef<Record<string, number>>({});

  const isTest = process.env.NODE_ENV === 'test';

  const showSuccess = (key: string) => {
    const message = t(key);

    if (!isTest) {
      if (shownToasts.current.has(message)) return;
      shownToasts.current.add(message);
    }

    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: themeMode,
    });
  };

  const showError = (key: string) => {
    const message = t(key);

    if (!isTest) {
      const now = Date.now();
      if (lastShown.current[message] && now - lastShown.current[message] < 2000)
        return;
      lastShown.current[message] = now;
    }

    toast.error(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: themeMode,
    });
  };

  const showInfo = (key: string) => {
    const message = t(key);

    if (!isTest) {
      if (shownToasts.current.has(message)) return;
      shownToasts.current.add(message);
    }

    toast.info(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: themeMode,
    });
  };

  return { showSuccess, showError, showInfo };
};
