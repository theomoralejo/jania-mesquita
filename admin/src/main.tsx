import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Suprimir avisos de deprecação em desenvolvimento
if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const message = args[0]?.toString?.() || '';
    
    // Suprimir avisos específicos de deprecação das bibliotecas
    if (
      message.includes('[antd:') ||
      message.includes('findDOMNode is deprecated') ||
      message.includes('React Router Future Flag Warning')
    ) {
      return;
    }
    
    originalWarn(...args);
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
