import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fontes usadas nos exemplos (servidas junto com o site, sem depender do Google Fonts).
// Troque pelas fontes do seu projeto.
import '@fontsource-variable/outfit';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/anton/400.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/600-italic.css';

import App from './App.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
