import React from "react";
import { withRouter } from "react-router-dom";
function AdsListing(props) {
  const handleOnClick = (route) => {
    props.history.push(route);
  };

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
                        <i class="fa fa-money"></i>
                        {item.priceFrom}rsd - {item.priceTo}rsd
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="items-link f-right">
                  <a onClick={() => handleOnClick(item.link)}>Detailji</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default withRouter(AdsListing);
