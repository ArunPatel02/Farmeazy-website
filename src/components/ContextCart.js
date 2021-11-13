import Items from "./Items";
import { React, useContext, useEffect, useState } from "react";
import { cartContax } from "../context/Cart";
// import { products } from "../Products";
import '../css/cart.css'
import "../css/uploadproduct.css";

import { Productcontext } from "../context/Productdata";
import Cookies from "js-cookie";

const ContextCart = () => {
  const { item, totalItem, totalAmount, clearCart } = useContext(cartContax);
  const { placeorder } = useContext(Productcontext)

  const [buyerdata, setbuyerdata] = useState({ buyer_name : "" , mobile_no: "", address: "", pincode: "", state: "" })

  useEffect(() => {
    const arr = item.map((curr) => ({ id: curr.id }))
    console.log(arr)
  }, [item, totalItem])

  const placeyourorder = (e) => {
    e.preventDefault();
    if (!Cookies.get("token")) {
      return alert('login to place your order')
    }
    const itemdata = item.map((item) => { return ({ id: item.id, product_name: item.product_name, product_price: item.product_price, quantity: item.quantity, product_images: item.product_images[0].url }) })
    const orderdata = { items: itemdata, totalItem, totalAmount, ...buyerdata , date : new Date().toLocaleString()}
    placeorder(orderdata).then((data) => {
      console.log(data)
      if (data.success) {
        const message = `your order with order id = ${data.order_id} has been succesfully placed.`
        fetch(`https://rapidapi.rmlconnect.net:9443/bulksms/bulksms?username=rapid-H22u4974110000&password=617bf21a245383001100f821&type=0&dlr=0&destination=+919009033511&source=RMLPRD&message=${message}`, {
          method: 'GET',
        }).then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        alert("your order have been suceesfully placed");
        clearCart();
      } else {
        alert(data.error)
      }
    })
  }

  const onChange = (e) => {
    setbuyerdata({ ...buyerdata, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="main-cart-section">
        <h1>shopping Cart</h1>
        <p className="total-items">
          you have <span className="total-items-count"> {totalItem} </span>{" "}
          items in shopping cart
        </p>

        <div className="cart-items">
          <div className="cart-items-container">
            {item && item.map((currItem, index) => {
              return <Items key={currItem.id} index={index} {...currItem} />;
            })}
          </div>
        </div>

        <div className="card-total">
          <h3>
            Cart Total : <span>{totalAmount}rs </span>
          </h3>
          <button onClick={() => document.querySelector('.details_order').classList.add("active")}>checkout</button>
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </section>
      <div className="uploadproduct details_order">
        <form className="productdetail" onSubmit={placeyourorder}>
          <input type="text" name="buyer_name" id="buyer_name" placeholder="Enter  name" required value={buyerdata.buyer_name}
          onChange={onChange}/>
          <input type="text" name="mobile_no" id="mobile_no" placeholder="Enter mobile number" required value={buyerdata.mobile_no}
          onChange={onChange}/>
          <input type="text" name="address" id="address" placeholder="Enter full address" required value={buyerdata.address}
          onChange={onChange}/>
          <input type="text" name="pincode" id="pincode" placeholder="Enter pincode" required value={buyerdata.pincode}
          onChange={onChange}/>
          <input type="text" name="state" id="state" placeholder="state" required value={buyerdata.state}
          onChange={onChange}/>
          <div className="buttons">
          <button type="submit">Conform</button>
          <button onClick={() => document.querySelector('.details_order').classList.remove("active")}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ContextCart;
