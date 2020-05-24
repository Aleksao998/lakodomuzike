import React from "react";
import MaterialTable from "material-table";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";
// reactstrap components
import { Button, Label, Input, Container } from "reactstrap";

// core components

import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/FooterBlack";

//table
import tableIcons from "../../../assets/table";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minheight: "450px",
    width: "30%",
    transform: "translate(-50%, -50%)",
    zIndex: "2!important",
  },
};

const ProfilePageEmployer = (props) => {
  const alert = useAlert();
  const [state, setState] = React.useState({
    adName: "",
    description: "",
    date: "",
    time: "",
    priceFrom: "",
    priceTo: "",
    location: "",
    number: "",
    city: "",
    selectedOption: "Rock",
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("1");
  const [name, setName] = React.useState("");
  const [adds, setAdds] = React.useState([]);
  const [addsDetail, setAddsDetail] = React.useState([]);
  const [lastname, setLastname] = React.useState("");
  const [id, setId] = React.useState("");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    fetch(
      "http://localhost:5000/api/v1/employer/" + localStorage.getItem("id"),
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        setName(resData.data.name);
        setLastname(resData.data.surname);
        setId(resData.data._id);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      "http://localhost:5000/api/v1/employer/" +
        localStorage.getItem("id") +
        "/ad",
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        var array = [];
        resData.data.forEach((element) => {
          var addName = element.adName;
          var addDescription = element.description;
          var addEndDate = element.maintenanceDate.date.slice(0, 10);
          var addId = element._id;
          var obj = {
            addName,
            addDescription,
            addEndDate,
            addId,
          };
          array.push(obj);
        });
        console.log(array);
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
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const postAdd = (event) => {
    var url;
    switch (state.selectedOption) {
      case "Rock":
        url = "/img/TypeOfMusicImg/Rock.jpg";
        break;
      case "Narodna":
        url = "/img/TypeOfMusicImg/narodna.jpg";
        break;
      case "Dj":
        url = "/img/TypeOfMusicImg/dj.jpg";
        break;
    }
    event.preventDefault();
    fetch("http://localhost:5000/api/v1/employer/" + id + "/ad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        adName: state.adName,
        maintenanceDate: {
          date: state.date,
          time: state.time,
        },
        typeOfMusic: state.selectedOption,

        priceFrom: state.priceFrom,
        priceTo: state.priceTo,
        location: {
          address: state.location,
          number: state.number,
          city: state.city,
        },
        url: url,
        description: state.description,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        var addName = state.addName;
        var addDescription = state.description;
        var addEndDate = state.date.slice(0, 10);
        var addId = resData.data._id;
        var obj = {
          addName,
          addDescription,
          addEndDate,
          addId,
        };
        setAdds([...adds, obj]);
        setState({
          adName: "",
          description: "",
          date: "",
          time: "",
          priceFrom: "",
          priceTo: "",
          location: "",
          number: "",
          city: "",
        });
        alert.success("Uspesno ste postavili oglas");
      })
      .catch((err) => {
        alert.error("Doslo je do greske");
      });
  };
  const handleOptionChange = (changeEvent) => {
    setState({ ...state, ["selectedOption"]: changeEvent.target.value });
  };
  function openModal(id) {
    fetch("http://localhost:5000/api/v1/ad/" + id + "/registredmusician", {
      method: "GET",
    })
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
          var ad = element.ad;
          var price = element.price;
          var Mid = element.musician;
          var musicianName = element.musicianName;
          var id = element._id;
          var accepted = element.accepted;

          var obj = {
            price,
            Mid,
            id,
            musicianName,
            accepted,
            ad,
          };
          array.push(obj);
        });
        setAddsDetail(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement(document.getElementById("root"));
  return (
    <>
      <ProfilePageHeader />

      <div className="section profile-content" style={{ zIndex: "0" }}>
        <Container>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
              Prijavljeni na oglas
            </h2>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "Cena", field: "price" },
                {
                  title: "Muzicar",
                  field: "musicianName",
                  render: (rowData) => {
                    return rowData.accepted == "rejected" ? (
                      <p style={{ color: "#FF0000", fontWeight: "bold" }}>
                        {rowData.musicianName}{" "}
                      </p>
                    ) : rowData.accepted == "accepted" ? (
                      <p style={{ color: "#4BB543", fontWeight: "bold" }}>
                        {rowData.musicianName}{" "}
                      </p>
                    ) : (
                      <p style={{ fontWeight: "bold" }}>
                        {rowData.musicianName}
                      </p>
                    );
                  },
                },
              ]}
              data={addsDetail}
              actions={[
                {
                  icon: "add",
                  tooltip: "Prihvati ",
                  onClick: (event, rowData) => {
                    fetch(
                      "http://localhost:5000/api/v1/registredmusician/" +
                        rowData.id,
                      {
                        method: "PUT",
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          accepted: "accepted",
                        }),
                      }
                    )
                      .then((res) => {
                        if (res.status !== 200) {
                          throw new Error("");
                        }
                        return res.json();
                      })
                      .then((resData) => {
                        alert.success("Korisnik uspesno prihvacen");
                        openModal(rowData.ad);
                      })
                      .catch((err) => {
                        alert.error("Doslo je do greske");
                      });
                  },
                },
                {
                  icon: "delete",
                  tooltip: "Odbi",
                  onClick: (event, rowData) => {
                    fetch(
                      "http://localhost:5000/api/v1/registredmusician/" +
                        rowData.id,
                      {
                        method: "PUT",
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          accepted: "rejected",
                        }),
                      }
                    )
                      .then((res) => {
                        if (res.status !== 200) {
                          throw new Error("");
                        }
                        return res.json();
                      })
                      .then((resData) => {
                        alert.success("Uspesno ste obrisali oglas");
                        openModal(rowData.ad);
                      })
                      .catch((err) => {
                        alert.error("Doslo je do greske");
                      });
                  },
                },
                {
                  icon: "search",
                  tooltip: "Pogledaj korisnika",
                  onClick: (event, rowData) => {
                    props.history.push("/profile-page-musician/" + rowData.Mid);
                  },
                },
              ]}
              options={{
                pageSize: 5,
                paging: true,
                search: false,
              }}
              localization={{
                pagination: {
                  labelRowsPerPage: "6",
                },
              }}
              title=""
            />
            <button
              onClick={closeModal}
              className="btn"
              style={{ margin: "0 auto", marginTop: "10px" }}
            >
              close
            </button>
          </Modal>
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
                {name} {lastname} <br />
              </h4>
            </div>
          </div>
          <row>
            <div class="CreateAdd">
              <h4 style={{ marginBottom: "10px" }}>Postavi oglas</h4>
              <div className="addForm">
                <Input
                  value={state.adName}
                  onChange={handleOnChange}
                  name="adName"
                  type="text"
                  placeholder="Naziv oglasa"
                  className=""
                ></Input>
              </div>
              <div className="addForm">
                <Input
                  value={state.description}
                  onChange={handleOnChange}
                  name="description"
                  type="text"
                  placeholder="Opis"
                  class="inputField"
                ></Input>
              </div>
              <div className="addForm">
                <Label
                  className="form-check-label"
                  style={{ marginLeft: "40px" }}
                >
                  <Input
                    onChange={handleOptionChange}
                    checked={state.selectedOption === "Rock"}
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="Rock"
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
                    onChange={handleOptionChange}
                    checked={state.selectedOption === "Narodna"}
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="Narodna"
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
                    onChange={handleOptionChange}
                    checked={state.selectedOption === "Dj"}
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="Dj"
                    defaultChecked
                  />
                  Dj
                  <span className="form-check-sign"></span>
                </Label>
              </div>
              <div className="addForm row">
                <div className="col-6">
                  <Input
                    value={state.date}
                    type="date"
                    name="date"
                    onChange={handleOnChange}
                  ></Input>
                </div>
                <div className="col-6">
                  <Input
                    value={state.time}
                    name="time"
                    type="text"
                    placeholder="Vreme hh:mm"
                    onChange={handleOnChange}
                  ></Input>
                </div>
              </div>

              <div className="addForm">
                <Input
                  value={state.priceFrom}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="cenaOd"
                  name="priceFrom"
                ></Input>
              </div>
              <div className="addForm">
                <Input
                  value={state.priceTo}
                  onChange={handleOnChange}
                  type="text"
                  placeholder="cenaDo"
                  name="priceTo"
                ></Input>
              </div>
              <div className="addForm row">
                <div className="col-6">
                  <Input
                    value={state.location}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Lokacija"
                    name="location"
                  ></Input>
                </div>
                <div className="col-3">
                  <Input
                    value={state.number}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Broj"
                    name="number"
                  ></Input>
                </div>
                <div className="col-3">
                  <Input
                    value={state.city}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Grad"
                    name="city"
                  ></Input>
                </div>
              </div>

              <div className="addForm">
                <Button color="success" onClick={postAdd}>
                  Postavi oglas
                </Button>
              </div>
            </div>
          </row>
          <br></br>
          <br></br>
          <row>
            <MaterialTable
              icons={tableIcons}
              columns={[
                { title: "Naziv oglasa", field: "addName" },
                { title: "Opis", field: "addDescription" },
                { title: "Datum isteka", field: "addEndDate" },
              ]}
              data={adds}
              actions={[
                {
                  icon: "delete",
                  tooltip: "Delete User",
                  onClick: (event, rowData) => {
                    fetch("http://localhost:5000/api/v1/ad/" + rowData.addId, {
                      method: "DELETE",
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    })
                      .then((res) => {
                        if (res.status !== 200) {
                          throw new Error("Error creating User");
                        }
                        return res.json();
                      })
                      .then((resData) => {
                        alert.success("Uspesno ste obrisali oglas");
                        setAdds(
                          adds.filter((item) => item.addId !== rowData.addId)
                        );
                      })
                      .catch((err) => {
                        alert.error("Doslo je do greske");
                      });
                  },
                },
                {
                  icon: "search",
                  tooltip: "View Add",
                  onClick: (event, rowData) => {
                    openModal(rowData.addId);
                    setIsOpen(true);
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
};

export default withRouter(ProfilePageEmployer);
