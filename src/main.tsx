import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';
import './styles/codex-overrides.css';
import './styles/home-program-info.css';
import './styles/desktop-pc-layout.css';
import './styles/detail-pages.css';
import './styles/board-write-overrides.css';
import './styles/admin-apply.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
