import React from 'react';
import { createRoot } from 'react-dom/client';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import App from './VoximplantAnalyzer.tsx';
import './index.css';

// Las librerías se empaquetan con la app (no se cargan desde un CDN externo).
// El componente las busca en window para poder funcionar también como archivo único.
window.XLSX = XLSX;
window.Papa = Papa;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
