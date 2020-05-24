import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

function FeatureJob(props) {
  const handleOnClick = (route) => {
    props.history.push(route);
  };
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
            {props.lista.map((item) => {
              console.log(item);

              return (
                <div class="single-job-items mb-30">
                  <div class="job-items">
                    <div class="company-img">
                      <a href="/single-add-detail">
                        <img src={item.url} alt="" />
                      </a>
                    </div>
                    <div class="job-tittle">
                      <a href="/single-add-detail">
                        <h4>{item.addsName}</h4>
                      </a>
                      <ul>
                        <li>{item.date}</li>
                        <li>
                          <i class="fa fa-map-marker"></i>
                          {item.city}, {item.location} {item.number}
                        </li>
                        <li>
                          {item.priceFrom}rsd - {item.priceTo}rsd
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="items-link f-right">
                    <a onClick={() => handleOnClick(item.link)}>
                      Pogledaj ceo oglas
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(FeatureJob);
