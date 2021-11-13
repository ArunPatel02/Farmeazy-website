import React, { useContext, useEffect, useState } from "react";
// import { products } from "../Products";
import { Productcontext } from "../context/Productdata";

import "../css/Products.css";
import Loader from "./Loader";
import Productcard from "./Productcard";

const Products = () => {
  // const [loader, setloader] = useState(false)
  const [productdata, setproductdata] = useState([]);
  const { getproduct } = useContext(Productcontext);

  

  useEffect(() => {
    getproduct().then((data) => {
      console.log(data);
      setproductdata(data);
      // eslint-disable-next-line
    });
  }, [getproduct]);


  return (
    <div className="product_container">
      <div className="head">
        <h2>Our Products</h2>{" "}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>{" "}
      </div>
        {productdata.length > 0 ? <Loader loader={false}/>: <Loader loader={true}/>}
      <div className="allproducts">

        {/* {productsearch && console.log(productsearch) } */}

        {productdata &&
          productdata.map((val) => {
            return (
              <Productcard
                key={val.id}
                name={val.product_name}
                currentprice={val.product_price}
                image={val.product_images[0] && val.product_images[0].url}
                id={val.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Products;
