import React from "react";
import MaterialTable from "material-table";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";

//table
import tableIcons from "../../../assets/table";

function ProfilePageMusician(props) {
  const alert = useAlert();

  //state
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

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
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
          var title = element.adName;
          var addId = element.ad;
          var id = element._id;
          var accepted = element.accepted;
          var status;
          switch (accepted) {
            case "rejected":
              status = "odbijen";
              break;
            case "accepted":
              status = "prihvaceno";
              break;
            default:
              status = "Ceka se";
          }

          var obj = {
            price,
            title,
            addId,
            id,
            accepted,
            status,
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

  const deleteSignedAdd = (rowData) => {
    fetch("http://localhost:5000/api/v1/registredmusician/" + rowData.id, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        alert.success("Uspesno ste se odjavili sa oglasa");
        setAdds(adds.filter((item) => item.id !== rowData.id));
      })
      .catch((err) => {
        alert.error("Doslo je do greske");
      });
  };
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
                    { title: "Naziv oglasa", field: "title" },
                    { title: "Price", field: "price" },
                    {
                      title: "Status",
                      field: "status",
                      render: (rowData) => {
                        return rowData.status == "odbijen" ? (
                          <p style={{ color: "#FF0000", fontWeight: "bold" }}>
                            {rowData.status}{" "}
                          </p>
                        ) : rowData.status == "prihvaceno" ? (
                          <p style={{ color: "#4BB543", fontWeight: "bold" }}>
                            {rowData.status}{" "}
                          </p>
                        ) : (
                          <p style={{ fontWeight: "bold" }}>{rowData.status}</p>
                        );
                      },
                    },
                  ]}
                  actions={[
                    {
                      icon: "delete",
                      tooltip: "Delete User",
                      onClick: (event, rowData) => {
                        deleteSignedAdd(rowData);
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
