import React from "react";

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
            <select name="select">
              <option value="">Sve kategorije</option>
              <option value="">Rock</option>
              <option value="">Narodna</option>
              <option value="">Ex You</option>
            </select>
          </div>

          <div class="select-Categories pt-80 pb-50">
            <div class="small-section-tittle2">
              <h4>Job Type</h4>
            </div>
            <label class="container">
              Full Time
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Part Time
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Remote
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Freelance
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="single-listing">
          <div class="small-section-tittle2">
            <h4>Job Location</h4>
          </div>

          <div class="select-job-items2">
            <select name="select">
              <option value="">Anywhere</option>
              <option value="">Category 1</option>
              <option value="">Category 2</option>
              <option value="">Category 3</option>
              <option value="">Category 4</option>
            </select>
          </div>

          <div class="select-Categories pt-80 pb-50">
            <div class="small-section-tittle2">
              <h4>Experience</h4>
            </div>
            <label class="container">
              1-2 Years
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              2-3 Years
              <input type="checkbox" checked="checked active" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              3-6 Years
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              6-more..
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="single-listing">
          <div class="select-Categories pb-50">
            <div class="small-section-tittle2">
              <h4>Posted Within</h4>
            </div>
            <label class="container">
              Any
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Today
              <input type="checkbox" checked="checked active" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Last 2 days
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Last 3 days
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Last 5 days
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Last 10 days
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsCategory;
