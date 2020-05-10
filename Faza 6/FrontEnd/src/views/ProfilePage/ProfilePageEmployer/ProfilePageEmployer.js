import React from "react";
import MaterialTable from "material-table";
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

import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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
          <br></br>
          <br></br>
          <row>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "Id oglasa", field: "addId" },
                { title: "Opis", field: "addDescription" },
                { title: "Datum isteka", field: "addEndDate" },
              ]}
              data={[
                {
                  addId: "1231",
                  addDescription: "Ovde ide neki opis",
                  addEndDate: "24.05.2020",
                },
              ]}
              actions={[
                {
                  icon: "save",
                  tooltip: "Open detail",
                  onClick: (event, rowData) => {
                    console.log("save Action");
                  },
                },
                {
                  icon: "delete",
                  tooltip: "Delete User",
                  onClick: (event, rowData) => {
                    console.log("delete Action");
                  },
                },
              ]}
              options={{
                pageSize: 5,
                paging: true,
              }}
              localization={{
                pagination: {
                  labelRowsPerPage: "6",
                },
              }}
              title="Aktivni oglasi"
            />
          </row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ProfilePageEmployer;
