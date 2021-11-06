import { combineReducers } from "redux";
import layout from "./layoutReducer";
import apiCallsInProgress from "./apiStatusReducer";
import searchVisit from "./searchVisitReducer";
import auth from "./authReducer";
import user from "./userReducer";
import suburbConfig from "./suburbConfigReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  layout,
  searchVisit,
  auth,
  user,
  suburbConfig,
});

export default rootReducer;
