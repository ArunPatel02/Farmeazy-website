import React, { createContext, useReducer } from "react";
// import { products } from "../Products";
import reducer from "../reducer";
import { useEffect } from "react/cjs/react.development";
// import ContextCart from "./ContextCart";

export const cartContax = createContext();

const initialstate = {
  item: [],
  totalAmount: 0,
  totalItem: 0,
};

const Cart = (props) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  const removeItem = (id) => {
    // console.log(`caling dispatch function`)
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  const addItem = (id) => {
    // console.log(id)
    return dispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  };
  
  const clearCart = () => {
    return dispatch({
      type: "CLEAR_CART",
    });
  };

  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  const decrement = (id) => {
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  useEffect(() => {
    dispatch({
      type: "GET_TOTAL",
    });
  }, [state.item]);

  return (
    <>
      <cartContax.Provider
        value={{state.item,
  state.totalAmount,
  state.totalItem , removeItem, clearCart, increment, decrement  , addItem}}
      >

        {/* <ContextCart /> */}
        {props.children}
      </cartContax.Provider>
    </>
  );
};
export default Cart;
