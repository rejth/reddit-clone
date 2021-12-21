import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import useStore from '../../store';
import GlobalStyle from '../../../styles/global';
import theme from '../../../styles/theme';

interface AppProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const isDarkTheme = useStore((state) => state.isDarkTheme);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <ThemeProvider theme={theme(isDarkTheme)}>
        <GlobalStyle />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProviders;
