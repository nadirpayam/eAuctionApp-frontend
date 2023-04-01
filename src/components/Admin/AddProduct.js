import axios from "axios";
import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [sold, setSold] = useState("");
  const token = localStorage.getItem("tokenKey");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("file", file);
    formData.append("sold", 0);

    try {
      const response = await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container cont1">
    <div className="card card1">
      <div className="card-body body1">
        <h5 className="card-title title1">Ürün Bilgilerini Girin</h5>
        <form onSubmit={handleSubmit}>
          <label className="lab lab1">
            Ürün Adı
            <input
              className="form-control input1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="lab1">
            Fiyatı
            <input
              className="form-control input1"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="lab1">
            Görseli
            <input
              className="form-control input1"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <button type="submit" className="btn btn-success buttonum">
            Ürünü Ekle
          </button>
        </form>
      </div>
    </div>
  </div>
    
  )
}

export default AddProduct;