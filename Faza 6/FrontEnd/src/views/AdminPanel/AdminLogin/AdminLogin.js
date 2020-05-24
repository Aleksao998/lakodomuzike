import React, { useState } from "react";
import { withRouter } from "react-router-dom";
const AdminLogin = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const loginAdmin = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/v1/auth/login ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.role === "admin") {
          localStorage.setItem("token", resData.token);
          localStorage.setItem("id", resData.data);
          props.authenticateUser(
            resData.token,
            resData.data,
            "/dashboard/" + resData.data
          );
          props.history.push("/dashboard/" + resData.data);
          return;
        } else {
          setError("Admin ne postoji!");
          return;
        }
      })
      .catch((err) => {
        setError("Doslo je do greske!");
        return;
      });
  };
  return (
    <div class="login-page">
      <div class="admin-form">
        <p>{error}</p>
        <form class="login-form">
          <input
            type="text"
            name="email"
            placeholder="Email adresa"
            onChange={handleOnChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Šifra"
            onChange={handleOnChange}
          />
          <button onClick={loginAdmin}>Prijavi se</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(AdminLogin);
