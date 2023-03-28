import React, { useEffect, useState } from "react";

function DenemeHome() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const url = "/products";
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
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: parseFloat(newPrice)
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // updated product object returned by the API
      setProduct(prevState => {
        const updatedProductIndex = prevState.findIndex(p => p.productId === product.productId);
        const updatedProducts = [...prevState];
        updatedProducts[updatedProductIndex] = data;
        return updatedProducts;
      });
    })
    .catch(error => console.error(error));

    event.target.elements.offerInput.value = '';

  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
            <b className="card-text">Güncel Fiyat: {product.price} TL</b>
          </div>
          <form onSubmit={(event) => handleOffer(event, product)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Teklifinizi girin"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                name="offerInput"
              />
              <button
                className="btn btn-outline-secondary btn-success"
                type="submit"
                id="button-addon1"
              >
                Teklifi Ver
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default DenemeHome;