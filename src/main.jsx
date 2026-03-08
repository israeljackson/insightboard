import React from 'react'
import ReactDOM from "react-dom/client";
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { ActivityProvider } from './context/ActivityContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ActivityProvider>
    <App />
  </ActivityProvider>
  </BrowserRouter>,
)
