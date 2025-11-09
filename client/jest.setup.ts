import '@testing-library/jest-dom';
const originalWarn = console.warn;
(global as any).__API_URL__ = 'http://localhost:5000';

beforeAll(() => {
  console.warn = (msg, ...args) => {
    if (
      typeof msg === 'string' &&
      msg.includes('React Router Future Flag Warning')
    )
      return;
    originalWarn(msg, ...args);
  };
});
afterAll(() => {
  console.warn = originalWarn;
});
