import React from 'react';

import GlobalStyle from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AuthProvider } from './hooks/auth';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <Dashboard />
      <GlobalStyle />
    </AuthProvider>
  );
};

export default App;
