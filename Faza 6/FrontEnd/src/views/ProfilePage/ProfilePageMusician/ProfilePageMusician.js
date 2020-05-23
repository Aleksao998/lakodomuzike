import React from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";

//Table
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

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

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

function ProfilePageMusician(props) {
  const [adds, setAdds] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("1");
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [youtube, setYoutube] = React.useState("");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    fetch("http://localhost:5000/api/v1/musician/" + props.match.params.id, {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        setDescription(resData.data.description);
        setName(resData.data.name);
        setlastName(resData.data.surname);
        setFacebook(resData.data.socialMedia.Facebook);
        setInstagram(resData.data.socialMedia.Instagram);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      "http://localhost:5000/api/v1/musician/" +
        props.userId +
        "/registredmusician",
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        var array = [];
        resData.data.forEach((element) => {
          var price = element.price;
          var title = element.title;
          var addId = element.ad;
          var id = element._id;
          var accepted = element.accepted;
          var obj = {
            price,
            title,
            addId,
            id,
            accepted,
          };
          array.push(obj);
        });
        setAdds(array);
      })
      .catch((err) => {
        console.log(err);
      });
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);

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
                {name}, {lastName} <br />
              </h4>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              <h6 className="description">Vrsta muzike: Pop, Rock</h6>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>{description}</p>
              <br />
            </Col>
            <div class="col-md-12 social-media text-center">
              <a href={youtube}>
                <i class="fa fa-youtube"></i>
              </a>
              <a href={facebook}>
                <i class="fa fa-facebook"></i>
              </a>
              <a href={instagram}>
                <i class="fa fa-instagram"></i>
              </a>
            </div>
          </Row>
          {props.match.params.id === props.userId ? (
            <row>
              <div style={{ marginTop: "30px" }}>
                <MaterialTable
                  icons={tableIcons}
                  data={adds}
                  columns={[
                    { title: "Id oglasa", field: "addId" },
                    { title: "Naziv oglasa", field: "title" },
                    { title: "Price", field: "price" },
                    { title: "id ", field: "id" },
                  ]}
                  actions={[
                    {
                      icon: "delete",
                      tooltip: "Delete User",
                      onClick: (event, rowData) => {
                        fetch(
                          "http://localhost:5000/api/v1/registredmusician/" +
                            rowData.id,
                          {
                            method: "DELETE",
                            headers: {
                              Authorization:
                                "Bearer " + localStorage.getItem("token"),
                            },
                          }
                        )
                          .then((res) => {
                            if (res.status !== 200) {
                              throw new Error("Error creating User");
                            }
                            return res.json();
                          })
                          .then((resData) => {
                            setAdds(
                              adds.filter((item) => item.id !== rowData.id)
                            );
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      },
                    },
                    {
                      icon: "search",
                      tooltip: "View Add",
                      onClick: (event, rowData) => {
                        props.history.push(
                          "/single-add-detail/" + rowData.addId
                        );
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
                  title="Moji oglasi"
                />
              </div>
            </row>
          ) : null}
          <br />
        </Container>
      </div>
    </>
  );
}

export default withRouter(ProfilePageMusician);
