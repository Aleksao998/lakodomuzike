import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function FooterBlack() {
  return (
    <div
      className="footer footer-black "
      style={{
        backgroundColor: "black",
        bottom: "0px",
        position: "absolute",
        width: "100%",
      }}
    >
      <Container>
        <Row>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Lavs
            </span>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default FooterBlack;
