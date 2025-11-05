import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

const originalWarn = console.warn;
console.warn = (message?: any, ...optionalParams: any[]) => {
  if (
    typeof message === 'string' &&
    (message.includes('React Router Future Flag Warning') ||
      message.includes('Relative route resolution within Splat'))
  ) {
    return;
  }
  originalWarn(message, ...optionalParams);
};
