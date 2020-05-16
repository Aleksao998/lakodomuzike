import React from "react";

function AdsListing(props) {
  return (
    <div class="col-xl-9 col-lg-9 col-md-8">
      <section class="featured-job-area">
        <div class="container">
          {props.listaFiltered.map((item) => {
            console.log(item);
            return (
              <div class="single-job-items mb-30">
                <div class="job-items">
                  <div class="company-img">
                    <a href="/single-add-detail">
                      <img alt="" />
                    </a>
                  </div>
                  <div class="job-tittle">
                    <a href="/single-add-detail">
                      <h4>{item.addsName}</h4>
                    </a>
                    <ul>
                      <li>{item.date}</li>
                      <li>
                        <i class="fas fa-map-marker-alt"></i>Athens, Greece
                      </li>
                      <li>
                        {item.priceFrom}rsd - {item.priceTo}rsd
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="items-link f-right">
                  <a href={item.link}>Pogledaj ceo oglas</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AdsListing;
