import React, { Children } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div>
      <Header>
        <nav>
          <Link to="/setting">Settings</Link>
          <Link to="/signin">Sign in</Link>
        </nav>
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
