import React, { useState, useEffect } from "react";
import Adsheader from "./AdsHeader/AdsHeader";
import AdsCategory from "./AdsCategory/AdsCategory";
import AdsListing from "./AdsListing/AdsListing";

import { connect } from "react-redux";
function AdsPage(props) {
  const [lista, setList] = useState([]);
  const [listaFiltered, setListFiltered] = useState([]);
  React.useEffect(() => {
    console.log("usao");
    const queryString = require("query-string");
    const parsed = queryString.parse(props.location.search);
    console.log();
    if (parsed["type"] === undefined) {
      const storeLengt = props.store.length;
      var listaNew = new Array();
      for (var i = 0; i < storeLengt; i++) {
        listaNew.push(props.store[i]);
      }
      setList(...lista, listaNew);
      setListFiltered(...listaFiltered, listaNew);
    } else {
      const storeLengt = props.store.length;
      var listaNew = new Array();
      var listaNewFiltered = new Array();
      for (var i = 0; i < storeLengt; i++) {
        if (props.store[i].type == parsed["type"]) {
          listaNewFiltered.push(props.store[i]);
        }
        listaNew.push(props.store[i]);
      }
      setList(...lista, listaNew);
      setListFiltered(...listaFiltered, listaNewFiltered);
    }
  }, [props.finishLoading, props.searchBar]);
  return (
    <div>
      <Adsheader />
      <div class="job-listing-area pt-120 pb-120">
        <div class="container">
          <div class="row">
            <AdsCategory
              lista={lista}
              listaFiltered={listaFiltered}
              setList={setList}
              setListFiltered={setListFiltered}
            />
            <AdsListing
              lista={lista}
              listaFiltered={listaFiltered}
              setList={setList}
              setListFiltered={setListFiltered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const ConnectedProfilePage = connect((state) => {
  return {
    store: state,
  };
})(AdsPage);

export default ConnectedProfilePage;
