export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: '#fff',
    backgroundInput: '#fff',
    backgroundSecond: '#ebebebb0',
    text: '#111',
    textSvg: '#111',
    primary: '#F7DF1E',
    secondary: '#6366f1',
    border: '#e5e7ed',
    svg: '#3178C6',
  },
};

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: '#1f2937',
    backgroundInput: '#fff',
    backgroundSecond: '#1c2430ff',
    text: '#f9f9f9',
    textSvg: '#111',
    primary: '#3178C6',
    secondary: '#1E4E8C',
    border: '#374151',
    svg: '#F7DF1E',
  },
};

export default { lightTheme, darkTheme };
