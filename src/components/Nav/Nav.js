import React from "react";
import AddProduct from "../Admin/AddProduct"
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Nav() {
  const navigate = useNavigate();

  const onClick = ()=> {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("username")
    navigate(0);
    navigate("/")

  }
  
  return (
 <nav className="navbar navbar-expand-lg bg-success">
  <div className="container-fluid">
   <Link to="/" className="navbar-brand active" href="#">Anasayfa</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li className="nav-item">
          {localStorage.getItem("currentUser")==4 ? <Link to="/urunekle" className="nav-link">Ürün Ekle</Link>
          :<p></p>
          
          }
        </li>

        <li>
            {localStorage.getItem("currentUser")==null? <Link to="/giris" className="dropdown-item" href="#">Giriş</Link>:
             <div> <button class="btn btn-outline-dark my-2 my-sm-0" type="submit" onClick={onClick}>Çıkış Yap</button>
             </div>
            }
        </li>
      </ul>
    </div>
  </div>  
</nav>
  );
}
export default Nav;
