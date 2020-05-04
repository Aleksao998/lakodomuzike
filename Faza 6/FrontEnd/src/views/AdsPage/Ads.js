import React from "react";
import Adsheader from "./AdsHeader/AdsHeader";
import AdsCategory from "./AdsCategory/AdsCategory";
import AdsListing from "./AdsListing/AdsListing";
function AdsPage() {
  return (
    <div>
      <Adsheader />
      <div class="job-listing-area pt-120 pb-120">
        <div class="container">
          <div class="row">
            <AdsCategory />
            <AdsListing />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsPage;
