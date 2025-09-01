import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { darkTheme, lightTheme } from '../styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import MyButton from './Button/Button';

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main`
  flex: 1;
`;

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <MainContainer>
        <Header
          isDarkProps={isDark}
          toggleTheme={() => setIsDark(!isDark)}
          children={''}
        ></Header>
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
