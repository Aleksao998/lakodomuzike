import React, { useState } from "react";
//Redux
import { connect } from "react-redux";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/FooterBlack";
import FeatureJob from "./FeatureJobs/FeatureJobs";
import HowItWorks from "./HowItWorks/HowItWorks";

const LandingPage = (props) => {
  const [lista, setList] = useState([]);
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    if (props.finishLoading === true) {
      const storeLengt = props.store.length;
      console.log(props.store);
      if (storeLengt < 4) {
        var listaNew = new Array();
        for (var i = 0; i < storeLengt; i++) {
          listaNew.push(props.store[i]);
        }
        setList(...lista, listaNew);
      } else {
        var listaNew = new Array();
        for (var i = 0; i < 4; i++) {
          listaNew.push(props.store[i]);
        }
        setList(...lista, listaNew);
      }

      document.body.classList.add("profile-page");
      return function cleanup() {
        document.body.classList.remove("profile-page");
      };
    }
  }, [props.finishLoading]);
  return (
    <>
      <LandingPageHeader
        props={props}
        setSearchBar={props.setSearchBar}
        searchBar={props.searchBar}
      />

      <div className="main">
        <FeatureJob lista={lista} />
        <HowItWorks />
      </div>
      <DemoFooter />
    </>
  );
};
const ConnectedProfilePage = connect((state) => {
  return {
    store: state,
  };
})(LandingPage);

export default ConnectedProfilePage;
