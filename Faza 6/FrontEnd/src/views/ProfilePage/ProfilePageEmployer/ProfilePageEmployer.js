import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ProfilePageEmployer() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/joe-gardner-2.jpg")}
              />
            </div>
            <div className="name">
              <h4 className="title">
                Jane Faker <br />
              </h4>
            </div>
          </div>
          <row>
            <div class="CreateAdd">
              <h4 style={{ marginBottom: "10px" }}>Postavi oglas</h4>
              <div className="addForm">
                <Input type="text" placeholder="Naziv oglasa"></Input>
              </div>
              <div className="addForm">
                <Input type="text" placeholder="Opis"></Input>
              </div>
              <div className="addForm">
                <Label
                  className="form-check-label"
                  style={{ marginLeft: "40px" }}
                >
                  <Input
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                    defaultChecked
                  />
                  Rock
                  <span className="form-check-sign"></span>
                </Label>

                <Label
                  className="form-check-label"
                  style={{ marginLeft: "40px" }}
                >
                  <Input
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                    defaultChecked
                  />
                  Narodna
                  <span className="form-check-sign"></span>
                </Label>

                <Label
                  className="form-check-label"
                  style={{ marginLeft: "40px" }}
                >
                  <Input
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                    defaultChecked
                  />
                  Dj
                  <span className="form-check-sign"></span>
                </Label>
              </div>
              <div className="addForm">
                <Input type="date"></Input>
              </div>
              <div className="addForm">
                <Input type="text" placeholder="cena"></Input>
              </div>
              <div className="addForm">
                <Input type="text" placeholder="Lokacija"></Input>
              </div>

              <div className="addForm">
                <Button color="success">Postavi oglas</Button>
              </div>
            </div>
          </row>

          <row></row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePageEmployer;
