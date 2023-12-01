import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import i18n from './plugins/i18n/i18n'; // Import the configured i18n instance
import { I18nextProvider } from 'react-i18next'; // Import the configured i18n instance


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  </React.StrictMode>,
)
