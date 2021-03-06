import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";
function RegisterPageEmployer(props) {
  const alert = useAlert();
  const [state, setState] = useState({
    username: "",
    email: "",
    name: "",
    lastname: "",
    pass: "",
    repass: "",
    kontaktBr: "",
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
      state.kontaktBr === ""
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
        role: "Employer",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        token = resData.token;
        id = resData.data;
        fetch("http://localhost:5000/api/v1/employer ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: state.name,
            surname: state.lastname,
            username: state.username,
            contact: state.kontaktBr,
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
              "/profile-page-employer/" + resData.data._id
            );
            alert.success("Uspesno ste se registrovali");
            props.history.push("/profile-page-employer/" + resData.data._id);
          });
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
                Registruj se kao poslodavac
              </span>
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
                  onChange={handleOnChange}
                  placeholder="Izaberite Vaš UserName"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-26"
                data-validate="Email is required"
              >
                <span class="label-input100">Email</span>
                <input
                  class="input100"
                  type="text"
                  name="email"
                  onChange={handleOnChange}
                  placeholder="Izaberite Vaš Email"
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
                  onChange={handleOnChange}
                  placeholder="Prezime"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-18"
                data-validate="Password is required"
              >
                <span class="label-input100">Password</span>
                <input
                  class="input100"
                  type="password"
                  name="pass"
                  onChange={handleOnChange}
                  placeholder="Unesite Vašu šifru"
                ></input>
                <span class="focus-input100"></span>
              </div>

              <div
                class="wrap-input100 validate-input m-b-18"
                data-validate="Password is required"
              >
                <span class="label-input100">Password</span>
                <input
                  class="input100"
                  type="password"
                  onChange={handleOnChange}
                  name="repass"
                  placeholder="Ponovite šifru"
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

export default withRouter(RegisterPageEmployer);
