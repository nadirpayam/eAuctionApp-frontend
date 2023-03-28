import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './components/Home/Home'
import AddProduct from "./components/Admin/AddProduct"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AddProduct />
  </React.StrictMode>
);


