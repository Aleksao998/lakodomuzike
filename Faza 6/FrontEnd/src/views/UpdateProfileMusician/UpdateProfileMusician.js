import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

const UpdatePageMusician = (props) => {
  const alert = useAlert();
  const [state, setState] = useState({
    username: "",
    name: "",
    lastName: "",
    instagram: "",
    facebook: "",
    youtube: "",
    description: "",
  });
  const [error, setError] = useState("");

  const registracija = (event) => {
    event.preventDefault();
    fetch(
      "http://localhost:5000/api/v1/musician/" + localStorage.getItem("id"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: state.name,
          surname: state.lastName,
          username: state.username,
          socialMedia: {
            Instagram: state.instagram,
            Facebook: state.facebook,
            YouTube: state.youtube,
          },
          description: state.description,
        }),
      }
    )
      .then((res) => {
        props.history.push(
          "/profile-page-musician/" + localStorage.getItem("id")
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
  React.useEffect(() => {
    fetch(
      "http://localhost:5000/api/v1/musician/" + localStorage.getItem("id"),
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
          lastName: resData.data.surname,
          instagram: resData.data.socialMedia.Instagram,
          facebook: resData.data.socialMedia.Facebook,
          youtube: "",
          description: resData.data.description,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
                Registruj se kao muzičar
              </span>
            </div>

            <p>{error}</p>
            <form class="login100-form validate-form">
              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Username</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="username"
                  value={state.username}
                  placeholder="username"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Ime</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="name"
                  value={state.name}
                  placeholder="Ime"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Prezime</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="lastName"
                  value={state.lastName}
                  placeholder="prezime"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Instagram</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="instagram"
                  value={state.instagram}
                  placeholder="Instagram link"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Facebook</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="facebook"
                  value={state.facebook}
                  placeholder="Facebook link"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Youtube</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="youtube"
                  value={state.youtube}
                  placeholder="Youtube link"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Opis</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  value={state.description}
                  name="description"
                  placeholder="Opis"
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
                  Updatuj
                </button>
                <button
                  class="login100-form-btn"
                  onClick={() => {
                    props.history.push(
                      "/profile-page-musician/" + localStorage.getItem("id")
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
};

export default withRouter(UpdatePageMusician);
