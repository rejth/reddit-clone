import React from 'react';
import ReactDOM from 'react-dom';

import AppProviders from './ts/components/App/AppProviders';
import App from './ts/components/App';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);
