import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
// core components

function LandingPageHeader(props) {
  let pageHeader = React.createRef();
  const MusicTypeRef = useRef(null);
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
  const handleOnClick = () => {
    console.log(MusicTypeRef.current.value);
    props.setSearchBar(!props.searchBar);
    props.history.push("/ads?type=" + MusicTypeRef.current.value);
  };
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
                    <div className="select-form">
                      <div className="select-itms">
                        <select
                          name="select"
                          id="select1"
                          className="form-select"
                          ref={MusicTypeRef}
                        >
                          <option value="Rock">Rock</option>
                          <option value="Narodna">Narodna</option>
                          <option value="Dj">Dj</option>
                        </select>
                      </div>
                    </div>
                    <div className="search-form">
                      <a href="#" onClick={handleOnClick}>
                        Find job
                      </a>
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

export default withRouter(LandingPageHeader);
