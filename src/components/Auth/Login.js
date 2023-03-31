import React, { useState } from "react";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")


    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const handleLogin = () => {
        sendRequest("login")
        setUsername("")
        setPassword("") 
        navigate('/');
        navigate(0);

    }

    const sendRequest=(path) => {
      fetch("/auth/"+path, {
          method:"POST",
          headers: {
              "Content-Type":"application/json",
          },
          body: JSON.stringify({
              username:username,
              password:password,
          }),
      })
      .then((res)=> res.json())
      .then((result)=>{localStorage.setItem("tokenKey",result.accessToken);
        localStorage.setItem("refreshKey",result.refreshToken);
        localStorage.setItem("currentUser",result.userId);
        localStorage.setItem("userName",username)})
      .catch((err)=>console.log(err))
  }

  return (
    <section className="vh-100 gradient-custom" style={{ marginTop: "5px" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-success text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">GİRİŞ SAYFASI</h2>
                  <p className="text-white-50 mb-5">
                    Lütfen kullanıcı adı ve şifreni gir!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="texti"
                      className="form-control form-control-lg"
                      onChange={(i) =>handleUsername(i.target.value)}
                    />
                    <label className="form-label" type="texti">
                      Kullanıcı Adı
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={(i) =>handlePassword(i.target.value)}
                    />
                    <label className="form-label" for="typePasswordX">
                      Şifre
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={ handleLogin}
                  >
                    Giriş Yap
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Henüz bir hesabın yok mu?{" "}

                    <Link to="/kaydol" className="dtext-white-50 fw-bold">Kaydol</Link>
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
