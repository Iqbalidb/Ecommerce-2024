import "antd/dist/reset.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../src/styles/AuthStyle.css';
import App from './App';
import { AuthProvider } from './components/context/auth';
import { CartProvider } from "./components/context/cart";
import { SearchProvider } from "./components/context/search";
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
