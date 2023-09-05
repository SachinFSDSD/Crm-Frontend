import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

const BASE_URL = "https://crm-backend-2-uz3g.onrender.com";

function Login() {
  const [showSignup, setShowSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [userTypes, setValue] = useState("CUSTOMER");

  const handleSelect = (e) => {
    setValue(e);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const signUpContent = () => {
    return (
      <div>
        <h4 className="text-center">Signup</h4>
        <form onSubmit={signupFn}>
          <div>
            <input
              type="text"
              className="form-control my-3"
              placeholder="User Id"
              id="userId"
              required
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Username"
              id="username"
              required
            />
          </div>
          <input
            type="text"
            className="form-control my-3"
            placeholder="Email"
            id="email"
            required
          />
          <div className="input-group">
            <input
              type="password"
              className="form-control my-1"
              placeholder="Password"
              id="password"
              required
            />
          </div>

          <div className="input-group m-3">
            <span className="text-muted my-1 mx-2"> User Type</span>
            <DropdownButton
              align="end"
              title={userTypes}
              id="userTypes"
              onSelect={handleSelect}
              variant="light"
              className="mx-1"
            >
              <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
              <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="input-group m-1">
            <input
              type="submit"
              className="form-control btn btn-primary m-3"
              value="Sign up"
            />
          </div>
          <div
            className="signup-btn text-center text-info"
            onClick={toggleSignup}
          >
            Already have an Account ? Login
          </div>
          <div className="auth-error-msg text-danger text-center">
            {message}
          </div>
        </form>
      </div>
    );
  };

  const loginFn = (e) => {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const data = {
      userId: userId,
      password: password,
    };
    e.preventDefault();
    axios
      .post(BASE_URL + "/crm/api/v1/auth/signin", data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message) {
            setMessage(response.data.message);
          } else {
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("userTypes", response.data.userTypes);
            localStorage.setItem("userStatus", response);
            localStorage.setItem("token", response.data.accessToken);
            if (response.data.userTypes === "CUSTOMER")
              window.location.href = "/customer";
            else if (response.data.userTypes === "ENGINEER")
              window.location.href = "/engineer";
            else window.location.href = "/admin";
          }
        }
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 401)
        )
          setMessage(error.response.data.message);
        else console.log(error);
      });
  };

  const signupFn = (e) => {
    const username = document.getElementById("username").value;
    const userId = document.getElementById("userId").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      name: username,
      userId: userId,
      email: email,
      userTypes: userTypes,
      password: password,
    };
    e.preventDefault();

    axios
      .post(BASE_URL + "/crm/api/v1/auth/signup", data)
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400)
          setMessage(error.response.data.message);
        else console.log(error);
      });
  };

  const loginContent = () => {
    return (
      <div>
        <h4 className="text-center">Login</h4>
        <form onSubmit={loginFn}>
          <div className="input-group m-2">
            <input
              type="text"
              className="form-control"
              placeholder="User Id"
              id="userId"
              required
            />
          </div>
          <div className="input-group m-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              required
            />
          </div>

          <div className="input-group m-2">
            <input
              type="submit"
              className="form-control btn btn-primary"
              value="Log in"
            />
          </div>
          <div
            className="signup-btn text-right text-info"
            onClick={toggleSignup}
          >
            Dont have an Account ? Signup
          </div>
          <div className="auth-error-msg text-danger text-center">
            {message}
          </div>
        </form>
      </div>
    );
  };

  return (
    <div id="loginPage">
      <div
        id="loginPage"
        className="bg-primary d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card m-5 p-5">
          <div className="row m-2">
            <div className="col">
              {showSignup ? signUpContent() : loginContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
