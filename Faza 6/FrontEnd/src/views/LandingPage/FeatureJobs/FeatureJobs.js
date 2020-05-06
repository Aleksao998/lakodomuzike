import React from "react";
import Image1 from "./job-list1.png";
import Image2 from "./job-list2.png";
import Image3 from "./job-list3.png";
import Image4 from "./job-list4.png";
function FeatureJob() {
  return (
    <section class="featured-job-area ">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-tittle text-center">
              <span></span>
              <h2>Novi oglasi</h2>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="single-job-items mb-30">
              <div class="job-items">
                <div class="company-img">
                  <a href="job_details.html">
                    <img src={Image1} alt="" />
                  </a>
                </div>
                <div class="job-tittle">
                  <a href="job_details.html">
                    <h4>Ceger Kafic</h4>
                  </a>
                  <ul>
                    <li>26.03.2020</li>
                    <li>
                      <i class="fas fa-map-marker-alt"></i>Athens, Greece
                    </li>
                    <li>3500rsd - 5000rsd</li>
                  </ul>
                </div>
              </div>
              <div class="items-link f-right">
                <a href="job_details.html">Pogledaj ceo oglas</a>
                <span>4 hours ago</span>
              </div>
            </div>

            <div class="single-job-items mb-30">
              <div class="job-items">
                <div class="company-img">
                  <a href="job_details.html">
                    <img src={Image2} alt="" />
                  </a>
                </div>
                <div class="job-tittle">
                  <a href="job_details.html">
                    <h4>Kucna Zurka</h4>
                  </a>
                  <ul>
                    <li>26.03.2020</li>
                    <li>
                      <i class="fas fa-map-marker-alt"></i>Athens, Greece
                    </li>
                    <li>3500rsd - 5000rsd</li>
                  </ul>
                </div>
              </div>
              <div class="items-link f-right">
                <a href="job_details.html">Pogledaj ceo oglas</a>
                <span>4 hours ago</span>
              </div>
            </div>

            <div class="single-job-items mb-30">
              <div class="job-items">
                <div class="company-img">
                  <a href="job_details.html">
                    <img src={Image3} alt="" />
                  </a>
                </div>
                <div class="job-tittle">
                  <a href="job_details.html">
                    <h4>Exponto</h4>
                  </a>
                  <ul>
                    <li>23.03.2020</li>
                    <li>
                      <i class="fas fa-map-marker-alt"></i>Athens, Greece
                    </li>
                    <li>1500rsd - 3000rsd</li>
                  </ul>
                </div>
              </div>
              <div class="items-link f-right">
                <a href="job_details.html">Pogledaj ceo oglas</a>
                <span>4 hours ago</span>
              </div>
            </div>
            <div class="single-job-items mb-30">
              <div class="job-items">
                <div class="company-img">
                  <a href="job_details.html">
                    <img src={Image4} alt="" />
                  </a>
                </div>
                <div class="job-tittle">
                  <a href="job_details.html">
                    <h4>Exponto</h4>
                  </a>
                  <ul>
                    <li>27.03.2020</li>
                    <li>
                      <i class="fas fa-map-marker-alt"></i>Athens, Greece
                    </li>
                    <li>1500rsd - 3000rsd</li>
                  </ul>
                </div>
              </div>
              <div class="items-link f-right">
                <a href="job_details.html">Pogledaj ceo oglas</a>
                <span>4 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureJob;
