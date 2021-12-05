import { combineReducers } from "redux";
import layout from "./layoutReducer";
import apiCallsInProgress from "./apiStatusReducer";
import searchVisit from "./searchVisitReducer";
import auth from "./authReducer";
import user from "./userReducer";
import userInvite from "./inviteReducer";
import suburbConfig from "./suburbConfigReducer";
import myVisits from "./myVisitsReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  layout,
  searchVisit,
  auth,
  user,
  userInvite,
  suburbConfig,
  myVisits,
});

export default rootReducer;
