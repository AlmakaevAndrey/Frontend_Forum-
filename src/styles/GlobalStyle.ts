import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family:'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
}
`;
