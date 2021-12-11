import initialState from "./initialState";
import * as types from "../constants/actionTypes";

export default function (state = initialState.admin, action) {
  switch (action.type) {
    case types.LOAD_ADDRESSES_STATES_SUCCESS:
      return { ...state, addresses: action.addresses };
    case types.SET_ENABLED_DISABLED_USER_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.map((ads) => ({
          ...ads,
          users: ads.users.map((u) =>
            u.id === action.user.userId
              ? { ...u, active: action.user.active }
              : { ...u }
          ),
        })),
      };
    case types.SET_LIMITED_USER_BY_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.map((ads) => ({
          ...ads,
          users: ads.users.map((u) =>
            action.users.map((us) => us._id).indexOf(u.id) !== -1
              ? { ...u, ...action.users.filter((us) => us._id === u.id)[0] }
              : { ...u }
          ),
        })),
      };
    default:
      return state;
  }
}
