import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html, body, #root {
    // height: 100vh;
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
    
button {
    all: unset;
}

body {
    margin: 0 auto;
    padding: 0;
    font-family:'Inter', sans-serif;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.backgroundSecond};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Roboto', sans-serif;
}
`;
