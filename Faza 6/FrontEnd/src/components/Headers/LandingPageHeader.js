import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <div
      style={{
        backgroundImage: "url(" + require("assets/img/guitar.jpg") + ")",
      }}
      className="page-header page-header-xs"
      data-parallax={true}
      ref={pageHeader}
    >
      <div className="slider-area">
        <div className="slider-active">
          <div className="single-slider slider-height d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-9 col-md-10">
                  <div className="hero__caption">
                    <h1>Oglasi za muzicare na jednom mestu</h1>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8">
                  <form action="#" className="search-box">
                    <div className="input-form">
                      <input type="text" placeholder="Datum" />
                    </div>
                    <div className="select-form">
                      <div className="select-itms">
                        <select
                          name="select"
                          id="select1"
                          className="form-select"
                        >
                          <option value="">Rock</option>
                          <option value="">Narodna</option>
                          <option value="">Dj</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-form">
                      <a href="#">Find job</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageHeader;
