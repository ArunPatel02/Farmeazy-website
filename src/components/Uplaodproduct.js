import React, { useState } from "react";

import "../css/uploadproduct.css";

const Uplaodproduct = (props) => {
  const [productDetail, setproductDetail] = useState({
    product_name: "",
    product_price: 0,
    product_stock: 0,
    product_desc: "",
    product_composition: "",
    product_usage: "",
  });
  const [file, setfile] = useState([]);

  const productform = (e) => {
    e.preventDefault();
    props.setloader(true);
    console.log(file);
    let formData = new FormData();
    file.forEach((doc) => {
      formData.append("product_images", doc);
    });
    formData.append("product_name", productDetail.product_name);
    formData.append("product_price", productDetail.product_price);
    formData.append("product_stock", productDetail.product_stock);
    formData.append("product_desc", productDetail.product_desc);
    formData.append("product_composition", productDetail.product_composition);
    formData.append("product_usage", productDetail.product_usage);

    fetch("https://farmeazy-api.herokuapp.com/upload", {
      // content-type header should not be specified!
      method: "POST",
      body: formData,
      // body: data,
      // file : file,
    })
      .then((response) => response.json())
      .then((success) => {
        // Do something with the successful response
        console.log(success);
        props.setloader(false);
        setproductDetail({
          product_name: "",
          product_price: 0,
          product_stock: 0,
          product_desc: "",
          product_composition: "",
          product_usage: "",
        });
        setfile([]);
        alert("uploaded succesfully");
      })
      .catch((error) => console.log(error));
  };

  const onChange = (e) => {
    setproductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  return (
    <div className="uploadproduct" onSubmit={productform}>
      <form className="productdetail">
        <input
          type="text"
          name="product_name"
          id="product_name"
          placeholder="Enter product name"
          value={productDetail.product_name}
          onChange={onChange}
        />
        <input
          type="number"
          name="product_price"
          id="product_price"
          placeholder="Enter product price"
          value={productDetail.product_price}
          onChange={onChange}
        />
        <input
          type="number"
          name="product_stock"
          id="product_stock"
          placeholder="Enter no of products present"
          value={productDetail.product_stock}
          onChange={onChange}
        />
        <textarea
          type="text"
          name="product_desc"
          id="product_desc"
          placeholder="Enter product detail"
          value={productDetail.product_desc}
          onChange={onChange}
        ></textarea>
        <textarea
          type="text"
          name="product_composition"
          id="product_composition"
          placeholder="Enter product composition"
          value={productDetail.product_composition}
          onChange={onChange}
        ></textarea>
        <textarea
          type="text"
          name="product_usage"
          id="product_usage"
          placeholder="How to use"
          value={productDetail.product_usage}
          onChange={onChange}
        ></textarea>
        <input
          type="file"
          name="product_images"
          id="Product_images"
          multiple={true}
          onChange={(e) => {
            // console.log([...e.target.files])
            setfile([...e.target.files]);
          }}
        />
        <button type="submit">Add To Products</button>
      </form>
      {/* <img src={file} alt="........." srcset="" /> */}
    </div>
  );
};

export default Uplaodproduct;
