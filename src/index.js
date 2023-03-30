import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './components/Home/Home'
import AddProduct from "./components/Admin/AddProduct"
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Nav from './components/Nav/Nav';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<Nav/>
  <Routes>
    <Route path="/" element={<App />}>       </Route>
    <Route path="/urunekle" element={<AddProduct />}></Route>
    <Route path="/giris" element={<Login />}></Route>
    <Route path="/kaydol" element={<Register />}></Route>
  </Routes>
</BrowserRouter>
);


