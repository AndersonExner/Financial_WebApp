import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import { AppMenu } from './shared/components';
import { AppRoutes } from './routes';
import { AppMenuProvider, AppThemeProvider } from './shared/contexts';

const Layout = () => {
  const location = useLocation();
  const hideMenuRoutes = ["/login"]; // Ocultar menu nessas rotas

  if (hideMenuRoutes.includes(location.pathname)) {
    return <AppRoutes />; // Renderiza apenas as rotas na tela de login
  }

  return (
    <AppMenu>
      <AppRoutes />
    </AppMenu>
  );
};

export const App = () => {
  return (
    <AppThemeProvider>
      <AppMenuProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AppMenuProvider>
    </AppThemeProvider>
  );
};
