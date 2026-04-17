import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { EditorProvider } from './context/EditorContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </React.StrictMode>
);
