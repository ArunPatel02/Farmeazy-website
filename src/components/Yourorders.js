import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Productcontext } from "../context/Productdata";
import "../css/cart.css";
import Orderitem from "./Orderitem";

const Yourorders = () => {
  const { getorders } = useContext(Productcontext);
  const [prevorder, setprevorder] = useState({ result: [] });

  useEffect(() => {
    getorders().then((data) => {
      console.log(data);
      setprevorder(data);
    });
  }, [getorders]);

  return (
    <section className="main-cart-section">
      <h1>Yourorders</h1>
      <div className="cart-items">
        {/* {prevorder?prevorder.result.map((data)=>{
                  return data.items.map((item)=>{
                    {console.log(item)}
                    return <Orderitem key={item.id + data.id} product_name={item.product_name} product_price={item.product_price} />
                  })
              }):console.log('loading')} */}

        {prevorder.result.length>0
          ? prevorder.result.map((data) => {
              return (
                  <Orderitem
                    items={data.items}
                    date = {data.date}
                    totalItem = {data.totalItem}
                    id = {data.id}
                  />
                );
            })
          : console.log("loading")}
      </div>
    </section>
  );
};

export default Yourorders;
