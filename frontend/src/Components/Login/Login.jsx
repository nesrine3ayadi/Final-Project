import React, { useState } from "react";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from 'react-redux'
import { signIn } from '../../Actions/action'
import jwt_decode from "jwt-decode";

function Login(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Msg, setMsg] = useState("");

  const loginUser = (e) => {

    Axios
      .post("http://localhost:5000/login", { email,password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        
        var token = localStorage.getItem("token");
        var decoded = jwt_decode(token);
        console.log(decoded.role);
        props.signIn(decoded.id)
        (decoded.role==="admin") ?
        props.history.push("/dashboard") :
        props.history.push("/home");
        // props.displayCurrentUser(res.data.token)
      })
      .catch(err => {
        setMsg("** Please verify your login & password !!!");
        setPassword("");
      });
  };
  return (
    <div>
      <div className="container">
        <div className="form">
          <div className="sign-in-section">
            <h1>Sign In</h1>
            <ul>
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
              <li>
                <i className="fab fa-linkedin-in"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </ul>
            <p>or use your email</p>
         
              <div className="form-field">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="form-field">
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              <div className="form-options">
                <div className="checkbox-field">
                  <input id="rememberMe" type="checkbox" className="checkbox" />
                  <label for="rememberMe">Remember Me</label>
                </div>
                <a href="#">Forgot Password?</a>
              </div>
              <div >
                      <button className = "btn btn-signin" onClick={()=>loginUser()}>submit</button> 
              </div>
                  
            <div className="links">
              {/* <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a> */}
              {Msg}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  withRouter(connect(null, { signIn }) (Login )  );
