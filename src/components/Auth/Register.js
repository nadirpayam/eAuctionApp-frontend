import React, { useState } from "react";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

function Register() {
    
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleName = (value) => {
        setName(value)
    }

    const handleSurname = (value) => {
        setSurname(value)
    }

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const handleRegister = () => {
        sendRequest("register")
        setName("")
        setSurname("")
        setUsername("")
        setPassword("")     
    }

    const sendRequest=(path) => {
        fetch("/auth/"+path, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                userName:username,
                password:password,
                name:name,
                surName:surname,
                role:"USER"
            }),
        })
        .then((res)=> res.json())
        .then((result)=>{localStorage.setItem("tokenKey",result.message);
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
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">KAYDOL</h2>
                  <p className="text-white-50 mb-5">
                    Lütfen Kayıt Bilgilerini Gir!
                  </p>

                  <div className="form-outline form-white mb-3">
                    <label className="form-label" type="textad">
                      Ad
                    </label>
                    <input
                      type="text"
                      id="textad"
                      className="form-control form-control-lg"
                      onChange={(i) =>handleName(i.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-3">
                    <label className="form-label" type="textsoyad">
                      Soyad
                    </label>
                    <input
                      type="text"
                      id="textsoyad"
                      className="form-control form-control-lg"
                      onChange={(i) =>handleSurname(i.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-3">
                    <label className="form-label" type="textkulad">
                      Kullanıcı Adı
                    </label>
                    <input
                      type="text"
                      id="textkulad"
                      className="form-control form-control-lg"
                      onChange={(i) =>handleUsername(i.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-3">
                    <label className="form-label" for="typePasswordX">
                      Şifre
                    </label>
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={(i) =>handlePassword(i.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleRegister}
                  >
                    Kaydol
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Hesabın var mı?{" "}
                    <Link to="/giris" className="dtext-white-50 fw-bold">Giriş Yap</Link>

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

export default Register;