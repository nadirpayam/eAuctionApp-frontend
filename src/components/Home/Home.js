import React, { useEffect, useState } from "react";
import { RefreshToken } from "../../services/HttpService";
import "./Home.css";
import { useNavigate,Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("tokenKey");
  const [countdown, setCountdown] = useState(10);
  const [timer, setTimer] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);



  useEffect(() => {
    setTimer(
      setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000)
    );
    return () => clearInterval(timer);
  }, []);

  

  const logout = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKEy");
    localStorage.removeItem("username");
    navigate(0);
    navigate("/");
  };
 
  useEffect(() => {
    const url = "/products/rand";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const json = await response.json();
          setProduct(json);
        } else {
          throw new Error("Error fetching data");
        }
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleOffer = (event, product) => {
    event.preventDefault();
    const newPrice = event.target.elements.offerInput.value;
    fetch(`/products/${product.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        price: parseFloat(newPrice),
            }),
    })
      .then((res) => {
        if (!res.ok) {
          RefreshToken()
            .then((res) => {
              if (!res.ok) {
                logout();
              } else {
                return res.json();
              }
            })

            .then((data) => {
              console.log(data); // updated product object returned by the API
              if (data != undefined) {
                localStorage.setItem("tokenKey", data.accessToken);
                handleOffer();
                setProduct((prevState) => {
                  const updatedProductIndex = prevState.findIndex(
                    (p) => p.productId === product.productId
                  );
                  const updatedProducts = [...prevState];
                  updatedProducts[updatedProductIndex] = data;
                  return updatedProducts;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    event.target.elements.offerInput.value = "";
  };

  const handleOffer2 = (event, product) => {
    event.preventDefault();
    fetch(`/products/${product.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        sold:true,
            }),
    })
      .then((res) => {
        if (!res.ok) {
          RefreshToken()
            .then((res) => {
              if (!res.ok) {
                logout();
              } else {
                return res.json();
              }
            })

            .then((data) => {
              console.log(data); // updated product object returned by the API
              if (data != undefined) {
                localStorage.setItem("tokenKey", data.accessToken);
                handleOffer2();
                setProduct((prevState) => {
                  const updatedProductIndex = prevState.findIndex(
                    (p) => p.productId === product.productId
                  );
                  const updatedProducts = [...prevState];
                  updatedProducts[updatedProductIndex] = data;
                  return updatedProducts;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else res.json();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginBottom: '70px'
      }}
    >
      {product.map((product) => (
        <div
          key={product.productId}
          className="card"
          style={{
            width: "18rem",
            margin: "0.5rem",
            overflow: "hidden",
            
          }}
        >
          <h5 className="card-title">{product.name}</h5>
          <img
            src={product.imageUrl}
            className="card-img-top"
            alt="..."
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
          <div className="card-body">
            <b className="card-text">Güncel Fiyat: {product.price} TL</b> <hr></hr>
          </div>
          <form onSubmit={(event) => handleOffer(event, product)}>
          {localStorage.getItem("currentUser") == null ? 
          <b>Açık Arttırmaya Katılmak İçin Giriş Yapmalısınız!
          <Link to="/giris" className="dropdown-item" href="#" style={{fontSize: '1.1em', color:"blue"}}>Giriş Yapın</Link>
          </b>:
            <div className="input-group mb-3" style={{marginBottom:'1px'}}>
              <input
                type="number"
                className="form-control"
                placeholder="Teklifiniz?"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                name="offerInput"
              />
              <button
                className="btn btn-outline-secondary btn-success"
                type="submit"
                id="button-addon1"
              >
                Teklif Et
              </button>
                 </div> }
            
          </form>
          
          <form onSubmit={(event) => handleOffer2(event, product)}>
          {localStorage.getItem("currentUser") == null ? 
          <b>
          <Link to="/giris" className="dropdown-item" href="#" style={{fontSize: '1.1em', color:"blue"}}></Link>
          </b>:
            <div className="input-group mb-3" style={{marginBottom:'1px'}}>
              
               {countdown < 0 ? (
        <button>Satın Al</button>
      ) : (
        <div>Açık Arttırmanın Bitmesine {countdown} saniye kaldı! </div>
      )}      </div> 
                 }
            
          </form>
        </div>
      ))}
    </div>
  );
}

export default Home;
