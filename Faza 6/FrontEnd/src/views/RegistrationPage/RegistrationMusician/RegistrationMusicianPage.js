import React, { useState } from "react";
import { withRouter } from "react-router-dom";
function RegisterPageMusician(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    name: "",
    lastName: "",
    pass: "",
    repass: "",
    instagram: "",
    facebook: "",
    youtube: "",
    description: "",
  });
  const [error, setError] = useState("");

  const registracija = (event) => {
    event.preventDefault();
    if (
      state.username === "" ||
      state.email === "" ||
      state.name === "" ||
      state.lastname === "" ||
      state.pass === "" ||
      state.repass === "" ||
      state.instagram === "" ||
      state.facebook === "" ||
      state.youtube === "" ||
      state.description === ""
    ) {
      setError("Sva polja moraju biti popunjena!");
      return;
    }

    if (state.pass !== state.repass) {
      setError("Šifra se ne podudara!");
      return;
    }

    //api poziv
    var token;
    var id;
    fetch("http://localhost:5000/api/v1/auth/register ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        password: state.pass,
        role: "Musician",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        console.log("userCreated");
        token = resData.token;
        id = resData.data;
        fetch("http://localhost:5000/api/v1/musician ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
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
            user: id,
          }),
        })
          .then((res) => {
            if (res.status !== 201) {
              throw new Error("Error creating Employer");
            }
            return res.json();
          })
          .then((resData) => {
            localStorage.setItem("token", token);
            localStorage.setItem("id", resData.data._id);
            props.authenticateUser(
              token,
              resData.data._id,
              "/profile-page-musician/" + resData.data._id
            );
            props.history.push("/profile-page-musician/" + resData.data._id);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
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
              <span class="login100-form-title-1">
                Registruj se kao muzičar
              </span>
            </div>
            <p>{error}</p>
            <form class="login100-form validate-form">
              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Email</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="email"
                  placeholder="email"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Username</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="text"
                  name="username"
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
                  placeholder="prezime"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Šifra</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="password"
                  name="pass"
                  placeholder="šifra"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-26">
                <span class="label-input100">Šifra</span>
                <input
                  onChange={handleOnChange}
                  class="input100"
                  type="password"
                  name="repass"
                  placeholder="Ponovljena sifra"
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
                  Registruj se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPageMusician;
