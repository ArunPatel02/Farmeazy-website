import Cookies from 'js-cookie';
import React, { createContext } from 'react'

export const Productcontext = createContext();

const Productdata = (props) => {

  const getproduct = async()=>{
    try {
        const response = await fetch(`/getproducts`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    } catch (error) {
        return {'succes' : false , 'error' : error.message};
    }
}

const getproductbyid = async(id)=>{
  try {
      const response = await fetch(`/getproducts/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
      return {'succes' : false , 'error' : error.message};
  }
}

const placeorder = async(orderdetail)=>{
  try {
      const response = await fetch("https://farmeazy-api.herokuapp.com/api/auth/orderplace", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : Cookies.get("token")
      },
      body : JSON.stringify(orderdetail)
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
      return {'succes' : false , 'error' : "server error"};
  }
}

const getorders = async(id)=>{
  try {
      const response = await fetch(`/api/auth/getorders`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : Cookies.get("token")
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
      return {'succes' : false , 'error' : error.message};
  }
}


    return (
        <Productcontext.Provider value={{getproduct , getproductbyid , placeorder , getorders}} >
      
          {props.children}
        </Productcontext.Provider>
    )
}

export default Productdata
