import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/marcellus/latin-400.css';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
