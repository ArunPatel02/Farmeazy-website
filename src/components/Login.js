import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Usercontext } from "../context/Userdata";
import "../css/Login.css";
import cookies from 'js-cookie';

export default function Login(props) {
  const {registeruser , loginuser} = useContext(Usercontext)

  const history = useHistory();

  if(cookies.get('token')){
    history.goBack();
  }

  const [logindata, setlogindata] = useState({ email: "", password: "" });
  const [signupdata, setsignupdata] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    document.getElementById("login").classList.toggle("toggle_login");
  };

  useEffect(() => {
    const input = document.getElementsByClassName("input");
    const error_msg = document.getElementsByClassName("error_msg");
    // const regx = /^\w+([\.-]?\w+)*@gmail.com/

    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener('change', (e) => {
        console.log(e.target.value)
        // if (e.target.name === "email") {
        //   if (!regx.test(e.target.value)) {
        //     error_msg[i].innerHTML = "invalid email";
        //     input[i].classList.remove("success");
        //     input[i].classList.add("error");
        //   } else {
        //     input[i].classList.remove("error");
        //     input[i].classList.add("success");
        //   }
        // }
        if (e.target.name === "password") {
          if (e.target.value.length < 8) {
            error_msg[i].innerHTML = "password should be minimun of 8 character";
            input[i].classList.remove("success");
            input[i].classList.add("error");
          } else {
            input[i].classList.remove("error");
            input[i].classList.add("success");
          }
        }
        if (e.target.name === "conform_password") {
          if (e.target.value !== signupdata.password) {
            error_msg[i].innerHTML = "password did not match";
            input[i].classList.remove("success");
            input[i].classList.add("error");
          } else {
            input[i].classList.remove("error");
            input[i].classList.add("success");
          }
        }
        if (e.target.name === "username") {
          if (e.target.value.length < 5) {
            error_msg[i].innerHTML = "username should be minimun of 8 character";
            input[i].classList.remove("success");
            input[i].classList.add("error");
          } else {
            input[i].classList.remove("error");
            input[i].classList.add("success");
          }
        }
      });
    }
  });

  const logindata_change = (e) => {
    setlogindata({ ...logindata, [e.target.name]: e.target.value });
  };

  const signupdata_change = (e) => {
    setsignupdata({ ...signupdata, [e.target.name]: e.target.value });
  };

  const handleregister = (e)=>{
      e.preventDefault();
      props.setloader(true)
      registeruser(signupdata).then((data)=>{
        console.log(data);
        props.setloader(false)
        if (data.success) {
          cookies.set('token' , data.userdata.token , { expires: 7 })
          history.goBack();
        }
        else{
          alert(data.error)
        }
      })
  }

  const handlelogin= (e)=>{
      e.preventDefault();
      props.setloader(true)
      loginuser(logindata).then((data)=>{
        console.log(data);
        props.setloader(false)
        if (data.success) {
          cookies.set('token' , data.userdata.token , { expires: 7 })
          history.goBack();
        }
        else{
          alert(data.error)
        }
      })
  }

  return (
    <>
      <div className="login_signup">
        <div className="login_container">
          <h1>Register With Us</h1>
          <form  id="form" className="form" onSubmit={handleregister}>
            <div className="input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                autoComplete="off"
                value={signupdata.username}
                onChange={signupdata_change}
                required
              />
              <small className="error_msg">Error Message</small>
            </div>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="off"
                value={signupdata.email}
                onChange={signupdata_change}
                required
              />
              <small className="error_msg">Error Message</small>
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={signupdata.password}
                onChange={signupdata_change}
                required
              />
              <small className="error_msg">Error Message</small>
            </div>
            <div className="input">
              <label htmlFor="c-password">Conform-Password</label>
              <input
                type="password"
                name="conform_password"
                id="conform_password"
                placeholder="Confirm Password"
                required
              />
              <small className="error_msg">Error Message</small>
            </div>
            <button type="submit">Submit</button>
            <button onClick={handleclick}>login</button>
          </form>
        </div>

        <div id="login" className="login_container active">
          <h1>Login </h1>
          <form id="login_form" className="form" onSubmit={handlelogin}>
            <div className="input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                value={logindata.email}
                onChange={logindata_change}
                required
              />
              <small className="error_msg">Error Message</small>
            </div>
            <div className="input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={logindata.password}
                onChange={logindata_change}
                required
              />
              <small className="error_msg">Error Message</small>
            </div>
            <button type="submit">Submit</button>
            <button onClick={handleclick}>signup</button>
          </form>
        </div>
      </div>
    </>
  );
}
