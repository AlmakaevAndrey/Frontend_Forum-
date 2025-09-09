import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { darkTheme, lightTheme } from '../styles/theme';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { Provider } from 'react-redux';
import { store } from '../api/store';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
`;

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <AppContainer>
          <Header
            isDarkProps={isDark}
            toggleTheme={() => setIsDark(!isDark)}
            children={''}
          ></Header>
          <Content>
            <MainContainer>
              <Outlet />
            </MainContainer>
          </Content>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
