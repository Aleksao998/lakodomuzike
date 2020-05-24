import React, { useState } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

function AdsCategory(props) {
  const [state, setState] = React.useState({
    type: "",
    location: "",
    priceFrom: "",
    priceTo: "",
    selectedOption: "",
    date: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const handleOptionChange = (changeEvent) => {
    setState({ ...state, ["selectedOption"]: changeEvent.target.value });
  };
  const restartFilter = () => {
    setState({
      type: "",
      location: "",
      priceFrom: "",
      priceTo: "",
      selectedOption: "",
      date: "",
    });
    props.setListFiltered(props.lista);
    document.getElementById("create-course-form").reset();
  };
  const filter = () => {
    console.log(state);
    console.log(props.lista);
    var arr = props.lista.filter(function (elem) {
      if (state.type != "") {
        if (state.type !== elem.type) return false;
      }
      if (state.location != "") {
        if (state.location !== elem.city) return false;
      }
      if (state.priceFrom != "") {
        if (state.priceFrom >= elem.priceFrom) return false;
      }
      if (state.priceTo != "") {
        if (state.priceTo <= elem.priceTo) return false;
      }
      if (state.date != "") {
        if (state.date !== elem.date) return false;
      }
      return true;
    });
    console.log(arr);
    props.setListFiltered(arr);
  };
  return (
    <div class="col-xl-3 col-lg-3 col-md-4">
      <div class="row">
        <div class="col-12">
          <div class="small-section-tittle2 mb-45">
            <div class="ion">
              <svg width="20px" height="12px">
                <path
                  fill-rule="evenodd"
                  fill="rgb(27, 207, 107)"
                  d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z"
                />
              </svg>
            </div>
            <h4>Filtriraj oglase</h4>
          </div>
        </div>
      </div>
      <form id="create-course-form">
        <div class="job-category-listing mb-50">
          <div class="single-listing">
            <div class="small-section-tittle2">
              <h4>Kategorija oglasa</h4>
            </div>

            <div class="select-job-items2 mb-50">
              <Input type="select" name="type" onChange={handleOnChange}>
                <option value="">Izaberi Tip</option>
                <option value="Rock">Rock</option>
                <option value="Narodna">Narodna</option>
                <option value="Dj">Ex You</option>
              </Input>
            </div>
          </div>

          <div class="single-listing pb-50">
            <div class="small-section-tittle2">
              <h4>Lokacija</h4>
            </div>

            <div class="select-job-items2">
              <Input type="select" name="location" onChange={handleOnChange}>
                <option value="">Izaberi grad</option>
                <option value="Beograd">Beograd</option>
                <option value="Novi Sad">Novi Sad</option>
                <option value="Kragujevac">Kragujevac</option>
              </Input>
            </div>
          </div>

          <div class="single-listing">
            <div class="small-section-tittle2">
              <h4>Cena od - Cena do</h4>
            </div>

            <div class="select-job-items2 pb-50">
              <div className="row">
                <div className="col-6">
                  <Input
                    type="text"
                    name="priceFrom"
                    placeholder="Od"
                    onChange={handleOnChange}
                  ></Input>
                </div>
                <div className="col-6">
                  <Input
                    type="text"
                    name="priceTo"
                    placeholder="Do"
                    onChange={handleOnChange}
                  ></Input>
                </div>
              </div>
            </div>

            <div class="single-listing pb-50">
              <div class="small-section-tittle2">
                <h4>Datum</h4>
              </div>
              <div class="select-job-items2">
                <Input
                  type="date"
                  name="date"
                  onChange={handleOnChange}
                ></Input>
              </div>
            </div>
          </div>
          <div class="select-job-items2 mb-10" style={{ textAlign: "center" }}>
            <Button color="success" onClick={filter}>
              Filtriraj
            </Button>
          </div>
          <div class="select-job-items2 mb-50" style={{ textAlign: "center" }}>
            <Button color="danger" onClick={restartFilter}>
              Restartuj
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdsCategory;
