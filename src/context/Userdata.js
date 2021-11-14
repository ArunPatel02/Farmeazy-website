// import Cookies from 'js-cookie';
import React, { createContext } from 'react'

export const Usercontext = createContext()

const Userdata = (props) => {
    const registeruser = async(signupdata)=>{
        try {
            const response = await fetch("https://farmeazy-api.herokuapp.com/api/auth/signup", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify(signupdata)
          });
          const data = await response.json();
          return data;
        } catch (error) {
            return {'succes' : false , 'error' : "server error"};
        }
    }

    const loginuser = async(logindata)=>{
        try {
            const response = await fetch("https://farmeazy-api.herokuapp.com/api/auth/login", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify(logindata)
          });
          const data = await response.json();
          return data;
        } catch (error) {
            return {'succes' : false , 'error' : "server error"};
        }
    }

    const getuser = async()=>{
        try {
            const response = await fetch("https://farmeazy-api.herokuapp.com/api/auth/getuser", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            }
          });
          const data = await response.json();
          return data;
        } catch (error) {
            return {'succes' : false , 'error' : "server error"};
        }
    }
    return (
       <Usercontext.Provider value={{registeruser , loginuser , getuser}}>
           {props.children}
       </Usercontext.Provider>
    )
}

export default Userdata
