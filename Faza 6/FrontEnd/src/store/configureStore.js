import { createStore, combineReducers } from "redux";
import Adds from "../reducers/adds";

export default () => {
  const store = createStore(Adds);
  return store;
};
