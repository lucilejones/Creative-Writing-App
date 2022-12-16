import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider';
import EntryProvider from './context/EntryProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EntryProvider>
          <App />
        </EntryProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
