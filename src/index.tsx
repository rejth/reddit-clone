import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './ts/components/App';
import theme from './styles/theme';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme(true)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
