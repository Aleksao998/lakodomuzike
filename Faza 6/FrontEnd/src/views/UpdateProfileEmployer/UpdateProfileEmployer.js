import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";
function RegisterPageEmployer(props) {
  const alert = useAlert();
  const [state, setState] = useState({
    username: "",
    name: "",
    lastname: "",
    kontaktBr: "",
  });
  const [error, setError] = useState("");
  const registracija = (event) => {
    event.preventDefault();
    console.log(state);
    fetch(
      "http://localhost:5000/api/v1/employer/" + localStorage.getItem("id"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: state.name,
          surname: state.lastname,
          username: state.username,
          contact: state.kontaktBr,
        }),
      }
    )
      .then((res) => {
        console.log(res);
        props.history.push(
          "/profile-page-employer/" + localStorage.getItem("id")
        );
      })
      .catch((err) => {
        alert.error("Doslo je do greske");
      });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  document.documentElement.classList.remove("nav-open");

  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  React.useEffect(() => {
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
        setState({
          username: resData.data.username,
          name: resData.data.name,
          lastname: resData.data.surname,
          kontaktBr: resData.data.contact,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const back = () => {
    console.log("usao");
  };
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
              <span class="login100-form-title-1">Updatuj profil</span>
            </div>
            <p>{error}</p>
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
                  value={state.username}
                  onChange={handleOnChange}
                  placeholder="Izaberite Vaš UserName"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-26"
                data-validate="Name is required"
              >
                <span class="label-input100">Ime</span>
                <input
                  class="input100"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleOnChange}
                  placeholder="Ime"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-26"
                data-validate="LastName is required"
              >
                <span class="label-input100">Prezime</span>
                <input
                  class="input100"
                  type="text"
                  name="lastname"
                  value={state.lastname}
                  onChange={handleOnChange}
                  placeholder="Prezime"
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
                  value={state.kontaktBr}
                  onChange={handleOnChange}
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
                <button class="login100-form-btn" onClick={registracija}>
                  Sacuvaj
                </button>
                <button
                  class="login100-form-btn"
                  onClick={() => {
                    props.history.push(
                      "/profile-page-employer/" + localStorage.getItem("id")
                    );
                  }}
                >
                  Nazad
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(RegisterPageEmployer);
