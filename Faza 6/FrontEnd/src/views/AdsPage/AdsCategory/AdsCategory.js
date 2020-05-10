import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
function AdsCategory() {
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

      <div class="job-category-listing mb-50">
        <div class="single-listing">
          <div class="small-section-tittle2">
            <h4>Kategorija oglasa</h4>
          </div>

          <div class="select-job-items2">
            <Input type="select" name="select">
              <option value="Rock">Rock</option>
              <option value="Narodna">Narodna</option>
              <option value="Ex You">Ex You</option>
            </Input>
          </div>

          <div class="select-Categories pt-80 pb-50">
            <div class="small-section-tittle2">
              <h4>Period</h4>
            </div>
            <label class="container">
              Sledecih 3 dana
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Sledecih 7 dana
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Sledecih 14 dana
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Sledecih 30 dana
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="single-listing pb-50">
          <div class="small-section-tittle2">
            <h4>Lokacija</h4>
          </div>

          <div class="select-job-items2">
            <Input type="select" name="select">
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
                <Input type="text" name="CenOd" placeholder="Od"></Input>
              </div>
              <div className="col-6">
                <Input type="text" name="CenDo" placeholder="Do"></Input>
              </div>
            </div>
          </div>

          <div class="single-listing pb-50">
            <div class="small-section-tittle2">
              <h4>Datum</h4>
            </div>
            <div class="select-job-items2">
              <Input type="date" name="datum"></Input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsCategory;
