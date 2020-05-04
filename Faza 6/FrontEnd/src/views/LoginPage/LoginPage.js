import React from "react";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

function LoginPage() {
  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <div class="container">
        <div class="row">
          <div class=" cont">
            <div class="form sign-in">
              <h2>Dobrodošli</h2>
              <label>
                <span>Email</span>
                <input type="email" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" />
              </label>
              <button type="button" class="submit">
                Sign In
              </button>
            </div>
            <div class="sub-cont">
              <div class="img">
                <div class="img__text m--up"></div>
                <div class="img__text m--up">
                  <h2>New here?</h2>
                  <p>Sign up and discover great amount of new opportunities!</p>
                </div>

                <div class="img__btn">
                  <span class="m--up">Sign Up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
