import React from "react";
import Image1 from "../LandingPage/FeatureJobs/job-list1.png";
import FooterBlack from "../../components/Footers/FooterBlack";
function SignleAddDetail() {
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
                      <h4>Digital Marketer</h4>
                    </a>
                    <ul>
                      <li>Creative Agency</li>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>Athens, Greece
                      </li>
                      <li>$3500 - $4000</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="job-post-details">
                <div class="post-details1 mb-50">
                  <div class="small-section-tittle">
                    <h4>Opis</h4>
                  </div>
                  <p>
                    It is a long established fact that a reader will beff
                    distracted by vbthe creadable content of a page when looking
                    at its layout. The pointf of using Lorem Ipsum is that it
                    has ahf mcore or-lgess normal distribution of letters, as
                    opposed to using, Content here content here making it look
                    like readable.
                  </p>
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
                    Postavljen oglas : <span>12 Aug 2019</span>
                  </li>
                  <li>
                    Lokacija : <span>New York</span>
                  </li>
                  <li>
                    Tip Muzike : <span>Full time</span>
                  </li>
                  <li>
                    Cena : <span>3500-5500</span>
                  </li>
                </ul>
                <div class="apply-btn2">
                  <a href="#" class="btn">
                    Prijavi se na oglas
                  </a>
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
