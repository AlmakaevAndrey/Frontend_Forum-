import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { darkTheme, lightTheme } from '../styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <Header>
          <button
            onClick={() => {
              setIsDark(!isDark);
            }}
          >
            x
          </button>
          <nav>
            <Link to="/setting">Settings</Link>
            <Link to="/signin">Sign in</Link>
          </nav>
        </Header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
