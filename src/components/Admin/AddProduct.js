import axios from "axios";
import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [sold, setSold] = useState("");

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
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="container div">
    <div class="card card1">
      <div class="card-body bodyy">
        <h5 class="card-title title">Ürün Bilgilerini Girin</h5>
        <form onSubmit={handleSubmit}>
          <label className="lab">
            Ürün Adı
            <input
              className="form-control etiket"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="lab">
            Fiyatı
            <input
              className="form-control etiket"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="lab">
            Görseli
            <input
              className="form-control etiket"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <button type="submit" class="btn btn-success buttonum">
            Ürünü Ekle
          </button>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default AddProduct;