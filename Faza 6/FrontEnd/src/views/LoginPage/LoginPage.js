import React, { useState } from "react";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
function LoginPage(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const login = (event) => {
    event.preventDefault();
    console.log(state.email);
    console.log(state.password);
    fetch("http://localhost:5000/api/v1/auth/login ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("id", resData.data);
        props.history.push("/profile-page-employer/" + resData.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <div
              class="login100-form-title"
              style={{
                backgroundImage: "url(" + require("assets/img/bg-01.jpg") + ")",
              }}
            >
              <span class="login100-form-title-1">Sign In</span>
            </div>

            <form class="login100-form validate-form">
              <div
                class="wrap-input100 validate-input m-b-26"
                data-validate="Username is required"
              >
                <span class="label-input100">Email</span>
                <input
                  name="email"
                  class="input100"
                  type="text"
                  onChange={handleOnChange}
                  placeholder="Enter Email"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-18"
                data-validate="Password is required"
              >
                <span class="label-input100">Password</span>
                <input
                  class="input100"
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  placeholder="Enter password"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="container-login100-form-btn"
                style={{
                  marginTop: "10px",
                }}
              >
                <button class="login100-form-btn" onClick={login}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(LoginPage);
