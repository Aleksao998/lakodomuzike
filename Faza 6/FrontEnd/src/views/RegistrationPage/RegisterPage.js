import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components

function RegisterPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
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
              <span class="login100-form-title-1">registracija</span>
            </div>

            <div
              class="registration-type"
              style={{
                marginTop: "20px",
              }}
            >
              <span></span>
              <span
                class="login100-form-title-1"
                style={{
                  marginTop: "20px",
                  color: "black",
                  justifyContent: "center",
                }}
              >
                REGISTRUJ SE KAO:
              </span>
              <div
                class="container-login100-form-btn"
                style={{
                  margin: "20px",
                }}
              >
                <a href="http://localhost:3000/register-page-employer">
                  <button class="login100-form-btn">POSLODAVAC</button>
                </a>
              </div>
              <div
                class="container-login100-form-btn"
                style={{
                  margin: "20px",
                }}
              >
                <a href="http://localhost:3000/register-page-musician">
                  <button class="login100-form-btn">MUZIČAR</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
