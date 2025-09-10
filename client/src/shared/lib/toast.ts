import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export const useToast = () => {
  const theme = useTheme();
  const themeMode: 'light' | 'dark' =
    (theme as any).mode === 'dark' ? 'dark' : 'light';

  const shownToasts = useRef<Set<string>>(new Set());

  const showSuccess = (message: string) => {
    if (shownToasts.current.has(message)) return;
    shownToasts.current.add(message);

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

  const showError = (message: string) => {
    if (shownToasts.current.has(message)) return;
    shownToasts.current.add(message);

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

  const showInfo = (message: string) => {
    if (shownToasts.current.has(message)) return;
    shownToasts.current.add(message);

    toast.info(message, {
      position: 'top-center',
      autoClose: 3000,
      theme: themeMode,
    });
  };
  return { showSuccess, showError, showInfo };
};
