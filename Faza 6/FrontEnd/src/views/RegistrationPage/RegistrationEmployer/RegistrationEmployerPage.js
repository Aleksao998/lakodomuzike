import React from "react";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

function RegisterPageEmployer() {
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
              <span class="login100-form-title-1">
                Registruj se kao poslodavac
              </span>
            </div>

            <form class="login100-form validate-form">
              <div
                class="wrap-input100 validate-input m-b-26"
                data-validate="Username is required"
              >
                <span class="label-input100">Username</span>
                <input
                  class="input100"
                  type="text"
                  name="username"
                  placeholder="Izaberite Vaš UserName"
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
                  name="pass"
                  placeholder="Unesite Vašu šifru"
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
                  name="pass"
                  placeholder="Ponovite šifru"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-18"
                data-validate="adr is required"
              >
                <span class="label-input100">Adresa</span>
                <input
                  class="input100"
                  type="text"
                  name="adr"
                  placeholder="Unesite Vašu adresu"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-18"
                data-validate="kontaktBr is required"
              >
                <span class="label-input100">Kontakt</span>
                <input
                  class="input100"
                  type="text"
                  name="kontaktBr"
                  placeholder="Unesite Vaš kontakt telefon"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="container-login100-form-btn"
                style={{
                  marginTop: "10px",
                }}
              >
                <button class="login100-form-btn">Registruj se</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPageEmployer;
