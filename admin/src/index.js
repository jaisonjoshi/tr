import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MycontextProvider } from './context/Context';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
  <AuthContextProvider>

<MycontextProvider>


    <App />

</MycontextProvider>
</AuthContextProvider>
 </BrowserRouter>

);

