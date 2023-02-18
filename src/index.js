import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './Home';
import './global/styles.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);