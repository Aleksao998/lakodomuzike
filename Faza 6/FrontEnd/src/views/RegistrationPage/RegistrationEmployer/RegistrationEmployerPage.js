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
      <div class="container">
        <div class="row">
          <div class="cont">
            <div class="col-9 form sign-in">
              <p>Sara</p>
            </div>
            <div class="col-3 sub-cont">
              <p>Aleksa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPageEmployer;
