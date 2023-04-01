import './App.css';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import AddProduct from './components/Admin/AddProduct';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Login from './components/Auth/Login';
import { Navigate } from 'react-router-dom';
import './components/Home/Home.css'


function App() {


  return (
    <div className="App">
    <Routes>
     <Route path="/" exact element={<Home/>}></Route>
     <Route path="/urunekle" element={<AddProduct />}></Route>
     <Route path="/giris" element={localStorage.getItem("currentUser")!= null? <Navigate to="/"/>: Login}></Route>
    </Routes>
  </div>  
  );
}

export default App;
