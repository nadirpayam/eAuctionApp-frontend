import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (value) => {
    setName(value);
  };

  const handleSurname = (value) => {
    setSurname(value);
  };

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleRegister = () => {
    sendRequest("register");
    setName("");
    setSurname("");
    setUsername("");
    setPassword("");
  };

  const sendRequest = (path) => {
    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
        name: name,
        surName: surname,
        role: "USER",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.accessToken);
        localStorage.setItem("refreshKey", result.refreshToken);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="vh-25 gradient-custom register">
      <div className="container py-4 h-1">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-lg-8 col-lg-6 col-xl-5">
            <div
              className="card bg-success text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-2 mt-md-2 pb-5">
                  <h2 className="fw-bold mb-1 text-uppercase">KAYDOL</h2>

                  <div className="form-outline form-white mb-1">
                    <label className="form-label" type="textad">
                      Ad
                    </label>
                    <input
                      type="text"
                      id="textad"
                      className="form-control form-control-lg"
                      onChange={(i) => handleName(i.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-1">
                    <label className="form-label" type="textsoyad">
                      Soyad
                    </label>
                    <input
                      type="text"
                      id="textsoyad"
                      className="form-control form-control-lg"
                      onChange={(i) => handleSurname(i.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-1">
                    <label className="form-label" type="textkulad">
                      Kullanıcı Adı
                    </label>
                    <input
                      type="text"
                      id="textkulad"
                      className="form-control form-control-lg"
                      onChange={(i) => handleUsername(i.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-1">
                    <label className="form-label" for="typePasswordX">
                      Şifre
                    </label>
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={(i) => handlePassword(i.target.value)}
                    />
                  </div>

                  <div  style={{ marginTop: "30px" }}>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={handleRegister}
                      style={{ marginBottom: "5px" }}
                    >
                      Kaydol
                    </button>
                    <p className="mb-0" >
                      Hesabın var mı?{" "}
                      <Link to="/giris" className="dtext-white-50 fw-bold">
                        Giriş Yap
                      </Link>
                    </p>
                  </div>
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
