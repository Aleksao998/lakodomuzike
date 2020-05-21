import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import Image1 from "../LandingPage/FeatureJobs/job-list1.png";
import FooterBlack from "../../components/Footers/FooterBlack";
function SignleAddDetail(props) {
  const [state, setState] = useState({
    adName: "",
    cratedAt: "",
    description: "",
    location: { address: "", number: 0, city: "" },
    maintenanceDate: { date: "", time: "" },
    priceFrom: 0,
    priceTo: 0,
    typeOfMusic: "",
  });
  const [price, setPrice] = useState("");

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setPrice(value);
  };

  const onSubmit = (title) => {
    console.log(price);
    console.log(props.match.params.id);
    console.log(props.userId);

    fetch(
      "http://localhost:5000/api/v1/musician/" +
        props.userId +
        "/" +
        props.match.params.id +
        "/registredmusician",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          musician: props.userId,
          ad: props.userId,
          price: price,
          accepted: false,
          title: title,
        }),
      }
    )
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    console.log("usao");
    console.log(props.profileRoute);
    fetch("http://localhost:5000/api/v1/ad/" + props.match.params.id, {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error creating User");
        }
        return res.json();
      })
      .then((resData) => {
        setState(resData.data);
      });
  }, []);

  return (
    <div>
      <div class="job-post-company pt-120 pb-120 mt-85">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-xl-7 col-lg-8">
              <div class="single-job-items mb-50">
                <div class="job-items">
                  <div class="company-img company-img-details">
                    <a href="#">
                      <img src={Image1} alt="" />
                    </a>
                  </div>
                  <div class="job-tittle">
                    <a href="#">
                      <h4>{state.adName}</h4>
                    </a>
                    <ul>
                      <li>
                        <i class="fas fa-map-marker-alt">
                          {state.location.address},{state.location.number},
                          {state.location.city}
                        </i>
                      </li>
                      <li>
                        {state.priceFrom}rsd - {state.priceTo}rsd
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="job-post-details">
                <div class="post-details1 mb-50">
                  <div class="small-section-tittle">
                    <h4>Opis</h4>
                  </div>
                  <p>{state.description}</p>
                </div>
              </div>
            </div>

            <div class="col-xl-4 col-lg-4">
              <div class="post-details3  mb-50">
                <div class="small-section-tittle">
                  <h4>Job Overview</h4>
                </div>
                <ul>
                  <li>
                    Postavljen oglas :{" "}
                    <span>{state.maintenanceDate.date.slice(0, 10)}</span>
                  </li>
                  <li>
                    Lokacija :{" "}
                    <span>
                      {" "}
                      {state.location.address},{state.location.number},
                      {state.location.city}
                    </span>
                  </li>
                  <li>
                    Tip Muzike : {state.typeOfMusic}
                    <span>Full time</span>
                  </li>
                  <li>
                    Cena :{" "}
                    <span>
                      {state.priceFrom}rsd - {state.priceTo}rsd
                    </span>
                  </li>
                </ul>
                <div class="apply-btn2">
                  {props.profileRoute.includes("/profile-page-musician") ? (
                    <div style={{ textAlign: "center" }}>
                      <Input
                        type="text"
                        name="price"
                        placeholder="Unesite cenu"
                        onChange={handleOnChange}
                        style={{ marginBottom: "5px" }}
                      ></Input>
                      <a
                        onClick={() => onSubmit(state.adName)}
                        class="btn"
                        style={{ color: "white" }}
                      >
                        Prijavi se na oglas
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBlack />
    </div>
  );
}

export default SignleAddDetail;
